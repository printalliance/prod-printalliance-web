import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import SEO from "@/components/SEO";
import ExpertAssistanceModal from "@/components/ExpertAssistanceModal";
import { defaultMeta } from "@/utils/seo";

// Data Sets
const printerProblems = [
  { id: "setup", label: "Set-up a new printer", icon: "⚙️" },
  { id: "wifi", label: "Wi-Fi or Wireless setup", icon: "📶" },
  { id: "connect", label: "Can't connect", icon: "🔌" },
  { id: "print", label: "Won't print", icon: "🖨️" },
  { id: "blank", label: "Printing blank papers", icon: "📄" },
  { id: "jam", label: "Paper jam", icon: "⚠️" },
  { id: "error", label: "Error code or message", icon: "❌" },
  { id: "scanner", label: "Scanner issue", icon: "🔍" },
];

const deviceTypes = [
  { id: "windows", label: "Windows computer", icon: "🪟" },
  { id: "mac", label: "Mac computer", icon: "🍎" },
  { id: "chromebook", label: "Chromebook", icon: "💻" },
  { id: "android", label: "Android Phone / Tablet", icon: "🤖" },
  { id: "ios", label: "iPhone / iPad", icon: "📱" },
];

const troubleshootingSteps: Record<string, string[]> = {
  "Paper jam": [
    "Turn off and unplug the printer safely before inspecting internal components.",
    "Remove all printer paper from the input tray and reset the alignment.",
    "Open the rear access panel and gently pull jammed paper outward to avoid tearing.",
    "Check carefully inside the feeder mechanism for micro-debris or residual scraps.",
    "Securely snap all access doors shut before connecting the power framework.",
    "Reboot the hardware cycle and run an empty cycle check.",
  ],
  "Set-up a new printer": [
    "Unbox hardware completely, clearing manufacturing tape anchors.",
    "Initialize energy connection and turn on the main display console.",
    "Seating allocation: set cartridges or toner array cleanly into position.",
    "Align crisp stock paper cleanly within the core cassette.",
    "Acquire system interface tools directly from the vendor's source portal.",
    "Link systems seamlessly over standard physical arrays or localized networks.",
    "Verify system initialization status by sending a structural test page.",
  ],
  "Wi-Fi or Wireless setup": [
    "Confirm hardware wireless nodes are structurally operational.",
    "Navigate interface layout to local connection matrices.",
    "Isolate primary structural localized identity tags from listings.",
    "Input connection clearance passphrases securely.",
    "Allow network sync pipelines to lock and handshake.",
    "Register physical address within local operating platform environments.",
    "Validate remote terminal access pathways via quick test prints.",
  ],
  "Can't connect": [
    "Confirm the target system state indicates operational availability.",
    "Enforce clear power reboots across both primary and endpoint systems.",
    "Audit connection lines physically for reliable interface linkup.",
    "Confirm local nodes sit consistently inside synchronized network matrices.",
    "Clear outdated configuration environments via settings consoles.",
    "Reinitialize structural interface drivers via direct web delivery packages.",
  ],
  "Won't print": [
    "Audit physical hardware status for operational readiness blocks.",
    "Assign system identity pathing explicitly as your target option.",
    "Flush existing processing pipelines to drop deadlocks.",
    "Ensure source material volume charts do not show depleted zones.",
    "Review media loading parameters to head off paper pathing halts.",
    "Trigger diagnostic sheets straight from physical control matrices.",
    "Reboot system scheduling queues to clear persistent interface hanging.",
  ],
  "Printing blank papers": [
    "Review media transfer tools for fluid or core matrix dryouts.",
    "Agitate transfer lines gently to re-level interior print compounds.",
    "Trigger systematic clean cycles via maintenance routines.",
    "Confirm safety layers on new materials have been fully removed.",
    "Check system settings arrays to avoid low-density output filters.",
    "Run nozzle matrix validation print sheets directly from front layout tables.",
    "Target physical transfer line hardware elements if degradation errors repeat.",
  ],
  "Error code or Error message": [
    "Capture error trace codes exactly as output on systems tracking units.",
    "Isolate system power for a full minute to dump short-term logic caches.",
    "Cross-reference issue identities against engineering logs.",
    "Clear media alignment paths or external sensor obstructions.",
    "Ensure supply systems meet required operational capacities.",
    "Apply recent firmware modifications from direct manufacturer repositories.",
    "Engage engineering service lines with captured trace logs if blocks stand.",
  ],
  "Scanner issue": [
    "Verify capture shield lids sit flat and locked before starting capture runs.",
    "Clear visual shields with microfiber layers and safe treatment compounds.",
    "Align source media directly against structural corner position points.",
    "Verify digital ingestion tools run contemporary software builds.",
    "Evaluate standard platform utility functions across isolation zones.",
    "Trigger localized reboots on source processing platforms.",
    "Reinstall driver environments directly via production updates.",
    "Inspect physical data routing channels for structural connection issues.",
  ],
};

