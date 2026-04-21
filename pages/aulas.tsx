"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Image from "next/image";
import {
  Clock3,
  Users,
  Target,
  Shield,
  Award,
  CheckCircle2,
  CalendarDays,
  CreditCard,
  HelpCircle,
} from "lucide-react";

const pricingPlans = [
  {
    title: "Iniciação",
    price: "2.500 MT",
    description: "Ideal para quem está a começar e quer conhecer o Judo.",
    features: [
      "2 aulas por semana",
      "Acompanhamento técnico",
      "Integração gradual",
      "Ambiente seguro e acolhedor",
    ],
    highlight: false,
  },
  {
    title: "Regular",
    price: "3.500 MT",
    description: "Plano recomendado para evolução consistente no treino.",
    features: [
      "3 a 4 aulas por semana",
      "Desenvolvimento técnico e físico",
      "Preparação progressiva",
      "Acompanhamento contínuo",
    ],
    highlight: true,
  },
  {
    title: "Competição",
    price: "4.500 MT",
    description: "Para atletas com maior compromisso e foco competitivo.",
    features: [
      "Treinos intensivos",
      "Maior volume de prática",
      "Preparação específica",
      "Acompanhamento orientado para competição",
    ],
    highlight: false,
  },
];

const objectives = [
  {
    icon: Shield,
    title: "Disciplina e respeito",
    text: "O Judo ensina autocontrolo, respeito pelos outros e responsabilidade dentro e fora do tatami.",
  },
  {
    icon: Target,
    title: "Foco e confiança",
    text: "As aulas ajudam a desenvolver concentração, autoconfiança e capacidade de superar desafios.",
  },
  {
    icon: Users,
    title: "Crescimento social",
    text: "Promovemos espírito de equipa, amizade, convivência saudável e inclusão entre os alunos.",
  },
  {
    icon: Award,
    title: "Evolução física e técnica",
    text: "Os alunos desenvolvem coordenação, equilíbrio, força, mobilidade e técnica de forma progressiva.",
  },
];

const timetable = [
  {
    group: "Kids",
    ages: "5 aos 8 anos",
    schedule: [
      { day: "Segunda", time: "16:00 - 17:00" },
      { day: "Quarta", time: "16:00 - 17:00" },
      { day: "Sexta", time: "16:00 - 17:00" },
    ],
    note: "Aulas focadas em coordenação, disciplina, bases do Judo e aprendizagem lúdica.",
  },
  {
    group: "Juniors",
    ages: "9 aos 12 anos",
    schedule: [
      { day: "Segunda", time: "17:00 - 18:15" },
      { day: "Quarta", time: "17:00 - 18:15" },
      { day: "Sexta", time: "17:00 - 18:15" },
    ],
    note: "Treinos com maior estrutura técnica, postura, quedas, mobilidade e fundamentos.",
  },
  {
    group: "Cadets",
    ages: "13 aos 16 anos",
    schedule: [
      { day: "Terça", time: "16:30 - 18:00" },
      { day: "Quinta", time: "16:30 - 18:00" },
      { day: "Sábado", time: "09:00 - 10:30" },
    ],
    note: "Grupo com foco em desenvolvimento técnico, físico e preparação progressiva.",
  },
  {
    group: "Seniors",
    ages: "17+ anos",
    schedule: [
      { day: "Terça", time: "18:00 - 19:30" },
      { day: "Quinta", time: "18:00 - 19:30" },
      { day: "Sábado", time: "10:30 - 12:00" },
    ],
    note: "Aulas para praticantes iniciantes, intermédios e avançados, incluindo preparação específica.",
  },
];

