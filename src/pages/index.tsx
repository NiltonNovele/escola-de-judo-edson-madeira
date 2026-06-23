"use client";

import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatsSection from "../components/StatsSection";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const heroImages = [
  "/images/home/hero/h1.jpeg",
  "/images/home/hero/h2.jpeg",
  "/images/home/hero/h3.jpeg",
  "/images/home/hero/h4.jpeg",
];

export default function Home() {
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const partnersRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const partners = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHeroImageIndex((currentIndex) => (currentIndex + 1) % heroImages.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const container = partnersRef.current;
    if (!container) return;

    let rafId: number;
    const speed = 1.0;
    let totalScroll = container.scrollWidth / 2;

    const updateTotalScroll = () => {
      totalScroll = container.scrollWidth / 2;
    };

    const animate = () => {
      if (!container) return;
      if (!pausedRef.current) {
        container.scrollLeft += speed;
        if (container.scrollLeft >= totalScroll) {
          container.scrollLeft -= totalScroll;
        }
      }
      rafId = window.requestAnimationFrame(animate);
    };

    updateTotalScroll();
    rafId = window.requestAnimationFrame(animate);
    window.addEventListener("resize", updateTotalScroll);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateTotalScroll);
    };
  }, []);

  return (
    <div className={`${inter.className} bg-white text-gray-900 antialiased`}>
      <Navbar />

      <main className="pt-24">

        {/* HERO PRINCIPAL */}
        <section className="relative w-full overflow-hidden">
          {heroImages.map((image, index) => (
            <div
              key={image}
              aria-hidden="true"
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === heroImageIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url('${image}')` }}
            />
          ))}

          {/* GRADIENT + BLUR LEFT SIDE */}
          <div className="
    absolute inset-0 z-10
    bg-gradient-to-r from-white/70 via-white/40 to-transparent
    
  " />

          <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-40 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* TEXT */}
            <div className="lg:col-span-7">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-blue-900 drop-shadow-xl">
                Construir,
                <br />
                Conquistar e
                <br />
                Compartilhar
              </h1>

              <p className="mt-6 max-w-xl text-lg sm:text-xl text-gray-800 font-medium leading-relaxed drop-shadow">
                Sonhamos com um futuro onde cada criança tenha a oportunidade de crescer através
                do desporto. O Judo é a nossa ferramenta de transformação social.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="/manifesto"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 border-2 border-blue-900 text-blue-900 font-semibold hover:bg-blue-50 transition"
                >
                  CONHEÇA A NOSSA CAUSA
                </a>
                <a
                  href="/donate"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-blue-900 text-white font-semibold hover:bg-blue-950 transition"
                >
                  QUERO FAZER PARTE
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="bg-gray-50 py-20 border-t">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* IMAGE */}
            <div className="lg:col-span-5">
              <div className="w-full rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/images/causa.avif"
                  alt="Grupo de crianças e professores"
                  width={1200}
                  height={900}
                  className="object-cover w-full h-72 sm:h-96 lg:h-[420px]"
                />
              </div>
            </div>

            {/* TEXT */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-900 leading-tight">
                Mais de uma década a formar faixas-pretas dentro e fora do tatami
              </h2>
              <p className="mt-6 text-lg sm:text-xl text-gray-700 leading-relaxed">
                A Escola de Judo Edson Madeira usa o desporto como ferramenta de educação,
                disciplina e transformação social. Ajudamos crianças e jovens a acreditarem no
                seu potencial, dentro e fora do tatami.
              </p>
            </div>
          </div>
        </section>

        {/* CONQUISTAS */}
        <StatsSection />

        {/* EVENTOS */}
        <section id="eventos" className="bg-gray-50 py-20 border-t">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-extrabold text-blue-900">Eventos</h3>
              <a href="/eventos" className="text-blue-900 font-semibold hover:underline">
                Ver todos os eventos
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((id) => (
                <article
                  key={id}
                  className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-2xl transition cursor-pointer"
                >
                  <div className="relative w-full h-56">
                    <Image
                      src={
                        id === 1
                          ? "/images/home/martial-fest.jpg"
                          : id === 2
                            ? "/images/home/aula-aberta.jpeg"
                            : "/images/home/campeonato-local.jpg"
                      }
                      alt={`Evento ${id}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5">

                    <h4 className="mt-2 font-semibold text-lg text-blue-900">
                      {id === 1
                        ? "Martial Fest"
                        : id === 2
                          ? "Aula Aberta"
                          : "Campeonato Local"}
                    </h4>

                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                      {id === 1
                        ? "Competição que reúne alunos e jovens com bolsas de formação."
                        : id === 2
                          ? "Sessão especial aberta à comunidade para experimentar Judo gratuitamente."
                          : "Campeonato com atletas de diversas regiões para promover o Judo."}
                    </p>

                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CASOS DE SUCESSO */}

        <section id="casos" className="bg-white py-24 border-t">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-blue-900 text-center mb-14">
              Casos de Sucesso
            </h2>

            {/* MOBILE SWIPE CAROUSEL */}
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 lg:hidden">
              {[
                {
                  name: "Kevin Loforte",
                  img: "/images/sucesso/kevin.jpg",
                  text:
                    "Conhecido como 'Mozambican Monster'. Judoca -66kg, Olímpico em Tóquio 2020, medalhista africano e um dos atletas mais dominantes do país.",
                },
                {
                  name: "Jacira Ferreira",
                  img: "/images/sucesso/jacira.jpg",
                  text:
                    "Judoca olímpica em Paris 2024. Conquistou 5º lugar no African Championship Seniores. Exemplo de determinação e disciplina.",
                },
                {
                  name: "Shenidy Tsemane",
                  img: "/images/sucesso/shneidy.jpg",
                  text:
                    "Primeira atleta moçambicana a conquistar ouro nos Jogos Africanos de Judo. Um marco histórico para o desporto nacional.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="min-w-[85%] bg-white rounded-2xl shadow-lg p-6 snap-center border hover:shadow-xl transition"
                >
                  <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={1200}
                      height={900}
                      sizes="(min-width: 1024px) 30vw, 85vw"
                      className="object-cover w-full h-full"
                    />
                    {item.name === "Shenidy Tsemane" && (
                      <Link
                        href="/shenidy-tsemane"
                        className="absolute bottom-4 left-4 right-4 inline-flex items-center justify-center rounded-full bg-blue-900/95 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        Mais sobre a Shenidy
                      </Link>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-blue-900">{item.name}</h3>
                  <p className="mt-4 text-gray-700 leading-relaxed text-sm">{item.text}</p>
                </div>
              ))}
            </div>

            {/* DESKTOP GRID (3 per row) */}
            <div className="hidden lg:grid grid-cols-3 gap-10">
              {[
                {
                  name: "Kevin Loforte",
                  img: "/images/sucesso/kevin.jpg",
                  text:
                    "O 'Mozambican Monster'. Judoca olímpico (-66kg), medalhista africano e uma inspiração para jovens atletas.",
                },
                {
                  name: "Jacira Ferreira",
                  img: "/images/sucesso/jacira.jpg",
                  text:
                    "Representou Moçambique nos Jogos Olímpicos Paris 2024. Exemplo de coragem, dedicação e superação.",
                },
                {
                  name: "Shenidy Tsemane",
                  img: "/images/sucesso/shneidy.jpg",
                  text:
                    "Primeira medalha de ouro de Moçambique nos Jogos Africanos de Judo — um marco histórico para o país.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition"
                >
                  <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={1200}
                      height={900}
                      sizes="(min-width: 1024px) 30vw, 85vw"
                      className="object-cover w-full h-full"
                    />
                    {item.name === "Shenidy Tsemane" && (
                      <Link
                        href="/shenidy-tsemane"
                        className="absolute bottom-4 left-4 right-4 inline-flex items-center justify-center rounded-full bg-blue-900/95 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        Mais sobre a Shenidy
                      </Link>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-blue-900">{item.name}</h3>
                  <p className="mt-4 text-gray-700 leading-relaxed text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOBRE O FUNDADOR */}
        <section id="fundador" className="bg-white py-24 border-t">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* IMAGE */}
            <div className="lg:col-span-5">
              <div className="w-full rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/edson.jpg"
                  alt="Fundador da Escola de Judo"
                  width={1200}
                  height={900}
                  className="object-cover w-full h-80 sm:h-[460px] lg:h-[480px]"
                />
              </div>
            </div>

            {/* TEXT */}
            <div className="lg:col-span-7">
              <h2 className="text-4xl font-extrabold text-blue-900">Edson Madeira - Fundador</h2>

              <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                Edson Madeira é um dos nomes mais influentes do Judo moçambicano, atleta olímpico,
                treinador e líder comunitário. Dedicou a sua vida à promoção do desporto e ao apoio
                a jovens de comunidades desfavorecidas.
              </p>

              <h3 className="text-xl font-bold text-blue-900 mt-8">Conquistas</h3>
              <ul className="mt-4 grid gap-3 text-gray-700 text-sm pl-4">
                <li className="flex items-center gap-3">
                  <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-blue-900" />
                  <span>Participação nos Jogos Olímpicos de Pequim 2008</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-blue-900" />
                  <span>Múltiplas medalhas internacionais em competições de Judo</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-blue-900" />
                  <span>Treinador certificado e referência nacional</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-blue-900" />
                  <span>Fundador da Escola de Judo Edson Madeira</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-blue-900" />
                  <span>Mentor de centenas de jovens atletas</span>
                </li>
              </ul>

              <div className="mt-8 flex justify-start lg:justify-end">
                <a
                  href="https://www.linkedin.com/in/edson-madeira-oly-0858b8a0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-blue-900 text-white font-semibold hover:bg-blue-950 transition"
                >
                  Mais sobre o Edson
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section
          id="newsletter"
          className="bg-gradient-to-r from-blue-50/60 to-white border-t py-20 mt-10"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div
              className="
                rounded-2xl bg-white shadow-xl
                p-8 lg:p-14
                grid grid-cols-1 md:grid-cols-2 gap-10
                items-center relative overflow-hidden
              "
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-40" />

              <div className="relative">
                <h4 className="text-3xl lg:text-4xl font-extrabold text-blue-900 leading-snug">
                  Receba Novidades & Actualizações
                </h4>
                <p className="mt-4 text-gray-700 text-lg leading-relaxed">
                  Junte-se à nossa comunidade e receba notícias, eventos, conquistas e
                  oportunidades de apoiar o desenvolvimento dos nossos atletas.
                </p>

                <ul className="mt-4 grid gap-3 text-gray-700 text-sm pl-4">
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-blue-900" />
                    <span>Conteúdos exclusivos e relevantes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-blue-900" />
                    <span>Eventos e competições</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-blue-900" />
                    <span>Oportunidades de apoio e participação</span>
                  </li>
                </ul>
              </div>

              {/* Newsletter form */}
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <input
                    type="email"
                    placeholder="O seu email"
                    required
                    className="
                      w-full rounded-full border border-gray-300
                      px-5 py-3.5 text-gray-800
                      focus:outline-none focus:ring-2 focus:ring-blue-400
                      shadow-sm
                    "
                  />
                  <button
                    type="submit"
                    className="
                      rounded-full bg-blue-900
                      px-8 py-3.5 text-white font-semibold
                      hover:bg-blue-950 transition
                      shadow-md
                    "
                  >
                    Subscrever
                  </button>
                </div>

                <p className="text-xs text-gray-500 pl-2">
                  Garantimos a sua privacidade. Sem spam.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* PARCEIROS */}
        <section className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">

            <h2 className="text-4xl font-extrabold text-blue-900 mb-6">
              Os Nossos Parceiros
            </h2>

            <p className="text-gray-700 max-w-2xl mx-auto text-lg mb-14 leading-relaxed">
              A Escola de Judo Edson Madeira conta com o apoio de instituições e marcas
              que acreditam no desenvolvimento desportivo, educativo e social.
            </p>

            <div
              ref={partnersRef}
              onMouseEnter={() => (pausedRef.current = true)}
              onMouseLeave={() => (pausedRef.current = false)}
              className="flex gap-6 overflow-hidden whitespace-nowrap py-4"
            >
              {[...partners, ...partners].map((id, index) => (
                <div
                  key={`${id}-${index}`}
                  className="min-w-[220px] h-44 flex-none rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:shadow-lg flex items-center justify-center"
                >
                  <img
                    src={`/images/parceiros/partner${id}.png`}
                    alt={`Parceiro ${id}`}
                    className="max-h-24 w-auto opacity-80 transition duration-300 hover:opacity-100 object-contain"
                  />
                </div>
              ))}
            </div>

            <p className="text-gray-600 mt-14 text-sm">
              Agradecemos cada parceiro que acredita na nossa missão.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
