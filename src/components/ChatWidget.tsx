import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

interface Message {
  id: string;
  content: string;
  sender: "user" | "expert";
  created_at: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionId) {
      // Subscribe to new messages
      const channel = supabase
        .channel(`chat:${sessionId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: `session_id=eq.${sessionId}`,
          },
          (payload) => {
            const newMessage = payload.new as Message;
            setMessages((prev) => [...prev, newMessage]);
            scrollToBottom();
          }
        )
        .subscribe();

      // Subscribe to session status changes
      const statusChannel = supabase
        .channel(`session:${sessionId}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "chat_sessions",
            filter: `id=eq.${sessionId}`,
          },
          (payload) => {
            const session = payload.new as any;
            if (session.status === "connected") {
              setIsWaiting(false);
              setIsConnected(true);
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
        supabase.removeChannel(statusChannel);
      };
    }
  }, [sessionId]);

  useEffect(() => {
    if (isConnected && sessionId) {
      loadMessages();
    }
  }, [isConnected, sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadMessages = async () => {
    if (!sessionId) return;
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });

    if (data && !error) {
      setMessages(data as Message[]);
    }
  };

  const handleRequestSupport = async () => {
    setIsRequesting(true);
    try {
      // Create a new chat session
      const { data, error } = await supabase
        .from("chat_sessions")
        .insert({
          status: "waiting",
          user_name: "Guest User",
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating session:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
        
        if (error.message?.includes("relation") || error.message?.includes("does not exist")) {
          alert(`Database table not found. Error: ${error.message}\n\nPlease run the SQL schema in Supabase SQL Editor.`);
        } else {
          alert(`Error: ${error.message}`);
        }
        setIsRequesting(false);
        return;
      }

      if (!data) {
        throw new Error("No data returned from session creation");
      }

      console.log("Session created successfully:", data);
      setSessionId(data.id);
      setIsRequesting(false);
      setIsWaiting(true);
    } catch (error: any) {
      console.error("Error creating session:", error);
      setIsRequesting(false);
      const errorMessage = error?.message || "Failed to request support. Please check if the database tables are set up correctly.";
      alert(errorMessage);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !sessionId || !isConnected) return;

    const message = {
      session_id: sessionId,
      content: inputMessage.trim(),
      sender: "user" as const,
    };

    try {
      const { error } = await supabase.from("chat_messages").insert(message);
      if (error) throw error;
      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-navy hover:bg-blue-800 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
        aria-label="Open chat"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200">
      {/* Header */}
      <div className="bg-navy text-white p-4 rounded-t-lg flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Support Chat</h3>
          {isWaiting && (
            <p className="text-xs text-gray-300">Waiting for expert...</p>
          )}
          {isConnected && (
            <p className="text-xs text-green-300">Connected</p>
          )}
        </div>
        <button
          onClick={() => {
            setIsOpen(false);
            setIsWaiting(false);
            setIsConnected(false);
            setMessages([]);
            setSessionId(null);
          }}
          className="text-white hover:text-gray-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {!isRequesting && !isWaiting && !isConnected && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <svg
              className="w-16 h-16 text-navy mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h4 className="text-lg font-semibold text-navy mb-2">
              Need Support?
            </h4>
            <p className="text-gray-600 mb-4 text-sm">
              Click below to connect with our expert support team
            </p>
            <button
              onClick={handleRequestSupport}
              className="bg-navy hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Request Support
            </button>
          </div>
        )}

        {isRequesting && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy mx-auto mb-4"></div>
              <p className="text-gray-600">Connecting...</p>
            </div>
          </div>
        )}

        {isWaiting && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="animate-pulse mb-4">
                <svg
                  className="w-16 h-16 text-navy mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-navy mb-2">
                Waiting for Expert
              </h4>
              <p className="text-gray-600 text-sm">
                An expert will be with you shortly...
              </p>
            </div>
          </div>
        )}

        {isConnected && (
          <>
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 text-sm py-8">
                Start the conversation
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-navy text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        {new Date(message.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      {isConnected && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-navy hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;

