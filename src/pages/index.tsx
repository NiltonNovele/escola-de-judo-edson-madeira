
"use client";

import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatsSection from "../components/StatsSection";
import { FEATURED_EVENTS, HERO_IMAGES } from "@/data/home";
import { useHorizontalLoop } from "@/hooks/useHorizontalLoop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const JUDO_POSTER =
  "https://i.postimg.cc/bvWYMPT7/Screenshot-2026-10-24-115137.png";

export default function Home() {
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [showJudoDetails, setShowJudoDetails] = useState(false);

  const {
    containerRef: partnersRef,
    pause: pausePartners,
    resume: resumePartners,
  } = useHorizontalLoop({ speed: 1 });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (!document.hidden && HERO_IMAGES.length > 0) {
        setHeroImageIndex(
          (currentIndex) => (currentIndex + 1) % HERO_IMAGES.length
        );
      }
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const activities = [
    { icon: "🥋", name: "Judo Experience" },
    { icon: "🤼", name: "Demonstrações de Judo" },
    { icon: "💃", name: "Kizomba" },
    { icon: "🔥", name: "Zumba" },
    { icon: "🪢", name: "Salto à corda" },
    { icon: "⚔️", name: "Kendo" },
    { icon: "🎶", name: "Momento musical" },
    { icon: "👨‍👩‍👧‍👦", name: "Convívio familiar" },
  ];

  const successStories = [
    {
      name: "Kevin Loforte",
      img: "/images/sucesso/kevin.jpg",
      text:
        "Conhecido como 'Mozambican Monster'. Judoca -66kg, olímpico em Tóquio 2020, medalhista africano e um dos atletas mais dominantes do país.",
    },
    {
      name: "Jacira Ferreira",
      img: "/images/sucesso/jacira.jpg",
      text:
        "Judoca olímpica em Paris 2024. Conquistou o 5.º lugar no African Championship Seniores. Um exemplo de determinação e disciplina.",
    },
    {
      name: "Shenidy Tsemane",
      img: "/images/sucesso/shneidy.jpg",
      text:
        "Primeira atleta moçambicana a conquistar ouro nos Jogos Africanos de Judo. Um marco histórico para o desporto nacional.",
    },
  ];

  const partners = Array.from(
    { length: 18 },
    (_, index) => `partner${(index % 9) + 1}.png`
  );

  return (
    <div className={`${inter.className} bg-white text-gray-900 antialiased`}>
      <Navbar />

      <main className="pt-24">
        {/* HERO PRINCIPAL */}
        <section className="relative w-full overflow-hidden">
          {HERO_IMAGES.map((image, index) => (
            <div
              key={image}
              aria-hidden="true"
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === heroImageIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url('${image}')` }}
            />
          ))}

          <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/80 via-white/55 to-transparent" />

          <div className="relative z-20 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 lg:grid-cols-12 lg:px-8 lg:py-40">
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-extrabold leading-tight text-blue-900 drop-shadow-xl sm:text-5xl lg:text-6xl">
                Construir,
                <br />
                Conquistar e
                <br />
                Compartilhar
              </h1>

              <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-gray-800 sm:text-xl">
                Sonhamos com um futuro onde cada criança tenha a
                oportunidade de crescer através do desporto. O Judo é a
                nossa ferramenta de transformação social.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/manifesto"
                  className="inline-flex items-center justify-center rounded-full border-2 border-blue-900 px-6 py-3 font-semibold text-blue-900 transition hover:bg-blue-50"
                >
                  CONHEÇA A NOSSA CAUSA
                </Link>

                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center rounded-full bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-950"
                >
                  QUERO FAZER PARTE
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* JUDO OPEN DAY — CAMPANHA EM DESTAQUE */}
        <section
          id="judo-open-day"
          className="relative overflow-hidden border-y border-blue-100 bg-white py-16 sm:py-20 lg:py-24"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-yellow-300/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            {/* Cabeçalho publicitário */}
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-yellow-300 bg-yellow-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-950 sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-yellow-500" />
                Desporto · Cultura · Inclusão
              </span>

              <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight text-blue-950 sm:text-4xl lg:text-5xl">
                JUDO OPEN DAY
                <span className="mt-2 block text-blue-700">
                  UM DIA, MIL EMOÇÕES!
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                No dia 24 de Outubro, a Praia/Marginal de Maputo
                transforma-se num espaço de desporto, energia, música
                e diversão para toda a família!
              </p>
            </div>

            {/* Cartaz e informações */}
            <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Cartaz oficial */}
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-2 shadow-xl shadow-blue-950/10 sm:p-3">
                  <a
                    href={JUDO_POSTER}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir o cartaz oficial do Judo Open Day"
                    className="block"
                  >
                    <Image
                      src={JUDO_POSTER}
                      alt="Cartaz oficial do Judo Open Day na Praia/Marginal de Maputo"
                      width={700}
                      height={1000}
                      unoptimized
                      priority={false}
                      sizes="(min-width: 1024px) 42vw, (min-width: 640px) 70vw, 100vw"
                      className="h-auto w-full rounded-2xl object-contain transition duration-500 hover:scale-[1.01]"
                    />
                  </a>
                </div>

                <p className="mt-4 text-center text-sm text-gray-500">
                  Judo Open Day · Escola de Judo Edson Madeira e parceiros
                </p>
              </div>

              {/* Conteúdo principal */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-gray-100 bg-gray-50/90 p-5 sm:p-8 lg:p-9">
                  <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-700">
                    Uma experiência para todas as idades
                  </p>

                  <h3 className="mt-3 text-2xl font-black leading-tight text-blue-950 sm:text-3xl">
                    Não venhas apenas assistir.
                    <span className="mt-1 block text-blue-700">
                      Vem viver a experiência!
                    </span>
                  </h3>

                  {/* Data, hora e local */}
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-xl">
                        📅
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                          Data
                        </p>
                        <p className="mt-1 font-extrabold text-blue-950">
                          24 de Outubro
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl">
                        🕗
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                          Hora
                        </p>
                        <p className="mt-1 font-extrabold text-blue-950">
                          08h00
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:col-span-2">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-xl">
                        📍
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                          Localização
                        </p>
                        <p className="mt-1 font-extrabold text-blue-950">
                          Praia / Marginal de Maputo
                        </p>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          No trajecto entre a rotunda do Triunfo e o
                          Restaurante Costa do Sol.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mensagem de impacto */}
                  <div className="mt-7 border-l-4 border-yellow-400 pl-5">
                    <p className="text-lg font-bold leading-8 text-blue-950">
                      O Judo é para todos. A diversão também!
                    </p>
                    <p className="mt-2 leading-7 text-gray-600">
                      Traz a família, convida os amigos e prepara-te para
                      um dia de movimento, aprendizagem, convívio e
                      muitas emoções.
                    </p>
                  </div>

                  {/* Actividades */}
                  <div className="mt-8">
                    <h4 className="text-sm font-extrabold uppercase tracking-wider text-blue-950">
                      Descobre as actividades
                    </h4>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {activities.map((activity) => (
                        <span
                          key={activity.name}
                          className="rounded-full border border-blue-100 bg-white px-3 py-2 text-sm font-semibold text-blue-950 transition hover:border-yellow-400 hover:bg-yellow-50"
                        >
                          {activity.icon} {activity.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Atracção especial */}
                  <div className="relative mt-8 overflow-hidden rounded-2xl bg-blue-950 p-5 text-white sm:p-6">
                    <div
                      aria-hidden="true"
                      className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-yellow-400/20 blur-2xl"
                    />

                    <div className="relative">
                      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-yellow-300">
                        Atracção especial
                      </p>
                      <h4 className="mt-2 text-2xl font-black sm:text-3xl">
                        AKON G
                      </h4>
                      <p className="mt-2 text-sm leading-7 text-blue-100 sm:text-base">
                        Uma das grandes atracções anunciadas para o
                        Judo Open Day, numa experiência que une talento,
                        cultura, música e entretenimento.
                      </p>
                    </div>
                  </div>

                  {/* Botão Ver mais */}
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() =>
                        setShowJudoDetails((previous) => !previous)
                      }
                      aria-expanded={showJudoDetails}
                      aria-controls="judo-open-day-details"
                      className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-blue-800 px-7 py-4 font-extrabold text-white shadow-lg shadow-blue-900/15 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-950 focus:outline-none focus:ring-4 focus:ring-blue-200 sm:w-auto"
                    >
                      {showJudoDetails ? "Ver menos" : "Ver mais"}

                      <svg
                        aria-hidden="true"
                        className={`h-5 w-5 transition-transform duration-300 ${
                          showJudoDetails ? "rotate-180" : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="m6 9 6 6 6-6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Detalhes revelados pelo botão */}
            <div
              id="judo-open-day-details"
              hidden={!showJudoDetails}
              className="mt-10"
            >
              <div className="rounded-3xl border border-yellow-200 bg-yellow-50/70 p-6 sm:p-10">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-2xl font-black text-blue-950">
                      Um dia para todos, sem excepção
                    </h3>

                    <p className="mt-4 leading-8 text-gray-700">
                      Mais do que um evento desportivo, o Judo Open Day
                      é uma celebração da inclusão, da união e dos
                      valores que nos tornam melhores. Queremos aproximar
                      as famílias do desporto, incentivar hábitos
                      saudáveis e mostrar que todos podem encontrar
                      uma actividade com que se identifiquem.
                    </p>

                    <p className="mt-4 leading-8 text-gray-700">
                      Teremos aulas abertas, demonstrações de atletas,
                      actividades para crianças, momentos de convívio
                      e experiências pensadas para diferentes idades.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-blue-950">
                      Onde o Judo e o espectáculo se encontram!
                    </h3>

                    <p className="mt-4 leading-8 text-gray-700">
                      Do ritmo da dança à energia do desporto, da
                      diversão à arte marcial japonesa, preparámos
                      experiências para todos os gostos e idades.
                      Participa nas actividades, acompanha as
                      demonstrações, descobre o Judo e partilha
                      este momento com quem mais gostas.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {[
                        "💃 Kizomba",
                        "🔥 Zumba",
                        "🪢 Salto à corda",
                        "⚔️ Kendo",
                      ].map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-950 shadow-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chamada final */}
                <div className="mt-8 rounded-2xl bg-white p-5 sm:p-7">
                  <p className="text-xl font-black text-blue-950 sm:text-2xl">
                    JUDO OPEN DAY — O Judo é para todos!
                  </p>

                  <p className="mt-3 leading-7 text-gray-600">
                    Educação, desporto, cultura e entretenimento num
                    só lugar. Marca presença, traz a família e os
                    amigos e vem fazer parte desta celebração.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl bg-blue-50 p-4">
                      <p className="text-sm font-bold text-gray-500">
                        Data
                      </p>
                      <p className="mt-1 font-extrabold text-blue-950">
                        24 de Outubro
                      </p>
                    </div>

                    <div className="rounded-xl bg-blue-50 p-4">
                      <p className="text-sm font-bold text-gray-500">
                        Hora
                      </p>
                      <p className="mt-1 font-extrabold text-blue-950">
                        08h00
                      </p>
                    </div>

                    <div className="rounded-xl bg-blue-50 p-4">
                      <p className="text-sm font-bold text-gray-500">
                        Local
                      </p>
                      <p className="mt-1 font-extrabold text-blue-950">
                        Marginal de Maputo
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-gray-600">
                    📍 No trajecto entre a rotunda do Triunfo e o
                    Restaurante Costa do Sol. Até já!
                  </p>
                </div>
              </div>
            </div>

            {/* Faixa publicitária final */}
            <div className="mt-10 overflow-hidden rounded-3xl bg-yellow-400 px-6 py-9 text-center sm:px-10 sm:py-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-950/70">
                Escola de Judo Edson Madeira
              </p>

              <h3 className="mt-3 text-2xl font-black leading-tight text-blue-950 sm:text-3xl lg:text-4xl">
                Traz a família. Convida os amigos.
              </h3>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-blue-950/80 sm:text-base">
                Vem experimentar, aprender, dançar e celebrar o
                desporto connosco. O Judo Open Day espera por ti!
              </p>

              <button
                type="button"
                onClick={() => {
                  setShowJudoDetails(true);
                  document
                    .getElementById("judo-open-day-details")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-blue-950 px-7 py-3.5 font-extrabold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                Descobrir o evento
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="border-t bg-gray-50 py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-5">
              <div className="w-full overflow-hidden rounded-xl shadow-md">
                <Image
                  src="/images/causa.avif"
                  alt="Grupo de crianças e professores"
                  width={1200}
                  height={900}
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="h-72 w-full object-cover sm:h-96 lg:h-[420px]"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <h2 className="text-3xl font-extrabold leading-tight text-blue-900 sm:text-4xl lg:text-5xl">
                Mais de uma década a formar faixas-pretas dentro e fora
                do tatami
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-gray-700 sm:text-xl">
                A Escola de Judo Edson Madeira usa o desporto como
                ferramenta de educação, disciplina e transformação
                social. Ajudamos crianças e jovens a acreditarem no
                seu potencial, dentro e fora do tatami.
              </p>
            </div>
          </div>
        </section>

        {/* CONQUISTAS */}
        <StatsSection />

        {/* EVENTOS */}
        <section id="eventos" className="border-t bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <h3 className="text-3xl font-extrabold text-blue-900">
                Eventos
              </h3>

              <Link
                href="/eventos"
                className="text-sm font-semibold text-blue-900 hover:underline sm:text-base"
              >
                Ver todos os eventos
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURED_EVENTS.map((event) => (
                <article
                  key={event.id}
                  className="overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative h-56 w-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <h4 className="mt-2 text-lg font-semibold text-blue-900">
                      {event.title}
                    </h4>

                    <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                      {event.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CASOS DE SUCESSO */}
        <section id="casos" className="border-t bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="mb-14 text-center text-4xl font-extrabold text-blue-900">
              Casos de Sucesso
            </h2>

            {/* Carrossel para telemóveis */}
            <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 lg:hidden">
              {successStories.map((item) => (
                <article
                  key={item.name}
                  className="min-w-[85%] snap-center rounded-2xl border bg-white p-6 shadow-lg transition hover:shadow-xl"
                >
                  <div className="relative mb-6 h-64 overflow-hidden rounded-xl">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      sizes="85vw"
                      className="object-cover"
                    />

                    {item.name === "Shenidy Tsemane" && (
                      <Link
                        href="/shenidy-tsemane"
                        className="absolute bottom-4 left-4 right-4 inline-flex items-center justify-center rounded-full bg-blue-900/95 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-950"
                      >
                        Mais sobre a Shenidy
                      </Link>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-blue-900">
                    {item.name}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-gray-700">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>

            {/* Grelha para computadores */}
            <div className="hidden grid-cols-3 gap-10 lg:grid">
              {successStories.map((item) => (
                <article
                  key={item.name}
                  className="rounded-2xl border bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative mb-6 h-64 overflow-hidden rounded-xl">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      sizes="30vw"
                      className="object-cover"
                    />

                    {item.name === "Shenidy Tsemane" && (
                      <Link
                        href="/shenidy-tsemane"
                        className="absolute bottom-4 left-4 right-4 inline-flex items-center justify-center rounded-full bg-blue-900/95 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-950"
                      >
                        Mais sobre a Shenidy
                      </Link>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-blue-900">
                    {item.name}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-gray-700">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SOBRE O FUNDADOR */}
        <section id="fundador" className="border-t bg-white py-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-5">
              <div className="w-full overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/edson.jpg"
                  alt="Fundador da Escola de Judo Edson Madeira"
                  width={1200}
                  height={900}
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="h-80 w-full object-cover sm:h-[460px] lg:h-[480px]"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <h2 className="text-4xl font-extrabold text-blue-900">
                Edson Madeira - Fundador
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-gray-700">
                Edson Madeira é um dos nomes mais influentes do Judo
                moçambicano, atleta olímpico, treinador e líder
                comunitário. Dedicou a sua vida à promoção do desporto
                e ao apoio a jovens de comunidades desfavorecidas.
              </p>

              <h3 className="mt-8 text-xl font-bold text-blue-900">
                Conquistas
              </h3>

              <ul className="mt-4 grid gap-3 pl-4 text-sm text-gray-700">
                {[
                  "Participação nos Jogos Olímpicos de Pequim 2008",
                  "Múltiplas medalhas internacionais em competições de Judo",
                  "Treinador certificado e referência nacional",
                  "Fundador da Escola de Judo Edson Madeira",
                  "Mentor de centenas de jovens atletas",
                ].map((achievement) => (
                  <li key={achievement} className="flex items-start gap-3">
                    <span className="mt-1.5 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-blue-900" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex justify-start lg:justify-end">
                <a
                  href="https://www.linkedin.com/in/edson-madeira-oly-0858b8a0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-950"
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
          className="mt-10 border-t bg-gradient-to-r from-blue-50/60 to-white py-20"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative grid grid-cols-1 items-center gap-10 overflow-hidden rounded-2xl bg-white p-8 shadow-xl md:grid-cols-2 lg:p-14">
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-100 opacity-40 blur-3xl"
              />

              <div className="relative">
                <h4 className="text-3xl font-extrabold leading-snug text-blue-900 lg:text-4xl">
                  Receba Novidades &amp; Actualizações
                </h4>

                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  Junte-se à nossa comunidade e receba notícias,
                  eventos, conquistas e oportunidades de apoiar o
                  desenvolvimento dos nossos atletas.
                </p>

                <ul className="mt-4 grid gap-3 pl-4 text-sm text-gray-700">
                  {[
                    "Conteúdos exclusivos e relevantes",
                    "Eventos e competições",
                    "Oportunidades de apoio e participação",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-blue-900" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <form
                className="relative flex flex-col gap-4"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="flex w-full flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    placeholder="O seu email"
                    aria-label="O seu email"
                    required
                    className="w-full rounded-full border border-gray-300 px-5 py-3.5 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  <button
                    type="submit"
                    className="rounded-full bg-blue-900 px-8 py-3.5 font-semibold text-white shadow-md transition hover:bg-blue-950"
                  >
                    Subscrever
                  </button>
                </div>

                <p className="pl-2 text-xs text-gray-500">
                  Garantimos a sua privacidade. Sem spam.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* PARCEIROS */}
        <section className="bg-gray-50 py-24">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="mb-6 text-4xl font-extrabold text-blue-900">
              Os Nossos Parceiros
            </h2>

            <p className="mx-auto mb-14 max-w-2xl text-lg leading-relaxed text-gray-700">
              A Escola de Judo Edson Madeira conta com o apoio de
              instituições e marcas que acreditam no desenvolvimento
              desportivo, educativo e social.
            </p>

            <div
              ref={partnersRef}
              onMouseEnter={pausePartners}
              onMouseLeave={resumePartners}
              className="flex gap-6 overflow-hidden whitespace-nowrap py-4"
            >
              {partners.map((file, index) => (
                <div
                  key={`${file}-${index}`}
                  className="flex h-44 min-w-[220px] flex-none items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg"
                >
                  <Image
                    src={`/images/parceiros/${file}`}
                    alt={`Parceiro ${(index % 9) + 1}`}
                    width={160}
                    height={96}
                    sizes="160px"
                    className="max-h-24 w-auto object-contain opacity-80 transition hover:opacity-100"
                  />
                </div>
              ))}
            </div>

            <p className="mt-14 text-sm text-gray-600">
              Agradecemos cada parceiro que acredita na nossa missão.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
