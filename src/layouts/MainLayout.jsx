import { Outlet } from "react-router";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import CartProvider from "../store/provider/CartProvider";

const MainLayout = () => {
  return (
    <CartProvider>
      <header>
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
