import { Outlet } from "react-router";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import CartProvider from "../store/provider/CartProvider";

const MainLayout = () => {
  return (
    <CartProvider>
      <header className="sticky z-50 top-0 backdrop-blur-2xl">
        <Navbar />
      </header>
      <main className="min-h-[calc(100vh-349px)]">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </CartProvider>
  );
};

export default MainLayout;
