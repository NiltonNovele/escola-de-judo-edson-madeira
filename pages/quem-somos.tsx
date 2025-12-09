"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import { Target, HeartHandshake, Trophy, Calendar } from "lucide-react";

type TimelineItem = {
  year: string;
  text: string;
  images: string[];
};

export default function QuemSomos() {
  const timeline: TimelineItem[] = [
    {
      year: "2000",
      text: "O Sensei Edson Madeira inicia aulas comunitárias de Judo em Maputo, promovendo disciplina, inclusão e valores humanos.",
      images: ["/timeline/2000.jpg", "/timeline/2000b.jpg"],
    },
    {
      year: "2005",
      text: "Formação do primeiro grupo oficial de atletas e voluntários ligados ao projeto EJEM.",
      images: ["/timeline/2005.jpg"],
    },
    {
      year: "2010",
      text: "Expansão das actividades para novas comunidades e crescimento no número de atletas.",
      images: ["/timeline/2010.jpg", "/timeline/2010b.jpg"],
    },
    {
      year: "2015",
      text: "Participação em competições nacionais e início de programas educativos complementares.",
      images: ["/timeline/2015.jpg"],
    },
    {
      year: "2020",
      text: "Criação formal da Escola de Judo Edson Madeira (EJEM) como centro de formação e desenvolvimento humano.",
      images: ["/timeline/2020.jpg"],
    },
    {
      year: "2024",
      text: "Início de projectos de integração social, bolsas de estudo e expansão dos programas comunitários.",
      images: ["/timeline/2024.jpg"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-28 text-center px-6"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
          Quem Somos
        </h1>

        <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Desenvolvimento humano e integração social através do Judo, da educação e da cultura.
          Formamos faixas-pretas dentro e fora do tatami.
        </p>
      </motion.div>

      {/* SOBRE NÓS */}
      <section className="max-w-6xl mx-auto px-6 mt-16 md:mt-20 grid md:grid-cols-2 gap-10">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-blue-900 mb-4"
          >
            Sobre Nós
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-gray-700 text-lg leading-relaxed"
          >
            A Escola de Judo Edson Madeira nasceu do sonho de transformar vidas usando as artes
            marciais como veículo de transformação social. Fundada pelo atleta olímpico Edson Madeira,
            com mais de 14 medalhas continentais e uma carreira dedicada ao Judo e às artes marciais,
            a escola vai além do tatame: é disciplina, respeito, inclusão, superação e acima de tudo
            Transformação.
            <br /><br />
            Aqui, o Judo é mais do que uma arte marcial — é uma ferramenta de educação e mudança
            social. Trabalhamos com crianças, jovens e adultos, promovendo saúde, confiança, espírito
            de equipa e oportunidades para um futuro melhor.
            <br /><br />
            Com professores especializados, projectos sociais de impacto e eventos que unem educação,
            desporto, cultura e bem-estar, a Escola de Judo Edson Madeira é hoje uma referência na
            formação de campeões dentro e fora do tatami, com o lema:
            <strong className="block text-blue-800 mt-2">
              “FORMANDO CAMPEÕES PARA A VIDA”
            </strong>
          </motion.p>
        </div>

        {/* IMAGE GRID */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-3 sm:gap-4"
        >
          {["1", "2", "3", "4"].map((img, i) => (
            <div key={i} className="relative h-40 sm:h-48 rounded-xl overflow-hidden">
              <Image src={`/about/${img}.jpg`} alt="sobre nós" fill className="object-cover" />
            </div>
          ))}
        </motion.div>
      </section>

      {/* PROPÓSITO / MISSÃO / VISÃO */}
      <section className="max-w-6xl mx-auto px-6 mt-20 grid gap-10 md:grid-cols-3">
        {[  
          {
            title: "Propósito",
            icon: Target,
            img: "/about/people1.jpg",
            text:
              "Promover o desenvolvimento integral através dos valores do Judo, combatendo a exclusão social e criando oportunidades.",
          },
          {
            title: "Missão",
            icon: HeartHandshake,
            img: "/about/people2.jpg",
            text:
              "Promover o desenvolvimento integral de crianças, jovens e adultos através dos valores do Judo.",
          },
          {
            title: "Visão",
            icon: Trophy,
            img: "/logo.jpg",
            text:
              "Tornar-nos uma referência nacional e internacional, usando o Judo como ferramenta de transformação.",
          },
        ].map((block, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 + i * 0.1 }}
            className="bg-blue-50 border border-blue-100 p-8 rounded-2xl shadow-sm flex flex-col items-center text-center"
          >
            <block.icon className="text-blue-700 w-10 h-10 mb-4" />

            <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden">
              <Image src={block.img} alt={block.title} fill className="object-cover" />
            </div>

            <h3 className="text-xl font-bold text-blue-900 mb-2">{block.title}</h3>
            <p className="text-gray-700">{block.text}</p>
          </motion.div>
        ))}
      </section>

      {/* TIMELINE */}
      <section className="max-w-6xl mx-auto px-6 mt-28">
        <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
          Linha do Tempo
        </h2>

        <div className="flex flex-col gap-20">
          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={`grid gap-10 items-center 
                md:grid-cols-2 
                ${idx % 2 !== 0 ? "md:[&>*:first-child]:order-2" : ""}
              `}
            >
              {/* TEXT BLOCK */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="text-blue-700 w-6 h-6" />
                  <h3 className="text-2xl font-bold text-blue-900">{item.year}</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{item.text}</p>
              </div>

              {/* IMAGE GRID */}
              <div className="grid grid-cols-2 gap-4">
                {item.images.map((img, i) => (
                  <div key={i} className="relative h-36 sm:h-40 md:h-48 rounded-xl overflow-hidden">
                    <Image src={img} alt={`${item.year}-${i}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
