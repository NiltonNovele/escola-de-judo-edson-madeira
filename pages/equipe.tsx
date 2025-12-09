"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";

type Member = {
  name: string;
  role: string;
  image: string;
  description: string;
  email?: string;
  phone?: string;
};

export default function Equipe() {
  const [active, setActive] = useState<number | null>(null);

  const team: Member[] = [
    {
      name: "Kevin Loforte",
      role: "Professor de Judo",
      image: "/team/kevin.jpg",
      description:
        "Especialista em ensino técnico e preparação de jovens atletas.",
      email: "kevin@instituto.com",
      phone: "+55 21 90000-0001",
    },
    {
      name: "Jacira Ferreira",
      role: "Professora de Judo",
      image: "/team/jacira.jpg",
      description:
        "Focada no desenvolvimento de atletas femininas e inclusão social.",
      email: "jacira@instituto.com",
      phone: "+55 21 90000-0002",
    },
    {
      name: "Edson Madeira",
      role: "Treinador Olímpico",
      image: "/team/edson.jpg",
      description:
        "Treinador com experiência internacional e formação de atletas de alto rendimento.",
      email: "edson@instituto.com",
      phone: "+55 21 90000-0003",
    },
    {
      name: "Rita Santos",
      role: "Coordenadora Pedagógica",
      image: "/team/rita.jpg",
      description:
        "Responsável pela orientação educacional e acompanhamento académico dos alunos.",
      email: "rita@instituto.com",
      phone: "+55 21 90000-0004",
    },
    {
      name: "Carlos Menezes",
      role: "Preparador Físico",
      image: "/team/carlos.jpg",
      description:
        "Especialista em performance, força e condicionamento para atletas.",
      email: "carlos@instituto.com",
      phone: "+55 21 90000-0005",
    },
    {
      name: "Marta Oliveira",
      role: "Psicóloga Desportiva",
      image: "/team/marta.jpg",
      description:
        "Actuação focada na motivação, foco competitivo e bem-estar emocional dos atletas.",
      email: "marta@instituto.com",
      phone: "+55 21 90000-0006",
    },
  ];

  const toggleDescription = (idx: number) => {
    setActive(active === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-28 text-center px-6"
      >
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
          A Nossa Equipa
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Conheça os profissionais que dedicam o seu trabalho ao desenvolvimento
          humano, educativo e desportivo através do Judo.
        </p>
      </motion.div>

      {/* CARDS */}
      <section className="max-w-7xl mx-auto px-6 mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-28">
        {team.map((m, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer group hover:shadow-2xl transition-shadow duration-500"
            onClick={() => toggleDescription(idx)}
          >
            {/* Imagem */}
            <div className="relative h-96 w-full overflow-hidden rounded-t-3xl">
              <Image
                src={m.image}
                alt={m.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Nome e função */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 rounded-b-3xl">
              <h2 className="text-2xl font-bold text-white">{m.name}</h2>
              <p className="text-gray-200 text-sm">{m.role}</p>
            </div>

            {/* Descrição deslizante */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{
                y: active === idx ? 0 : "100%",
              }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute bottom-0 left-0 w-full bg-white p-6 shadow-lg text-gray-800 h-52 flex flex-col justify-between rounded-t-3xl"
            >
              <p className="text-sm leading-relaxed">{m.description}</p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-blue-800" />
                  <span>{m.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-blue-800" />
                  <span>{m.phone}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
