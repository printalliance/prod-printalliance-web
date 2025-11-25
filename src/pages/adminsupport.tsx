import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { supabase } from "@/lib/supabase";

interface ChatSession {
  id: string;
  user_name: string;
  status: "waiting" | "connected" | "closed";
  created_at: string;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "expert";
  session_id: string;
  created_at: string;
}

const AdminSupport = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem("admin_authenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
      loadSessions();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadSessions();
      
      // Set up polling as backup in case realtime doesn't work
      const pollInterval = setInterval(() => {
        loadSessions();
      }, 3000); // Poll every 3 seconds

      // Subscribe to new sessions
      const channel = supabase
        .channel("admin-sessions")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "chat_sessions",
          },
          (payload) => {
            console.log("Session change detected:", payload);
            loadSessions();
          }
        )
        .subscribe((status) => {
          console.log("Realtime subscription status:", status);
        });

      return () => {
        clearInterval(pollInterval);
        supabase.removeChannel(channel);
      };
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedSession) {
      loadMessages();
      // Subscribe to new messages for this session
      const channel = supabase
        .channel(`admin-chat:${selectedSession}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: `session_id=eq.${selectedSession}`,
          },
          (payload) => {
            const newMessage = payload.new as Message;
            setMessages((prev) => [...prev, newMessage]);
            // Don't auto-scroll - let admin control scroll position
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [selectedSession]);

  // Removed scrollToBottom function - admin controls scroll manually

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded credentials
    const adminUsername = "admin";
    const adminPassword = "PrintAlliance2024!";

    if (username === adminUsername && password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
    setSelectedSession(null);
    setMessages([]);
  };

  const loadSessions = async () => {
    try {
      // Use regular supabase client (anon key) - RLS policies should allow access
      const { data, error } = await supabase
        .from("chat_sessions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading sessions:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
        
        // Check if it's a table not found error
        if (error.message?.includes("relation") || error.message?.includes("does not exist")) {
          alert(`Database table not found. Error: ${error.message}\n\nPlease run the SQL schema in Supabase SQL Editor.`);
        } else {
          alert(`Error loading sessions: ${error.message}`);
        }
        setSessions([]);
        return;
      }

      // Filter for waiting and connected sessions
      const activeSessions = (data || []).filter(
        (s: any) => s.status === "waiting" || s.status === "connected"
      ) as ChatSession[];

      setSessions(activeSessions);
      console.log("Loaded sessions:", activeSessions);
    } catch (err: any) {
      console.error("Exception loading sessions:", err);
      alert(`Exception: ${err?.message || "Unknown error"}`);
      setSessions([]);
    }
  };

  const loadMessages = async () => {
    if (!selectedSession) return;
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", selectedSession)
      .order("created_at", { ascending: true });

    if (data && !error) {
      setMessages(data as Message[]);
    }
  };

  const handleConnect = async (sessionId: string) => {
    const { error } = await supabase
      .from("chat_sessions")
      .update({ status: "connected" })
      .eq("id", sessionId);

    if (!error) {
      setSelectedSession(sessionId);
      loadSessions();
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedSession) return;

    const message = {
      session_id: selectedSession,
      content: inputMessage.trim(),
      sender: "expert" as const,
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

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin Support Login | PrintAlliance</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
            <h1 className="text-3xl font-bold text-navy mb-2 text-center">
              Admin Support
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Login to access live chat support
            </p>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
                  required
                />
              </div>
              {error && (
                <div className="mb-4 text-red-600 text-sm text-center">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-navy hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Support Dashboard | PrintAlliance</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-navy text-white p-4 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Support Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Sessions List */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-navy">
                Active Sessions ({sessions.length})
              </h2>
              <button
                onClick={loadSessions}
                className="text-navy hover:text-blue-800 transition-colors"
                title="Refresh sessions"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
            <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
              {sessions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No active sessions
                </p>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => {
                      if (session.status === "waiting") {
                        handleConnect(session.id);
                      } else {
                        setSelectedSession(session.id);
                      }
                    }}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedSession === session.id
                        ? "border-navy bg-blue-50"
                        : "border-gray-200 hover:border-navy"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-800">
                        {session.user_name}
                      </p>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          session.status === "waiting"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {session.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(session.created_at).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md flex flex-col">
            {selectedSession ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="font-semibold text-navy">
                    Chat with{" "}
                    {sessions.find((s) => s.id === selectedSession)?.user_name}
                  </h3>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 min-h-[400px]">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      No messages yet. Start the conversation!
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "expert"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.sender === "expert"
                              ? "bg-navy text-white"
                              : "bg-white text-gray-800 border border-gray-200"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === "expert"
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
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
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
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a session to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSupport;

