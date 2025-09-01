import Contact from "@/components/shared/Contact";
import Footer from "@/components/shared/Footer";
import MobileBottomNav from "@/components/shared/MobileBottomNav";
import Navbar from "@/components/shared/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Contact></Contact>
      <Navbar />
      <MobileBottomNav></MobileBottomNav>
      <main className="min-h-screen">{children}</main>

      <Footer />
    </div>
  );
};

export default CommonLayout;
