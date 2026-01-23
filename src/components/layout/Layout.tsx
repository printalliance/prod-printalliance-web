import { PropsWithChildren } from "react";
import { useRouter } from "next/router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/CookieConsent";
import PhoneFloatingButton from "@/components/PhoneFloatingButton";
import EngagementPrompt from "@/components/EngagementPrompt";
// import ChatWidget from "@/components/ChatWidget";

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const isAdminPage = router.pathname === "/adminsupport";

  return (
    <>
      <Header />
      <PhoneFloatingButton />
      {/* {!isAdminPage && <ChatWidget />} */}
      <main className="min-h-screen bg-white text-gray-dark">{children}</main>
      <Footer />
      <CookieConsent />
      {/* Timed / interaction-based contact popup (phone + email) */}
      <EngagementPrompt />
    </>
  );
};

export default Layout;

