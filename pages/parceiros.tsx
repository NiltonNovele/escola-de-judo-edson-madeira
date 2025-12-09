"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { motion } from "framer-motion";

// Dynamic colors for each section
const sectionColors: Record<string, string> = {
  "Faixas-Preta": "text-black border-black",
  "Faixas-Roxa": "text-purple-700 border-purple-700",
  "Faixas-Laranja": "text-orange-500 border-orange-500",
  "Faixas-Cinza": "text-gray-600 border-gray-600",
  Escolas: "text-blue-700 border-blue-700",
  Projetos: "text-green-700 border-green-700",
  Cursos: "text-red-600 border-red-600",
  Universidades: "text-indigo-700 border-indigo-700",
  "Apoio Jurídico": "text-rose-700 border-rose-700",
};

type Partner = {
  name: string;
  logo: string;
};

type Section = {
  title: string;
  partners: Partner[];
};

export default function Parceiros() {
  const sections: Section[] = [
    {
      title: "Faixas-Preta",
      partners: [
        { name: "Via Appia", logo: "/partners/via-appia.png" },
        { name: "Estácio", logo: "/partners/estacio.png" },
        { name: "Instituto YDUQS", logo: "/partners/yduqs.png" },
        { name: "Vale", logo: "/partners/vale.png" },
        { name: "Rede Itaú", logo: "/partners/rede-itau.png" },
        { name: "Allos", logo: "/partners/allos.png" },
        { name: "IBM", logo: "/partners/ibm.png" },
        { name: "Shell", logo: "/partners/shell.png" },
        { name: "PRIO", logo: "/partners/prio.png" },
        { name: "BV", logo: "/partners/bv.png" },
        { name: "Stone", logo: "/partners/stone.png" },
        { name: "Sucrilhos", logo: "/partners/sucrilhos.png" },
      ],
    },

    {
      title: "Faixas-Roxa",
      partners: [
        { name: "Parceiro 1", logo: "/partners/example1.png" },
        { name: "Parceiro 2", logo: "/partners/example2.png" },
      ],
    },

    {
      title: "Faixas-Laranja",
      partners: [
        { name: "Parceiro 3", logo: "/partners/example3.png" },
        { name: "Parceiro 4", logo: "/partners/example4.png" },
      ],
    },

    {
      title: "Faixas-Cinza",
      partners: [{ name: "Parceiro 5", logo: "/partners/example5.png" }],
    },

    {
      title: "Escolas",
      partners: [
        { name: "Escola A", logo: "/partners/school-a.png" },
        { name: "Escola B", logo: "/partners/school-b.png" },
      ],
    },

    {
      title: "Projetos",
      partners: [{ name: "Projeto X", logo: "/partners/projeto-x.png" }],
    },

    {
      title: "Cursos",
      partners: [{ name: "Curso Y", logo: "/partners/curso-y.png" }],
    },

    {
      title: "Universidades",
      partners: [{ name: "Universidade Z", logo: "/partners/universidade-z.png" }],
    },

    {
      title: "Apoio Jurídico",
      partners: [{ name: "Advocacia ABC", logo: "/partners/adv-abc.png" }],
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
        className="pt-32 text-center px-6"
      >
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">Parceiros</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Conheça os parceiros que apoiam e fortalecem o Instituto Reação.
        </p>
      </motion.div>

      {/* SECTIONS */}
      <div className="max-w-7xl mx-auto px-6 mt-20 flex flex-col gap-28 pb-28">
        {sections.map((section, idx) => {
          const colorClass = sectionColors[section.title] || "text-blue-900";

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* SECTION TITLE */}
              <div className="text-center mb-12">
                <h2
                  className={`text-4xl font-extrabold ${colorClass} inline-block pb-2 border-b-4`}
                >
                  {section.title}
                </h2>
              </div>

              {/* LOGOS GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
                {section.partners.map((partner, pIdx) => (
                  <motion.div
                    key={pIdx}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center p-6 bg-gray-50 rounded-2xl shadow-sm 
                               hover:shadow-xl hover:bg-gray-100 transition-all duration-300"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={180}
                      height={90}
                      className="object-contain hover:brightness-110 transition-all duration-300"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
