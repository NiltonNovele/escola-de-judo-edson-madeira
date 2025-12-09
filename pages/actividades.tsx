"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Calendar, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";

type ActivityType = {
  id: number;
  name: string;
  date: string;
  location: string;
  status: "Concluída" | "Em Breve" | "Cancelada";
  description: string;
  details: string;
  images: string[];
};

const activitiesData: ActivityType[] = [
  {
    id: 1,
    name: "Marcha Solidária",
    date: "2025-12-15",
    location: "Praça Central, Maputo",
    status: "Em Breve",
    description: "Marcha para promoção da solidariedade e união comunitária.",
    details:
      "Participe da Marcha Solidária com membros da comunidade e voluntários, promovendo a inclusão e apoio social.",
    images: ["/logo.png", "/logo.png", "/logo.png"],
  },
  {
    id: 2,
    name: "Voluntariado Ambiental",
    date: "2025-11-20",
    location: "Parque Natural Maputo",
    status: "Concluída",
    description: "Atividade de preservação ambiental e limpeza de espaços verdes.",
    details:
      "Voluntários ajudarão a recolher lixo, plantar árvores e promover a educação ambiental local.",
    images: ["/logo.png", "/logo.png", "/logo.png"],
  },
  {
    id: 3,
    name: "Serviço Comunitário",
    date: "2025-12-05",
    location: "Centro Comunitário Bairro B",
    status: "Cancelada",
    description: "Atividades de apoio à comunidade local.",
    details:
      "Atividade cancelada devido a imprevistos. Próximas oportunidades serão anunciadas em breve.",
    images: ["/logo.png", "/logo.png", "/logo.png"],
  },
  {
    id: 4,
    name: "Atividades ao Ar Livre",
    date: "2025-12-10",
    location: "Parque da Cidade",
    status: "Em Breve",
    description: "Jogo e treino de Judo em ambiente externo.",
    details:
      "Atividades lúdicas e treino de Judo para crianças e jovens, aproveitando a natureza para aprendizagem e diversão.",
    images: ["/logo.png", "/logo.png", "/logo.png"],
  },
  {
    id: 5,
    name: "Campanha de Doação de Sangue",
    date: "2025-12-18",
    location: "Hospital Central de Maputo",
    status: "Em Breve",
    description: "Evento de voluntariado para doação de sangue.",
    details:
      "Participe da campanha, ajude a salvar vidas e aprenda sobre a importância do voluntariado na comunidade.",
    images: ["/logo.png", "/logo.png", "/logo.png"],
  },
  {
    id: 6,
    name: "Workshop de Educação Comunitária",
    date: "2025-12-22",
    location: "Auditório Central",
    status: "Concluída",
    description: "Oficinas de formação e capacitação para jovens.",
    details:
      "Workshops educativos sobre cidadania, ética e habilidades sociais para a comunidade jovem.",
    images: ["/logo.png", "/logo.png", "/logo.png"],
  },
];

export default function ActivitiesPage() {
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNextImage = () => {
    if (selectedActivity) setCurrentImage((prev) => (prev + 1) % selectedActivity.images.length);
  };

  const handlePrevImage = () => {
    if (selectedActivity) setCurrentImage((prev) => (prev - 1 + selectedActivity.images.length) % selectedActivity.images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HEADER */}
      <div className="text-center pt-32 px-4">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">Actividades</h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
          Conheça as atividades da Escola de Judo Edson Madeira. Clique em cada card para mais detalhes.
        </p>
      </div>

      {/* ACTIVITIES GRID */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activitiesData.map((activity, index) => (
          <div
            key={activity.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border cursor-pointer hover:shadow-2xl transition relative group"
            onClick={() => {
              setSelectedActivity(activity);
              setCurrentImage(0);
            }}
          >
            <div className="relative w-full h-56">
              <Image
                src={activity.images[index % activity.images.length]}
                alt={activity.name}
                fill
                className="object-cover"
              />
              <span
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white shadow ${
                  activity.status === "Em Breve"
                    ? "bg-green-600"
                    : activity.status === "Concluída"
                    ? "bg-gray-500"
                    : "bg-red-600"
                }`}
              >
                {activity.status}
              </span>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-bold text-blue-900">{activity.name}</h3>
              <div className="flex items-center text-gray-600 text-sm gap-3">
                <Calendar size={16} />
                <span>{new Date(activity.date).toLocaleDateString("pt-PT")}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm gap-3">
                <MapPin size={16} />
                <span>{activity.location}</span>
              </div>
              <p className="text-gray-700 text-sm mt-2 line-clamp-3">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ACTIVITY DETAILS MODAL */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-50"
              onClick={() => setSelectedActivity(null)}
            >
              <X size={28} />
            </button>

            {/* Image Carousel */}
            <div className="relative w-full h-64">
              <Image
                src={selectedActivity.images[currentImage]}
                alt={selectedActivity.name}
                fill
                className="object-cover rounded-t-2xl"
              />
              {selectedActivity.images.length > 1 && (
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
              <h2 className="text-2xl font-bold text-blue-900">{selectedActivity.name}</h2>
              <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
                <Calendar size={16} />
                <span>{new Date(selectedActivity.date).toLocaleDateString("pt-PT")}</span>
                <MapPin size={16} />
                <span>{selectedActivity.location}</span>
              </div>
              <p className="text-gray-700">{selectedActivity.details}</p>
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
