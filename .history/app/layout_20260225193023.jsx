
import "../styles/globals.css";
import Navbar from "@app/components/Navbar";
import Footer from "@app/components/Footer";
import Provider from "@app/components/Provider";
import { SpeedInsights } from "@vercel/speed-insights/next";



export const metadata = {
  title: "Tally",
  description: "A simple expense tracker",
  icons: { icon: "/assets/icons/tallyappIcon.svg"}
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
        
      </body>
    </html>
  );
}
