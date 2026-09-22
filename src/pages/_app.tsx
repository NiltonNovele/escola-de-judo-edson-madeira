
// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MessageCircle } from "lucide-react";

export default function App({ Component, pageProps }: AppProps) {
  const whatsappNumber = "258844002050";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <>
      <Component {...pageProps} />

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar pelo WhatsApp"
        className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600 hover:shadow-2xl"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </>
  );
}
