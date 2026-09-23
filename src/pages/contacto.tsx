"use client";

import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Heart,
  Mail,
  Phone,
  Send,
  HelpCircle,
  MapPin,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [message, setMessage] = useState("");

  const whatsappNumber = "258844002050";

  function handleWhatsApp() {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const whatsappMessage = `Olá! Entrei em contacto através do site da Escola de Judo Edson Madeira.\n\n${trimmedMessage}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mt-8 w-full min-h-screen bg-white relative pb-10">
      <Navbar />

      {/* FLOATING DONATE BUTTON */}
      <Link
        href="/donate"
        className="fixed right-6 bottom-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-xl transition-all duration-300 hover:scale-110 flex items-center gap-2 z-50"
      >
        <Heart size={20} />
        Doar
      </Link>

      {/* HEADER */}
      <div className="text-center pt-32 px-4">
        <div className="relative inline-block">
          <h1 className="text-5xl font-extrabold text-blue-900 relative z-10 drop-shadow-sm">
            Fale Conosco
          </h1>

          <div
            className="absolute inset-0 -z-10 opacity-90"
            style={{
              backgroundImage: "url('/brush.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "130px",
              top: "-45px",
            }}
          ></div>
        </div>

        <p className="max-w-2xl mx-auto mt-4 text-neutral-700 text-lg leading-relaxed">
          Estamos aqui para ajudar. Envie-nos uma mensagem directamente pelo
          WhatsApp e fale com a nossa equipa.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-neutral-200">
            <Image
              src="/images/contact.jpg"
              width={900}
              height={600}
              alt="Contacto - Escola de Judo Edson Madeira"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* CONTACT INFORMATION */}
          <div className="bg-neutral-50 rounded-3xl p-7 shadow-md border border-neutral-200">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">
              Informações de Contacto
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-blue-700" size={21} />
                </div>

                <div>
                  <p className="font-semibold text-neutral-900">Morada</p>
                  <p className="text-neutral-600 mt-1">
                    Av. Patrice Lumumba, Prédio Vila Nova, nº 1177, rés do chão, porta à direita.
                    <br />
                    Maputo, Moçambique
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-blue-700" size={21} />
                </div>

                <div>
                  <p className="font-semibold text-neutral-900">Telefone</p>
                  <a
                    href="tel:+258871538427"
                    className="text-neutral-600 hover:text-blue-700 transition"
                  >
                    +258 84 400 2050 | +258 87 153 8427
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-blue-700" size={21} />
                </div>

                <div>
                  <p className="font-semibold text-neutral-900">Email</p>
                  <a
                    href="mailto:parceria@ejem.org.mz"
                    className="text-neutral-600 hover:text-blue-700 transition"
                  >
                    parceria@ejem.org.mz
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - WHATSAPP MESSAGE */}
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-xl overflow-hidden">
          {/* WhatsApp Header */}
          <div className="bg-blue-900 px-7 py-7 text-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <MessageCircle size={30} />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  Fale connosco pelo WhatsApp
                </h2>
                <p className="text-blue-100 mt-1">
                  Estamos prontos para responder às suas dúvidas.
                </p>
              </div>
            </div>
          </div>

          {/* Message Area */}
          <div className="p-7">
            <div className="mb-6">
              <label
                htmlFor="whatsapp-message"
                className="block text-lg font-bold text-neutral-900 mb-2"
              >
                A sua mensagem
              </label>

              <p className="text-sm text-neutral-500 mb-4">
                Escreva a sua mensagem abaixo. Ao clicar em enviar, será
                redireccionado para o WhatsApp com a mensagem pronta.
              </p>

              <textarea
                id="whatsapp-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Olá! Gostaria de saber mais sobre..."
                rows={9}
                className="w-full px-5 py-4 border border-neutral-300 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none resize-none text-neutral-900 placeholder-neutral-400 transition-all"
              />
            </div>

            <button
              type="button"
              onClick={handleWhatsApp}
              disabled={!message.trim()}
              className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl font-bold flex items-center justify-center gap-3 hover:scale-[1.01] disabled:hover:scale-100"
            >
              <MessageCircle size={22} />
              Enviar pelo WhatsApp
              <ArrowUpRight size={19} />
            </button>
          </div>
        </div>
      </div>

      {/* QUICK CONTACT CTA */}
      <div className="max-w-6xl mx-auto px-6 mt-16">
        <div className="rounded-3xl bg-blue-900 p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Prefere falar directamente connosco?
            </h2>

            <p className="text-blue-100 mt-2">
              Envie uma mensagem pelo WhatsApp e a nossa equipa irá responder.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "Olá! Gostaria de entrar em contacto com a Escola de Judo Edson Madeira."
              )}`;

              window.open(whatsappUrl, "_blank", "noopener,noreferrer");
            }}
            className="flex-shrink-0 bg-white text-blue-900 hover:bg-blue-50 px-6 py-3.5 rounded-full font-bold transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105"
          >
            <MessageCircle size={21} />
            Abrir WhatsApp
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="max-w-4xl mx-auto mt-24 bg-white rounded-3xl shadow-lg border border-neutral-200 p-8 md:p-10">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-8 text-center">
          FAQ – Perguntas Frequentes
        </h2>

        <div className="space-y-6">
          {[
            {
              q: "Como posso fazer uma doação?",
              a: "Acesse nossa página de doação e escolha a forma que preferir.",
            },
            {
              q: "Onde vocês estão localizados?",
              a: "Temos diversos núcleos ativos. Consulte nossa página “Onde Estamos”.",
            },
            {
              q: "Como funcionam os programas?",
              a: "Cada programa tem objetivos específicos. Veja todos na página “Programas”.",
            },
            {
              q: "Posso ser voluntário?",
              a: "Sim! Envie uma mensagem através do WhatsApp para receber mais informações.",
            },
            {
              q: "Vocês atendem crianças de quais idades?",
              a: "Nossos programas aceitam crianças a partir de 4 anos, dependendo do núcleo.",
            },
            {
              q: "O Judo é gratuito?",
              a: "Sim, para alunos inscritos nos programas sociais parceiros.",
            },
            {
              q: "Posso visitar o projeto?",
              a: "Sim, basta entrar em contacto connosco através do WhatsApp para marcar uma visita.",
            },
            {
              q: "Empresas podem se tornar parceiras?",
              a: "Podem sim! Temos vários modelos de parceria e responsabilidade social.",
            },
          ].map((faq, i) => (
            <details key={i} className="border-b pb-4 group">
              <summary className="cursor-pointer font-semibold text-lg text-neutral-900 flex items-center gap-2 group-open:text-blue-700">
                <HelpCircle size={20} className="text-blue-700 flex-shrink-0" />
                {faq.q}
              </summary>

              <p className="text-neutral-700 mt-2 ml-8">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
