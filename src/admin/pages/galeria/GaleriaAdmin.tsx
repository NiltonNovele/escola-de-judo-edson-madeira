"use client";

import { useMemo, useState } from "react";
import AdminLayout from "../../AdminLayout";
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  Star,
  Images,
  Video,
  FolderOpen,
  Upload,
  Grid3X3,
  List,
  X,
  PlayCircle,
  Calendar,
  Image as ImageIcon,
  CheckCircle2,
  Folder,
  ArrowLeft,
} from "lucide-react";

type GalleryType = {
  id: number;
  title: string;
  description: string;
  images?: string[];
  videos?: string[];
  imageDescriptions?: string[];
};

type ViewMode = "grid" | "list";

const galleriesData: GalleryType[] = [
  {
    id: 1,
    title: "Favoritas",
    description:
      "Selecção de momentos especiais da Escola de Judo Edson Madeira.",
    images: [
      "/galeria/favoritas/WhatsApp Image 2026-06-14 at 01.38.17.jpeg",
      "/galeria/favoritas/WhatsApp Image 2026-06-14 at 01.38.18 (1).jpeg",
      "/galeria/favoritas/WhatsApp Image 2026-06-14 at 01.38.18.jpeg",
      "/galeria/favoritas/WhatsApp Image 2026-06-14 at 01.38.19 (1).jpeg",
      "/galeria/favoritas/WhatsApp Image 2026-06-14 at 01.38.19.jpeg",
    ],
    videos: [
      "/galeria/favoritas/WhatsApp Video 2026-06-16 at 17.43.34.mp4",
    ],
    imageDescriptions: [
      "Edson Madeira, Jacira Ferreira e Kevin Loforte",
      "Edson Madeira e Jacira Ferreira no Abidjan African Open 2024",
      "Edson Madeira e Telma Monteiro (Lenda Portuguesa)",
      "Edson Madeira e Teddy Riner (Lenda Mundial do Judo)",
      "Open de Marrakech 2024 - Jacira Ferreira (3ª Classificada)",
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
      "/galeria/jogos-africanos-acra/WhatsApp Image 2026-06-14 at 01.29.11.jpeg",
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
      "/galeria/jogos-mundiais-universitarios/WhatsApp Image 2026-06-14 at 01.30.41.jpeg",
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
      "/galeria/jogos-olimpicos-paris/WhatsApp Image 2026-06-14 at 01.16.12.jpeg",
    ],
  },
  {
    id: 5,
    title: "Mbombela Open 2024",
    description:
      "Imagens de competições e actividades realizadas em Mbombela.",
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
      "/galeria/mbombela/WhatsApp Image 2026-06-14 at 01.21.33.jpeg",
    ],
  },
  {
    id: 6,
    title: "Open de Abidjan",
    description:
      "Registos da participação no Open de Abidjan.",
    images: [
      "/galeria/open-de-abidjan/WhatsApp Image 2026-06-14 at 01.23.18.jpeg",
      "/galeria/open-de-abidjan/WhatsApp Image 2026-06-14 at 01.23.19.jpeg",
      "/galeria/open-de-abidjan/WhatsApp Image 2026-06-14 at 01.23.20 (1).jpeg",
      "/galeria/open-de-abidjan/WhatsApp Image 2026-06-14 at 01.23.20 (2).jpeg",
      "/galeria/open-de-abidjan/WhatsApp Image 2026-06-14 at 01.23.20.jpeg",
    ],
  },
  {
    id: 7,
    title: "Open de Marrakech 2024",
    description:
      "Registos da participação no Open de Marrakech.",
    images: [
      "/galeria/open-de-marrakech/WhatsApp Image 2026-06-14 at 01.25.33 (1).jpeg",
      "/galeria/open-de-marrakech/WhatsApp Image 2026-06-14 at 01.25.33.jpeg",
      "/galeria/open-de-marrakech/WhatsApp Image 2026-06-14 at 01.25.34.jpeg",
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
      "/galeria/world-championships-abu-dhabi/WhatsApp Image 2026-06-14 at 01.27.42.jpeg",
    ],
  },
  {
    id: 9,
    title: "Open de Johannesburgo 2026",
    description:
      "Registos da participação no Open de Johannesburgo.",
    images: [
      "/galeria/open-de-johannesburg-2026/WhatsApp Image 2026-06-30 at 09.24.46.jpeg",
      "/galeria/open-de-johannesburg-2026/WhatsApp Image 2026-06-30 at 09.24.47.jpeg",
      "/galeria/open-de-johannesburg-2026/WhatsApp Image 2026-06-30 at 09.24.47 (1).jpeg",
      "/galeria/open-de-johannesburg-2026/WhatsApp Image 2026-06-30 at 09.24.48.jpeg",
      "/galeria/open-de-johannesburg-2026/WhatsApp Image 2026-06-30 at 09.35.28.jpeg",
      "/galeria/open-de-johannesburg-2026/WhatsApp Image 2026-06-30 at 09.35.29.jpeg",
      "/galeria/open-de-johannesburg-2026/WhatsApp Image 2026-06-30 at 09.35.29 (1).jpeg",
      "/galeria/open-de-johannesburg-2026/WhatsApp Image 2026-06-30 at 09.35.30.jpeg",
      "/galeria/open-de-johannesburg-2026/WhatsApp Image 2026-06-30 at 09.35.30 (1).jpeg",
    ],
    videos: [
      "/galeria/open-de-johannesburg-2026/WhatsApp Video 2026-06-30 at 09.25.26.mp4",
      "/galeria/open-de-johannesburg-2026/WhatsApp Video 2026-06-30 at 09.25.46.mp4",
    ],
  },
];

