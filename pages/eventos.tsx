"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import {
  Calendar,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type EventType = {
  id: number;
  name: string;
  date: string;
  location: string;
  status: "Passado" | "Em Breve" | "Cancelado";
  description: string;
  details: string;
  images: string[];
};

const eventsData: EventType[] = [
  {
    id: 1,
    name: "Campeonato de Judo 2025",
    date: "2025-12-20",
    location: "Maputo Arena",
    status: "Em Breve",
    description: "Competição anual de Judo para atletas de todos os níveis.",
    details:
      "O Campeonato de Judo 2025 contará com várias categorias de peso e idade. Haverá premiações especiais e atividades para toda a família.",
    images: ["/logo.png", "/logo.png", "/logo.png"],
  },
  {
    id: 2,
    name: "Treino Comunitário",
    date: "2025-11-10",
    location: "Centro Comunitário Bairro A",
    status: "Passado",
    description: "Treino especial aberto para a comunidade local.",
    details:
      "Treino aberto com orientação de nossos professores, focado em crianças e jovens iniciantes. Trazer kimono e boa energia!",
    images: ["/logo.png", "/logo.png", "/logo.png"],
  },
  {
    id: 3,
    name: "Workshop de Técnicas Avançadas",
    date: "2025-12-05",
    location: "Dojo EJEM",
    status: "Cancelado",
    description: "Workshop avançado de Judo para atletas experientes.",
    details:
      "Infelizmente este evento foi cancelado devido a imprevistos. Fique atento às próximas datas!",
    images: ["/logo.png", "/logo.png", "/logo.png"],
  },
  {
    id: 4,
    name: "Exibição de Judo Infantil",
    date: "2025-12-12",
    location: "Ginásio Municipal",
    status: "Em Breve",
    description: "Exibição das crianças em atividades de Judo.",
    details:
      "Venha prestigiar as crianças em uma demonstração das técnicas aprendidas ao longo do ano.",
    images: ["/logo.png", "/logo.png", "/logo.png"],
  },
  {
    id: 5,
    name: "Treino Intensivo de Faixa-Preta",
    date: "2025-11-25",
    location: "Dojo EJEM",
    status: "Passado",
    description: "Treino exclusivo para atletas avançados.",
    details:
      "Treino intensivo com foco em técnicas avançadas e preparação para competições futuras.",
    images: ["/logo.png", "/logo.png", "/logo.png"],
  },
  {
    id: 6,
    name: "Seminário de Judo e Disciplina",
    date: "2025-12-18",
    location: "Auditório Central",
    status: "Em Breve",
    description: "Seminário sobre ética, disciplina e Judo.",
    details:
      "Seminário aberto a todos os membros e interessados para aprender sobre a filosofia do Judo e sua aplicação no dia a dia.",
    images: ["/logo.png", "/logo.png", "/logo.png"],
  },
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNextImage = () => {
    if (!selectedEvent) return;
    setCurrentImage((prev) => (prev + 1) % selectedEvent.images.length);
  };

  const handlePrevImage = () => {
    if (!selectedEvent) return;
    setCurrentImage(
      (prev) =>
        (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length
    );
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setCurrentImage(0);
  };

  const getStatusClasses = (status: EventType["status"]) => {
    if (status === "Em Breve") {
      return "bg-green-100 text-green-700 border border-green-200";
    }

    if (status === "Passado") {
      return "bg-blue-100 text-blue-800 border border-blue-200";
    }

    return "bg-red-100 text-red-700 border border-red-200";
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* HEADER */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full bg-blue-100 text-blue-900 px-4 py-2 text-sm font-semibold mb-5">
            Escola de Judo Edson Madeira
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-900 tracking-tight mb-4">
            Eventos
          </h1>

          <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Fique por dentro dos eventos da Escola de Judo Edson Madeira.
            Clique em cada card para ver mais detalhes, imagens e informações do
            evento.
          </p>
        </div>
      </section>
      {/* EVENTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {eventsData.map((event, index) => (
            <button
              key={event.id}
              type="button"
              className="text-left bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300 group"
              onClick={() => {
                setSelectedEvent(event);
                setCurrentImage(0);
              }}
            >
              <div className="relative w-full h-60 sm:h-64 overflow-hidden">
                <Image
                  src={event.images[index % event.images.length]}
                  alt={event.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusClasses(
                    event.status
                  )}`}
                >
                  {event.status}
                </span>
              </div>
              <div className="p-5 sm:p-6 space-y-3">
                <h3 className="text-xl font-bold text-blue-900 leading-snug">
                  {event.name}
                </h3>
                <div className="flex items-center text-gray-600 text-sm gap-2">
                  <Calendar size={16} className="shrink-0" />
                  <span>{new Date(event.date).toLocaleDateString("pt-PT")}</span>
                </div>
                <div className="flex items-start text-gray-600 text-sm gap-2">
                  <MapPin size={16} className="shrink-0 mt-0.5" />
                  <span>{event.location}</span>
                </div>
                <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed line-clamp-3 pt-1">
                  {event.description}
                </p>
                <div className="pt-2">
                  <span className="inline-flex text-sm font-semibold text-blue-900">
                    Ver detalhes →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
      {/* EVENT DETAILS MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative animate-fadeIn max-h-[95vh] sm:max-h-[90vh] flex flex-col">
            <button
              className="absolute top-4 right-4 text-white bg-black/35 hover:bg-black/50 transition rounded-full p-2 z-50"
              onClick={closeModal}
            >
              <X size={22} />
            </button>
            {/* Image Carousel */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 flex-shrink-0">
              <Image
                src={selectedEvent.images[currentImage]}
                alt={selectedEvent.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {selectedEvent.images.length > 1 && (
                <>
                  <button
                    className="absolute top-1/2 left-3 sm:left-4 -translate-y-1/2 bg-black/35 rounded-full p-2 hover:bg-black/55 transition"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft size={22} className="text-white" />
                  </button>
                  <button
                    className="absolute top-1/2 right-3 sm:right-4 -translate-y-1/2 bg-black/35 rounded-full p-2 hover:bg-black/55 transition"
                    onClick={handleNextImage}
                  >
                    <ChevronRight size={22} className="text-white" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedEvent.images.map((_, index) => (
                      <span
                        key={index}
                        className={`h-2.5 rounded-full transition-all ${
                          currentImage === index
                            ? "w-6 bg-white"
                            : "w-2.5 bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="p-5 sm:p-6 md:p-8 space-y-5 overflow-y-auto">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">
                    {selectedEvent.name}
                  </h2>
                  <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${getStatusClasses(
                    selectedEvent.status
                  )}`}
                >
                  {selectedEvent.status}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
                  <div className="flex items-center gap-2 text-blue-900 font-semibold mb-1">
                    <Calendar size={16} />
                    <span>Data</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {new Date(selectedEvent.date).toLocaleDateString("pt-PT")}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-4">
                  <div className="flex items-center gap-2 text-blue-900 font-semibold mb-1">
                    <MapPin size={16} />
                    <span>Local</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {selectedEvent.location}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 p-5 bg-white">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  Mais detalhes
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {selectedEvent.details}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
      }
      `}</style>
    </div>
  );
}