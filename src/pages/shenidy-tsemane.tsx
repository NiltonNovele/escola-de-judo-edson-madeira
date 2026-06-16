"use client";

import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const shenidyImage = "/images/shenidy-tsemane/Shenidy Tsemane Palmares_page-0001.jpg";

const achievements = [
  "2025 - 3.º lugar no Ranking da África do Sul Sénior",
  "2025 - 2.º lugar no Open da África do Sul Júnior",
  "Presença no ranking mundial",
];

export default function ShenidyTsemane() {
  return (
    <div className={`${inter.className} bg-white text-gray-900 antialiased`}>
      <Navbar />

      <main className="pt-24 bg-white">
        <section className="border-t">
          <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16 lg:px-8">
            <Link
              href="/#casos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-900 transition hover:text-blue-700"
            >
              <ArrowLeft size={18} />
              Voltar aos casos de sucesso
            </Link>

            <div className="mt-10 text-center">
              <h1 className="mt-3 text-4xl font-extrabold text-blue-900 sm:text-5xl">
                Shenidy Tsemane
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-700 sm:text-lg">
                Primeira atleta moçambicana a conquistar ouro nos Jogos Africanos de
                Judo, um marco histórico para o desporto nacional.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={shenidyImage}
                  alt="Shenidy Tsemane"
                  fill
                  priority
                  sizes="(min-width: 1024px) 896px, calc(100vw - 48px)"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mt-12 border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-blue-900">Mais informações</h2>
              <ul className="mt-5 divide-y divide-gray-200 border-y border-gray-200">
                {achievements.map((achievement) => (
                  <li key={achievement} className="flex items-start gap-3 py-4">
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-blue-900" />
                    <span className="text-base leading-relaxed text-gray-700">
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}