export default function GaleriaAdmin() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedGallery, setSelectedGallery] =
    useState<GalleryType | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [menuId, setMenuId] = useState<number | null>(null);

  const filteredGalleries = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return galleriesData;

    return galleriesData.filter(
      (gallery) =>
        gallery.title.toLowerCase().includes(query) ||
        gallery.description.toLowerCase().includes(query)
    );
  }, [search]);

  const totalImages = galleriesData.reduce(
    (sum, gallery) => sum + (gallery.images?.length ?? 0),
    0
  );

  const totalVideos = galleriesData.reduce(
    (sum, gallery) => sum + (gallery.videos?.length ?? 0),
    0
  );

  const totalMedia = totalImages + totalVideos;

  const featuredGalleries = galleriesData.filter((gallery) =>
    [1, 4, 9].includes(gallery.id)
  );

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50">
        {/* HEADER */}
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-700">
                  <Images size={16} />
                  Gestão de multimédia
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Galeria
                </h1>

                <p className="mt-1 max-w-2xl text-sm text-slate-500">
                  Gerencie os álbuns, fotografias e vídeos publicados no site
                  da Escola de Judo Edson Madeira.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreate(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                <Plus size={18} />
                Novo álbum
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* KPI CARDS */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
              icon={<FolderOpen size={19} />}
              value={galleriesData.length}
              label="Álbuns"
              description="Álbuns publicados"
            />

            <StatCard
              icon={<ImageIcon size={19} />}
              value={totalImages}
              label="Fotografias"
              description="Imagens na galeria"
            />

            <StatCard
              icon={<Video size={19} />}
              value={totalVideos}
              label="Vídeos"
              description="Vídeos publicados"
            />

            <StatCard
              icon={<Images size={19} />}
              value={totalMedia}
              label="Multimédia"
              description="Ficheiros totais"
            />
          </div>

          {/* FEATURED */}
          <section className="mt-8">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-950">
                Álbuns em destaque
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Álbuns actualmente destacados na gestão da galeria.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {featuredGalleries.map((gallery) => (
                <button
                  key={gallery.id}
                  type="button"
                  onClick={() => setSelectedGallery(gallery)}
                  className="group relative overflow-hidden rounded-2xl bg-slate-900 text-left shadow-sm"
                >
                  <div className="h-48">
                    {gallery.images?.[0] ? (
                      <img
                        src={gallery.images[0]}
                        alt={gallery.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-white">
                        <Video size={32} />
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />

                  <div className="absolute left-4 right-4 top-4 flex justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-yellow-400 px-2.5 py-1 text-xs font-bold text-white">
                      <Star size={12} fill="currentColor" />
                      Destaque
                    </span>

                    <span className="rounded-lg bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                      {(
                        (gallery.images?.length ?? 0) +
                        (gallery.videos?.length ?? 0)
                      )}{" "}
                      ficheiros
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-bold text-white">
                      {gallery.title}
                    </h3>

                    <p className="mt-1 line-clamp-1 text-xs text-white/70">
                      {gallery.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* TOOLBAR */}
          <section className="mt-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Pesquisar álbuns..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="mr-2 text-sm text-slate-400">
                  {filteredGalleries.length} álbuns
                </span>

                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-xl border p-2.5 transition ${
                    viewMode === "grid"
                      ? "border-blue-700 bg-blue-700 text-white"
                      : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                  }`}
                  aria-label="Vista em grelha"
                >
                  <Grid3X3 size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`rounded-xl border p-2.5 transition ${
                    viewMode === "list"
                      ? "border-blue-700 bg-blue-700 text-white"
                      : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                  }`}
                  aria-label="Vista em lista"
                >
                  <List size={17} />
                </button>
              </div>
            </div>
          </section>

          {/* GRID VIEW */}
          {viewMode === "grid" && (
            <section className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredGalleries.map((gallery) => {
                const imageCount = gallery.images?.length ?? 0;
                const videoCount = gallery.videos?.length ?? 0;
                const mediaCount = imageCount + videoCount;

                return (
                  <article
                    key={gallery.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedGallery(gallery)}
                      className="relative block h-56 w-full overflow-hidden bg-slate-100 text-left"
                    >
                      {gallery.images?.[0] ? (
                        <img
                          src={gallery.images[0]}
                          alt={gallery.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-slate-900 text-white">
                          <Video size={42} />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                      <div className="absolute bottom-3 left-3 flex gap-2">
                        {imageCount > 0 && (
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-2.5 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur">
                            <ImageIcon size={13} />
                            {imageCount}
                          </span>
                        )}

                        {videoCount > 0 && (
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-2.5 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur">
                            <Video size={13} />
                            {videoCount}
                          </span>
                        )}
                      </div>

                      {featuredGalleries.some(
                        (item) => item.id === gallery.id
                      ) && (
                        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg bg-yellow-400 px-2.5 py-1.5 text-xs font-bold text-white">
                          <Star size={12} fill="currentColor" />
                          Destaque
                        </span>
                      )}
                    </button>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate font-bold text-slate-950">
                            {gallery.title}
                          </h3>

                          <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-500">
                            {gallery.description}
                          </p>
                        </div>

                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setMenuId(
                                menuId === gallery.id ? null : gallery.id
                              )
                            }
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          >
                            <MoreVertical size={18} />
                          </button>

                          {menuId === gallery.id && (
                            <div className="absolute right-0 top-10 z-30 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                              <ActionButton
                                icon={<Eye size={15} />}
                                label="Ver álbum"
                                onClick={() => {
                                  setSelectedGallery(gallery);
                                  setMenuId(null);
                                }}
                              />

                              <ActionButton
                                icon={<Edit3 size={15} />}
                                label="Editar álbum"
                                onClick={() => {
                                  setMenuId(null);
                                  window.alert(
                                    `Editar "${gallery.title}" — mock.`
                                  );
                                }}
                              />

                              <ActionButton
                                icon={<Upload size={15} />}
                                label="Adicionar ficheiros"
                                onClick={() => {
                                  setMenuId(null);
                                  window.alert(
                                    `Upload para "${gallery.title}" — mock.`
                                  );
                                }}
                              />

                              <div className="my-1 border-t border-slate-100" />

                              <ActionButton
                                icon={<Trash2 size={15} />}
                                label="Eliminar álbum"
                                danger
                                onClick={() => {
                                  setMenuId(null);
                                  window.alert(
                                    `Eliminar "${gallery.title}" — mock.`
                                  );
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-xs font-medium text-slate-400">
                          {mediaCount} ficheiros
                        </span>

                        <button
                          type="button"
                          onClick={() => setSelectedGallery(gallery)}
                          className="text-xs font-bold text-blue-700 hover:text-blue-800"
                        >
                          Gerir álbum →
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          )}

          {/* LIST VIEW */}
          {viewMode === "list" && (
            <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[850px]">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Álbum
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Fotografias
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Vídeos
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Total
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                        Acções
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredGalleries.map((gallery) => {
                      const imageCount = gallery.images?.length ?? 0;
                      const videoCount = gallery.videos?.length ?? 0;

                      return (
                        <tr
                          key={gallery.id}
                          className="transition hover:bg-slate-50"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-4">
                              <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                                {gallery.images?.[0] && (
                                  <img
                                    src={gallery.images[0]}
                                    alt={gallery.title}
                                    className="h-full w-full object-cover"
                                  />
                                )}
                              </div>

                              <div className="min-w-0">
                                <p className="font-semibold text-slate-900">
                                  {gallery.title}
                                </p>

                                <p className="mt-1 max-w-md truncate text-xs text-slate-500">
                                  {gallery.description}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4 text-sm text-slate-600">
                            {imageCount}
                          </td>

                          <td className="px-5 py-4 text-sm text-slate-600">
                            {videoCount}
                          </td>

                          <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                            {imageCount + videoCount}
                          </td>

                          <td className="px-5 py-4 text-right">
                            <div className="inline-flex gap-1">
                              <button
                                type="button"
                                onClick={() => setSelectedGallery(gallery)}
                                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-700"
                              >
                                <Eye size={17} />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  window.alert(
                                    `Editar "${gallery.title}" — mock.`
                                  )
                                }
                                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-700"
                              >
                                <Edit3 size={17} />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  window.alert(
                                    `Eliminar "${gallery.title}" — mock.`
                                  )
                                }
                                className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 size={17} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-slate-100 md:hidden">
                {filteredGalleries.map((gallery) => (
                  <button
                    key={gallery.id}
                    type="button"
                    onClick={() => setSelectedGallery(gallery)}
                    className="flex w-full gap-4 p-4 text-left"
                  >
                    <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      {gallery.images?.[0] && (
                        <img
                          src={gallery.images[0]}
                          alt={gallery.title}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900">
                        {gallery.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                        {gallery.description}
                      </p>

                      <div className="mt-2 flex gap-3 text-xs text-slate-400">
                        <span>{gallery.images?.length ?? 0} fotos</span>
                        <span>{gallery.videos?.length ?? 0} vídeos</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {filteredGalleries.length === 0 && (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
              <Search
                size={22}
                className="mx-auto text-slate-400"
              />

              <h3 className="mt-4 font-semibold text-slate-900">
                Nenhum álbum encontrado
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Tente pesquisar por outro nome.
              </p>
            </div>
          )}
        </main>

        {/* ALBUM DETAILS MODAL */}
        {selectedGallery && (
          <div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={() => setSelectedGallery(null)}
          >
            <div
              className="max-h-[94vh] w-full max-w-5xl overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedGallery(null)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <ArrowLeft size={19} />
                  </button>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      Álbum
                    </p>

                    <h2 className="truncate text-lg font-bold text-slate-950">
                      {selectedGallery.title}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedGallery(null)}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-[calc(94vh-73px)] overflow-y-auto">
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-950">
                        {selectedGallery.title}
                      </h3>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                        {selectedGallery.description}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          window.alert(
                            `Editar "${selectedGallery.title}" — mock.`
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <Edit3 size={16} />
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          window.alert(
                            `Adicionar multimédia a "${selectedGallery.title}" — mock.`
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
                      >
                        <Upload size={16} />
                        Adicionar
                      </button>
                    </div>
                  </div>

                  {/* MEDIA COUNTS */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <MiniStat
                      icon={<ImageIcon size={17} />}
                      value={selectedGallery.images?.length ?? 0}
                      label="Fotos"
                    />

                    <MiniStat
                      icon={<Video size={17} />}
                      value={selectedGallery.videos?.length ?? 0}
                      label="Vídeos"
                    />

                    <MiniStat
                      icon={<Folder size={17} />}
                      value={
                        (selectedGallery.images?.length ?? 0) +
                        (selectedGallery.videos?.length ?? 0)
                      }
                      label="Total"
                    />
                  </div>

                  {/* MEDIA GRID */}
                  <div className="mt-7">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="font-bold text-slate-900">
                        Multimédia
                      </h4>

                      <span className="text-xs text-slate-400">
                        Clique para pré-visualizar
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                      {selectedGallery.images?.map((image, index) => (
                        <div
                          key={image}
                          className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100"
                        >
                          <img
                            src={image}
                            alt={`${selectedGallery.title} ${index + 1}`}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 bg-slate-950/0 transition group-hover:bg-slate-950/30" />

                          <button
                            type="button"
                            onClick={() =>
                              window.alert(
                                `Pré-visualização da fotografia ${index + 1} — mock.`
                              )
                            }
                            className="absolute right-2 top-2 rounded-lg bg-white/90 p-2 text-slate-700 opacity-0 shadow-sm transition group-hover:opacity-100"
                          >
                            <Eye size={15} />
                          </button>

                          {selectedGallery.imageDescriptions?.[index] && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                              <p className="line-clamp-2 text-[11px] font-medium leading-4 text-white">
                                {selectedGallery.imageDescriptions[index]}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}

                      {selectedGallery.videos?.map((video, index) => (
                        <button
                          key={video}
                          type="button"
                          onClick={() =>
                            window.alert(
                              `Reproduzir vídeo ${index + 1} — mock.`
                            )
                          }
                          className="group relative aspect-square overflow-hidden rounded-xl bg-slate-900"
                        >
                          <video
                            src={video}
                            preload="metadata"
                            muted
                            playsInline
                            className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
                          />

                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-blue-700 shadow-lg">
                              <PlayCircle size={25} />
                            </div>
                          </div>

                          <span className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-2 py-1 text-[11px] font-bold text-white">
                            VÍDEO {index + 1}
                          </span>
                        </button>
                      ))}
                    </div>

                    {(selectedGallery.images?.length ?? 0) === 0 &&
                      (selectedGallery.videos?.length ?? 0) === 0 && (
                        <div className="rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
                          <Images
                            size={28}
                            className="mx-auto text-slate-300"
                          />

                          <p className="mt-3 text-sm font-semibold text-slate-600">
                            Este álbum ainda não tem multimédia.
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CREATE ALBUM MODAL */}
        {showCreate && (
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            onClick={() => setShowCreate(false)}
          >
            <div
              className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Galeria
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-950">
                    Criar novo álbum
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5 p-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Nome do álbum
                  </label>

                  <input
                    placeholder="Ex.: Campeonato Nacional 2026"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Descrição
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Descreva este álbum..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Data do evento
                  </label>

                  <div className="relative">
                    <Calendar
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="date"
                      className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                    <Upload size={22} />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    Adicionar fotografias ou vídeos
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Upload de ficheiros — funcionalidade mock.
                  </p>

                  <button
                    type="button"
                    className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600"
                  >
                    Seleccionar ficheiros
                  </button>
                </div>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-blue-700"
                  />

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Destacar este álbum
                    </p>

                    <p className="text-xs text-slate-500">
                      Mostrar o álbum como destaque na gestão da galeria.
                    </p>
                  </div>
                </label>

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancelar
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowCreate(false);
                      window.alert("Álbum criado com sucesso — mock.");
                    }}
                    className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
                  >
                    Criar álbum
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function StatCard({
  icon,
  value,
  label,
  description,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        {icon}
      </div>

      <p className="mt-4 text-2xl font-bold text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">
        {label}
      </p>

      <p className="mt-0.5 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

function MiniStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-blue-700">
        {icon}
        <span className="text-xs font-semibold text-slate-500">
          {label}
        </span>
      </div>

      <p className="mt-2 text-lg font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function ActionButton({
  icon,
  label,
  danger = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-slate-700 hover:bg-slate-50"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
