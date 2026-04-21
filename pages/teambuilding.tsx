"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Image from "next/image";
import {
  Users,
  Target,
  Shield,
  Award,
  CheckCircle2,
  CalendarDays,
  CreditCard,
  HelpCircle,
  Sparkles,
  Briefcase,
  HeartHandshake,
} from "lucide-react";

const pricingPlans = [
  {
    title: "Essencial",
    price: "15.000 MT",
    description:
      "Ideal para equipas pequenas que procuram uma experiência introdutória de Team Building.",
    features: [
      "Sessão de 2 horas",
      "Até 15 participantes",
      "Dinâmicas de integração",
      "Facilitação pela equipa EJEM",
    ],
    highlight: false,
  },
  {
    title: "Profissional",
    price: "25.000 MT",
    description:
      "Plano recomendado para equipas que querem fortalecer colaboração, confiança e liderança.",
    features: [
      "Sessão de 3 a 4 horas",
      "Até 30 participantes",
      "Atividades práticas e reflexivas",
      "Plano personalizado por objetivos",
    ],
    highlight: true,
  },
  {
    title: "Corporate Plus",
    price: "Sob Consulta",
    description:
      "Experiência completa para empresas que procuram um programa mais profundo e adaptado.",
    features: [
      "Formato personalizado",
      "Equipas grandes",
      "Dinâmicas por departamentos",
      "Possibilidade de programa recorrente",
    ],
    highlight: false,
  },
];

const objectives = [
  {
    icon: Users,
    title: "Fortalecer a equipa",
    text: "Criamos experiências que aproximam as pessoas, reforçam confiança mútua e melhoram o espírito de grupo.",
  },
  {
    icon: Target,
    title: "Melhorar a comunicação",
    text: "As dinâmicas ajudam a desenvolver escuta ativa, clareza, colaboração e alinhamento entre membros da equipa.",
  },
  {
    icon: Shield,
    title: "Construir confiança",
    text: "O Team Building inspira segurança psicológica, respeito e melhor relação entre colegas e líderes.",
  },
  {
    icon: Award,
    title: "Desenvolver liderança",
    text: "Trabalhamos competências como iniciativa, disciplina, responsabilidade e tomada de decisão em equipa.",
  },
];

const formats = [
  {
    group: "Sessão Curta",
    audience: "Equipas pequenas e médias",
    schedule: [
      { step: "Boas-vindas", time: "15 min" },
      { step: "Dinâmicas de integração", time: "35 min" },
      { step: "Exercícios de equipa", time: "45 min" },
      { step: "Reflexão final", time: "25 min" },
    ],
    note: "Formato prático e leve para fortalecer conexão, integração e colaboração.",
  },
  {
    group: "Sessão Standard",
    audience: "Equipas em desenvolvimento",
    schedule: [
      { step: "Abertura e contexto", time: "20 min" },
      { step: "Dinâmicas de comunicação", time: "45 min" },
      { step: "Desafios de confiança", time: "60 min" },
      { step: "Liderança e cooperação", time: "45 min" },
      { step: "Debriefing", time: "30 min" },
    ],
    note: "Formato equilibrado para empresas que querem trabalhar relações, foco e cultura de equipa.",
  },
  {
    group: "Sessão Intensiva",
    audience: "Equipas de liderança ou grupos maiores",
    schedule: [
      { step: "Diagnóstico inicial", time: "30 min" },
      { step: "Dinâmicas por objetivos", time: "90 min" },
      { step: "Desafios práticos", time: "90 min" },
      { step: "Reflexão orientada", time: "45 min" },
      { step: "Fecho estratégico", time: "30 min" },
    ],
    note: "Formato mais completo e personalizável, com foco em coesão, liderança e resultados.",
  },
  {
    group: "Programa Corporativo",
    audience: "Empresas e instituições",
    schedule: [
      { step: "Briefing com a organização", time: "Pré-evento" },
      { step: "Customização da experiência", time: "Pré-evento" },
      { step: "Execução presencial", time: "Meio dia ou dia inteiro" },
      { step: "Síntese e recomendações", time: "Pós-evento" },
    ],
    note: "Solução desenhada à medida para objetivos concretos de equipa, cultura e desempenho.",
  },
];

const faqs = [
  {
    q: "O Team Building é apenas para empresas?",
    a: "Não. Podemos trabalhar com empresas, escolas, organizações, associações, equipas desportivas e grupos comunitários.",
  },
  {
    q: "As atividades são físicas?",
    a: "Algumas dinâmicas podem envolver movimento, mas o nível é ajustado ao perfil do grupo. O foco é sempre inclusão, segurança e participação.",
  },
  {
    q: "A EJEM personaliza a sessão para a nossa equipa?",
    a: "Sim. Sempre que necessário, adaptamos a experiência aos objetivos, tamanho da equipa e contexto da organização.",
  },
  {
    q: "Onde podem acontecer as sessões?",
    a: "Podem acontecer no espaço da EJEM, no local da empresa, em espaços parceiros ou em formato combinado, conforme o plano escolhido.",
  },
];

