"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Image from "next/image";
import {
  HeartHandshake,
  Users,
  Gift,
  Cake,
  HandHeart,
  Home,
  CheckCircle2,
  CalendarDays,
  HelpCircle,
  Sparkles,
  Smile,
  Shield,
  Target,
} from "lucide-react";

const highlights = [
  {
    icon: Users,
    title: "Convívio e integração",
    text: "Promovemos encontros, celebrações e momentos de partilha que fortalecem os laços entre alunos, famílias e comunidade.",
  },
  {
    icon: HandHeart,
    title: "Solidariedade e apoio",
    text: "Realizamos iniciativas de doação, apoio social e actividades com impacto humano e comunitário.",
  },
  {
    icon: Home,
    title: "Visitas comunitárias",
    text: "A EJEM participa em visitas a orfanatos, centros de acolhimento e outros espaços onde o cuidado e a presença fazem diferença.",
  },
  {
    icon: Shield,
    title: "Valores na prática",
    text: "Levamos para fora do tatami os valores do Judo: respeito, disciplina, empatia, responsabilidade e espírito de serviço.",
  },
];

const socialAreas = [
  {
    title: "Get-togethers e convívios",
    subtitle: "Momentos de união",
    items: [
      "Encontros entre alunos, pais e equipa",
      "Momentos de integração e lazer",
      "Actividades para fortalecer o espírito EJEM",
    ],
    note: "Criamos espaços de convivência saudáveis que aproximam a comunidade EJEM e reforçam o sentimento de pertença.",
  },
  {
    title: "Aniversários e celebrações",
    subtitle: "Datas especiais",
    items: [
      "Celebração de aniversários",
      "Momentos simbólicos para crianças e jovens",
      "Dinâmicas que valorizam a alegria e a inclusão",
    ],
    note: "Acreditamos que celebrar juntos também faz parte da formação humana e da construção de memórias positivas.",
  },
  {
    title: "Doações e campanhas",
    subtitle: "Apoio social",
    items: [
      "Campanhas solidárias",
      "Recolha e distribuição de bens",
      "Apoio a famílias e instituições",
    ],
    note: "A EJEM procura mobilizar pessoas, parceiros e recursos para gerar apoio concreto onde for necessário.",
  },
  {
    title: "Visitas a orfanatos e instituições",
    subtitle: "Presença com propósito",
    items: [
      "Visitas a orfanatos",
      "Interacção com crianças e equipas locais",
      "Actividades de partilha, alegria e inspiração",
    ],
    note: "Mais do que visitar, queremos estar presentes de forma respeitosa, humana e transformadora.",
  },
];

const initiatives = [
  {
    icon: Cake,
    title: "Celebrações",
    text: "Aniversários, datas especiais e momentos de alegria que aproximam a comunidade EJEM.",
  },
  {
    icon: Gift,
    title: "Doações",
    text: "Campanhas e acções solidárias com foco em apoio material e cuidado comunitário.",
  },
  {
    icon: Home,
    title: "Visitas sociais",
    text: "Presença em orfanatos, centros de acolhimento e outras instituições com espírito de serviço.",
  },
  {
    icon: Smile,
    title: "Eventos comunitários",
    text: "Actividades sociais que ligam o desporto, a família e a comunidade num ambiente positivo.",
  },
];

const faqs = [
  {
    q: "A EJEM realiza apenas actividades desportivas?",
    a: "Não. A EJEM também promove actividades sociais e comunitárias que reforçam valores humanos, convivência e responsabilidade social.",
  },
  {
    q: "Que tipo de acções sociais a EJEM desenvolve?",
    a: "Encontros, celebrações, campanhas de doação, visitas a orfanatos, actividades comunitárias e outras iniciativas de impacto social.",
  },
  {
    q: "Famílias e parceiros podem participar?",
    a: "Sim. A participação da comunidade, famílias, apoiantes e parceiros é muito importante para ampliar o impacto das iniciativas.",
  },
  {
    q: "É possível apoiar uma actividade social da EJEM?",
    a: "Sim. Pode apoiar com doações, bens, tempo, serviços, parcerias ou outras formas de colaboração.",
  },
];

