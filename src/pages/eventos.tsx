"use client";

/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Images,
  MapPin,
  Maximize2,
  X,
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

type UpcomingEventType = {
  id: number;
  date: string;
  title: string;
  location: string;
  details: string;
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
    name: "Dia dos Pais",
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

const upcomingEvents: UpcomingEventType[] = [
  {
    id: 1,
    date: "20/06 a 04/07",
    title: "Graduação intermédia",
    location: "EJEM",
    details: "Período de avaliação técnica e progressão dos atletas.",
  },
  {
    id: 2,
    date: "26/06 a 29/06",
    title: "Open da África do Sul",
    location: "Joanesburgo, África do Sul",
    details: "Ranking mundial, cadetes, juniores e seniores.",
  },
  {
    id: 3,
    date: "Julho 2026",
    title: "Jogos da Commonwealth",
    location: "Glasgow",
    details: "Participação nos Jogos da Commonwealth.",
  },
  {
    id: 4,
    date: "Setembro 2026",
    title: "Estágio EJEM",
    location: "EJEM",
    details: "Estágio técnico da escola.",
  },
  {
    id: 5,
    date: "Novembro 2026",
    title: "Jogos Olímpicos da Juventude",
    location: "Dakar, Senegal",
    details: "Competição internacional juvenil.",
  },
  {
    id: 6,
    date: "Data a confirmar",
    title: "Maputo Martial Fest 2026",
    location: "Maputo",
    details: "Festival de artes marciais em Maputo.",
  },
  {
    id: 7,
    date: "Dezembro 2026",
    title: "Jogos da AUSC",
    location: "A confirmar",
    details: "Jogos previstos para Dezembro.",
  },
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardImages, setCardImages] = useState<Record<number, number>>({});
  const eventSectionRef = useRef<HTMLElement | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectedImages = selectedEvent?.images ?? [];
  const hasSelectedImages = selectedImages.length > 0;
  const isSelectedVideo = Boolean(selectedEvent?.video);
  const activeImage = selectedImages[currentIndex];

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
    if (!selectedEvent || isSelectedVideo || !hasSelectedImages) return;

    const frame = window.requestAnimationFrame(() => {
      eventSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hasSelectedImages, isSelectedVideo, selectedEvent]);

  useEffect(() => {
    if (!viewerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [viewerOpen]);

  useEffect(() => {
    if (!viewerOpen || selectedImages.length === 0) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setViewerOpen(false);
      }

      if (event.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % selectedImages.length);
      }

      if (event.key === "ArrowLeft") {
        setCurrentIndex(
          (prev) => (prev - 1 + selectedImages.length) % selectedImages.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImages.length, viewerOpen]);

  useEffect(() => {
    if (!viewerOpen) return;

    thumbnailRefs.current[currentIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [currentIndex, viewerOpen]);

  const closeEventDetails = () => {
    setSelectedEvent(null);
    setViewerOpen(false);
    setCurrentIndex(0);
  };

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    setViewerOpen(true);
  };

  const showPreviousImage = () => {
    if (selectedImages.length === 0) return;

    setCurrentIndex(
      (prev) => (prev - 1 + selectedImages.length) % selectedImages.length
    );
  };

  const showNextImage = () => {
    if (selectedImages.length === 0) return;

    setCurrentIndex((prev) => (prev + 1) % selectedImages.length);
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
      <section
        className={`max-w-7xl mx-auto px-4 sm:px-6 ${
          hasSelectedImages && !isSelectedVideo ? "pb-12" : "pb-20"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {eventsData.map((event) => {
            const isSelected = selectedEvent?.id === event.id;

            return (
              <button
              key={event.id}
              type="button"
              className={`h-full flex flex-col text-left bg-white rounded-2xl border overflow-hidden hover:-translate-y-1 transition duration-300 group ${
                isSelected
                  ? "border-blue-600 shadow-xl ring-2 ring-blue-100"
                  : "border-neutral-200 shadow-sm hover:shadow-2xl"
              }`}
              onClick={() => {
                setSelectedEvent(event);
                setCurrentIndex(0);
                setViewerOpen(false);
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
                    className="object-cover transition duration-500 group-hover:scale-105"
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
            );
          })}
        </div>
      </section>
      {selectedEvent && isSelectedVideo && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative animate-fadeIn max-h-[95vh] sm:max-h-[90vh] flex flex-col">
            <button
              type="button"
              className="absolute top-4 right-4 text-white bg-black/35 hover:bg-black/50 transition rounded-full p-2 z-50"
              onClick={closeEventDetails}
            >
              <X size={22} />
            </button>

            <div className="relative w-full h-64 sm:h-80 md:h-96 flex-shrink-0">
              <video
                src={selectedEvent.video}
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
              />
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

      {selectedEvent && hasSelectedImages && !isSelectedVideo && (
        <section
          ref={eventSectionRef}
          className="event-gallery-enter scroll-mt-36 bg-slate-50 text-slate-950 py-10 sm:py-12 lg:py-14"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <button
                  type="button"
                  onClick={closeEventDetails}
                  className="mb-6 inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-900 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <ArrowLeft size={18} />
                  Voltar
                </button>

                <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-900">
                  {selectedEvent.name}
                </h2>

              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-blue-900 shadow-sm">
                <Images size={18} className="text-blue-700" />
                {selectedImages.length} fotos
              </div>
            </div>

            <div className="mt-8 rounded-lg border border-blue-100 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Mais detalhes
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {selectedEvent.details}
              </p>
            </div>

            <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
              {selectedImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => openViewer(index)}
                  aria-label={`Abrir foto ${index + 1} de ${
                    selectedImages.length
                  }`}
                  className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg bg-white text-left shadow-sm outline-none ring-1 ring-slate-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:ring-blue-300 focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <img
                    src={image}
                    alt={`${selectedEvent.name} - foto ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full transition duration-500 group-hover:scale-[1.015]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-950/18 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-800 opacity-0 shadow-sm backdrop-blur-sm transition group-hover:opacity-100">
                    <Maximize2 size={17} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-blue-900">
                  Próximos eventos
                </h2>
                <p className="mt-2 text-sm sm:text-base text-gray-700">
                  Calendário de actividades previstas para 2026.
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-900">
                <Calendar size={18} className="text-blue-700" />
                Calendário
              </div>
            </div>

            <div className="mt-6 divide-y divide-neutral-200">
              {upcomingEvents.map((event) => (
                <article
                  key={event.id}
                  className="grid gap-3 py-5 first:pt-0 last:pb-0 md:grid-cols-[170px_1fr]"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-900">
                    <Calendar size={16} className="shrink-0 text-blue-700" />
                    <span>{event.date}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold leading-snug text-blue-900">
                      {event.title}
                    </h3>

                    <div
                      className="mt-2 flex flex-col gap-2 text-sm text-gray-700 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5"
                    >
                      <span className="inline-flex items-center gap-2">
                        <MapPin size={16} className="shrink-0 text-gray-500" />
                        {event.location}
                      </span>
                      <span>{event.details}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {viewerOpen && activeImage && selectedEvent && (
        <div className="event-viewer fixed inset-0 z-[10000] bg-slate-50 text-slate-950">
          <div className="absolute inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur md:px-6">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {selectedEvent.name}
              </p>
              <p className="text-xs font-medium text-slate-500">
                {currentIndex + 1} de {selectedImages.length}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setViewerOpen(false)}
              aria-label="Fechar visualizador"
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              <X size={22} />
            </button>
          </div>

          {selectedImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPreviousImage}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 opacity-75 shadow-md ring-1 ring-slate-200 transition duration-200 hover:scale-105 hover:bg-blue-50 hover:text-blue-900 hover:opacity-100 active:opacity-100 sm:left-7 sm:h-14 sm:w-14"
              >
                <ChevronLeft size={28} />
              </button>

              <button
                type="button"
                onClick={showNextImage}
                aria-label="Próxima foto"
                className="absolute right-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 opacity-75 shadow-md ring-1 ring-slate-200 transition duration-200 hover:scale-105 hover:bg-blue-50 hover:text-blue-900 hover:opacity-100 active:opacity-100 sm:right-7 sm:h-14 sm:w-14"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          <div className="flex h-full items-center justify-center px-4 pb-32 pt-20 sm:px-24 sm:pb-36">
            <img
              key={activeImage}
              src={activeImage}
              alt={`${selectedEvent.name} - foto ${currentIndex + 1}`}
              draggable={false}
              className="event-viewer-image h-auto w-auto select-none rounded-sm object-contain shadow-sm max-h-[calc(100vh-13rem)] max-w-[calc(100vw-2rem)] sm:max-h-[calc(100vh-14rem)] sm:max-w-[calc(100vw-12rem)]"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 pb-3 shadow-[0_-6px_22px_rgba(15,23,42,0.06)] backdrop-blur">
            <div className="py-2 text-center text-sm font-semibold text-slate-600">
              {currentIndex + 1} de {selectedImages.length}
            </div>

            <div className="flex gap-2.5 overflow-x-auto px-4 pb-1 [scrollbar-width:thin] sm:px-6">
              {selectedImages.map((image, index) => {
                const isActive = index === currentIndex;

                return (
                  <button
                    key={image}
                    type="button"
                    ref={(button) => {
                      thumbnailRefs.current[index] = button;
                    }}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Ver foto ${index + 1}`}
                    className={`flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-slate-100 p-1 transition duration-200 ${
                      isActive
                        ? "scale-[1.03] border-emerald-500 shadow-sm ring-2 ring-emerald-500"
                        : "border-slate-200 opacity-70 hover:border-blue-300 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${selectedEvent.name} miniatura ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-in-out;
        }

        .event-gallery-enter {
          animation: eventGalleryIn 0.32s ease both;
        }

        .event-viewer {
          animation: eventViewerIn 0.18s ease both;
        }

        .event-viewer-image {
          animation: eventViewerImageIn 0.2s ease both;
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

        @keyframes eventGalleryIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes eventViewerIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes eventViewerImageIn {
          from {
            opacity: 0;
            transform: scale(0.985);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn,
          .event-gallery-enter,
          .event-viewer,
          .event-viewer-image {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