export default function TeamBuildingPage() {
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
              Team Building
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg text-neutral-700 leading-relaxed">
              Criamos experiências de Team Building inspiradas nos valores do
              Judo: respeito, confiança, disciplina, colaboração e liderança.
              Através de dinâmicas práticas e reflexivas, ajudamos equipas a
              fortalecer relações, melhorar comunicação e crescer juntas.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-neutral-500">Público</p>
                <p className="mt-1 font-bold text-blue-900">Empresas e equipas</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-neutral-500">Foco</p>
                <p className="mt-1 font-bold text-blue-900">Cultura e coesão</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-neutral-500">Abordagem</p>
                <p className="mt-1 font-bold text-blue-900">Prática e humana</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative w-full h-[320px] sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/70 bg-white">
              <Image
                src="/tb.png"
                alt="Team Building EJEM"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VISÃO GERAL */}
      <section className="pb-16 sm:pb-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="rounded-3xl bg-blue-900 text-white p-6 sm:p-8 h-full shadow-xl">
              <h2 className="text-2xl font-bold">Como funciona?</h2>
              <p className="mt-4 text-blue-100 leading-relaxed">
                Cada sessão é desenhada para criar ligação real entre os
                participantes. A EJEM combina valores do Judo, dinâmicas de
                grupo e facilitação orientada para gerar aprendizagem prática e
                impacto no ambiente de trabalho.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0" />
                  <p className="text-sm text-blue-50">
                    Dinâmicas adaptadas aos objetivos da equipa
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0" />
                  <p className="text-sm text-blue-50">
                    Experiência acessível, inclusiva e segura
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0" />
                  <p className="text-sm text-blue-50">
                    Reflexão aplicada à realidade da organização
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {objectives.map((item) => {
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

      {/* FORMATOS */}
      <section id="formatos" className="py-16 sm:py-20 px-4 bg-neutral-50 border-y">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-900 px-4 py-2 text-sm font-semibold mb-4">
              <CalendarDays size={16} />
              Formatos
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
              Estrutura das sessões
            </h2>
            <p className="mt-4 text-neutral-600 text-base sm:text-lg leading-relaxed">
              Diferentes formatos para diferentes objetivos, tamanhos de equipa
              e níveis de profundidade.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {formats.map((group) => (
              <div
                key={group.group}
                className="rounded-3xl bg-white border border-neutral-200 p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900">{group.group}</h3>
                    <p className="text-sm text-neutral-500 mt-1">{group.audience}</p>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-900 px-3 py-2 text-sm font-medium">
                    <Sparkles size={16} />
                    Estrutura
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {group.schedule.map((slot) => (
                    <div
                      key={`${group.group}-${slot.step}-${slot.time}`}
                      className="flex items-center justify-between rounded-2xl bg-neutral-50 border border-neutral-200 px-4 py-3 gap-3"
                    >
                      <span className="font-medium text-neutral-800">{slot.step}</span>
                      <span className="font-semibold text-blue-900">{slot.time}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {group.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS / CTA */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-white to-blue-50 border-t">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
              Uma experiência alinhada com a identidade da EJEM
            </h2>
            <p className="mt-5 text-neutral-700 text-base sm:text-lg leading-relaxed max-w-3xl">
              O Team Building da EJEM não é apenas entretenimento. É uma
              experiência orientada para resultados humanos e organizacionais:
              mais união, mais respeito, melhor comunicação e uma cultura de
              equipa mais forte.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white border border-neutral-200 p-5 shadow-sm">
                <h3 className="font-bold text-blue-900">Para empresas</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  Ideal para equipas, departamentos, lideranças e iniciativas de
                  cultura organizacional.
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-neutral-200 p-5 shadow-sm">
                <h3 className="font-bold text-blue-900">Para grupos e instituições</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  Pode ser adaptado a escolas, associações, clubes, ONGs e
                  outros grupos com objetivos coletivos.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-blue-900 text-white p-6 sm:p-8 shadow-2xl">
              <h3 className="text-2xl font-bold">Quer organizar uma sessão?</h3>
              <p className="mt-4 text-blue-100 leading-relaxed">
                Fale com a equipa EJEM para definir o formato ideal, o número de
                participantes, os objetivos da sessão e a proposta mais adequada
                para a sua organização.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Briefcase size={18} className="mt-1 shrink-0" />
                  <span className="text-sm sm:text-base">
                    Sessões para empresas e instituições
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <HeartHandshake size={18} className="mt-1 shrink-0" />
                  <span className="text-sm sm:text-base">
                    Formatos adaptados aos seus objetivos
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0" />
                  <span className="text-sm sm:text-base">
                    Planeamento e facilitação com a equipa EJEM
                  </span>
                </div>
              </div>

              <a
                href="/contacto"
                className="mt-7 inline-flex items-center justify-center rounded-2xl bg-white text-blue-900 px-6 py-3 font-semibold hover:bg-blue-50 transition"
              >
                Pedir proposta
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}