import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer, Bounce } from "react-toastify";

export const metadata: Metadata = {
  title: "Todos",
  description: "Create Todos",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <main>
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
            toastClassName={"border text-sm font-extrabold "}
          />
        </main>
      </body>
    </html>
  );
}
