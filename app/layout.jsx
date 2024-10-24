import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@/components/AuthProvider";
import { MessageStoreProvider } from "@/providers/MessageStoreProvider";

import "@/assets/styles/globals.css";

export const metadata = {
  title: "Meow Meow",
  keywords: "rental, property, real estate",
  description: "Find the perfect rental property",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <MessageStoreProvider>
        <html>
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </MessageStoreProvider>
    </AuthProvider>
  );
};

export default MainLayout;
