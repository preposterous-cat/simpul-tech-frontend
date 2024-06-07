import { Lato } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const lato = Lato({ subsets: ["latin"], weight: "700" });

export const metadata = {
  title: "Simpul Technology Front End",
  description: "Front End Test from Simpul Technology",
  author: "Arizli Romadhon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen bg-background antialiased", lato.className)}
      >
        {children}
      </body>
    </html>
  );
}
