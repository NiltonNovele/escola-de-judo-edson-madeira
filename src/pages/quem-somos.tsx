"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const aboutImages = [
  "/quem-somos/1.jpeg",
  "/quem-somos/2.jpeg",
  "/quem-somos/3.jpeg",
  "/quem-somos/4.jpeg",
  "/quem-somos/5.jpeg",
  "/quem-somos/6.jpeg",
  "/quem-somos/7.jpeg",
  "/quem-somos/8.jpeg",
  "/quem-somos/9.jpeg",
  "/quem-somos/10.jpeg",
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
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlay suave para dar mais profundidade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* TEXT */}
        <div className="min-w-0">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
            Quem Somos
          </h1>
          <p className="text-gray-700 leading-relaxed">
            Mais do que ensinar técnicas desportivas, promovemos o desenvolvimento
            humano e a integração social através do Judo, da educação e da cultura.
            Formamos faixas-pretas dentro e fora do tatami.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Acreditamos que o verdadeiro sucesso vai além das medalhas
            e das competições. O nosso objectivo é formar cidadãos disciplinados,
            responsáveis, respeitadores e preparados para enfrentar os desafios
            da vida com confiança, determinação e espírito de superação.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Com professores experientes, projectos sociais e uma forte ligação
            à comunidade, trabalhamos diariamente para transmitir valores que
            perduram para toda a vida e para cumprir o nosso lema:
          </p>
          <strong className="block mt-4 text-blue-800 text-xl">
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