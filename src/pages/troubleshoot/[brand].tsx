import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ExpertAssistanceModal from "@/components/ExpertAssistanceModal";

const printerProblems = [
  "Set-up a new printer",
  "Wi-Fi or Wireless setup",
  "Offline or Can't connect",
  "Won't print",
  "Printing blank papers",
  "Paper jam",
  "Error code or Error message",
  "Scanner issue",
];

const deviceTypes = [
  "Windows computer",
  "Mac computer",
  "Chromebook",
  "Android Phone/ Tablet",
  "iPhone/ iPad",
];

const troubleshootingSteps: Record<string, string[]> = {
  "Paper jam": [
    "Turn off and unplug the printer - First, make sure that your printer is turned off. This is important as you must not prod and poke the printer when it is turned on. Ensure that all printing jobs have been cancelled and the printer is turned off at the plug.",
    "Remove all printer paper from the tray and try reloading",
    "Open the rear access door and carefully remove any jammed paper. Pull gently to avoid tearing the paper.",
    "Check inside the printer for any torn pieces of paper and remove them",
    "Close all doors and trays securely",
    "Plug in and restart the printer",
  ],
  "Set-up a new printer": [
    "Unbox the printer and remove all packing materials and protective tapes",
    "Connect the power cable and turn on the printer",
    "Install ink cartridges or toner as per the manufacturer's instructions",
    "Load paper into the paper tray",
    "Download and install the latest printer drivers from the manufacturer's website",
    "Connect the printer to your device via USB or follow wireless setup instructions",
    "Print a test page to verify the setup is complete",
  ],
  "Wi-Fi or Wireless setup": [
    "Ensure your printer has wireless capability and the wireless feature is turned on",
    "Access the printer's control panel and navigate to Network/Wireless settings",
    "Select your Wi-Fi network from the list of available networks",
    "Enter your Wi-Fi password carefully (it is case-sensitive)",
    "Wait for the printer to connect - a confirmation message or light should appear",
    "On your computer, add the printer through Settings > Devices > Printers & Scanners",
    "Print a test page to confirm the wireless connection is working",
  ],
  "Offline or Can't connect": [
    "Check that the printer is powered on and the display shows it's ready",
    "Restart both your printer and computer/device",
    "Check all cable connections if using a USB connection",
    "For wireless printers, ensure the printer is connected to the same Wi-Fi network as your device",
    "On Windows: Go to Settings > Devices > Printers & Scanners, remove the printer and add it again",
    "On Mac: Go to System Preferences > Printers & Scanners, remove the printer and add it again",
    "Update or reinstall the printer drivers from the manufacturer's website",
  ],
  "Won't print": [
    "Check if the printer is powered on and displays 'Ready' status",
    "Verify that the printer is set as the default printer on your device",
    "Open the print queue and cancel all pending print jobs",
    "Check ink/toner levels and replace if low or empty",
    "Ensure there is paper loaded in the tray and it's not jammed",
    "Try printing a test page directly from the printer",
    "Restart the print spooler service (Windows) or reset the printing system (Mac)",
    "Update or reinstall the printer drivers",
  ],
  "Printing blank papers": [
    "Check the ink or toner cartridges - they may be empty or dried out",
    "Remove the cartridges and gently shake them to redistribute the ink/toner",
    "Run the printer's built-in print head cleaning utility (usually in maintenance settings)",
    "Verify that protective tapes or seals have been removed from new cartridges",
    "Check print settings - ensure you're not printing in 'draft' mode with very light settings",
    "Try printing a test page or nozzle check pattern from the printer's control panel",
    "If the issue persists, the print head may need professional cleaning or replacement",
  ],
  "Error code or Error message": [
    "Note down the exact error code or message displayed on the printer",
    "Turn off the printer and unplug it for 60 seconds, then restart",
    "Check the printer manual or manufacturer's website for the specific error code meaning",
    "Clear any paper jams or obstructions inside the printer",
    "Check ink/toner levels and replace if necessary",
    "Ensure all cartridges and covers are properly installed and closed",
    "Update the printer firmware from the manufacturer's website",
    "If the error persists, contact support with the specific error code for assistance",
  ],
  "Scanner issue": [
    "Ensure the scanner lid is fully closed during scanning",
    "Clean the scanner glass with a soft, lint-free cloth and glass cleaner",
    "Place the document face-down on the scanner glass, aligned with the corner guides",
    "Check that the scanning software is installed and up to date",
    "Try scanning from different applications (Windows Fax and Scan, Mac Preview, or manufacturer software)",
    "Restart the printer and computer",
    "Reinstall the scanner drivers from the manufacturer's website",
    "Check the connection cable if using a separate scanner unit",
  ],
};

