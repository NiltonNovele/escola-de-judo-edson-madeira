"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Calendar, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";

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
    if (selectedEvent) setCurrentImage((prev) => (prev + 1) % selectedEvent.images.length);
  };

  const handlePrevImage = () => {
    if (selectedEvent) setCurrentImage((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HEADER */}
      <div className="text-center pt-32 px-4">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">Eventos</h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
          Fique por dentro dos eventos da Escola de Judo Edson Madeira. Clique em cada card para mais detalhes.
        </p>
      </div>

      {/* EVENTS GRID */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventsData.map((event, index) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border cursor-pointer hover:shadow-2xl transition relative group"
            onClick={() => {
              setSelectedEvent(event);
              setCurrentImage(0);
            }}
          >
            <div className="relative w-full h-56">
              <Image
                src={event.images[index % event.images.length]}
                alt={event.name}
                fill
                className="object-cover"
              />
              <span
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white shadow ${
                  event.status === "Em Breve"
                    ? "bg-green-600"
                    : event.status === "Passado"
                    ? "bg-gray-500"
                    : "bg-red-600"
                }`}
              >
                {event.status}
              </span>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-bold text-blue-900">{event.name}</h3>
              <div className="flex items-center text-gray-600 text-sm gap-3">
                <Calendar size={16} />
                <span>{new Date(event.date).toLocaleDateString("pt-PT")}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm gap-3">
                <MapPin size={16} />
                <span>{event.location}</span>
              </div>
              <p className="text-gray-700 text-sm mt-2 line-clamp-3">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* EVENT DETAILS MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-50"
              onClick={() => setSelectedEvent(null)}
            >
              <X size={28} />
            </button>

            {/* Image Carousel */}
            <div className="relative w-full h-64">
              <Image
                src={selectedEvent.images[currentImage]}
                alt={selectedEvent.name}
                fill
                className="object-cover rounded-t-2xl"
              />
              {selectedEvent.images.length > 1 && (
                <>
                  <button
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-2 hover:bg-opacity-50 transition"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft size={24} className="text-white" />
                  </button>
                  <button
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-2 hover:bg-opacity-50 transition"
                    onClick={handleNextImage}
                  >
                    <ChevronRight size={24} className="text-white" />
                  </button>
                </>
              )}
            </div>

            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-blue-900">{selectedEvent.name}</h2>
              <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
                <Calendar size={16} />
                <span>{new Date(selectedEvent.date).toLocaleDateString("pt-PT")}</span>
                <MapPin size={16} />
                <span>{selectedEvent.location}</span>
              </div>
              <p className="text-gray-700">{selectedEvent.details}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

/* Smooth fade-in animation */
<style jsx global>{`
  .animate-fadeIn {
    animation: fadeIn 0.25s ease-in-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`}</style>
