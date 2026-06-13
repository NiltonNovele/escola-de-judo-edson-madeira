"use client";

import Lightbox from "yet-another-react-lightbox";

import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
      "/graduacoes/2024/WhatsApp Image 2026-06-13 at 18.05.07.jpeg"
    ],
  },

];

export default function GraduationsPage() {
  const [galleryOpen, setGalleryOpen] = useState(false);

  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [selectedGraduation, setSelectedGraduation] =
    useState<GraduationType | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [cardImages, setCardImages] = useState<Record<number, number>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCardImages((prev) => {
        const updated = { ...prev };

        graduationsData.forEach((graduation) => {
          if (graduation.images?.length) {
            updated[graduation.id] =
              ((updated[graduation.id] ?? 0) + 1) %
              graduation.images.length;
          }
        });

        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HEADER */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="mt-8 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-900 tracking-tight mb-4">
            Graduações
          </h1>

          <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Conheça as cerimónias de graduação da Escola de Judo
            Edson Madeira e acompanhe a evolução dos nossos
            atletas ao longo da sua jornada no judo.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {graduationsData.map((graduation) => (
            <button
              key={graduation.id}
              type="button"
              className="h-full flex flex-col text-left bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300"
              onClick={() => {
                setSelectedGraduation(graduation);
                setGalleryOpen(true);
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
                      graduation.images?.[
                      cardImages[graduation.id] ?? 0
                      ] || "/images/logo.png"
                    }
                    alt={graduation.title}
                    fill
                    className="object-cover"
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
          ))}
        </div>
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentIndex}
        slides={
          selectedGraduation?.images?.map((image) => ({
            src: image,
          })) || []
        }
        plugins={[Thumbnails, Fullscreen]}
      />

      {galleryOpen && selectedGraduation && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">

            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-blue-900">
                  {selectedGraduation.title}
                </h2>
              </div>

              <button
                onClick={() => setGalleryOpen(false)}
                className="text-gray-600 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* Grelha */}
            <div className="overflow-y-auto p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {selectedGraduation.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setLightboxOpen(true);
                    }}
                    className="relative aspect-square overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={image}
                      alt={`Foto ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition duration-300"
                    />
                  </button>
                ))}

              </div>
            </div>

          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}