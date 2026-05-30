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
      name: "Clube Naval de Maputo",
      description:
        "Dojo à beira-mar com estrutura completa para competidores. Ambiente único com vista para o oceano e instrutores experientes.",
      address: " Av. Marginal, 1866 – Maputo, Moçambique",
      phone: "+258 84 400 2050",
      hours: "Seg a Sex – 08h00 às 20h30 | Sáb – 08h00 às 10h00",
      image: "/images/onde-estamos/clube-naval.webp",
      mapsUrl:
        "https://www.google.com/maps/place/Clube+Naval+de+Maputo/@-25.976896,32.593408,17z/data=!3m1!4b1!4m6!3m5!1s0x1ee69bbd0d5d0209:0x5ac0f4dcc30c7fcb!8m2!3d-25.976896!4d32.5959829!16s%2Fg%2F11cmyrz1j7?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Escola Primária Filipe Samuel Magaia",
      description:
        "Centro comunitário dedicado a transformar vidas através do Judo, tornando a arte marcial acessível a crianças e jovens.",
      address: "Av. Karl Marx – Maputo, Moçambique",
      phone: "+258 84 400 2050",
      hours: "Seg a Sex – 08h00 às 20h30 | Sáb – 08h00 às 10h00",
      image: "/images/onde-estamos/escola-fsm.jpg",
      mapsUrl:
        "https://www.google.com/maps/place/Escola+Prim%C3%A1ria+7+de+Setembro+Felipe+Samuel+Magaia,+Av.+Marien+Ngouabi,+Maputo/@-25.959035,32.5781723,18.61z/data=!4m9!1m2!2m1!1sEscola+Prim%C3%A1ria+Completa+7+De+Setembro!3m5!1s0x1ee69affac42fedd:0xf7c9277bd40aeb91!8m2!3d-25.9591997!4d32.5798691!16s%2Fg%2F11bvtfznjm?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
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
      <section className="max-w-6xl mx-auto px-6 mt-12 flex flex-col gap-20">
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