const TroubleshootPage = () => {
  const router = useRouter();
  const { brand } = router.query;
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Form State
  const [modelNumber, setModelNumber] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [callOptIn, setCallOptIn] = useState(false);
  const [email, setEmail] = useState("");

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (step === 5) {
      const timer = setTimeout(() => setShowModal(true), 15000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const transitionToStep = (nextStep: number) => {
    setValidationError("");
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep1Next = () => {
    if (!modelNumber.trim() || !selectedProblem || !selectedDevice) {
      setValidationError(
        "Please select your device, problem, and input a model number to proceed.",
      );
      return;
    }
    transitionToStep(2);
  };

  const handleStep2Next = async () => {
    if (
      !userName.trim() ||
      !userEmail.trim() ||
      !userPhone.trim() ||
      !country
    ) {
      setValidationError(
        "All asterisk marked areas are strictly required for file compilation.",
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      setValidationError(
        "The provided email syntax structure appears structurally incorrect.",
      );
      return;
    }

    try {
      const response = await fetch("/api/save-troubleshooting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      if (!response.ok) throw new Error("Server rejected compilation payload.");

      window.dispatchEvent(new CustomEvent("formSubmitted"));
      transitionToStep(3);
    } catch (error) {
      setValidationError(
        "Data dispatch pipeline failure. Verify connectivity options or contact engineering support lines.",
      );
    }
  };

  const currentSteps =
    troubleshootingSteps[selectedProblem] || troubleshootingSteps["Paper jam"];

  return (
    <>
      <SEO
        title={`Diagnostic Engine - ${brand ? String(brand).toUpperCase() : "Printer"} | PrintAlliance`}
        description={`Interactive expert troubleshooting system matrix for ${brand || "printer"} platforms.`}
        canonical={`/troubleshoot/${brand || ""}`}
        ogType="website"
        twitterCard="summary_large_image"
      />

      <ExpertAssistanceModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      <div className="min-h-screen bg-slate-50/50 text-slate-900 antialiased py-16 px-4 sm:px-6">
        <div className="mx-auto">
          {/* Diagnostic Identity Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200/60 px-3 py-1 text-xs font-semibold tracking-wider text-slate-600 uppercase mb-4">
              🛡️ Operational Diagnostic Interface
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
              Automated Support Wizard
            </h1>
            <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto">
              Isolate issues and configure terminal settings for your{" "}
              <span className="font-semibold text-slate-800 uppercase">
                {brand || "Standard"}
              </span>{" "}
              platform.
            </p>
          </div>

          {/* Stepper Node Progress System */}
          <div className="mb-12 relative px-4">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0 max-w-xl mx-auto" />
            <div className="relative z-10 flex justify-between items-center max-w-xl mx-auto">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex flex-col items-center">
                  <button
                    disabled={num > step}
                    onClick={() => num < step && transitionToStep(num)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 border-2 ${
                      step >= num
                        ? "bg-slate-900 border-slate-900 text-white shadow-md scale-105"
                        : "bg-white border-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {num}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Master Validation Alert Notification Frame */}
          {validationError && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
              ⚠️ {validationError}
            </div>
          )}

          {/* Main Workspace Terminal Layer */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 transition-all duration-300">
            {/* Step 1: Diagnostics Configuration */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-1">
                    Hardware Blueprint
                  </h2>
                  <p className="text-xs text-slate-400 mb-3">
                    Provide machine serial markers or product model
                    configuration paths.
                  </p>
                  <input
                    type="text"
                    value={modelNumber}
                    onChange={(e) => setModelNumber(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:outline-none transition-all text-sm"
                    placeholder="e.g., OfficeJet Pro 9015e"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-1">
                    Symptom Isolation Selection
                  </h2>
                  <p className="text-xs text-slate-400 mb-4">
                    Isolate the primary functional blockage layer impacting
                    system execution routines.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {printerProblems.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedProblem(p.label)}
                        className={`flex items-center gap-3 p-4 border text-left rounded-xl transition-all ${
                          selectedProblem === p.label
                            ? "border-slate-900 bg-slate-900/[0.02] ring-2 ring-slate-900/5 font-semibold text-slate-900"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        <span className="text-lg shrink-0">{p.icon}</span>
                        <span className="text-sm">{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-1">
                    Host Environment Terminal
                  </h2>
                  <p className="text-xs text-slate-400 mb-4">
                    Identify the host ecosystem platform linked up directly
                    against the target utility.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {deviceTypes.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDevice(d.label)}
                        className={`flex items-center gap-3 p-4 border text-left rounded-xl transition-all ${
                          selectedDevice === d.label
                            ? "border-slate-900 bg-slate-900/[0.02] ring-2 ring-slate-900/5 font-semibold text-slate-900"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        <span className="text-lg shrink-0">{d.icon}</span>
                        <span className="text-sm">{d.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-150 bg-slate-50/50 p-5 space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group select-none">
                    <input
                      type="checkbox"
                      checked={emailOptIn}
                      onChange={(e) => setEmailOptIn(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900 accent-slate-900"
                    />
                    <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                      Mirror localized tracking guidelines out straight to my
                      email interface folder.
                    </span>
                  </label>

                  {emailOptIn && (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-slate-900 focus:outline-none text-xs"
                      placeholder="Enter ingestion email account"
                    />
                  )}

                  <label className="flex items-start gap-3 cursor-pointer group select-none">
                    <input
                      type="checkbox"
                      checked={callOptIn}
                      onChange={(e) => setCallOptIn(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900 accent-slate-900"
                    />
                    <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                      Authorize system desk operators to initiate voice
                      diagnostics if issues compound.
                    </span>
                  </label>
                </div>

                <button
                  onClick={handleStep1Next}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-4 rounded-xl transition-all shadow-sm active:scale-[0.99]"
                >
                  Continue to Identity Verification →
                </button>
              </div>
            )}

            {/* Step 2: System Credential Dossier */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    Contact Dossier Setup
                  </h2>
                  <p className="text-xs text-slate-400">
                    Route resolution files using verified operator parameters.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-slate-900 focus:outline-none text-sm"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-slate-900 focus:outline-none text-sm"
                      placeholder="jane@domain.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-slate-900 focus:outline-none text-sm"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Region Matrix Location *
                    </label>
                    <div className="flex gap-2">
                      {["US", "UK"].map((c) => (
                        <button
                          key={c}
                          onClick={() => setCountry(c)}
                          className={`flex-1 py-2.5 border rounded-lg text-xs font-semibold transition-all ${
                            country === c
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-200 hover:bg-slate-50 text-slate-600"
                          }`}
                        >
                          {c === "US"
                            ? "🇺🇸 United States"
                            : "🇬🇧 United Kingdom"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Mailing Base Location (Optional)
                  </label>
                  <textarea
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-slate-900 focus:outline-none text-sm"
                    placeholder="Enter architectural office location parameters"
                    rows={2}
                  />
                </div>

                <button
                  onClick={handleStep2Next}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-4 rounded-xl transition-all shadow-sm mt-4"
                >
                  Compile Parameters & Submit File →
                </button>
              </div>
            )}

            {/* Step 3: Priority Communications Router */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in duration-300 text-center">
                <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 space-y-6 shadow-xl">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-xl">
                    ⚡
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                      On-Demand Infrastructure Pipeline Open
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Skip programmatic sorting loops entirely by dialing
                      operational network desk engineers directly.
                    </p>
                  </div>

                  <div className="py-2 space-y-3">
                    <a
                      href="tel:+13252195205"
                      className="block text-2xl sm:text-3xl font-black tracking-tight text-white hover:text-slate-200 transition-colors"
                    >
                      +1 (325) 219-5205
                    </a>
                    <a
                      href="mailto:support@printalliance.net"
                      className="block text-sm text-slate-300 hover:text-white transition-colors underline underline-offset-4"
                    >
                      support@printalliance.net
                    </a>
                  </div>

                  <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                    Alternatively, leverage our web matrix console overlay
                    anchor resting on your lower layout screen boundary to sync
                    data sets instantly.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-medium text-slate-400">
                    Prefer local diagnostic step sequences?
                  </p>
                  <button
                    onClick={() => transitionToStep(4)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm py-3.5 rounded-xl transition-all"
                  >
                    Initialize Local Diagnostics Tree ↓
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Localized Execution Playbook */}
            {step === 4 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Target Playbook Routine
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
                    {selectedProblem || "General Recovery Matrix"}
                  </h2>
                </div>

                <div className="space-y-4">
                  {currentSteps.map((stepText, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-4 rounded-xl hover:bg-slate-50/80 transition-colors border border-transparent hover:border-slate-100 group"
                    >
                      <div className="shrink-0 w-6 h-6 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs group-hover:bg-slate-900 group-hover:text-white transition-all">
                        {idx + 1}
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600 group-hover:text-slate-900 transition-colors pt-0.5">
                        {stepText}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50/50 border border-amber-200/70 p-5 rounded-xl text-center space-y-4">
                  <p className="text-xs font-medium text-amber-900 max-w-md mx-auto">
                    If metrics fail to self-correct after baseline checklist
                    adjustments, secondary framework failures might require
                    complex environment diagnostics.
                  </p>
                  <a
                    href="tel:+13252195205"
                    className="inline-flex items-center gap-2 bg-amber-900 text-white font-semibold text-xs px-4 py-2 rounded-lg hover:bg-amber-950 transition-colors shadow-sm"
                  >
                    📞 Connect Direct Operations Line
                  </a>
                </div>

                <button
                  onClick={() => transitionToStep(5)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-4 rounded-xl transition-all shadow-sm"
                >
                  Verify Diagnostics Completion State →
                </button>
              </div>
            )}

            {/* Step 5: Process Completion Ledger */}
            {step === 5 && (
              <div className="space-y-8 animate-in fade-in duration-300 text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 text-xl">
                    ✓
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    Sequence Completed Successfully
                  </h2>
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                    Operator Reference Profile: {userName || "Verified User"}
                  </p>
                </div>

                <div className="text-left max-w-md mx-auto border border-slate-150 rounded-xl bg-slate-50/50 p-6 space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                    PrintAlliance Protocol Framework
                  </h4>
                  {[
                    "Zero-cost baseline infrastructure structural reviews.",
                    "Federated operations processing with systems engineers.",
                    "Advanced isolation layers maintaining personal credential storage security.",
                    "Live network triage platforms operating uninterrupted across global operational matrices.",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3 text-xs text-slate-600 font-medium"
                    >
                      <span className="text-emerald-600 shrink-0">✦</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Your local tracking parameters stand saved. Diagnostic logs
                  have been mirrored directly out to processing queues.
                </p>

                <button
                  onClick={() => router.push("/")}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-4 rounded-xl transition-all shadow-sm"
                >
                  Dismount Terminal Workspace
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TroubleshootPage;
