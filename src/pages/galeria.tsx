"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Images,
  Maximize2,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type GalleryType = {
  id: number;
  title: string;
  description: string;
  video?: string;
  images?: string[];
};

const galleriesData: GalleryType[] = [
  {
    id: 1,
    title: "Favoritas",
    description:
      "Seleção de momentos especiais da Escola de Judo Edson Madeira.",
    images: [
      "/galeria/favoritas/WhatsApp Image 2026-06-14 at 01.38.17.jpeg",
      "/galeria/favoritas/WhatsApp Image 2026-06-14 at 01.38.18 (1).jpeg",
      "/galeria/favoritas/WhatsApp Image 2026-06-14 at 01.38.18.jpeg",
      "/galeria/favoritas/WhatsApp Image 2026-06-14 at 01.38.19 (1).jpeg",
      "/galeria/favoritas/WhatsApp Image 2026-06-14 at 01.38.19.jpeg"
    ],
  },
  {
    id: 2,
    title: "Jogos Africanos 2024 - Acra",
    description:
      "Registos da participação nos Jogos Africanos realizados em Acra.",
    images: [
      "/galeria/jogos-africanos-acra/WhatsApp Image 2026-06-14 at 01.29.08.jpeg",
      "/galeria/jogos-africanos-acra/WhatsApp Image 2026-06-14 at 01.29.10.jpeg",
      "/galeria/jogos-africanos-acra/WhatsApp Image 2026-06-14 at 01.29.11.jpeg"
    ],
  },
  {
    id: 3,
    title: "Jogos Mundiais Universitários",
    description:
      "Momentos dos Jogos Mundiais Universitários com atletas ligados à escola.",
    images: [
      "/galeria/jogos-mundiais-universitarios/WhatsApp Image 2026-06-14 at 01.30.38 (2).jpeg",
      "/galeria/jogos-mundiais-universitarios/WhatsApp Image 2026-06-14 at 01.30.38.jpeg",
      "/galeria/jogos-mundiais-universitarios/WhatsApp Image 2026-06-14 at 01.30.41 (1).jpeg",
      "/galeria/jogos-mundiais-universitarios/WhatsApp Image 2026-06-14 at 01.30.41 (2).jpeg",
      "/galeria/jogos-mundiais-universitarios/WhatsApp Image 2026-06-14 at 01.30.41.jpeg"
    ],
  },
  {
    id: 4,
    title: "Jogos Olímpicos - Paris",
    description:
      "Memórias da presença olímpica e dos momentos vividos em Paris.",
    images: [
      "/galeria/jogos-olimpicos-paris/WhatsApp Image 2026-06-14 at 01.16.06 (2).jpeg",
      "/galeria/jogos-olimpicos-paris/WhatsApp Image 2026-06-14 at 01.16.06.jpeg",
      "/galeria/jogos-olimpicos-paris/WhatsApp Image 2026-06-14 at 01.16.07 (1).jpeg",
      "/galeria/jogos-olimpicos-paris/WhatsApp Image 2026-06-14 at 01.16.07.jpeg",
      "/galeria/jogos-olimpicos-paris/WhatsApp Image 2026-06-14 at 01.16.08 (2).jpeg",
      "/galeria/jogos-olimpicos-paris/WhatsApp Image 2026-06-14 at 01.16.08.jpeg",
      "/galeria/jogos-olimpicos-paris/WhatsApp Image 2026-06-14 at 01.16.09 (1).jpeg",
      "/galeria/jogos-olimpicos-paris/WhatsApp Image 2026-06-14 at 01.16.09.jpeg",
      "/galeria/jogos-olimpicos-paris/WhatsApp Image 2026-06-14 at 01.16.10 (1).jpeg",
      "/galeria/jogos-olimpicos-paris/WhatsApp Image 2026-06-14 at 01.16.10 (2).jpeg",
      "/galeria/jogos-olimpicos-paris/WhatsApp Image 2026-06-14 at 01.16.10.jpeg",
      "/galeria/jogos-olimpicos-paris/WhatsApp Image 2026-06-14 at 01.16.11 (1).jpeg",
      "/galeria/jogos-olimpicos-paris/WhatsApp Image 2026-06-14 at 01.16.11.jpeg",
      "/galeria/jogos-olimpicos-paris/WhatsApp Image 2026-06-14 at 01.16.12.jpeg"
    ],
  },
  {
    id: 5,
    title: "Mbombela Open 2024",
    description: "Imagens de competições e actividades realizadas em Mbombela.",
    images: [
      "/galeria/mbombela/WhatsApp Image 2026-06-14 at 01.21.23 (2).jpeg",
      "/galeria/mbombela/WhatsApp Image 2026-06-14 at 01.21.23.jpeg",
      "/galeria/mbombela/WhatsApp Image 2026-06-14 at 01.21.24 (1).jpeg",
      "/galeria/mbombela/WhatsApp Image 2026-06-14 at 01.21.24.jpeg",
      "/galeria/mbombela/WhatsApp Image 2026-06-14 at 01.21.28.jpeg",
      "/galeria/mbombela/WhatsApp Image 2026-06-14 at 01.21.29 (1).jpeg",
      "/galeria/mbombela/WhatsApp Image 2026-06-14 at 01.21.29.jpeg",
      "/galeria/mbombela/WhatsApp Image 2026-06-14 at 01.21.32 (1).jpeg",
      "/galeria/mbombela/WhatsApp Image 2026-06-14 at 01.21.32 (2).jpeg",
      "/galeria/mbombela/WhatsApp Image 2026-06-14 at 01.21.32.jpeg",
      "/galeria/mbombela/WhatsApp Image 2026-06-14 at 01.21.33.jpeg"
    ],
  },
  {
    id: 6,
    title: "Open de Abidjan",
    description: "Registos da participação no Open de Abidjan.",
    images: [
      "/galeria/open-de-abidjan/WhatsApp Image 2026-06-14 at 01.23.18.jpeg",
      "/galeria/open-de-abidjan/WhatsApp Image 2026-06-14 at 01.23.19.jpeg",
      "/galeria/open-de-abidjan/WhatsApp Image 2026-06-14 at 01.23.20 (1).jpeg",
      "/galeria/open-de-abidjan/WhatsApp Image 2026-06-14 at 01.23.20 (2).jpeg",
      "/galeria/open-de-abidjan/WhatsApp Image 2026-06-14 at 01.23.20.jpeg"
    ],
  },
  {
    id: 7,
    title: "Open de Marrakech 2024",
    description: "Registos da participação no Open de Marrakech.",
    images: [
      "/galeria/open-de-marrakech/WhatsApp Image 2026-06-14 at 01.25.33 (1).jpeg",
      "/galeria/open-de-marrakech/WhatsApp Image 2026-06-14 at 01.25.33.jpeg",
      "/galeria/open-de-marrakech/WhatsApp Image 2026-06-14 at 01.25.34.jpeg"
    ],
  },
  {
    id: 8,
    title: "World Championships 2024 - Abu Dhabi",
    description:
      "Momentos da participação no World Championships em Abu Dhabi.",
    images: [
      "/galeria/world-championships-abu-dhabi/WhatsApp Image 2026-06-14 at 01.27.41 (1).jpeg",
      "/galeria/world-championships-abu-dhabi/WhatsApp Image 2026-06-14 at 01.27.41.jpeg",
      "/galeria/world-championships-abu-dhabi/WhatsApp Image 2026-06-14 at 01.27.42.jpeg"
    ],
  },
];

