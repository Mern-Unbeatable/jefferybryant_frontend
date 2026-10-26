import { useRef } from "react";
import { Outlet, ScrollRestoration, useLocation, useMatches } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import CtaSection from "@/components/common/CtaSection";
import { usePageAnimations } from "@/hooks/usePageAnimations";

const MainLayout = () => {
  const mainRef = useRef(null);
  const { pathname } = useLocation();
  const hideCta = useMatches().some((match) => match.handle?.hideCta);

  usePageAnimations(mainRef, pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollRestoration />
      <Navbar />
      <main ref={mainRef} className="flex-1">
        <Outlet />
        {!hideCta && <CtaSection />}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
