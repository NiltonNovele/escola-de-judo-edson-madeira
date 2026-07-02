"use client";

/* eslint-disable @next/next/no-img-element */

import { ExternalLink, GraduationCap, MapPin, Trophy } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GRADUATION_EXAM_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfXUUtD46IVRDT0YKStmNxlOCL8sCeJHjHP5d-fKN_0iBiknA/viewform?usp=publish-editor";

const JOHANNESBURG_OPEN_IMAGES = [
  "/galeria/open-de-johannesburg-2026/WhatsApp Image 2026-06-30 at 09.24.46.jpeg",
  "/galeria/open-de-johannesburg-2026/WhatsApp Image 2026-06-30 at 09.24.47.jpeg",
  "/galeria/open-de-johannesburg-2026/WhatsApp Image 2026-06-30 at 09.24.47 (1).jpeg",
  "/galeria/open-de-johannesburg-2026/WhatsApp Image 2026-06-30 at 09.24.48.jpeg",
];

const JOHANNESBURG_OPEN_VIDEOS = [
  "/galeria/open-de-johannesburg-2026/WhatsApp Video 2026-06-30 at 09.25.26.mp4",
  "/galeria/open-de-johannesburg-2026/WhatsApp Video 2026-06-30 at 09.25.46.mp4",
];

export default function NovidadesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="mt-8 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-900 tracking-tight mb-4">
            Informações Importantes e Novidades
          </h1>

          <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Fique a par dos avisos, prazos e conquistas mais recentes da
            Escola de Judo Edson Madeira.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 space-y-12">
        {/* EXAME DE GRADUAÇÃO */}
        <div className="group rounded-2xl border border-neutral-200 bg-neutral-50 p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-900 text-white transition duration-300 group-hover:scale-110 group-hover:bg-blue-800">
              <GraduationCap size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-900">
                Exame de Graduação
              </h2>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Está a decorrer o exame de graduação. Inscreva-se através do
                formulário abaixo.
              </p>

              <a
                href={GRADUATION_EXAM_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-blue-950 hover:shadow-xl active:translate-y-0 active:scale-95"
              >
                Aceder ao Formulário de Inscrição
                <ExternalLink
                  size={16}
                  className="transition duration-300 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>

        {/* DESTAQUE - JOHANNESBURG OPEN */}
        <div className="group/card rounded-2xl border border-blue-100 bg-white p-8 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

          <h2 className="text-3xl font-extrabold text-blue-900 transition duration-300 group-hover/card:text-blue-700">
            Johannesburg Open 2026
          </h2>
          <p className="text-gray-600 font-medium">26 a 28 de Junho</p>

          <p className="mt-4 text-lg text-gray-800 leading-relaxed">
            <span className="font-bold text-blue-900">
              Shenidy Tsemane (-57kg)
            </span>{" "}
            conquistou o <span className="font-bold">1º lugar</span> no
            Johannesburg Open 2026, uma prova válida para o ranking Mundial e
            Olímpico de Judo.
          </p>

          {JOHANNESBURG_OPEN_VIDEOS.length > 0 && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {JOHANNESBURG_OPEN_VIDEOS.map((video) => (
                <video
                  key={video}
                  src={video}
                  controls
                  playsInline
                  className="w-full rounded-xl bg-slate-900 shadow-md aspect-video object-cover transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                />
              ))}
            </div>
          )}

          {JOHANNESBURG_OPEN_IMAGES.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {JOHANNESBURG_OPEN_IMAGES.map((image) => (
                <div
                  key={image}
                  className="h-32 overflow-hidden rounded-lg shadow-sm transition duration-300 hover:shadow-lg sm:h-28"
                >
                  <img
                    src={image}
                    alt="Johannesburg Open 2026"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          )}

          <a
            href="/galeria"
            className="group/link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-900 transition hover:text-blue-700"
          >
            Ver mais na Galeria
            <span className="transition-transform duration-300 group-hover/link:translate-x-1">
              →
            </span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
