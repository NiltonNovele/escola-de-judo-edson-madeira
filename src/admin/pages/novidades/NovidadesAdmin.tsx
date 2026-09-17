"use client";

import { useMemo, useState } from "react";
import AdminLayout from "../../AdminLayout";
import {
  Search,
  Plus,
  Eye,
  MoreHorizontal,
  FileText,
  Video,
  Image as ImageIcon,
  CalendarDays,
  CheckCircle2,
  Clock,
  Archive,
  Star,
  ExternalLink,
  Edit3,
  Trash2,
  X,
  Save,
  Upload,
  Newspaper,
  TrendingUp,
  EyeIcon,
  BarChart3,
  Filter,
  ChevronRight,
  ArrowUpRight,
  Link2,
  MapPin,
} from "lucide-react";

type NewsStatus = "Publicada" | "Rascunho" | "Arquivada";

type NewsItem = {
  id: number;
  title: string;
  category: string;
  description: string;
  date: string;
  status: NewsStatus;
  featured: boolean;
  views: number;
  image: string;
  mediaCount: number;
  hasVideo: boolean;
  hasDocument: boolean;
};

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Exame de Graduação",
    category: "Aviso",
    description:
      "Está a decorrer o exame de graduação. Inscreva-se através do formulário oficial.",
    date: "17 Set 2026",
    status: "Publicada",
    featured: true,
    views: 482,
    image: "/images/novidades/exame-de-graduacao.jpg",
    mediaCount: 2,
    hasVideo: false,
    hasDocument: true,
  },
  {
    id: 2,
    title: "Johannesburg Open 2026",
    category: "Conquista",
    description:
      "Shenidy Tsemane (-57kg) conquistou o 1º lugar no Johannesburg Open 2026.",
    date: "28 Jun 2026",
    status: "Publicada",
    featured: true,
    views: 1268,
    image:
      "/galeria/open-de-johannesburg-2026/WhatsApp Image 2026-06-30 at 09.24.46.jpeg",
    mediaCount: 6,
    hasVideo: true,
    hasDocument: false,
  },
  {
    id: 3,
    title: "Calendário de actividades 2026",
    category: "Calendário",
    description:
      "Calendário actualizado das principais actividades da Escola de Judo Edson Madeira.",
    date: "15 Jun 2026",
    status: "Publicada",
    featured: false,
    views: 734,
    image: "/images/novidades/calendario.jpg",
    mediaCount: 1,
    hasVideo: false,
    hasDocument: true,
  },
  {
    id: 4,
    title: "Treino especial de preparação",
    category: "Actividade",
    description:
      "Sessão especial de preparação dos atletas para as próximas competições.",
    date: "08 Jun 2026",
    status: "Publicada",
    featured: false,
    views: 521,
    image: "/images/novidades/treino.jpg",
    mediaCount: 4,
    hasVideo: true,
    hasDocument: false,
  },
  {
    id: 5,
    title: "Informação sobre inscrições",
    category: "Aviso",
    description:
      "Informações importantes sobre inscrições e documentação necessária.",
    date: "02 Jun 2026",
    status: "Rascunho",
    featured: false,
    views: 0,
    image: "/images/novidades/inscricoes.jpg",
    mediaCount: 0,
    hasVideo: false,
    hasDocument: false,
  },
  {
    id: 6,
    title: "Resultados da competição regional",
    category: "Resultados",
    description:
      "Resultados e destaques da participação dos atletas da EJEM.",
    date: "24 Mai 2026",
    status: "Arquivada",
    featured: false,
    views: 892,
    image: "/images/novidades/resultados.jpg",
    mediaCount: 5,
    hasVideo: false,
    hasDocument: true,
  },
];

const categories = [
  "Todas",
  "Aviso",
  "Conquista",
  "Calendário",
  "Actividade",
  "Resultados",
];

function StatusBadge({ status }: { status: NewsStatus }) {
  const styles: Record<NewsStatus, string> = {
    Publicada: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Rascunho: "bg-amber-50 text-amber-700 border-amber-200",
    Arquivada: "bg-neutral-100 text-neutral-600 border-neutral-200",
  };

  const icons: Record<NewsStatus, React.ReactNode> = {
    Publicada: <CheckCircle2 size={13} />,
    Rascunho: <Clock size={13} />,
    Arquivada: <Archive size={13} />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {icons[status]}
      {status}
    </span>
  );
}

