"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Sun,
  Users,
  CheckCircle2,
  CreditCard,
  HelpCircle,
  Phone,
  Sparkles,
  Trophy,
  Dumbbell,
  Gamepad2,
} from "lucide-react";

const highlights = [
  {
    icon: Sparkles,
    title: "Férias com diversão total",
    text: "Dias cheios de movimento, alegria, brincadeira e novas amizades para as crianças aproveitarem ao máximo.",
  },
  {
    icon: Users,
    title: "Convívio e socialização",
    text: "As actividades ajudam as crianças a conviver, criar laços e desenvolver espírito de grupo.",
  },
  {
    icon: Dumbbell,
    title: "Movimento e energia",
    text: "Com Judo, Ginástica, Capoeira, Salto à corda, Ténis e muito mais, cada manhã é activa e dinâmica.",
  },
  {
    icon: Trophy,
    title: "Aprender brincando",
    text: "As crianças desenvolvem coordenação, disciplina, criatividade e confiança de forma leve e divertida.",
  },
];

const weeklySchedule = [
  {
    day: "Segunda",
    activities: [
      { time: "8:30", label: "Judo" },
      { time: "9:30", label: "Intervalo" },
      { time: "10:00", label: "Ginástica" },
      { time: "11:00", label: "Capoeira" },
      { time: "12:00", label: "Fim" },
    ],
  },
  {
    day: "Terça",
    activities: [
      { time: "8:30", label: "Salto à corda" },
      { time: "9:30", label: "Intervalo" },
      { time: "10:00", label: "Ténis" },
      { time: "11:00", label: "Futsal" },
      { time: "12:00", label: "Fim" },
    ],
  },
  {
    day: "Quarta",
    activities: [
      { time: "8:30", label: "Judo" },
      { time: "9:30", label: "Intervalo" },
      { time: "10:00", label: "Ginástica" },
      { time: "11:00", label: "Capoeira" },
      { time: "12:00", label: "Fim" },
    ],
  },
  {
    day: "Quinta",
    activities: [
      { time: "8:30", label: "Salto à corda" },
      { time: "9:30", label: "Intervalo" },
      { time: "10:00", label: "Ténis" },
      { time: "11:00", label: "Xadrez" },
      { time: "12:00", label: "Fim" },
    ],
  },
  {
    day: "Sexta",
    activities: [
      { time: "8:30", label: "Xadrez" },
      { time: "9:30", label: "Intervalo" },
      { time: "10:00", label: "Jogos Lúdicos" },
      { time: "11:00", label: "Jogos com Bola" },
      { time: "12:00", label: "Fim" },
    ],
  },
];

const includedActivities = [
  "Capoeira",
  "Jogos com Bola",
  "Ginástica",
  "Judo",
  "Salto à corda",
  "Ténis",
  "Xadrez",
  "Jogos lúdicos",
];

const importantItems = ["Trazer água", "Levar lanche", "Usar chapéu"];

const faqs = [
  {
    q: "Para que idades são as Actividades de Férias?",
    a: "O programa foi pensado para crianças dos 6 aos 12 anos.",
  },
  {
    q: "Qual é o horário diário?",
    a: "As actividades decorrem de segunda a sexta, das 8h às 12h.",
  },
  {
    q: "Onde acontecem as actividades?",
    a: "No Clube Naval, em Maputo.",
  },
  {
    q: "Qual é o valor?",
    a: "O valor é de 3000 MZN por semana.",
  },
  {
    q: "O que a criança deve levar?",
    a: "Recomendamos trazer água, lanche e chapéu todos os dias.",
  },
];