export default function GalleryPage() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<GalleryType | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardImages, setCardImages] = useState<Record<number, number>>({});
  const gallerySectionRef = useRef<HTMLElement | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectedImages = selectedGallery?.images ?? [];
  const activeImage = selectedImages[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCardImages((prev) => {
        const updated = { ...prev };

        galleriesData.forEach((gallery) => {
          if (gallery.images?.length) {
            updated[gallery.id] =
              ((updated[gallery.id] ?? 0) + 1) % gallery.images.length;
          }
        });

        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!selectedGallery) return;

    const frame = window.requestAnimationFrame(() => {
      gallerySectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [selectedGallery]);

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

  const closeGallery = () => {
    setSelectedGallery(null);
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="mt-8 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-900 tracking-tight mb-4">
            Galeria
          </h1>

          <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Conheça alguns momentos da Escola de Judo Edson Madeira em treinos,
            competições, viagens e actividades especiais.
          </p>
        </div>
      </section>

      <section
        className={`max-w-7xl mx-auto px-4 sm:px-6 ${selectedGallery ? "pb-12" : "pb-20"
          }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {galleriesData.map((gallery) => {
            const isSelected = selectedGallery?.id === gallery.id;

            return (
              <button
                key={gallery.id}
                type="button"
                className={`group h-full flex flex-col text-left bg-white rounded-2xl border overflow-hidden transition duration-300 hover:-translate-y-1 ${isSelected
                  ? "border-blue-600 shadow-xl ring-2 ring-blue-100"
                  : "border-neutral-200 shadow-sm hover:shadow-2xl"
                  }`}
                onClick={() => {
                  setSelectedGallery(gallery);
                  setCurrentIndex(0);
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  {gallery.video ? (
                    <video
                      src={gallery.video}
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <Image
                      src={
                        gallery.images?.[cardImages[gallery.id] ?? 0] ||
                        "/images/logo.png"
                      }
                      alt={gallery.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                <div className="flex-1 p-6 space-y-3">
                  <h3 className="text-xl font-bold text-blue-900">
                    {gallery.title}
                  </h3>

                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {gallery.description}
                  </p>

                  <span className="inline-flex text-sm font-semibold text-blue-900">
                    Ver detalhes →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {selectedGallery && (
        <section
          ref={gallerySectionRef}
          className="gallery-enter scroll-mt-36 bg-slate-50 text-slate-950 py-10 sm:py-12 lg:py-14"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <button
                  type="button"
                  onClick={closeGallery}
                  className="mb-6 inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-900 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <ArrowLeft size={18} />
                  Voltar
                </button>

                <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-900">
                  {selectedGallery.title}
                </h2>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-blue-900 shadow-sm">
                <Images size={18} className="text-blue-700" />
                {selectedImages.length} fotos
              </div>
            </div>

            <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
              {selectedImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => openViewer(index)}
                  aria-label={`Abrir foto ${index + 1} de ${selectedImages.length
                    }`}
                  className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg bg-white text-left shadow-sm outline-none ring-1 ring-slate-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:ring-blue-300 focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <img
                    src={image}
                    alt={`${selectedGallery.title} - foto ${index + 1}`}
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

      {viewerOpen && activeImage && selectedGallery && (
        <div className="gallery-viewer fixed inset-0 z-[10000] bg-slate-50 text-slate-950">
          <div className="absolute inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur md:px-6">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {selectedGallery.title}
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
              alt={`${selectedGallery.title} - foto ${currentIndex + 1}`}
              draggable={false}
              className="gallery-viewer-image h-auto w-auto select-none rounded-sm object-contain shadow-sm max-h-[calc(100vh-13rem)] max-w-[calc(100vw-2rem)] sm:max-h-[calc(100vh-14rem)] sm:max-w-[calc(100vw-12rem)]"
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
                    className={`flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-slate-100 p-1 transition duration-200 ${isActive
                      ? "scale-[1.03] border-emerald-500 shadow-sm ring-2 ring-emerald-500"
                      : "border-slate-200 opacity-70 hover:border-blue-300 hover:opacity-100"
                      }`}
                  >
                    <img
                      src={image}
                      alt={`${selectedGallery.title} miniatura ${index + 1}`}
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
        .gallery-enter {
          animation: galleryIn 0.32s ease both;
        }

        .gallery-viewer {
          animation: galleryViewerIn 0.18s ease both;
        }

        .gallery-viewer-image {
          animation: galleryViewerImageIn 0.2s ease both;
        }

        @keyframes galleryIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes galleryViewerIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes galleryViewerImageIn {
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
          .gallery-enter,
          .gallery-viewer,
          .gallery-viewer-image {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
