"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const aboutImages = [
  "/images/quem-somos/1.jpeg",
  "/images/quem-somos/2.jpeg",
  "/images/quem-somos/3.jpeg",
  "/images/quem-somos/4.jpeg",
  "/images/quem-somos/5.jpeg",
  "/images/quem-somos/6.jpeg",
  "/images/quem-somos/7.jpeg",
  "/images/quem-somos/8.jpeg",
  "/images/quem-somos/9.jpeg",
  "/images/quem-somos/10.jpeg",
];

export default function AboutUs() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % aboutImages.length);
    }, 5000);

return () => clearInterval(interval);

  }, []);

  return (<div className="min-h-screen bg-white overflow-x-hidden"> <Navbar />

    {/* CONTENT */}
    <section className="max-w-6xl mx-auto px-6 mt-41 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="grid md:grid-cols-2 gap-10 items-center"
      >
        {/* IMAGE CAROUSEL */}
        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-xl min-w-0">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImage}
              initial={{
                opacity: 0,
                scale: 1.08,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.97,
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
              }}
              className="absolute inset-0"
            >
              <Image
                src={aboutImages[currentImage]}
                alt="Escola de Judo Edson Madeira"
                fill
                priority={currentImage === 0}
                sizes="(min-width: 768px) 672px, calc(100vw - 32px)"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlay suave para dar mais profundidade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* TEXT */}
<div className="min-w-0">
  <h1 className="text-5xl font-extrabold text-blue-900 mb-6">
    Quem Somos
  </h1>

  <p className="text-gray-700 leading-relaxed">
    Na <strong>Escola de Judo Edson Madeira</strong>, acreditamos que o Judo
    é muito mais do que uma modalidade desportiva. É uma escola de vida que
    ensina disciplina, respeito, responsabilidade, coragem e perseverança.
  </p>

  <p className="text-gray-700 leading-relaxed mt-4">
    Através do Judo, da educação e da cultura, trabalhamos para desenvolver
    não apenas atletas, mas sobretudo <strong>pessoas melhores, mais confiantes
    e preparadas para enfrentar os desafios da vida</strong>. No nosso tatami,
    cada treino é uma oportunidade para aprender, superar limites, construir
    carácter e crescer.
  </p>

  <p className="text-gray-700 leading-relaxed mt-4">
    Acreditamos que o verdadeiro sucesso não se mede apenas por medalhas,
    títulos ou vitórias nas competições. Mede-se também pela capacidade de
    respeitar o próximo, assumir responsabilidades, saber superar as derrotas,
    valorizar as conquistas e nunca desistir perante as dificuldades.
  </p>

  <p className="text-gray-700 leading-relaxed mt-4">
    Com uma equipa dedicada e experiente, desenvolvemos um trabalho focado na
    formação integral dos nossos alunos, desde a iniciação até ao alto
    rendimento, valorizando sempre o esforço, a disciplina e o espírito de
    equipa. Ao mesmo tempo, procuramos contribuir para a comunidade através
    de iniciativas que promovem a inclusão, a educação e o desenvolvimento
    social.
  </p>

  <p className="text-gray-700 leading-relaxed mt-4">
    Na <strong>Escola de Judo Edson Madeira</strong>, formamos atletas para o
    tatami e cidadãos para a vida.
  </p>

  <strong className="block mt-6 text-blue-800 text-xl font-bold">
    FORMANDO CAMPEÕES PARA A VIDA
  </strong>
</div>
      </motion.div>
    </section>

    <div className="mt-20">
      <Footer />
    </div>
  </div>
  );
}
