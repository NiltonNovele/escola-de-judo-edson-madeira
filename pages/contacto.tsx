"use client";

import Navbar from "../components/Navbar";
import Image from "next/image";
import { useState } from "react";
import { Heart, Mail, Phone, SendHorizonal, HelpCircle } from "lucide-react";
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

      {/* --- FLOATING DONATE BUTTON (Lucide Icon) --- */}
      <a
        href="/donate"
        className="fixed right-6 bottom-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-xl transition transform hover:scale-105 flex items-center gap-2 z-50"
      >
        <Heart size={20} className="text-white" />
        Doar
      </a>

      {/* HEADER */}
      <div className="text-center pt-32 px-4">
        <div className="relative inline-block">
          <h1 className="text-5xl font-extrabold text-blue-900 relative z-10">
            Fale Conosco
          </h1>

          {/* Brush Stroke Background */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage: "url('/brush.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "120px",
              top: "-40px",
            }}
          ></div>
        </div>

        {/* SHORT DESCRIPTION */}
        <p className="max-w-2xl mx-auto mt-4 text-neutral-700 text-lg leading-relaxed">
          Estamos aqui para ajudar. Envie sua mensagem, tire dúvidas ou fale
          diretamente com nossa equipe.
        </p>

        {/* EXTRA CONTACT INFO */}
        <div className="max-w-2xl mx-auto mt-8 bg-blue-50 rounded-xl p-6 shadow-sm border border-blue-100">
          <p className="text-neutral-800 leading-relaxed flex items-center gap-2">
            <Mail size={20} className="text-blue-700" />
            Entre em contato através do e-mail:{" "}
            <a
              href="mailto:institutoreacao@institutoreacao.org.br"
              className="text-blue-800 font-semibold underline"
            >
              ajuda@ejem.org.mz
            </a>
          </p>

          <p className="mt-2 text-neutral-800 flex items-center gap-2">
            <HelpCircle size={20} className="text-blue-700" />
            Consulte também nosso FAQ abaixo.
          </p>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="max-w-6xl mx-auto px-6 mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LEFT IMAGE */}
        <div className="rounded-2xl overflow-hidden shadow-xl border border-neutral-200">
          <Image
            src="/contact-photo.jpg"
            width={900}
            height={600}
            alt="Crianças do Instituto"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* RIGHT FORM */}
        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Envie uma mensagem
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              name="name"
              placeholder="Seu Nome"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none placeholder-black"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Seu Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none placeholder-black"
              required
            />

            <input
              name="phone"
              type="tel"
              placeholder="Telefone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none placeholder-black"
            />

            <input
              name="subject"
              placeholder="Assunto"
              value={form.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none placeholder-black"
            />

            <textarea
              name="message"
              placeholder="Sua mensagem aqui..."
              rows={7}
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none resize-none placeholder-black"
              required
            />

            <button
              type="submit"
              className="w-full py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-950 transition shadow-md font-medium flex items-center justify-center gap-2"
            >
              <SendHorizonal size={20} />
              Enviar Mensagem
            </button>

          </form>
        </div>
      </div>

      {/* --- FAQ SECTION --- */}
      <div className="max-w-4xl mx-auto mt-24 bg-white rounded-2xl shadow-lg border border-neutral-200 p-10">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-8 text-center">
          FAQ – Perguntas Frequentes
        </h2>

        <div className="space-y-6">

          <details className="border-b pb-4">
            <summary className="cursor-pointer font-semibold text-lg text-neutral-900 flex items-center gap-2">
              <HelpCircle size={20} className="text-blue-700" />
              Como posso fazer uma doação?
            </summary>
            <p className="text-neutral-700 mt-2 ml-8">
              Você pode acessar nossa página de doação e escolher a forma que preferir.
            </p>
          </details>

          <details className="border-b pb-4">
            <summary className="cursor-pointer font-semibold text-lg text-neutral-900 flex items-center gap-2">
              <HelpCircle size={20} className="text-blue-700" />
              Onde vocês estão localizados?
            </summary>
            <p className="text-neutral-700 mt-2 ml-8">
              Possuímos núcleos em diversas regiões. Consulte nossa página “Onde Estamos”.
            </p>
          </details>

          <details className="border-b pb-4">
            <summary className="cursor-pointer font-semibold text-lg text-neutral-900 flex items-center gap-2">
              <HelpCircle size={20} className="text-blue-700" />
              Como funcionam os programas do Instituto?
            </summary>
            <p className="text-neutral-700 mt-2 ml-8">
              Cada programa possui objetivos específicos. Você pode ver todos na página “Programas”.
            </p>
          </details>

          <details className="border-b pb-4">
            <summary className="cursor-pointer font-semibold text-lg text-neutral-900 flex items-center gap-2">
              <HelpCircle size={20} className="text-blue-700" />
              Posso ser voluntário?
            </summary>
            <p className="text-neutral-700 mt-2 ml-8">
              Sim! Entre em contato conosco para mais informações sobre voluntariado.
            </p>
          </details>

        </div>
      </div>

      <Footer />
    </div>
  );
}
