"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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

  video?: string;
  images?: string[];
};

const eventsData: EventType[] = [
  {
    id: 1,
    name: "Martial Fest 2017",
    date: "2017-10-07",
    location: "Maputo",
    status: "Passado",
    description: "Participação da escola na 1ª Edição do Martial Fest.",
    details: "Evento dedicado às artes marciais com demonstrações, competições e actividades para o público.",
    video: "/videos/martial-fest.mp4"
  },
  {
    id: 2,
    name: "Martial Fest 2022",
    date: "2022-12-20",
    location: "Maputo",
    status: "Passado",
    description: "Participação da escola na 3ª Edição do Martial Fest.",
    details:
      "Evento dedicado às artes marciais com demonstrações, competições e actividades para o público.",
    images: [
      "/images/martial-fest-2022/image00004.jpeg",
      "/images/martial-fest-2022/image00005.jpeg",
      "/images/martial-fest-2022/image00006.jpeg",
      "/images/martial-fest-2022/image00007.jpeg",
      "/images/martial-fest-2022/image00008.jpeg",
      "/images/martial-fest-2022/image00009.jpeg",
      "/images/martial-fest-2022/image00009.jpg",
      "/images/martial-fest-2022/image00010.jpeg",
      "/images/martial-fest-2022/image00010.jpg",
      "/images/martial-fest-2022/image00011.jpeg",
      "/images/martial-fest-2022/image00011.jpg",
      "/images/martial-fest-2022/image00012.jpeg",
      "/images/martial-fest-2022/image00012.jpg",
      "/images/martial-fest-2022/image00013.jpeg",
      "/images/martial-fest-2022/image00013.jpg",
      "/images/martial-fest-2022/image00014.jpeg",
      "/images/martial-fest-2022/image00014.jpg",
      "/images/martial-fest-2022/image00015.jpeg",
      "/images/martial-fest-2022/image00015.jpg",
      "/images/martial-fest-2022/image00016.jpeg",
      "/images/martial-fest-2022/image00016.jpg",
      "/images/martial-fest-2022/image00017.jpeg",
      "/images/martial-fest-2022/image00017.jpg",
      "/images/martial-fest-2022/image00018.jpeg",
      "/images/martial-fest-2022/image00018.jpg",
      "/images/martial-fest-2022/image00019.jpeg",
      "/images/martial-fest-2022/image00019.jpg",
      "/images/martial-fest-2022/image00020.jpeg",
      "/images/martial-fest-2022/image00020.jpg",
      "/images/martial-fest-2022/image00021.jpeg",
      "/images/martial-fest-2022/image00021.jpg",
      "/images/martial-fest-2022/image00022.jpeg",
      "/images/martial-fest-2022/image00022.jpg",
      "/images/martial-fest-2022/image00023.jpeg",
      "/images/martial-fest-2022/image00023.jpg",
      "/images/martial-fest-2022/image00024.jpeg",
      "/images/martial-fest-2022/image00024.jpg",
      "/images/martial-fest-2022/image00025.jpg",
      "/images/martial-fest-2022/image00026.jpg",
      "/images/martial-fest-2022/image00027.jpg",
      "/images/martial-fest-2022/image00028.jpg",
      "/images/martial-fest-2022/image00029.jpg",
      "/images/martial-fest-2022/image00030.jpg",
      "/images/martial-fest-2022/image00031.jpg",
      "/images/martial-fest-2022/image00032.jpg",
      "/images/martial-fest-2022/image00033.jpg",
      "/images/martial-fest-2022/image00034.jpg",
      "/images/martial-fest-2022/image00035.jpg",
      "/images/martial-fest-2022/image00036.jpg",
      "/images/martial-fest-2022/image00037.jpg",
      "/images/martial-fest-2022/image00038.jpg",
      "/images/martial-fest-2022/image00039.jpg",
      "/images/martial-fest-2022/image00040.jpg",
      "/images/martial-fest-2022/image00041.jpg",
      "/images/martial-fest-2022/image00042.jpg",
      "/images/martial-fest-2022/image00043.jpg",
      "/images/martial-fest-2022/image00044.jpg",
      "/images/martial-fest-2022/image00045.jpg",
      "/images/martial-fest-2022/image00046.jpg",
      "/images/martial-fest-2022/image00047.jpg",
      "/images/martial-fest-2022/image00048.jpg",
      "/images/martial-fest-2022/image00049.jpg",
      "/images/martial-fest-2022/image00050.jpg",
      "/images/martial-fest-2022/image00051.jpg",
      "/images/martial-fest-2022/image00052.jpg",
      "/images/martial-fest-2022/image00053.jpg",
      "/images/martial-fest-2022/image00054.jpg",
      "/images/martial-fest-2022/image00055.jpg",
      "/images/martial-fest-2022/image00056.jpg",
      "/images/martial-fest-2022/image00057.jpg",
      "/images/martial-fest-2022/image00058.jpg",
      "/images/martial-fest-2022/image00059.jpg",
      "/images/martial-fest-2022/image00060.jpg",
      "/images/martial-fest-2022/image00061.jpg",
      "/images/martial-fest-2022/image00062.jpg",
      "/images/martial-fest-2022/image00063.jpg",
      "/images/martial-fest-2022/image00064.jpg",
      "/images/martial-fest-2022/image00065.jpg",
      "/images/martial-fest-2022/image00066.jpg",
      "/images/martial-fest-2022/image00067.jpg",
      "/images/martial-fest-2022/image00068.jpg",
      "/images/martial-fest-2022/image00069.jpg",
      "/images/martial-fest-2022/image00070.jpg",
      "/images/martial-fest-2022/image00071.jpg",
      "/images/martial-fest-2022/image00072.jpg",
      "/images/martial-fest-2022/image00073.jpg",
      "/images/martial-fest-2022/image00074.jpg",
      "/images/martial-fest-2022/image00075.jpg",
      "/images/martial-fest-2022/image00076.jpg",
      "/images/martial-fest-2022/image00077.jpg",
      "/images/martial-fest-2022/image00078.jpg",
      "/images/martial-fest-2022/image00079.jpg",
      "/images/martial-fest-2022/image00080.jpg",
      "/images/martial-fest-2022/image00081.jpg",
      "/images/martial-fest-2022/image00082.jpg",
      "/images/martial-fest-2022/image00083.jpg",
      "/images/martial-fest-2022/image00084.jpg",
      "/images/martial-fest-2022/image00085.jpg",
      "/images/martial-fest-2022/image00087.jpg",
      "/images/martial-fest-2022/image00088.jpg",
      "/images/martial-fest-2022/image00089.jpg",
      "/images/martial-fest-2022/image00090.jpg",
      "/images/martial-fest-2022/image00091.jpg",
      "/images/martial-fest-2022/image00092.jpg",
      "/images/martial-fest-2022/image00093.jpg",
      "/images/martial-fest-2022/image00094.jpg",
      "/images/martial-fest-2022/image00095.jpg",
      "/images/martial-fest-2022/image00096.jpg",
      "/images/martial-fest-2022/image00097.jpg",
      "/images/martial-fest-2022/image00098.jpg",
      "/images/martial-fest-2022/image00099.jpg",
      "/images/martial-fest-2022/image00100.jpg",
      "/images/martial-fest-2022/image00101.jpg",
      "/images/martial-fest-2022/image00102.jpg",
      "/images/martial-fest-2022/image00103.jpg",
      "/images/martial-fest-2022/image00104.jpg",
      "/images/martial-fest-2022/image00105.jpg",
      "/images/martial-fest-2022/image00106.jpg",
      "/images/martial-fest-2022/image00107.jpg",
      "/images/martial-fest-2022/image00108.jpg",
      "/images/martial-fest-2022/image00109.jpg",
      "/images/martial-fest-2022/image00110.jpg",
      "/images/martial-fest-2022/image00111.jpg",
      "/images/martial-fest-2022/image00112.jpg",
      "/images/martial-fest-2022/image00113.jpg",
      "/images/martial-fest-2022/image00114.jpg",
      "/images/martial-fest-2022/image00115.jpg",
      "/images/martial-fest-2022/image00116.jpg",
      "/images/martial-fest-2022/image00117.jpg",
      "/images/martial-fest-2022/image00118.jpg"
    ],
  },
  {
    id: 3,
    name: "Dia Mundial do Judo",
    date: "2023-10-28",
    location: "Maputo",
    status: "Passado",
    description: "Maior aula de Judo de Moçambique.",
    details:
      "Actividades comemorativas, demonstrações e participação dos atletas da escola.",
    video: "/videos/dia-mundial-do-judo.mp4",
  },
  {
    id: 4,
    name: "Dia do Pai",
    date: "2026-03-19",
    location: "Casa Colorida Creche e Pré-Escola, Maputo",
    status: "Passado",
    description:
      "O Dia do Pai foi celebrado da melhor forma: juntos no tatami.",
    details:
      "Mais do que uma aula, foi um momento de união, aprendizagem e valores que ficam para a vida: respeito, confiança e exemplo. Ser pai é liderar com o coração. Ser filho é crescer com inspiração. Obrigado a todas as famílias que fizeram deste dia algo especial!",
    images: ["/images/dia-do-pai/pai.png"],
  },
  {
    id: 5,
    name: "Torneio Escolar de Judo",
    date: "2026-05-30",
    location: "Pavilhão da UEM, Maputo",
    status: "Passado",
    description:
      "O Torneio Escolar de Judo 2026 foi um evento emocionante que reuniu jovens talentos de várias escolas para competir e demonstrar suas habilidades no tatami.",
    details:
      "O torneio contou com a participação de atletas de diferentes faixas etárias e níveis de experiência, proporcionando uma oportunidade única para os jovens judocas mostrarem seu talento e espírito esportivo. Além das competições, o evento também incluiu demonstrações de técnicas, workshops e actividades educativas sobre o judo, promovendo a cultura do esporte e incentivando a prática saudável entre os estudantes.",
    images: [
      "/images/torneio-escolar/WhatsApp Image 2026-06-14 at 00.35.23.jpeg",
      "/images/torneio-escolar/WhatsApp Image 2026-06-14 at 00.35.24.jpeg",
      "/images/torneio-escolar/WhatsApp Image 2026-06-14 at 00.35.26 (1).jpeg",
      "/images/torneio-escolar/WhatsApp Image 2026-06-14 at 00.35.26.jpeg",
      "/images/torneio-escolar/WhatsApp Image 2026-06-14 at 00.35.27 (1).jpeg",
      "/images/torneio-escolar/WhatsApp Image 2026-06-14 at 00.35.27.jpeg",
      "/images/torneio-escolar/WhatsApp Image 2026-06-14 at 00.35.28 (1).jpeg",
      "/images/torneio-escolar/WhatsApp Image 2026-06-14 at 00.35.28 (2).jpeg",
      "/images/torneio-escolar/WhatsApp Image 2026-06-14 at 00.35.28.jpeg",
      "/images/torneio-escolar/WhatsApp Image 2026-06-14 at 00.35.29 (1).jpeg",
      "/images/torneio-escolar/WhatsApp Image 2026-06-14 at 00.35.29.jpeg",
      "/images/torneio-escolar/WhatsApp Image 2026-06-14 at 00.35.30 (1).jpeg",
      "/images/torneio-escolar/WhatsApp Image 2026-06-14 at 00.35.30 (2).jpeg",
      "/images/torneio-escolar/WhatsApp Image 2026-06-14 at 00.35.30.jpeg",
      "/images/torneio-escolar/WhatsApp Image 2026-06-14 at 00.35.31.jpeg"
    ],
  },
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [cardImages, setCardImages] = useState<Record<number, number>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCardImages((prev) => {
        const updated = { ...prev };

        eventsData.forEach((event) => {
          if (event.images?.length) {
            updated[event.id] =
              ((updated[event.id] ?? 0) + 1) % event.images.length;
          }
        });

        return updated;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!selectedEvent?.images?.length) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        (prev + 1) % selectedEvent.images!.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedEvent]);

  const handleNextImage = () => {
    if (!selectedEvent?.images) return;

    setCurrentImage(
      (prev) => (prev + 1) % selectedEvent.images!.length
    );
  };

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const handlePrevImage = () => {
    if (!selectedEvent?.images) return;

    setCurrentImage(
      (prev) =>
        (prev - 1 + selectedEvent.images!.length) %
        selectedEvent.images!.length
    );
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setCurrentImage(0);
    setGalleryOpen(false);
    setLightboxImage(null);
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
        <div className="mt-8 max-w-4xl mx-auto text-center">

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
          {eventsData.map((event) => (
            <button
              key={event.id}
              type="button"
              className="h-full flex flex-col text-left bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300 group"
              onClick={() => {
                setSelectedEvent(event);
                setCurrentImage(0);

                if (event.images?.length) {
                  setGalleryOpen(true);
                }
              }}
            >
              <div className="relative h-64 overflow-hidden">
                {event.video ? (
                  <video
                    src={event.video}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <Image
                    src={event.images?.[cardImages[event.id] ?? 0] || "/images/logo.png"}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex-1 p-5 sm:p-6 space-y-3">
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
      {selectedEvent && !galleryOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative animate-fadeIn max-h-[95vh] sm:max-h-[90vh] flex flex-col">
            <button
              type="button"
              className="absolute top-4 right-4 text-white bg-black/35 hover:bg-black/50 transition rounded-full p-2 z-50"
              onClick={closeModal}
            >
              <X size={22} />
            </button>
            {/* Video/Image Carousel */}
            {selectedEvent.video ? (
              <div className="relative w-full h-64 sm:h-80 md:h-96 flex-shrink-0">
                <video
                  src={selectedEvent.video}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  playsInline
                />
              </div>
            ) : (
              <div className="relative w-full h-64 sm:h-80 md:h-96 flex-shrink-0">
                <Image
                  src={selectedEvent.images?.[currentImage] || "/images/logo.png"}
                  alt={selectedEvent.name}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {selectedEvent.images &&
                  selectedEvent.images.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/35 rounded-full p-2"
                        onClick={handlePrevImage}
                      >
                        <ChevronLeft size={22} className="text-white" />
                      </button>

                      <button
                        type="button"
                        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/35 rounded-full p-2"
                        onClick={handleNextImage}
                      >
                        <ChevronRight size={22} className="text-white" />
                      </button>
                      {selectedEvent.images &&
                        selectedEvent.images.length > 1 && (
                          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                            {currentImage + 1} / {selectedEvent.images.length}
                          </div>
                        )}
                    </>
                  )}
              </div>
            )}

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

      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setLightboxImage(null)}
          >
            <X size={32} />
          </button>

          <div
            className="relative w-full max-w-6xl h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage}
              alt="Imagem do evento"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {galleryOpen &&
        selectedEvent &&
        selectedEvent.images && (
          <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">

            <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col relative">

              <button
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-50"
                onClick={closeModal}
              >
                <X size={22} />
              </button>

              <div className="p-6 border-b">
                <h2 className="text-3xl font-bold text-blue-900">
                  {selectedEvent.name}
                </h2>

              </div>

              <div className="overflow-y-auto p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                  {selectedEvent.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setLightboxImage(image)}
                      className="relative aspect-square overflow-hidden rounded-2xl group"
                    >
                      <Image
                        src={image}
                        alt={`${selectedEvent.name} ${index + 1}`}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </button>
                  ))}

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