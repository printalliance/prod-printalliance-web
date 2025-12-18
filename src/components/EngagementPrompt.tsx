import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ContactModal from "@/components/ContactModal";

const SHOW_AFTER_MS = 30000; // 30 seconds on a page
const CLICKS_BEFORE_SHOW = 4; // or after a few clicks

const EngagementPrompt = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [hasShownForRoute, setHasShownForRoute] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    // Reset state on route change
    setIsOpen(false);
    setHasShownForRoute(false);
    setClickCount(0);

    // Don't show on admin/support-only pages if needed
    if (router.pathname === "/adminsupport") {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);
      setHasShownForRoute(true);
    }, SHOW_AFTER_MS);

    const handleClick = () => {
      setClickCount((prev) => {
        const next = prev + 1;
        if (!hasShownForRoute && next >= CLICKS_BEFORE_SHOW) {
          setIsOpen(true);
          setHasShownForRoute(true);
        }
        return next;
      });
    };

    document.addEventListener("click", handleClick);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <ContactModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  );
};

export default EngagementPrompt;


