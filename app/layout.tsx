import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PRUEBA — Joyería urbana",
  description: "Piezas con actitud. Joyería urbana desde México."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
