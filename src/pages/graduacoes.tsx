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
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useCyclingIndexes } from "@/hooks/useCyclingIndexes";

type GraduationType = {
  id: number;
  title: string;
  description: string;
  video?: string;
  images?: string[];
};

const graduationsData: GraduationType[] = [
  {
    id: 1,
    title: "Graduação Anual 2024",
    description:
      "Cerimónia de graduação dos atletas da Escola de Judo Edson Madeira, reconhecendo a dedicação, disciplina e evolução técnica ao longo do ano.",
    images: [
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.29 (1).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.29.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.30.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.31.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.32 (1).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.32.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.33.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.49.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.50 (1).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.50 (2).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.50.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.51 (1).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.51.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.52 (1).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.52 (2).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.52.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.53.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.54 (1).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.54.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.55 (1).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.55.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.56 (1).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.56 (2).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.56.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.57.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.58 (1).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.58 (2).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.58.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.59 (1).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.59 (2).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.04.59.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.00 (1).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.00.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.01 (1).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.01.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.02 (1).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.02 (2).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.02.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.03 (1).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.03.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.04 (1).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.04.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.05 (1).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.05 (2).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.05.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.06 (1).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.06 (2).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.06.jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.07 (1).jpeg",
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.07.jpeg",
    ],
  },
];

export default function GraduationsPage() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedGraduation, setSelectedGraduation] =
    useState<GraduationType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const gallerySectionRef = useRef<HTMLElement | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cardImages = useCyclingIndexes(graduationsData);

  const selectedImages = selectedGraduation?.images ?? [];
  const activeImage = selectedImages[currentIndex];

  useEffect(() => {
    if (!selectedGraduation) return;

    const frame = window.requestAnimationFrame(() => {
      gallerySectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [selectedGraduation]);

  useBodyScrollLock(viewerOpen);

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
    setSelectedGraduation(null);
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
            Graduações
          </h1>

          <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Conheça as cerimónias de graduação da Escola de Judo Edson Madeira
            e acompanhe a evolução dos nossos atletas ao longo da sua jornada no
            judo.
          </p>
        </div>
      </section>

      <section
        className={`max-w-7xl mx-auto px-4 sm:px-6 ${
          selectedGraduation ? "pb-12" : "pb-20"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {graduationsData.map((graduation) => {
            const isSelected = selectedGraduation?.id === graduation.id;

            return (
              <button
              key={graduation.id}
              type="button"
              className={`group h-full flex flex-col text-left bg-white rounded-2xl border overflow-hidden transition duration-300 hover:-translate-y-1 ${
                isSelected
                  ? "border-blue-600 shadow-xl ring-2 ring-blue-100"
                  : "border-neutral-200 shadow-sm hover:shadow-2xl"
              }`}
              onClick={() => {
                setSelectedGraduation(graduation);
                setCurrentIndex(0);
              }}
            >
              <div className="relative h-64 overflow-hidden">
                {graduation.video ? (
                  <video
                    src={graduation.video}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <Image
                    src={
                      graduation.images?.[cardImages[graduation.id] ?? 0] ||
                      "/images/logo.png"
                    }
                    alt={graduation.title}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              <div className="flex-1 p-6 space-y-3">
                <h3 className="text-xl font-bold text-blue-900">
                  {graduation.title}
                </h3>

                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                  {graduation.description}
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

      {selectedGraduation && (
        <section
          ref={gallerySectionRef}
          className="graduation-gallery-enter scroll-mt-36 bg-slate-50 text-slate-950 py-10 sm:py-12 lg:py-14"
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
                  {selectedGraduation.title}
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
                  aria-label={`Abrir foto ${index + 1} de ${
                    selectedImages.length
                  }`}
                  className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg bg-white text-left shadow-sm outline-none ring-1 ring-slate-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:ring-blue-300 focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <img
                    src={image}
                    alt={`${selectedGraduation.title} - foto ${index + 1}`}
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

      {viewerOpen && activeImage && selectedGraduation && (
        <div className="graduation-viewer fixed inset-0 z-[10000] bg-slate-50 text-slate-950">
          <div className="absolute inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur md:px-6">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {selectedGraduation.title}
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
              alt={`${selectedGraduation.title} - foto ${currentIndex + 1}`}
              draggable={false}
              className="graduation-viewer-image h-auto w-auto select-none rounded-sm object-contain shadow-sm max-h-[calc(100vh-13rem)] max-w-[calc(100vw-2rem)] sm:max-h-[calc(100vh-14rem)] sm:max-w-[calc(100vw-12rem)]"
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
                      alt={`${selectedGraduation.title} miniatura ${
                        index + 1
                      }`}
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
        .graduation-gallery-enter {
          animation: graduationGalleryIn 0.32s ease both;
        }

        .graduation-viewer {
          animation: graduationViewerIn 0.18s ease both;
        }

        .graduation-viewer-image {
          animation: graduationViewerImageIn 0.2s ease both;
        }

        @keyframes graduationGalleryIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes graduationViewerIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes graduationViewerImageIn {
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
          .graduation-gallery-enter,
          .graduation-viewer,
          .graduation-viewer-image {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
