import { useState, useEffect } from "react";

export function PushNotification() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [status, setStatus] = useState<"default" | "granted" | "denied">("default");

  useEffect(() => {
    // Check if permission is already granted or denied
    if (typeof window !== "undefined" && "Notification" in window) {
      setStatus(Notification.permission);
      
      const dismissed = localStorage.getItem("mssf_push_dismissed");
      if (Notification.permission === "default" && !dismissed) {
        // Show the prompt after 6 seconds
        const timer = setTimeout(() => {
          setShowPrompt(true);
        }, 6000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleSubscribe = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      alert("Push notifications are not supported in this browser.");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setStatus(permission);
      setShowPrompt(false);

      if (permission === "granted") {
        // Send a test notification
        new Notification("My Shining Star Foundation", {
          body: "Thank you for subscribing! You'll receive real, dated impact logs directly.",
          icon: "/logo.png",
        });
      }
    } catch (err) {
      console.error("Error requesting notification permission", err);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("mssf_push_dismissed", "true");
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] max-w-sm rounded-sm border border-border/80 bg-card p-6 shadow-xl hover:border-gold/60 transition-colors duration-300 animate-fade-scale-in">
      <div className="flex gap-4">
        {/* Bell Icon */}
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
        </div>
        <div className="space-y-3">
          <h4 className="font-display text-sm font-semibold text-charcoal">Enable Impact Alerts</h4>
          <p className="text-xs text-charcoal/70 leading-relaxed">
            Get instant push notifications whenever we post new classroom renovations, receipts, or pupil stories.
          </p>
          <div className="flex gap-3 pt-1">
            <button
              onClick={handleSubscribe}
              className="rounded-sm bg-gold px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-charcoal hover:bg-gold-dark cursor-pointer"
            >
              Subscribe
            </button>
            <button
              onClick={handleDismiss}
              className="rounded-sm border border-border px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-charcoal/60 hover:bg-black/5 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
