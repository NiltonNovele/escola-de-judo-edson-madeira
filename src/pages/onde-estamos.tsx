"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

type Location = {
  name: string;
  description: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
  mapsUrl: string;
};

export default function WhereWeAre() {
  const locations: Location[] = [
    {
      name: "Escola de Judo Edson Madeira",
      description:
        "Nosso tatami em Maputo, onde oferecemos aulas regulares de Judo para crianças, jovens e adultos com foco em disciplina, respeito e transformação social.",
      address: "Rua de Mukumbura 367 R/c – Maputo, Moçambique",
      phone: "+258 84 400 2050",
      hours: "Seg a Sex – 09h00 às 18h00 | Sáb – 10h00 às 16h00",
      image: "/images/onde-estamos/tatami.jpeg",
      mapsUrl:
        "https://www.google.com/maps/place/Escola+de+Judo+Edson+Madeira/@-25.9696599,32.5732252,15z/data=!3m1!4b1!4m6!3m5!1s0x1ee69b6b37dcfea7:0x679540bcd88d7048!8m2!3d-25.9696611!4d32.5916792!16s%2Fg%2F11swv9ywgk?entry=ttu&g_ep=EgoyMDI2MDUyNi4wIKXMDSoASAFQAw%3D%3D",
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
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
          Onde Estamos
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Conheça a localização da Escola de Judo Edson Madeira em Maputo e saiba
          como chegar ao nosso tatami para treinos regulares e programas de Judo.
        </p>
      </motion.div>

      {/* DOJO LIST */}
      <section className="max-w-6xl mx-auto px-6 mt-20 flex flex-col gap-20">
        {locations.map((dojo, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`grid md:grid-cols-2 gap-10 items-center ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
          >
            {/* IMAGE */}
            <div className="relative h-72 rounded-xl overflow-hidden shadow-md">
              <Image
                src={dojo.image}
                alt={dojo.name}
                fill
                className="object-cover"
              />
            </div>

            {/* TEXT BLOCK */}
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-3">
                {dojo.name}
              </h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                {dojo.description}
              </p>

              {/* ADDRESS */}
              <div className="flex items-start gap-3 mt-4">
                <MapPin className="text-blue-700 w-6 h-6" />
                <p className="text-gray-800">{dojo.address}</p>
              </div>

              {/* PHONE */}
              <div className="flex items-start gap-3 mt-3">
                <Phone className="text-blue-700 w-5 h-5" />
                <p className="text-gray-800">{dojo.phone}</p>
              </div>

              {/* HOURS */}
              <div className="flex items-start gap-3 mt-3">
                <Clock className="text-blue-700 w-5 h-5" />
                <p className="text-gray-800">{dojo.hours}</p>
              </div>

              {/* BUTTON */}
              <a
                href={dojo.mapsUrl}
                target="_blank"
                className="inline-block mt-6 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Ver Direções
              </a>
            </div>
          </motion.div>
        ))}
      </section>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}