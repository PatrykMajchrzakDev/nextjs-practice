import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import "@/components/Navbar";

export const metadata = {
  title: "Promptify",
  description: "Offer an AI prompt for simulating AI-generated text",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <main className="app">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
