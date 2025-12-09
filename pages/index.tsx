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
                  src="/hero-kids.jpg"
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
                    <Image
                      src={`/event-${id}.jpg`}
                      alt={`Evento ${id}`}
                      fill
                      className="object-cover"
                    />
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

        {/* SOBRE O FUNDADOR — NOVA SECÇÃO */}
        <section id="fundador" className="bg-white py-24 border-t">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* IMAGE */}
            <div className="lg:col-span-5">
              <div className="w-full rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/founder.jpg"
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
                  Saber mais sobre o projeto
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section id="newsletter" className="bg-gradient-to-r from-blue-50 to-white border-t">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="rounded-xl bg-white shadow-lg p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-2xl font-extrabold text-blue-900">Receba novidades</h4>
                <p className="mt-3 text-gray-700">
                  Inscreva-se e fique a par de notícias, eventos e oportunidades de apoiar.
                </p>
              </div>

              <form
                className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="O seu email"
                  required
                  className="w-full sm:flex-1 rounded-full border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  type="submit"
                  className="rounded-full bg-blue-900 px-6 py-3 text-white font-semibold hover:bg-blue-950 transition"
                >
                  Subscrever
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* PARCEIROS */}
        <section className="bg-gray-50 py-20 mt-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-6">Os Nossos Parceiros</h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg mb-12">
              A Escola de Judo Edson Madeira conta com o apoio de instituições e marcas que acreditam 
              no desenvolvimento desportivo, educativo e social.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 items-center">
              {[1, 2, 3, 4].map((id) => (
                <div key={id} className="flex justify-center">
                  <img
                    src={`/partners/partner${id}.png`}
                    className="w-32 opacity-70 hover:opacity-100 transition"
                    alt={`Parceiro ${id}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
