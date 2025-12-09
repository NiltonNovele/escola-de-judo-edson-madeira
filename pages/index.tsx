"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function Home() {
  return (
    <div className={`${inter.className} bg-white text-gray-900 antialiased`}>
      <Navbar />

      <main className="pt-24">

        {/* HERO PRINCIPAL */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* TEXT */}
            <div className="lg:col-span-7">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-blue-900">
                Construir,
                <br />
                Conquistar e
                <br />
                Compartilhar
              </h1>
              <p className="mt-6 max-w-xl text-lg sm:text-xl text-gray-700 font-medium leading-relaxed">
                Sonhamos com um futuro onde cada criança tenha a oportunidade de crescer através
                do desporto. O Judo é a nossa ferramenta de transformação social.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#sobre"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 border-2 border-blue-900 text-blue-900 font-semibold hover:bg-blue-50 transition"
                >
                  CONHEÇA A NOSSA CAUSA
                </a>
                <a
                  href="#apoio"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-blue-900 text-white font-semibold hover:bg-blue-950 transition"
                >
                  QUERO DOAR
                </a>
              </div>
            </div>

            {/* IMAGE */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md lg:max-w-lg rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/hero.jpg"
                  alt="Crianças praticando judo"
                  width={1200}
                  height={900}
                  className="object-cover w-full h-72 sm:h-96 lg:h-[420px]"
                  priority
                />
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
                  src="/hero-group.jpg"
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
                Mais de duas décadas a formar faixas-pretas dentro e fora do tatami
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
        <section className="bg-white py-16 border-t">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
              {[
                { num: "+2.000", txt: "alunos formados" },
                { num: "+20", txt: "anos de experiência" },
                { num: "+400", txt: "bolsas atribuídas" },
                { num: "+1.500", txt: "medalhas conquistadas" },
              ].map((item, index) => (
                <div key={index} className="p-4">
                  <div className="text-4xl sm:text-5xl font-extrabold text-blue-900">{item.num}</div>
                  <div className="mt-2 text-base font-medium text-gray-700">{item.txt}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

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
                    <Image src={`/event-${id}.jpg`} alt={`Evento ${id}`} fill className="object-cover" />
                  </div>

                  <div className="p-5">
                    <time className="text-sm text-gray-500">
                      {id === 1 ? "12 Maio 2025" : id === 2 ? "08 Junho 2025" : "15 Julho 2025"}
                    </time>

                    <h4 className="mt-2 font-semibold text-lg text-blue-900">
                      {id === 1
                        ? "Torneio Solidário"
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

                    <div className="mt-4">
                      <a href="/eventos" className="text-blue-900 font-medium hover:underline">
                        Saber mais
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* CASOS DE SUCESSO — NEW SECTION */}
        {/* ---------------------------------------------------- */}

        <section id="casos" className="bg-white py-24 border-t">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <h2 className="text-4xl font-extrabold text-blue-900 text-center mb-14">
      Casos de Sucesso
    </h2>

    {/* MOBILE SWIPE CAROUSEL */}
    <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 lg:hidden">
      {[
        {
          name: "Edson Madeira",
          img: "/success/edson.jpg",
          text:
            "Figura lendária do judo moçambicano, atleta olímpico e treinador olímpico (Tóquio 2020, Paris 2024). Fundador da EJEM e referência nacional.",
        },
        {
          name: "Kevin Loforte",
          img: "/success/kevin.jpg",
          text:
            "Conhecido como 'Mozambican Monster'. Judoca -66kg, Olímpico em Tóquio 2020, medalhista africano e um dos atletas mais dominantes do país.",
        },
        {
          name: "Jacira Ferreira",
          img: "/success/jacira.jpg",
          text:
            "Judoca olímpica em Paris 2024. Conquistou 5º lugar no African Championship Seniores. Exemplo de determinação e disciplina.",
        },
        {
          name: "Shenidy Tsemane",
          img: "/success/shenidy.jpg",
          text:
            "Primeira atleta moçambicana a conquistar ouro nos Jogos Africanos de Judo. Um marco histórico para o desporto nacional.",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="min-w-[85%] bg-white rounded-2xl shadow-lg p-6 snap-center border hover:shadow-xl transition"
        >
          <div className="w-full h-64 rounded-xl overflow-hidden mb-6">
            <Image
              src={item.img}
              alt={item.name}
              width={1200}
              height={900}
              className="object-cover w-full h-full"
            />
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
          name: "Edson Madeira",
          img: "/edson.jpg",
          text:
            "Figura lendária do judo moçambicano, atleta olímpico e treinador olímpico (Tóquio 2020, Paris 2024). Fundador da EJEM e referência nacional.",
        },
        {
          name: "Kevin Loforte",
          img: "/sucesso/kevin.jpg",
          text:
            "O 'Mozambican Monster'. Judoca olímpico (-66kg), medalhista africano e uma inspiração para jovens atletas.",
        },
        {
          name: "Jacira Ferreira",
          img: "/sucesso/jacira.jpg",
          text:
            "Representou Moçambique nos Jogos Olímpicos Paris 2024. Exemplo de coragem, dedicação e superação.",
        },
        {
          name: "Shenidy Tsemane",
          img: "/sucesso/shneidy.jpg",
          text:
            "Primeira medalha de ouro de Moçambique nos Jogos Africanos de Judo — um marco histórico para o país.",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition"
        >
          <div className="w-full h-64 rounded-xl overflow-hidden mb-6">
            <Image
              src={item.img}
              alt={item.name}
              width={1200}
              height={900}
              className="object-cover w-full h-full"
            />
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
                  src="/edson.jpg"
                  alt="Fundador da Escola de Judo"
                  width={1200}
                  height={900}
                  className="object-cover w-full h-80 sm:h-96 lg:h-[440px]"
                />
              </div>
            </div>

            {/* TEXT */}
            <div className="lg:col-span-7">
              <h2 className="text-4xl font-extrabold text-blue-900">Edson Madeira — Fundador</h2>

              <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                Edson Madeira é um dos nomes mais influentes do Judo moçambicano, atleta olímpico,
                treinador e líder comunitário. Dedicou a sua vida à promoção do desporto e ao apoio
                a jovens de comunidades desfavorecidas.
              </p>

              <h3 className="text-xl font-bold text-blue-900 mt-8">Conquistas</h3>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>• Participação nos Jogos Olímpicos de Pequim 2008</li>
                <li>• Múltiplas medalhas internacionais em competições de Judo</li>
                <li>• Treinador certificado e referência nacional</li>
                <li>• Fundador da Escola de Judo Edson Madeira</li>
                <li>• Mentor de centenas de jovens atletas</li>
              </ul>

              <div className="mt-8">
                <a
                  href="#sobre"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-blue-900 text-white font-semibold hover:bg-blue-950 transition"
                >
                  Mais sobre o Edson
                </a>
              </div>
            </div>
          </div>
        </section>``

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
                  Receba Novidades & Atualizações
                </h4>
                <p className="mt-4 text-gray-700 text-lg leading-relaxed">
                  Junte-se à nossa comunidade e receba notícias, eventos, conquistas e
                  oportunidades de apoiar o desenvolvimento dos nossos atletas.
                </p>

                <ul className="mt-6 space-y-2 text-gray-600 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-900 rounded-full" />
                    Conteúdos exclusivos e relevantes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-900 rounded-full" />
                    Eventos e competições
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-900 rounded-full" />
                    Oportunidades de apoio e participação
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
        <section className="bg-gray-50 py-24 mt-24">
          <div className="max-w-7xl mx-auto px-6 text-center">

            <h2 className="text-4xl font-extrabold text-blue-900 mb-6">
              Os Nossos Parceiros
            </h2>

            <p className="text-gray-700 max-w-2xl mx-auto text-lg mb-14 leading-relaxed">
              A Escola de Judo Edson Madeira conta com o apoio de instituições e marcas
              que acreditam no desenvolvimento desportivo, educativo e social.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 items-center justify-center">
              {[1, 2, 3, 4, 5].map((id) => (
                <div
                  key={id}
                  className="
                    bg-white
                    rounded-2xl
                    shadow-sm
                    p-6
                    border border-gray-100
                    hover:shadow-lg
                    transition-all
                    duration-300
                    flex items-center justify-center group
                  "
                >
                  <img
                    src={`/parceiros/partner${id}.png`}
                    alt={`Parceiro ${id}`}
                    className="
                      w-32
                      opacity-70
                      group-hover:opacity-100
                      group-hover:scale-110
                      transition-all
                      duration-300
                      object-contain
                    "
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
