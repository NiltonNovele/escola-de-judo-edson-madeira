"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Building2 } from "lucide-react";

type Location = {
  name: string;
  description: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
  mapsUrl: string;
  type?: "location" | "branch";
};

export default function WhereWeAre() {
  const locations: Location[] = [
    {
      name: "Clube Naval de Maputo",
      description:
        "Dojo à beira-mar com estrutura completa para competidores. Ambiente único com vista para o oceano e instrutores experientes.",
      address: "Av. Marginal, 1866 – Maputo, Moçambique",
      phone: "+258 84 400 2050",
      hours: "Seg a Sex – 08h00 às 20h30 | Sáb – 08h00 às 10h00",
      image: "/images/onde-estamos/clube-naval.webp",
      mapsUrl:
        "https://www.google.com/maps/place/Clube+Naval+de+Maputo/@-25.976896,32.593408,17z/data=!3m1!4b1!4m6!3m5!1s0x1ee69bbd0d5d0209:0x5ac0f4dcc30c7fcb!8m2!3d-25.976896!4d32.5959829!16s%2Fg%2F11cmyrz1j7?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
      type: "location",
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
      type: "location",
    },

    {
      name: "Escola Portuguesa de Moçambique",
      description:
        "Espaço educativo onde promovemos o Judo como ferramenta de disciplina, desenvolvimento pessoal, inclusão e formação de crianças e jovens.",
      address: "Av. para o Palmar, nº 562 – Maputo, Moçambique",
      phone: "+258 84 400 2050",
      hours: "Seg a Sex – 08h00 às 20h30 | Sáb – 08h00 às 10h00",
      image: "https://i.postimg.cc/J43GX1mZ/images.jpg",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Escola+Portuguesa+de+Mo%C3%A7ambique+Maputo",
      type: "location",
    },

    {
      name: "Escola Americana de Moçambique",
      description:
        "Local dedicado à prática do Judo num ambiente internacional, promovendo disciplina, respeito, confiança e desenvolvimento físico.",
      address: "Rua do Rio Raraga, 266 – Maputo, Moçambique",
      phone: "+258 84 400 2050",
      hours: "Seg a Sex – 08h00 às 20h30 | Sáb – 08h00 às 10h00",
      image: "https://i.postimg.cc/CK9FttYt/images-(1).jpg",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=American+International+School+of+Mozambique+Maputo",
      type: "location",
    },

    {
      name: "Colégio Arco-Íris",
      description:
        "Espaço educativo onde o Judo contribui para o desenvolvimento físico, emocional e social das crianças e jovens.",
      address:
        "Av. Eduardo Mondlane, nº 130 – Praceta Heróis de Mocuba, Maputo",
      phone: "+258 84 400 2050",
      hours: "Seg a Sex – 08h00 às 20h30 | Sáb – 08h00 às 10h00",
      image: "https://i.postimg.cc/ncnn6qb8/images-(2).jpg",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Colegio+Arco-Iris+Maputo",
      type: "location",
    },

    {
      name: "Canadian Montessori Academy",
      description:
        "Espaço educativo com uma abordagem centrada no desenvolvimento integral das crianças, complementado pela prática do Judo.",
      address: "Av. Kenneth Kaunda, 940 – Maputo, Moçambique",
      phone: "+258 84 400 2050",
      hours: "Seg a Sex – 08h00 às 20h30 | Sáb – 08h00 às 10h00",
      image: "https://i.postimg.cc/fbSsxKXm/images-(3).jpg",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Canadian+Montessori+Academy+Maputo",
      type: "location",
    },

    {
      name: "Casa Colorida",
      description:
        "Espaço dedicado às crianças, onde o Judo é utilizado como ferramenta para estimular disciplina, coordenação, confiança e convivência.",
      address: "Maputo, Moçambique",
      phone: "+258 84 400 2050",
      hours: "Seg a Sex – 08h00 às 20h30 | Sáb – 08h00 às 10h00",
      image: "https://i.postimg.cc/tCrGwfNS/images-(4).jpg",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Casa+Colorida+Maputo+Mo%C3%A7ambique",
      type: "location",
    },

    {
      name: "Viva Melhor",
      description:
        "Núcleo dedicado à promoção do desenvolvimento e bem-estar através da prática do Judo e de actividades de carácter social.",
      address: "Maputo, Moçambique",
      phone: "+258 84 400 2050",
      hours: "Seg a Sex – 08h00 às 20h30 | Sáb – 08h00 às 10h00",
      image: "https://i.postimg.cc/h4pYtmzH/images.png",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Viva+Melhor+Maputo+Mo%C3%A7ambique",
      type: "location",
    },

    {
      name: "Mafalala",
      description:
        "Núcleo comunitário que leva o Judo para junto da comunidade, criando oportunidades de desenvolvimento, disciplina e inclusão através do desporto.",
      address: "Mafalala – Maputo, Moçambique",
      phone: "+258 84 400 2050",
      hours: "Seg a Sex – 08h00 às 20h30 | Sáb – 08h00 às 10h00",
      image: "https://i.postimg.cc/W3S5tRzT/mafalala-walking-tour-maputo-870x555.webp",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Mafalala+Maputo+Mo%C3%A7ambique",
      type: "location",
    },

    {
      name: "Vila Nova",
      description:
        "Sucursal da Escola de Judo Edson Madeira dedicada à expansão do acesso ao Judo e à formação de crianças e jovens.",
      address: "Vila Nova – Maputo, Moçambique",
      phone: "+258 84 400 2050",
      hours: "Seg a Sex – 08h00 às 20h30 | Sáb – 08h00 às 10h00",
      image: "https://i.postimg.cc/HxWtqS2j/Cinema-Montalto-Chimoio-JPG.webp",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Vila+Nova+Maputo+Mo%C3%A7ambique",
      type: "branch",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
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
          Conheça as localizações da Escola de Judo Edson Madeira em Maputo e
          saiba onde encontrar os nossos núcleos, treinos e programas de Judo.
        </p>
      </motion.div>

      {/* LOCATION COUNT */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-100 text-blue-900 px-5 py-3 rounded-full">
            <MapPin size={19} />
            <span className="font-semibold">
              {locations.length} locais e sucursais
            </span>
          </div>
        </div>
      </div>

      {/* LOCATIONS */}
      <section className="max-w-6xl mx-auto px-6 mt-14 flex flex-col gap-20 overflow-x-hidden">
        {locations.map((dojo, idx) => (
          <motion.div
            key={idx}
            initial={{
              opacity: 0,
              x: idx % 2 === 0 ? -30 : 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            {/* IMAGE */}
            <div
              className={`relative w-full h-72 rounded-2xl overflow-hidden shadow-md min-w-0 ${
                idx % 2 !== 0 ? "md:order-2" : ""
              }`}
            >
              <Image
                src={dojo.image}
                alt={dojo.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />

              {/* LOCATION TYPE */}
              {dojo.type === "branch" && (
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold">
                    <Building2 size={16} />
                    Sucursal
                  </div>
                </div>
              )}
            </div>

            {/* TEXT BLOCK */}
            <div
              className={`min-w-0 ${
                idx % 2 !== 0 ? "md:order-1" : ""
              }`}
            >
              {/* LOCATION TYPE LABEL */}
              <div className="mb-3">
                {dojo.type === "branch" ? (
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 uppercase tracking-wide">
                    <Building2 size={16} />
                    Sucursal
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 uppercase tracking-wide">
                    <MapPin size={16} />
                    Localização
                  </span>
                )}
              </div>

              <h2 className="text-3xl font-bold text-blue-900 mb-3">
                {dojo.name}
              </h2>

              <p className="text-gray-700 leading-relaxed mb-5">
                {dojo.description}
              </p>

              {/* ADDRESS */}
              <div className="flex items-start gap-3 mt-4">
                <MapPin className="text-blue-700 w-6 h-6 flex-shrink-0 mt-0.5" />
                <p className="text-gray-800">{dojo.address}</p>
              </div>

              {/* PHONE */}
              <div className="flex items-start gap-3 mt-3">
                <Phone className="text-blue-700 w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-gray-800">{dojo.phone}</p>
              </div>

              {/* HOURS */}
              <div className="flex items-start gap-3 mt-3">
                <Clock className="text-blue-700 w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-gray-800">{dojo.hours}</p>
              </div>

              {/* BUTTON */}
              <a
                href={dojo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                <MapPin size={18} />
                Ver Direções
              </a>
            </div>
          </motion.div>
        ))}
      </section>

      {/* FOOTER */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