const TroubleshootPage = () => {
  const router = useRouter();
  const { brand } = router.query;
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // Form data
  const [modelNumber, setModelNumber] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [callOptIn, setCallOptIn] = useState(false);
  const [email, setEmail] = useState("");
  
  // Step 2 form data
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [country, setCountry] = useState("");

  // Show modal only on the last step (step 5)
  useEffect(() => {
    if (step === 5) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 15000); // Show after 15 seconds on the last step

      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleStep1Next = () => {
    if (!modelNumber || !selectedProblem || !selectedDevice) {
      alert("Please fill in all required fields");
      return;
    }
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleStep2Next = async () => {
    if (!userName || !userEmail || !userPhone || !country) {
      alert("Please fill in all required fields");
      return;
    }

    // Save troubleshooting data to Supabase
    try {
      const response = await fetch("/api/save-troubleshooting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brand: brand || "unknown",
          modelNumber,
          selectedProblem,
          selectedDevice,
          emailOptIn,
          email,
          callOptIn,
          userName,
          userEmail,
          userPhone,
          userAddress,
          country,
          sessionId: null,
        }),
      });

      if (!response.ok) {
        console.error("Failed to save troubleshooting data");
      } else {
        console.log("Troubleshooting data saved successfully");
      }
    } catch (error) {
      console.error("Error saving troubleshooting data:", error);
    }

    setStep(3);
    window.scrollTo(0, 0);
  };

  const handleStep3Next = () => {
    setStep(4);
    window.scrollTo(0, 0);
  };

  const handleStep4Next = () => {
    setStep(5);
    window.scrollTo(0, 0);
  };

  const handleFinish = () => {
    router.push("/");
  };

  const currentSteps = troubleshootingSteps[selectedProblem] || troubleshootingSteps["Paper jam"];

  return (
    <>
      <Head>
        <title>Troubleshooting - {brand ? String(brand).toUpperCase() : "Printer"} | PrintAlliance</title>
      </Head>

      <ExpertAssistanceModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-12 px-4">
        <div className="mx-auto max-w-4xl">
          {/* Progress Indicator */}
          <div className="mb-8 flex items-center justify-center gap-2 md:gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-base ${
                    step >= num
                      ? "bg-navy text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {num}
                </div>
                {num < 5 && (
                  <div
                    className={`w-8 md:w-12 h-1 mx-1 md:mx-2 ${
                      step > num ? "bg-navy" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Understanding the Issue */}
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-navy mb-6 text-center">
                UNDERSTANDING THE ISSUE
              </h2>
              <p className="text-gray-700 mb-8 text-center">
                Please answer the following questions to help you in a better way:
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Type the model number of your printer. *
                  </label>
                  <input
                    type="text"
                    value={modelNumber}
                    onChange={(e) => setModelNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
                    placeholder="e.g., HP LaserJet Pro M404n"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-4">
                    Select the problem you're facing with the printer. *
                  </label>
                  <div className="space-y-2">
                    {printerProblems.map((problem) => (
                      <label
                        key={problem}
                        className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedProblem === problem
                            ? "border-navy bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="problem"
                          value={problem}
                          checked={selectedProblem === problem}
                          onChange={(e) => setSelectedProblem(e.target.value)}
                          className="w-5 h-5 text-navy"
                        />
                        <span className="text-gray-700">{problem}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-4">
                    Which device is connected with the printer? *
                  </label>
                  <div className="space-y-2">
                    {deviceTypes.map((device) => (
                      <label
                        key={device}
                        className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedDevice === device
                            ? "border-navy bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="device"
                          value={device}
                          checked={selectedDevice === device}
                          onChange={(e) => setSelectedDevice(e.target.value)}
                          className="w-5 h-5 text-navy"
                        />
                        <span className="text-gray-700">{device}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 bg-blue-50 p-4 rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailOptIn}
                      onChange={(e) => setEmailOptIn(e.target.checked)}
                      className="mt-1 w-5 h-5 text-navy"
                    />
                    <span className="text-gray-700">
                      Check this box to receive troubleshooting instructions on your email.
                    </span>
                  </label>
                  {emailOptIn && (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter your email"
                    />
                  )}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={callOptIn}
                      onChange={(e) => setCallOptIn(e.target.checked)}
                      className="mt-1 w-5 h-5 text-navy"
                    />
                    <span className="text-gray-700">
                      Check this box to receive a call from a certified expert to help you troubleshoot.
                    </span>
                  </label>
                </div>

                <button
                  onClick={handleStep1Next}
                  className="w-full bg-navy hover:bg-blue-800 text-white font-bold text-xl py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  NEXT
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-navy mb-6 text-center">
                DETAILS
              </h2>
              <p className="text-gray-700 mb-8 text-center">
                Please provide the below-mentioned details for us to send you all the necessary troubleshooting step-by-step instructions to help you resolve the issue.
              </p>

              {/* User Details Form */}
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-4">
                    Country *
                  </label>
                  <div className="space-y-2">
                    {["US", "UK"].map((countryOption) => (
                      <label
                        key={countryOption}
                        className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          country === countryOption
                            ? "border-navy bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="country"
                          value={countryOption}
                          checked={country === countryOption}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-5 h-5 text-navy"
                          required
                        />
                        <span className="text-gray-700">{countryOption}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Address (Optional)
                  </label>
                  <textarea
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
                    placeholder="Enter your address"
                    rows={3}
                  />
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-700 mb-4 font-semibold">
                  To proceed with resolution click
                </p>
                <button
                  onClick={handleStep2Next}
                  className="w-full bg-navy hover:bg-blue-800 text-white font-bold text-xl py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  NEXT
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {step === 3 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="bg-gradient-to-br from-blue-600 to-navy text-white rounded-xl p-8 mb-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  To get immediate resolution, contact our certified experts.
                </h3>
                <p className="text-xl mb-6">WE ARE JUST A CALL AWAY!</p>
                <div className="flex flex-col items-center gap-4">
                  <a
                    href="tel:+12105128406"
                    className="hover:text-yellow-300 transition-colors font-bold text-2xl"
                  >
                    📞 +1-210-512-8406
                  </a>
                  <a
                    href="mailto:Support@printalliance.net"
                    className="hover:text-yellow-300 transition-colors font-semibold text-lg"
                  >
                    ✉️ Support@printalliance.net
                  </a>
                </div>
                <p className="mt-6 text-sm">
                  or join the chat on the bottom right of your screen by sending your printer model, and our expert will help you resolve the issue online as mentioned by you in our records.
                </p>
              </div>

              <div className="text-center">
                <p className="text-gray-700 mb-4 font-semibold">
                  To do basic troubleshooting on your own click
                </p>
                <button
                  onClick={handleStep3Next}
                  className="w-full bg-navy hover:bg-blue-800 text-white font-bold text-xl py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  NEXT
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Troubleshooting Steps */}
          {step === 4 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-navy mb-6 text-center">
                {selectedProblem || "Troubleshooting Steps"}
              </h2>

              <div className="space-y-6 mb-8">
                {currentSteps.map((stepText, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{stepText}</p>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mb-8">
                <p className="text-gray-800 font-semibold mb-4">
                  If your issue is still not resolved, then you probably need advance troubleshooting from our certified experts.
                </p>
                <p className="text-xl font-bold text-navy mb-4">
                  CALL AN EXPERT ON PRIORITY FOR ASSISTANCE
                </p>
                <div className="flex justify-center">
                  <a
                    href="tel:+12105128406"
                    className="text-blue-600 hover:text-blue-800 font-bold text-2xl"
                  >
                    📞 +1-210-512-8406
                  </a>
                </div>
              </div>

              <button
                onClick={handleStep4Next}
                className="w-full bg-navy hover:bg-blue-800 text-white font-bold text-xl py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                NEXT
              </button>
            </div>
          )}

          {/* Step 5: Thank You */}
          {step === 5 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-navy mb-4">
                  THANK YOU FOR VISITING!
                </h2>
                <p className="text-2xl text-gray-700">
                  {userName}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-navy mb-6 text-center">
                  What Sets Us Apart
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                      ✓
                    </div>
                    <p className="text-lg text-gray-700 pt-1">
                      Free consultation & troubleshooting
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                      ✓
                    </div>
                    <p className="text-lg text-gray-700 pt-1">
                      Trusted, experienced, and certified experts
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                      ✓
                    </div>
                    <p className="text-lg text-gray-700 pt-1">
                      Security and privacy assurance
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                      ✓
                    </div>
                    <p className="text-lg text-gray-700 pt-1">
                      Quick resolution available 24*7 on chat and phone
                    </p>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <p className="text-gray-700 leading-relaxed text-center">
                  We appreciate your time and interest with us and will get back to you shortly. Your support means the world to us! If you still have any questions or need assistance, please don't hesitate to reach out. Happy printing!
                </p>
              </div>

              <button
                onClick={handleFinish}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xl py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                FINISH
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TroubleshootPage;