export default function FeriasPage() {
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
              Actividades de Férias
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg text-neutral-700 leading-relaxed">
              <span className="font-semibold text-blue-900">
                Férias divertidas no Clube Naval!
              </span>{" "}
              As férias chegaram e a diversão vai ser total. Preparamos dias
              incríveis cheios de movimento, alegria e novas amizades para a
              criançada aproveitar ao máximo.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#horarios"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-900 px-6 py-3 text-white font-semibold hover:bg-blue-800 transition"
              >
                Ver Programa
              </a>
              <a
                href="#inscricoes"
                className="inline-flex items-center justify-center rounded-2xl border border-blue-200 px-6 py-3 text-blue-900 font-semibold hover:bg-blue-50 transition"
              >
                Ver Inscrições
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-neutral-500">Início</p>
                <p className="mt-1 font-bold text-blue-900">23 de Junho</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-neutral-500">Horário</p>
                <p className="mt-1 font-bold text-blue-900">8h às 12h</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-neutral-500">Idades</p>
                <p className="mt-1 font-bold text-blue-900">6 aos 12 anos</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-neutral-500">Vagas</p>
                <p className="mt-1 font-bold text-red-500">Limitadas</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative w-full h-[340px] sm:h-[440px] rounded-3xl overflow-hidden shadow-2xl border border-white/70 bg-white">
              <Image
                src="/fe1.png"
                alt="Actividades de Férias EJEM"
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
              <h2 className="text-2xl font-bold">O que esperar?</h2>
              <p className="mt-4 text-blue-100 leading-relaxed">
                Um programa cheio de energia, com actividades variadas que
                combinam desporto, brincadeira, movimento, disciplina e
                diversão. Ideal para manter as crianças activas durante as
                férias num ambiente seguro e estimulante.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0" />
                  <p className="text-sm text-blue-50">
                    Actividades organizadas por manhã
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0" />
                  <p className="text-sm text-blue-50">
                    Ambiente activo, divertido e seguro
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0" />
                  <p className="text-sm text-blue-50">
                    Movimento, lazer e novas amizades
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

      {/* ACTIVITIES */}
      <section className="py-16 sm:py-20 px-4 bg-neutral-50 border-y">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-900 px-4 py-2 text-sm font-semibold mb-4">
              <Gamepad2 size={16} />
              Actividades incluídas
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
              Movimento, jogo e aprendizagem
            </h2>

            <p className="mt-4 text-neutral-600 text-base sm:text-lg leading-relaxed">
              O programa inclui actividades desportivas, recreativas e lúdicas
              para garantir manhãs cheias de energia e boa disposição.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {includedActivities.map((activity) => (
                <div
                  key={activity}
                  className="rounded-2xl bg-white border border-neutral-200 px-4 py-4 shadow-sm text-center font-medium text-blue-900"
                >
                  {activity}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative w-full h-[320px] sm:h-[420px] rounded-3xl overflow-hidden shadow-xl border border-white/70 bg-white">
              <Image
                src="/fe.png"
                alt="Horário das Actividades de Férias"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TIMETABLE */}
      <section id="horarios" className="py-16 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-900 px-4 py-2 text-sm font-semibold mb-4">
              <CalendarDays size={16} />
              Programa semanal
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
              Horário das actividades
            </h2>
            <p className="mt-4 text-neutral-600 text-base sm:text-lg leading-relaxed">
              Organização semanal das actividades, com intervalo diário e
              variedade ao longo da semana.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {weeklySchedule.map((day) => (
              <div
                key={day.day}
                className="rounded-3xl bg-white border border-neutral-200 p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900">{day.day}</h3>
                    <p className="text-sm text-neutral-500 mt-1">Das 8h às 12h</p>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-900 px-3 py-2 text-sm font-medium">
                    <Clock3 size={16} />
                    Manhã activa
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {day.activities.map((slot) => (
                    <div
                      key={`${day.day}-${slot.time}-${slot.label}`}
                      className="flex items-center justify-between rounded-2xl bg-neutral-50 border border-neutral-200 px-4 py-3 gap-3"
                    >
                      <span className="font-medium text-neutral-800">{slot.time}</span>
                      <span className="font-semibold text-blue-900 text-right">
                        {slot.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING + INFO */}
      <section
        id="inscricoes"
        className="py-16 sm:py-20 px-4 bg-gradient-to-b from-white to-blue-50 border-t"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-900 px-4 py-2 text-sm font-semibold mb-4">
              <CreditCard size={16} />
              Inscrições
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
              Preço e informações principais
            </h2>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="rounded-3xl bg-white border border-neutral-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-blue-900">Valor</h3>
                <p className="mt-3 text-4xl font-extrabold text-blue-900">
                  3000 MZN
                </p>
                <p className="text-neutral-500 mt-1">por semana</p>
              </div>

              <div className="rounded-3xl bg-white border border-neutral-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-blue-900">Faixa etária</h3>
                <p className="mt-3 text-3xl font-extrabold text-blue-900">
                  6 aos 12 anos
                </p>
                <p className="text-neutral-500 mt-1">crianças</p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl bg-white border border-neutral-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-blue-900">Importante</h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {importantItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-neutral-50 border border-neutral-200 px-4 py-3 text-center font-medium text-neutral-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-blue-900 text-white p-6 sm:p-8 shadow-2xl">
              <h3 className="text-2xl font-bold">Reserve a vaga</h3>
              <p className="mt-4 text-blue-100 leading-relaxed">
                As vagas são limitadas. Entre em contacto para garantir a
                inscrição e receber mais informações sobre o programa.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1 shrink-0" />
                  <span className="text-sm sm:text-base">
                    Clube Naval – Maputo
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarDays size={18} className="mt-1 shrink-0" />
                  <span className="text-sm sm:text-base">
                    Início a 23 de Junho
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Sun size={18} className="mt-1 shrink-0" />
                  <span className="text-sm sm:text-base">Das 8h às 12h</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="mt-1 shrink-0" />
                  <span className="text-sm sm:text-base">
                    +258 84 303 4887
                  </span>
                </div>
              </div>

              <a
                href="/contacto"
                className="mt-7 inline-flex items-center justify-center rounded-2xl bg-white text-blue-900 px-6 py-3 font-semibold hover:bg-blue-50 transition"
              >
                Pedir informações
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-900 px-4 py-2 text-sm font-semibold mb-4">
              <HelpCircle size={16} />
              Perguntas frequentes
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
              Dúvidas comuns
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-blue-900">{item.q}</h3>
                <p className="mt-2 text-neutral-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}