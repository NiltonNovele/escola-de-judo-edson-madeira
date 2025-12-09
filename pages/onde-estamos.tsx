"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

type Dojo = {
  name: string;
  description: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
  mapsUrl: string;
};

export default function WhereWeAre() {
  const dojos: Dojo[] = [
    {
      name: "Clube Naval",
      description:
        "Sede administrativa do Instituto Reação. Localizado em São Conrado, o Polo Rocinha atende mais de 500 crianças e jovens. É uma das unidades mais avançadas no desenvolvimento das atividades do Programa Reação Educação.",
      address: "Rua Bertha Lutz, 84 – São Conrado, Rio de Janeiro – RJ, Brasil",
      phone: "+55 (21) 22450-290",
      hours: "2ª a 6ª feira – 08h às 12h e 13h às 18h",
      image: "/dojos/rocinha.jpg",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Rua+Bertha+Lutz,+84+São+Conrado+Rio+de+Janeiro",
    },
    {
      name: "Clube Naval",
      description:
        "Localizado no campus R9 da Universidade Estácio, o Polo CDD–Taquara atende mais de 400 jovens e crianças. É referência em treinamentos de alto rendimento do Programa Reação Olímpico.",
      address:
        "Universidade Estácio R9 – R. André Rocha, 838 – Taquara, Rio de Janeiro – RJ",
      phone: "+55 (21) 2234-8900",
      hours: "2ª a 6ª feira – 09h às 18h",
      image: "/dojos/taquara.jpg",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=R.+André+Rocha,+838+Taquara+Rio+de+Janeiro",
    },

    // ➕ add more dojos here following the same structure
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
          Conheça todos os nossos polos, espalhados pelo Rio de Janeiro, que
          promovem esporte, educação e desenvolvimento humano através do Judo.
        </p>
      </motion.div>

      {/* DOJO LIST */}
      <section className="max-w-6xl mx-auto px-6 mt-20 flex flex-col gap-20">
        {dojos.map((dojo, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`grid md:grid-cols-2 gap-10 items-center ${
              idx % 2 !== 0 ? "md:flex-row-reverse" : ""
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