export default function SocialPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      {/* HERO */}
      <section className="pt-28 sm:pt-32 pb-14 sm:pb-20 px-4 bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center rounded-full bg-blue-100 text-blue-900 px-4 py-2 text-sm font-semibold mb-5">
              Escola de Judo Edson Madeira
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-900 tracking-tight leading-tight">
              Social
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg text-neutral-700 leading-relaxed">
              Na EJEM, o impacto vai além do tatami. Acreditamos numa escola
              envolvida com as pessoas, com as famílias e com a comunidade.
              Por isso promovemos convívios, aniversários, eventos sociais,
              campanhas de doação, visitas a orfanatos e outras iniciativas com
              propósito humano.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#iniciativas"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-900 px-6 py-3 text-white font-semibold hover:bg-blue-800 transition"
              >
                Ver Iniciativas
              </a>
              <a
                href="#envolvimento"
                className="inline-flex items-center justify-center rounded-2xl border border-blue-200 px-6 py-3 text-blue-900 font-semibold hover:bg-blue-50 transition"
              >
                Ver Envolvimento Comunitário
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-neutral-500">Essência</p>
                <p className="mt-1 font-bold text-blue-900">Comunidade e valores</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-neutral-500">Acções</p>
                <p className="mt-1 font-bold text-blue-900">Partilha e cuidado</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-neutral-500">Foco</p>
                <p className="mt-1 font-bold text-blue-900">Impacto humano</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative w-full h-[320px] sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/70 bg-white">
              <Image
                src="/soc.png"
                alt="EJEM e comunidade"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="pb-16 sm:pb-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="rounded-3xl bg-blue-900 text-white p-6 sm:p-8 h-full shadow-xl">
              <h2 className="text-2xl font-bold">A EJEM na comunidade</h2>
              <p className="mt-4 text-blue-100 leading-relaxed">
                O desporto também é uma ponte para criar relações, apoiar quem
                precisa e cultivar um sentido de responsabilidade social. A EJEM
                procura estar presente de forma activa, humana e positiva dentro
                da comunidade.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0" />
                  <p className="text-sm text-blue-50">
                    Relação próxima com famílias e alunos
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0" />
                  <p className="text-sm text-blue-50">
                    Participação em causas e acções sociais
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0" />
                  <p className="text-sm text-blue-50">
                    Valores do Judo vividos fora do treino
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-blue-900">{item.title}</h3>
                  <p className="mt-2 text-neutral-600 leading-relaxed text-sm sm:text-base">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INICIATIVAS */}
      <section id="iniciativas" className="py-16 sm:py-20 px-4 bg-neutral-50 border-y">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-900 px-4 py-2 text-sm font-semibold mb-4">
              <Sparkles size={16} />
              Iniciativas sociais
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
              Formas de presença e impacto
            </h2>
            <p className="mt-4 text-neutral-600 text-base sm:text-lg leading-relaxed">
              A EJEM promove diferentes tipos de iniciativas para fortalecer a
              ligação humana, o cuidado e o sentido de comunidade.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {initiatives.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl bg-white border border-neutral-200 p-6 shadow-sm hover:shadow-lg transition"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-blue-900">{item.title}</h3>
                  <p className="mt-2 text-neutral-600 leading-relaxed text-sm sm:text-base">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section id="envolvimento" className="py-16 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-900 px-4 py-2 text-sm font-semibold mb-4">
              <CalendarDays size={16} />
              Envolvimento comunitário
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
              O que a EJEM desenvolve
            </h2>
            <p className="mt-4 text-neutral-600 text-base sm:text-lg leading-relaxed">
              Um conjunto de acções sociais e comunitárias que ajudam a construir
              ligação, empatia e presença positiva na sociedade.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialAreas.map((area) => (
              <div
                key={area.title}
                className="rounded-3xl bg-white border border-neutral-200 p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900">{area.title}</h3>
                    <p className="text-sm text-neutral-500 mt-1">{area.subtitle}</p>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-900 px-3 py-2 text-sm font-medium">
                    <HeartHandshake size={16} />
                    EJEM Social
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {area.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl bg-neutral-50 border border-neutral-200 px-4 py-3"
                    >
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-blue-900" />
                      <span className="font-medium text-neutral-800">{item}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {area.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-white to-blue-50 border-t">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
              Mais do que uma escola de Judo
            </h2>
            <p className="mt-5 text-neutral-700 text-base sm:text-lg leading-relaxed max-w-3xl">
              A EJEM quer ser uma presença activa e construtiva na comunidade.
              Por isso, promovemos actividades sociais que ligam o desporto à
              solidariedade, ao convívio, à partilha e à formação de pessoas
              mais conscientes, humanas e comprometidas com os outros.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white border border-neutral-200 p-5 shadow-sm">
                <h3 className="font-bold text-blue-900">Para a comunidade EJEM</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  Encontros, aniversários, convivência, integração entre famílias,
                  alunos e equipa.
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-neutral-200 p-5 shadow-sm">
                <h3 className="font-bold text-blue-900">Para a sociedade</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  Acções solidárias, apoio a instituições, visitas sociais e
                  envolvimento humano com propósito.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-blue-900 text-white p-6 sm:p-8 shadow-2xl">
              <h3 className="text-2xl font-bold">Quer apoiar ou participar?</h3>
              <p className="mt-4 text-blue-100 leading-relaxed">
                Se deseja apoiar uma iniciativa social da EJEM, colaborar em
                eventos, contribuir com doações ou construir uma parceria, entre
                em contacto connosco.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Gift size={18} className="mt-1 shrink-0" />
                  <span className="text-sm sm:text-base">
                    Apoio com doações e campanhas
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <HeartHandshake size={18} className="mt-1 shrink-0" />
                  <span className="text-sm sm:text-base">
                    Participação em acções comunitárias
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Target size={18} className="mt-1 shrink-0" />
                  <span className="text-sm sm:text-base">
                    Parcerias com impacto social
                  </span>
                </div>
              </div>

              <a
                href="/contacto"
                className="mt-7 inline-flex items-center justify-center rounded-2xl bg-white text-blue-900 px-6 py-3 font-semibold hover:bg-blue-50 transition"
              >
                Entrar em contacto
              </a>
            </div>
          </div>
        </div>
      </section>

      

      <Footer />
    </div>
  );
}