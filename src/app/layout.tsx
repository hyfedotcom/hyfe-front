import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layouts/Header/Header";
import { Footer } from "@/components/layouts/footer/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildOrganizationJsonLd } from "@/components/seo/jsonLdBuilders";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  preload: true,
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}  antialiased`}>
        <JsonLd data={buildOrganizationJsonLd()} id="organization-jsonld" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
