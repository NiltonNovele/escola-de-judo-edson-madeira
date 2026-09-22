"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import type { GetStaticProps } from "next";
import { API_BASE, resolveUploadedImage } from "../lib/api";

type Member = {
  name: string;
  role: string;
  image: string;
};

const FALLBACK_TEAM: Member[] = [
  {
    name: "Edson Madeira OLY",
    role: "Fundador e Professor",
    image: "/edson.jpeg",
  },
  {
    name: "Antonio Muhai",
    role: "Monitor de Judo",
    image: "/antonio.jpeg",
  },
  {
    name: "Kevin Loforte OLY",
    role: "Professor de Judo",
    image: "/kevin.jpeg",
  },
  {
    name: "Marcelino Manjate",
    role: "Professor de Judo",
    image: "/marcelino.jpeg",
  },
  {
    name: "Ayton Siquir",
    role: "Professor de Judo",
    image: "/ayton.jpeg",
  },
  {
    name: "Nicolau Boudou",
    role: "Professor de Judo",
    image: "/nicolau.jpeg",
  },
  {
    name: "Mariano Cassiano",
    role: "Monitor de Judo",
    image: "/mariano.jpeg",
  },
];

export const getStaticProps: GetStaticProps<{ team: Member[] }> = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/team`);
    const body = await res.json();

    if (!res.ok || !Array.isArray(body?.data)) {
      throw new Error("Invalid team response");
    }

    const team: Member[] = body.data.map(
      (member: Member & { image: string }) => ({
        ...member,
        image: resolveUploadedImage(member.image),
      })
    );

    return { props: { team }, revalidate: 60 };
  } catch {
    return { props: { team: FALLBACK_TEAM }, revalidate: 60 };
  }
};

export default function Equipe({ team }: { team: Member[] }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 text-center px-6"
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
      <section className="max-w-7xl mx-auto px-6 mt-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-28">
        {team.map((m, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative bg-white rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-500"
          >
            {/* Imagem */}
            <div className="relative h-96 w-full overflow-hidden rounded-t-3xl">
              <Image
                src={m.image}
                alt={m.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Nome e função */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 rounded-b-3xl">
              <h2 className="text-2xl font-bold text-white">
                {m.name}
              </h2>

              <p className="text-gray-200 text-sm mt-1">
                {m.role}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