export default function AulasPage() {
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
              Aulas de Judo
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg text-neutral-700 leading-relaxed">
              As aulas da EJEM foram pensadas para formar atletas e cidadãos:
              com disciplina, respeito, foco, confiança e desenvolvimento físico
              progressivo. Trabalhamos com crianças, jovens e adultos num
              ambiente seguro, acolhedor e exigente na medida certa.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#horarios"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-900 px-6 py-3 text-white font-semibold hover:bg-blue-800 transition"
              >
                Ver Horários
              </a>
              <a
                href="#precos"
                className="inline-flex items-center justify-center rounded-2xl border border-blue-200 px-6 py-3 text-blue-900 font-semibold hover:bg-blue-50 transition"
              >
                Ver Preçário
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-neutral-500">Faixas etárias</p>
                <p className="mt-1 font-bold text-blue-900">Kids a Seniors</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-neutral-500">Foco</p>
                <p className="mt-1 font-bold text-blue-900">Técnica e valores</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-neutral-500">Ambiente</p>
                <p className="mt-1 font-bold text-blue-900">Seguro e disciplinado</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative w-full h-[320px] sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/70 bg-white">
              <Image
                src="/aj.png"
                alt="Aulas de Judo EJEM"
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
              <h2 className="text-2xl font-bold">Como funcionam as aulas?</h2>
              <p className="mt-4 text-blue-100 leading-relaxed">
                As aulas são organizadas por idade e nível de desenvolvimento.
                Cada grupo segue uma metodologia própria, combinando técnica,
                preparação física, disciplina, convivência e progressão segura.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0" />
                  <p className="text-sm text-blue-50">
                    Integração progressiva para iniciantes
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0" />
                  <p className="text-sm text-blue-50">
                    Treinos adaptados por faixa etária
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0" />
                  <p className="text-sm text-blue-50">
                    Desenvolvimento técnico e humano
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

      {/* HORÁRIOS */}
      <section id="horarios" className="py-16 sm:py-20 px-4 bg-neutral-50 border-y">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-900 px-4 py-2 text-sm font-semibold mb-4">
              <CalendarDays size={16} />
              Horários
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
              Quadro de aulas
            </h2>
            <p className="mt-4 text-neutral-600 text-base sm:text-lg leading-relaxed">
              Organização semanal por grupos, com horários pensados para cada
              fase de aprendizagem e desenvolvimento.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {timetable.map((group) => (
              <div
                key={group.group}
                className="rounded-3xl bg-white border border-neutral-200 p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900">{group.group}</h3>
                    <p className="text-sm text-neutral-500 mt-1">{group.ages}</p>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-900 px-3 py-2 text-sm font-medium">
                    <Clock3 size={16} />
                    Horário semanal
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {group.schedule.map((slot) => (
                    <div
                      key={`${group.group}-${slot.day}-${slot.time}`}
                      className="flex items-center justify-between rounded-2xl bg-neutral-50 border border-neutral-200 px-4 py-3 gap-3"
                    >
                      <span className="font-medium text-neutral-800">{slot.day}</span>
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

      {/* PREÇOS */}
      <section id="precos" className="py-16 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-900 px-4 py-2 text-sm font-semibold mb-4">
              <CreditCard size={16} />
              Preçário
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
              Planos de treino
            </h2>
            <p className="mt-4 text-neutral-600 text-base sm:text-lg leading-relaxed">
              Escolha o plano que melhor se adapta ao nível de compromisso e aos
              objetivos do aluno.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.title}
                className={`rounded-3xl border p-6 sm:p-8 shadow-sm transition hover:shadow-xl ${
                  plan.highlight
                    ? "border-blue-900 bg-blue-900 text-white"
                    : "border-neutral-200 bg-white text-black"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3
                    className={`text-2xl font-bold ${
                      plan.highlight ? "text-white" : "text-blue-900"
                    }`}
                  >
                    {plan.title}
                  </h3>

                  {plan.highlight && (
                    <span className="rounded-full bg-white text-blue-900 px-3 py-1 text-xs font-bold">
                      Recomendado
                    </span>
                  )}
                </div>

                <p
                  className={`mt-3 text-3xl font-extrabold ${
                    plan.highlight ? "text-white" : "text-blue-900"
                  }`}
                >
                  {plan.price}
                  <span
                    className={`text-sm font-medium ml-1 ${
                      plan.highlight ? "text-blue-100" : "text-neutral-500"
                    }`}
                  >
                    / mês
                  </span>
                </p>

                <p
                  className={`mt-4 leading-relaxed ${
                    plan.highlight ? "text-blue-50" : "text-neutral-600"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className={`mt-1 shrink-0 ${
                          plan.highlight ? "text-white" : "text-blue-900"
                        }`}
                      />
                      <span
                        className={`text-sm sm:text-base ${
                          plan.highlight ? "text-blue-50" : "text-neutral-700"
                        }`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 text-center">
            <p className="text-neutral-700 leading-relaxed">
              * Os valores podem ser ajustados conforme campanhas, inscrições,
              condições específicas ou programas especiais da EJEM.
            </p>
          </div>
        </div>
      </section>

      {/* OBJECTIVOS / CTA */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-white to-blue-50 border-t">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
              Mais do que um desporto
            </h2>
            <p className="mt-5 text-neutral-700 text-base sm:text-lg leading-relaxed max-w-3xl">
              Na EJEM, o Judo é uma ferramenta de formação integral. Queremos
              desenvolver atletas tecnicamente fortes, mas também crianças,
              jovens e adultos com valores sólidos, disciplina, resiliência,
              respeito e sentido de comunidade.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white border border-neutral-200 p-5 shadow-sm">
                <h3 className="font-bold text-blue-900">Para crianças</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  Coordenação, disciplina, regras, confiança e aprendizagem
                  saudável num ambiente seguro.
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-neutral-200 p-5 shadow-sm">
                <h3 className="font-bold text-blue-900">Para jovens e adultos</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  Técnica, condição física, superação pessoal, foco e espírito
                  de compromisso.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-blue-900 text-white p-6 sm:p-8 shadow-2xl">
              <h3 className="text-2xl font-bold">Quer começar?</h3>
              <p className="mt-4 text-blue-100 leading-relaxed">
                Entre em contacto com a equipa EJEM para saber sobre inscrição,
                aula experimental, disponibilidade por grupo e orientações sobre
                equipamento.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0" />
                  <span className="text-sm sm:text-base">
                    Informação sobre vagas por turma
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0" />
                  <span className="text-sm sm:text-base">
                    Orientação para novos alunos
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0" />
                  <span className="text-sm sm:text-base">
                    Apoio sobre equipamento necessário
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