export default function NovidadesAdmin() {
  const [activeView, setActiveView] = useState<
    "overview" | "publications" | "media"
  >("overview");

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todas");
  const [statusFilter, setStatusFilter] = useState<
    "Todos" | NewsStatus
  >("Todos");

  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const filteredNews = useMemo(() => {
    return newsItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "Todas" || item.category === categoryFilter;

      const matchesStatus =
        statusFilter === "Todos" || item.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, categoryFilter, statusFilter]);

  const publishedCount = newsItems.filter(
    (item) => item.status === "Publicada"
  ).length;

  const draftCount = newsItems.filter(
    (item) => item.status === "Rascunho"
  ).length;

  const featuredCount = newsItems.filter(
    (item) => item.featured
  ).length;

  const totalViews = newsItems.reduce(
    (sum, item) => sum + item.views,
    0
  );

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#f7f8fa] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1500px]">
          {/* ========================= */}
          {/* HEADER */}
          {/* ========================= */}

          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2 text-sm text-neutral-500">
                <span>Admin</span>
                <ChevronRight size={14} />
                <span className="text-neutral-900">
                  Novidades
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
                Novidades
              </h1>

              <p className="mt-1 text-sm text-neutral-500">
                Gerir avisos, conquistas, actividades e informações da EJEM.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  alert("Pré-visualização da página pública — mock")
                }
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50"
              >
                <ExternalLink size={16} />
                Ver página
              </button>

              <button
                onClick={() =>
                  alert("Criar nova publicação — mock")
                }
                className="inline-flex items-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                <Plus size={17} />
                Nova publicação
              </button>
            </div>
          </div>

          {/* ========================= */}
          {/* NAVIGATION */}
          {/* ========================= */}

          <div className="mb-6 flex items-center gap-1 overflow-x-auto rounded-xl border border-neutral-200 bg-white p-1 shadow-sm">
            {[
              {
                id: "overview",
                label: "Visão geral",
                icon: BarChart3,
              },
              {
                id: "publications",
                label: "Publicações",
                icon: Newspaper,
              },
              {
                id: "media",
                label: "Multimédia",
                icon: ImageIcon,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeView === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveView(
                      tab.id as
                        | "overview"
                        | "publications"
                        | "media"
                    )
                  }
                  className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "bg-blue-900 text-white shadow-sm"
                      : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ========================= */}
          {/* SEARCH / FILTER */}
          {/* ========================= */}

          {activeView !== "overview" && (
            <div className="mb-6 flex flex-col gap-3 xl:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Pesquisar publicações..."
                  className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {activeView === "publications" && (
                  <>
                    <select
                      value={categoryFilter}
                      onChange={(e) =>
                        setCategoryFilter(e.target.value)
                      }
                      className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 outline-none"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>

                    <select
                      value={statusFilter}
                      onChange={(e) =>
                        setStatusFilter(
                          e.target.value as
                            | "Todos"
                            | NewsStatus
                        )
                      }
                      className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 outline-none"
                    >
                      <option value="Todos">
                        Todos os estados
                      </option>
                      <option value="Publicada">
                        Publicadas
                      </option>
                      <option value="Rascunho">
                        Rascunhos
                      </option>
                      <option value="Arquivada">
                        Arquivadas
                      </option>
                    </select>
                  </>
                )}

                <button
                  onClick={() => {
                    setSearch("");
                    setCategoryFilter("Todas");
                    setStatusFilter("Todos");
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
                >
                  <Filter size={16} />
                  Limpar
                </button>
              </div>
            </div>
          )}

          {/* ========================= */}
          {/* OVERVIEW */}
          {/* ========================= */}

          {activeView === "overview" && (
            <>
              {/* KPI */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-500">
                        Publicações
                      </p>

                      <p className="mt-2 text-2xl font-bold text-neutral-950">
                        {publishedCount}
                      </p>

                      <p className="mt-2 text-xs text-neutral-400">
                        Publicadas actualmente
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                      <Newspaper size={21} />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-500">
                        Rascunhos
                      </p>

                      <p className="mt-2 text-2xl font-bold text-neutral-950">
                        {draftCount}
                      </p>

                      <p className="mt-2 text-xs text-amber-600">
                        Aguardam publicação
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                      <Edit3 size={21} />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-500">
                        Destaques
                      </p>

                      <p className="mt-2 text-2xl font-bold text-neutral-950">
                        {featuredCount}
                      </p>

                      <p className="mt-2 text-xs text-neutral-400">
                        Publicações em destaque
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                      <Star size={21} />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-500">
                        Visualizações
                      </p>

                      <p className="mt-2 text-2xl font-bold text-neutral-950">
                        {totalViews.toLocaleString("pt-PT")}
                      </p>

                      <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <TrendingUp size={13} />
                        +14,8%
                      </div>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <EyeIcon size={21} />
                    </div>
                  </div>
                </div>
              </div>

              {/* FEATURED */}
              <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-bold text-neutral-950">
                      Publicações em destaque
                    </h2>

                    <p className="mt-1 text-sm text-neutral-500">
                      Conteúdos actualmente destacados na página de novidades.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveView("publications")}
                    className="flex items-center gap-1 text-sm font-semibold text-blue-900 hover:underline"
                  >
                    Gerir publicações
                    <ArrowUpRight size={15} />
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {newsItems
                    .filter((item) => item.featured)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="group overflow-hidden rounded-2xl border border-neutral-200 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
                      >
                        <div className="relative h-48 overflow-hidden bg-neutral-100">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                          <div className="absolute left-3 top-3">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-900 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                              <Star size={12} />
                              Destaque
                            </span>
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="flex items-center justify-between gap-3">
                            <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-900">
                              {item.category}
                            </span>

                            <span className="flex items-center gap-1 text-xs text-neutral-400">
                              <Eye size={13} />
                              {item.views}
                            </span>
                          </div>

                          <h3 className="mt-3 text-lg font-bold text-neutral-950">
                            {item.title}
                          </h3>

                          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
                            {item.description}
                          </p>

                          <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4">
                            <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                              <CalendarDays size={13} />
                              {item.date}
                            </span>

                            <button
                              onClick={() =>
                                setSelectedNews(item)
                              }
                              className="flex items-center gap-1 text-sm font-semibold text-blue-900 hover:underline"
                            >
                              Ver detalhes
                              <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* RECENT */}
              <div className="mt-5 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-neutral-100 p-5 sm:p-6">
                  <div>
                    <h2 className="font-bold text-neutral-950">
                      Publicações recentes
                    </h2>

                    <p className="mt-1 text-sm text-neutral-500">
                      Últimas novidades adicionadas ao sistema.
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setActiveView("publications")
                    }
                    className="flex items-center gap-1 text-sm font-semibold text-blue-900 hover:underline"
                  >
                    Ver todas
                    <ArrowUpRight size={15} />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="border-b border-neutral-100 bg-neutral-50/70 text-left">
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                          Publicação
                        </th>

                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                          Categoria
                        </th>

                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                          Estado
                        </th>

                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                          Data
                        </th>

                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                          Views
                        </th>

                        <th />
                      </tr>
                    </thead>

                    <tbody>
                      {newsItems.slice(0, 5).map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/60"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-neutral-900">
                                  {item.title}
                                </p>

                                {item.featured && (
                                  <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700">
                                    <Star size={10} />
                                    Destaque
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <span className="rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
                              {item.category}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <StatusBadge status={item.status} />
                          </td>

                          <td className="px-5 py-4 text-sm text-neutral-500">
                            {item.date}
                          </td>

                          <td className="px-5 py-4">
                            <span className="flex items-center gap-1 text-sm font-semibold text-neutral-700">
                              <Eye size={14} />
                              {item.views}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <button
                              onClick={() =>
                                setSelectedNews(item)
                              }
                              className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"
                            >
                              <Eye size={17} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ========================= */}
          {/* PUBLICATIONS */}
          {/* ========================= */}

          {activeView === "publications" && (
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-neutral-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <h2 className="font-bold text-neutral-950">
                    Todas as publicações
                  </h2>

                  <p className="mt-1 text-sm text-neutral-500">
                    {filteredNews.length} publicação(ões) encontrada(s)
                  </p>
                </div>

                <button
                  onClick={() =>
                    alert("Nova publicação — mock")
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  <Plus size={17} />
                  Nova publicação
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px]">
                  <thead>
                    <tr className="border-b border-neutral-100 bg-neutral-50/70 text-left">
                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Publicação
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Categoria
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Estado
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Data
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Multimédia
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Visualizações
                      </th>

                      <th />
                    </tr>
                  </thead>

                  <tbody>
                    {filteredNews.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/60"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <div className="max-w-[300px]">
                              <div className="flex items-center gap-2">
                                <p className="truncate text-sm font-semibold text-neutral-900">
                                  {item.title}
                                </p>

                                {item.featured && (
                                  <Star
                                    size={13}
                                    className="flex-shrink-0 fill-current text-blue-700"
                                  />
                                )}
                              </div>

                              <p className="mt-1 line-clamp-1 text-xs text-neutral-400">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
                            {item.category}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={item.status} />
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                            <CalendarDays size={14} />
                            {item.date}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 text-xs text-neutral-500">
                              <ImageIcon size={14} />
                              {item.mediaCount}
                            </span>

                            {item.hasVideo && (
                              <Video
                                size={14}
                                className="text-purple-500"
                              />
                            )}

                            {item.hasDocument && (
                              <FileText
                                size={14}
                                className="text-blue-500"
                              />
                            )}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="flex items-center gap-1 text-sm font-semibold text-neutral-700">
                            <Eye size={14} />
                            {item.views.toLocaleString("pt-PT")}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                setSelectedNews(item)
                              }
                              className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"
                              title="Ver"
                            >
                              <Eye size={16} />
                            </button>

                            <button
                              onClick={() =>
                                alert(
                                  `Editar "${item.title}" — mock`
                                )
                              }
                              className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-blue-900"
                              title="Editar"
                            >
                              <Edit3 size={16} />
                            </button>

                            <button
                              onClick={() =>
                                alert(
                                  `Mais opções para "${item.title}" — mock`
                                )
                              }
                              className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"
                            >
                              <MoreHorizontal size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredNews.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-5 py-16 text-center"
                        >
                          <Newspaper
                            size={38}
                            className="mx-auto text-neutral-300"
                          />

                          <p className="mt-3 text-sm font-semibold text-neutral-700">
                            Nenhuma publicação encontrada
                          </p>

                          <p className="mt-1 text-xs text-neutral-400">
                            Tenta alterar os filtros ou a pesquisa.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================= */}
          {/* MEDIA */}
          {/* ========================= */}

          {activeView === "media" && (
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-bold text-neutral-950">
                    Biblioteca multimédia
                  </h2>

                  <p className="mt-1 text-sm text-neutral-500">
                    Imagens, vídeos e documentos utilizados nas novidades.
                  </p>
                </div>

                <button
                  onClick={() =>
                    alert("Upload de ficheiros — mock")
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  <Upload size={17} />
                  Adicionar ficheiro
                </button>
              </div>

              {/* MEDIA SUMMARY */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-blue-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-900 shadow-sm">
                      <ImageIcon size={19} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-blue-700">
                        Imagens
                      </p>

                      <p className="text-xl font-bold text-blue-950">
                        18
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-purple-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-purple-700 shadow-sm">
                      <Video size={19} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-purple-700">
                        Vídeos
                      </p>

                      <p className="text-xl font-bold text-purple-950">
                        6
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-emerald-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                      <FileText size={19} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-emerald-700">
                        Documentos
                      </p>

                      <p className="text-xl font-bold text-emerald-950">
                        4
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* MEDIA GRID */}
              <div className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-neutral-950">
                    Ficheiros recentes
                  </h3>

                  <button className="text-sm font-semibold text-blue-900 hover:underline">
                    Ver todos
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {[
                    {
                      type: "image",
                      title: "Exame de Graduação",
                      src: "/images/novidades/exame-de-graduacao.jpg",
                    },
                    {
                      type: "image",
                      title: "Johannesburg Open",
                      src: "/galeria/open-de-johannesburg-2026/WhatsApp Image 2026-06-30 at 09.24.46.jpeg",
                    },
                    {
                      type: "image",
                      title: "Johannesburg Open",
                      src: "/galeria/open-de-johannesburg-2026/WhatsApp Image 2026-06-30 at 09.24.47.jpeg",
                    },
                    {
                      type: "image",
                      title: "Johannesburg Open",
                      src: "/galeria/open-de-johannesburg-2026/WhatsApp Image 2026-06-30 at 09.24.48.jpeg",
                    },
                  ].map((file, index) => (
                    <div
                      key={index}
                      className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white"
                    >
                      <div className="relative aspect-square overflow-hidden bg-neutral-100">
                        <img
                          src={file.src}
                          alt={file.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100">
                          <div className="p-3 text-white">
                            <p className="text-xs font-semibold">
                              {file.title}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-2">
                          <ImageIcon
                            size={14}
                            className="text-blue-700"
                          />

                          <span className="text-xs font-medium text-neutral-600">
                            Imagem
                          </span>
                        </div>

                        <button
                          onClick={() =>
                            alert(
                              `Opções para ${file.title} — mock`
                            )
                          }
                          className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================= */}
          {/* FOOTER */}
          {/* ========================= */}

          <div className="mt-5 flex flex-col gap-2 pb-8 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              EJEM · Gestão de Novidades
            </p>

            <p className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Sistema operacional
            </p>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* NEWS DETAILS MODAL */}
      {/* ========================= */}

      {selectedNews && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                  Pré-visualização
                </p>

                <h2 className="mt-1 text-xl font-bold text-neutral-950">
                  {selectedNews.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedNews(null)}
                className="rounded-full p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="max-h-[75vh] overflow-y-auto">
              {/* IMAGE */}
              <div className="relative h-56 bg-neutral-100 sm:h-72">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-full bg-blue-900 px-3 py-1.5 text-xs font-bold text-white">
                    {selectedNews.category}
                  </span>

                  {selectedNews.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-blue-900 shadow-lg">
                      <Star size={12} />
                      Destaque
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                {/* TITLE */}
                <h3 className="text-2xl font-bold text-neutral-950">
                  {selectedNews.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={13} />
                    {selectedNews.date}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Eye size={13} />
                    {selectedNews.views} visualizações
                  </span>

                  <StatusBadge status={selectedNews.status} />
                </div>

                {/* DESCRIPTION */}
                <div className="mt-6">
                  <p className="text-sm leading-7 text-neutral-600">
                    {selectedNews.description}
                  </p>
                </div>

                {/* MEDIA */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-neutral-200 p-4">
                    <div className="flex items-center gap-2">
                      <ImageIcon
                        size={17}
                        className="text-blue-700"
                      />

                      <span className="text-sm font-semibold text-neutral-900">
                        Imagens
                      </span>
                    </div>

                    <p className="mt-2 text-lg font-bold text-neutral-950">
                      {selectedNews.mediaCount}
                    </p>
                  </div>

                  <div className="rounded-xl border border-neutral-200 p-4">
                    <div className="flex items-center gap-2">
                      <Video
                        size={17}
                        className="text-purple-700"
                      />

                      <span className="text-sm font-semibold text-neutral-900">
                        Vídeo
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-neutral-600">
                      {selectedNews.hasVideo
                        ? "Incluído"
                        : "Não incluído"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-neutral-200 p-4">
                    <div className="flex items-center gap-2">
                      <FileText
                        size={17}
                        className="text-emerald-700"
                      />

                      <span className="text-sm font-semibold text-neutral-900">
                        Documento
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-neutral-600">
                      {selectedNews.hasDocument
                        ? "Incluído"
                        : "Não incluído"}
                    </p>
                  </div>
                </div>

                {/* EXAM SPECIFIC MOCK */}
                {selectedNews.id === 1 && (
                  <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-start gap-3">
                      <Link2
                        size={19}
                        className="mt-0.5 flex-shrink-0 text-blue-900"
                      />

                      <div>
                        <p className="text-sm font-bold text-blue-950">
                          Formulário de inscrição
                        </p>

                        <p className="mt-1 break-all text-xs leading-relaxed text-blue-800">
                          https://docs.google.com/forms/d/e/1FAIpQLSfXUUtD46IVRDT0YKStmNxlOCL8sCeJHjHP5d-fKN_0iBiknA/viewform
                        </p>

                        <button
                          onClick={() =>
                            alert(
                              "Abrir formulário de inscrição — mock"
                            )
                          }
                          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-blue-900 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-800"
                        >
                          <ExternalLink size={13} />
                          Abrir formulário
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* JOHANNESBURG SPECIFIC MOCK */}
                {selectedNews.id === 2 && (
                  <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-start gap-3">
                      <TrophyIcon
                        size={19}
                        className="mt-0.5 flex-shrink-0 text-blue-900"
                      />

                      <div>
                        <p className="text-sm font-bold text-blue-950">
                          Johannesburg Open 2026
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-blue-800">
                          Shenidy Tsemane (-57kg) conquistou o 1º
                          lugar no Johannesburg Open 2026.
                        </p>

                        <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-blue-800">
                          <MapPin size={13} />
                          Johannesburg, África do Sul
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ACTIONS */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <button
                    onClick={() =>
                      alert(
                        `Editar "${selectedNews.title}" — mock`
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
                  >
                    <Edit3 size={16} />
                    Editar
                  </button>

                  <button
                    onClick={() =>
                      alert(
                        selectedNews.status === "Publicada"
                          ? "Publicação arquivada — mock"
                          : "Publicação publicada — mock"
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
                  >
                    {selectedNews.status === "Publicada" ? (
                      <>
                        <Archive size={16} />
                        Arquivar
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={16} />
                        Publicar
                      </>
                    )}
                  </button>

                  <button
                    onClick={() =>
                      alert(
                        `Eliminar "${selectedNews.title}" — mock`
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 py-3 text-sm font-semibold text-red-700 hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

/* Pequeno ícone local para evitar dependência adicional */
function TrophyIcon({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return <TrophyIconBase size={size} className={className} />;
}

function TrophyIconBase({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5H4v2a3 3 0 0 0 3 3" />
      <path d="M17 5h3v2a3 3 0 0 1-3 3" />
    </svg>
  );
}
