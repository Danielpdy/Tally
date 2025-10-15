
import "../styles/globals.css";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Provider from "@components/Provider";


export const metadata = {
  title: "Tally",
  description: "A simple expense tracker",
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
