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
    name: "Dia do Pai",
    date: "2026-03-19",
    location: "Casa Colorida Creche e Pré-Escola",
    status: "Concluída",
    description:
      "O Dia do Pai foi celebrado da melhor forma: juntos no tatami 👨‍👧‍👦🥋",
    details:
      "Mais do que uma aula, foi um momento de união, aprendizagem e valores que ficam para a vida: respeito, confiança e exemplo. Ser pai é liderar com o coração. Ser filho é crescer com inspiração. Obrigado a todas as famílias que fizeram deste dia algo especial!",
    images: ["/extras/pai.png", "/extras/pai.png", "/extras/pai.png"],
  },
];

export default function ActivitiesPage() {
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(
    null
  );
  const [currentImage, setCurrentImage] = useState(0);

  const handleNextImage = () => {
    if (!selectedActivity) return;
    setCurrentImage((prev) => (prev + 1) % selectedActivity.images.length);
  };

  const handlePrevImage = () => {
    if (!selectedActivity) return;
    setCurrentImage(
      (prev) =>
        (prev - 1 + selectedActivity.images.length) %
        selectedActivity.images.length
    );
  };

  const closeModal = () => {
    setSelectedActivity(null);
    setCurrentImage(0);
  };

  const getStatusClasses = (status: ActivityType["status"]) => {
    if (status === "Em Breve") {
      return "bg-green-100 text-green-700 border border-green-200";
    }

    if (status === "Concluída") {
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
            Actividades
          </h1>

          <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Conheça algumas das actividades da Escola de Judo Edson Madeira.
            Clique em cada card para ver mais detalhes, imagens e informações do
            evento.
          </p>
        </div>
      </section>

      {/* ACTIVITIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {activitiesData.map((activity, index) => (
            <button
              key={activity.id}
              type="button"
              className="text-left bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300 group"
              onClick={() => {
                setSelectedActivity(activity);
                setCurrentImage(0);
              }}
            >
              <div className="relative w-full h-60 sm:h-64 overflow-hidden">
                <Image
                  src={activity.images[index % activity.images.length]}
                  alt={activity.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusClasses(
                    activity.status
                  )}`}
                >
                  {activity.status}
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-3">
                <h3 className="text-xl font-bold text-blue-900 leading-snug">
                  {activity.name}
                </h3>

                <div className="flex items-center text-gray-600 text-sm gap-2">
                  <Calendar size={16} className="shrink-0" />
                  <span>
                    {new Date(activity.date).toLocaleDateString("pt-PT")}
                  </span>
                </div>

                <div className="flex items-start text-gray-600 text-sm gap-2">
                  <MapPin size={16} className="shrink-0 mt-0.5" />
                  <span>{activity.location}</span>
                </div>

                <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed line-clamp-3 pt-1">
                  {activity.description}
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

      {/* ACTIVITY DETAILS MODAL */}
      {selectedActivity && (
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
                src={selectedActivity.images[currentImage]}
                alt={selectedActivity.name}
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {selectedActivity.images.length > 1 && (
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
                    {selectedActivity.images.map((_, index) => (
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
                    {selectedActivity.name}
                  </h2>
                  <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">
                    {selectedActivity.description}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${getStatusClasses(
                    selectedActivity.status
                  )}`}
                >
                  {selectedActivity.status}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
                  <div className="flex items-center gap-2 text-blue-900 font-semibold mb-1">
                    <Calendar size={16} />
                    <span>Data</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {new Date(selectedActivity.date).toLocaleDateString("pt-PT")}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-4">
                  <div className="flex items-center gap-2 text-blue-900 font-semibold mb-1">
                    <MapPin size={16} />
                    <span>Local</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {selectedActivity.location}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 p-5 bg-white">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  Mais detalhes
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {selectedActivity.details}
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