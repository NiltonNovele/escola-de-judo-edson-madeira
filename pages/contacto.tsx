"use client";

import Navbar from "../components/Navbar";
import Image from "next/image";
import { useState } from "react";
import {
  Heart,
  Mail,
  Phone,
  SendHorizonal,
  HelpCircle,
  MapPin,
  Clock,
  Users,
} from "lucide-react";
import Footer from "../components/footer";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    alert("Form submitted (placeholder).");
  }

  return (
    <div className="w-full min-h-screen bg-white relative pb-10">
      <Navbar />

      {/* --- FLOATING DONATE BUTTON --- */}
      <a
        href="/donate"
        className="fixed right-6 bottom-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-xl transition transform hover:scale-110 flex items-center gap-2 z-50"
      >
        <Heart size={20} />
        Doar
      </a>

      {/* HEADER */}
      <div className="text-center pt-32 px-4">
        <div className="relative inline-block">
          <h1 className="text-5xl font-extrabold text-blue-900 relative z-10 drop-shadow-sm">
            Fale Conosco
          </h1>

          {/* Brush Stroke Background */}
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
          Estamos aqui para ajudar! Envie sua mensagem, tire dúvidas ou fale
          diretamente com nossa equipe.
        </p>

        {/* CONTACT INFO BADGE */}
        <div className="max-w-2xl mx-auto mt-8 bg-blue-50 rounded-xl p-6 shadow-md border border-blue-100">
          <p className="text-neutral-800 leading-relaxed flex items-center gap-2">
            <Mail size={20} className="text-blue-700" />
            Email:
            <a
              href="mailto:ajuda@ejem.org.mz"
              className="text-blue-800 font-semibold underline ml-1"
            >
              ajuda@ejem.org.mz
            </a>
          </p>

          <p className="mt-2 text-neutral-800 flex items-center gap-2">
            <Phone size={20} className="text-blue-700" />
            Telefone: +258 84 XXX XXX
          </p>

          <p className="mt-2 text-neutral-800 flex items-center gap-2">
            <HelpCircle size={20} className="text-blue-700" />
            Veja também nosso FAQ abaixo.
          </p>
        </div>
      </div>

      {/* GRID CONTENT */}
      <div className="max-w-6xl mx-auto px-6 mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT IMAGE */}
        <div className="rounded-2xl overflow-hidden shadow-xl border border-neutral-200">
          <Image
            src="/contact.jpg"
            width={900}
            height={600}
            alt="Contato"
            className="object-cover"
          />
        </div>

        {/* RIGHT FORM */}
        <div>
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            Envie uma Mensagem
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              name="name"
              placeholder="Seu Nome"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none placeholder-neutral-600"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Seu Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none placeholder-neutral-600"
              required
            />

            <input
              name="phone"
              type="tel"
              placeholder="Telefone (opcional)"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none placeholder-neutral-600"
            />

            <input
              name="subject"
              placeholder="Assunto"
              value={form.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none placeholder-neutral-600"
            />

            <textarea
              name="message"
              placeholder="Sua mensagem..."
              rows={7}
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none resize-none placeholder-neutral-600"
              required
            />

            <button
              type="submit"
              className="w-full py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-950 transition shadow-lg font-semibold flex items-center justify-center gap-2 transform hover:scale-[1.02]"
            >
              <SendHorizonal size={20} />
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="max-w-4xl mx-auto mt-24 bg-white rounded-2xl shadow-lg border border-neutral-200 p-10">
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
              a: "Sim! Envie uma mensagem através do formulário para receber mais informações.",
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
              a: "Sim, basta marcar uma visita através do formulário.",
            },
            {
              q: "Empresas podem se tornar parceiras?",
              a: "Podem sim! Temos vários modelos de parceria e responsabilidade social.",
            },
          ].map((faq, i) => (
            <details key={i} className="border-b pb-4 group">
              <summary className="cursor-pointer font-semibold text-lg text-neutral-900 flex items-center gap-2 group-open:text-blue-700">
                <HelpCircle size={20} className="text-blue-700" />
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
