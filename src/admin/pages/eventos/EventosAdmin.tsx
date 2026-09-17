"use client";

import { useMemo, useState } from "react";
import AdminLayout from "../../AdminLayout";
import {
  Calendar,
  Search,
  Plus,
  MoreVertical,
  MapPin,
  Image as ImageIcon,
  Video,
  Eye,
  Edit3,
  Trash2,
  Archive,
  CheckCircle2,
  Clock3,
  XCircle,
  ChevronDown,
  X,
  ArrowUpRight,
  Images,
  Play,
  CalendarDays,
  ListFilter,
  Upload,
  RotateCcw,
} from "lucide-react";

type EventStatus = "Passado" | "Em Breve" | "Cancelado";
type EventView = "Todos" | "Passados" | "Próximos" | "Cancelados";

type EventItem = {
  id: number;
  name: string;
  date: string;
  displayDate: string;
  location: string;
  status: EventStatus;
  description: string;
  details: string;
  images?: string[];
  video?: string;
};

type UpcomingEvent = {
  id: number;
  date: string;
  title: string;
  location: string;
  details: string;
};

const events: EventItem[] = [
  {
    id: 1,
    name: "Martial Fest 2017",
    date: "2017-10-07",
    displayDate: "07/10/2017",
    location: "Maputo",
    status: "Passado",
    description:
      "Participação da escola na 1ª Edição do Martial Fest.",
    details:
      "Evento dedicado às artes marciais com demonstrações, competições e actividades para o público.",
    video: "/videos/martial-fest.mp4",
  },
  {
    id: 2,
    name: "Martial Fest 2022",
    date: "2022-12-20",
    displayDate: "20/12/2022",
    location: "Maputo",
    status: "Passado",
    description:
      "Participação da escola na 3ª Edição do Martial Fest.",
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
      "/images/martial-fest-2022/image00118.jpg",
    ],
  },
  {
    id: 3,
    name: "Dia Mundial do Judo",
    date: "2023-10-28",
    displayDate: "28/10/2023",
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
    displayDate: "19/03/2026",
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
    displayDate: "30/05/2026",
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
      "/images/torneio-escolar/WhatsApp Image 2026-06-14 at 00.35.31.jpeg",
    ],
  },
];

const upcomingEvents: UpcomingEvent[] = [
  {
    id: 1,
    date: "20/06 a 04/07",
    title: "Graduação intermédia",
    location: "EJEM",
    details:
      "Período de avaliação técnica e progressão dos atletas.",
  },
  {
    id: 2,
    date: "26/06 a 29/06",
    title: "Open da África do Sul",
    location: "Joanesburgo, África do Sul",
    details:
      "Ranking mundial, cadetes, juniores e seniores.",
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

function StatusBadge({ status }: { status: EventStatus }) {
  const styles = {
    Passado: "bg-blue-50 text-blue-700 border-blue-100",
    "Em Breve": "bg-emerald-50 text-emerald-700 border-emerald-100",
    Cancelado: "bg-red-50 text-red-700 border-red-100",
  };

  const icons = {
    Passado: <CheckCircle2 size={13} />,
    "Em Breve": <Clock3 size={13} />,
    Cancelado: <XCircle size={13} />,
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

function MediaBadge({ event }: { event: EventItem }) {
  const imageCount = event.images?.length ?? 0;

  if (event.video) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Video size={14} />
        Vídeo
      </span>
    );
  }

  if (imageCount > 0) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Images size={14} />
        {imageCount} {imageCount === 1 ? "foto" : "fotos"}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
      <ImageIcon size={14} />
      Sem multimédia
    </span>
  );
}

export default function EventosAdmin() {
  const [activeView, setActiveView] = useState<EventView>("Todos");
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedUpcoming, setSelectedUpcoming] =
    useState<UpcomingEvent | null>(null);
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [menuId, setMenuId] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredEvents = useMemo(() => {
    const query = search.toLowerCase().trim();

    return events.filter((event) => {
      const matchesSearch =
        !query ||
        event.name.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query);

      const matchesView =
        activeView === "Todos" ||
        (activeView === "Passados" && event.status === "Passado") ||
        (activeView === "Próximos" && event.status === "Em Breve") ||
        (activeView === "Cancelados" && event.status === "Cancelado");

      return matchesSearch && matchesView;
    });
  }, [activeView, search]);

  const totalPhotos = events.reduce(
    (total, event) => total + (event.images?.length ?? 0),
    0
  );

  const totalVideos = events.filter((event) => event.video).length;

  const handleAction = (message: string) => {
    setMenuId(null);
    window.alert(message);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50">
        {/* HEADER */}
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-700">
                  <CalendarDays size={16} />
                  Gestão de conteúdo
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Eventos
                </h1>

                <p className="mt-1 max-w-2xl text-sm text-slate-500">
                  Gerencie eventos, datas, locais e toda a multimédia
                  associada às actividades da EJEM.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                <Plus size={18} />
                Novo evento
              </button>
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* KPIs */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Calendar size={19} />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  Total
                </span>
              </div>

              <p className="mt-4 text-2xl font-bold text-slate-950">
                {events.length}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Eventos publicados
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Clock3 size={19} />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  Agenda
                </span>
              </div>

              <p className="mt-4 text-2xl font-bold text-slate-950">
                {upcomingEvents.length}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Próximos eventos
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                  <Images size={19} />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  Galeria
                </span>
              </div>

              <p className="mt-4 text-2xl font-bold text-slate-950">
                {totalPhotos}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Fotografias associadas
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                  <Video size={19} />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  Vídeos
                </span>
              </div>

              <p className="mt-4 text-2xl font-bold text-slate-950">
                {totalVideos}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Vídeos publicados
              </p>
            </div>
          </div>

          {/* QUICK NAVIGATION */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            <div className="flex flex-wrap gap-1">
              {(
                [
                  ["Todos", events.length],
                  [
                    "Passados",
                    events.filter((e) => e.status === "Passado").length,
                  ],
                  ["Próximos", upcomingEvents.length],
                  ["Cancelados", events.filter((e) => e.status === "Cancelado").length],
                ] as [EventView, number][]
              ).map(([view, count]) => (
                <button
                  key={view}
                  type="button"
                  onClick={() => {
                    setActiveView(view);
                    if (view === "Próximos") {
                      setShowUpcoming(true);
                    } else {
                      setShowUpcoming(false);
                    }
                  }}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    activeView === view
                      ? "bg-blue-700 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {view}
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                      activeView === view
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* SEARCH / FILTERS */}
          <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Pesquisar eventos..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveView("Todos");
                  setShowUpcoming(false);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                <RotateCcw size={15} />
                Limpar
              </button>

              <button
                type="button"
                onClick={() =>
                  handleAction("Filtro avançado aberto — mock.")
                }
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                <ListFilter size={16} />
                Filtros
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          {/* UPCOMING EVENTS */}
          {(showUpcoming || activeView === "Próximos") && (
            <section className="mt-8">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">
                    Próximos eventos
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Calendário de actividades previstas para 2026.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowUpcoming(false)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="divide-y divide-slate-100">
                  {upcomingEvents.map((event) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => setSelectedUpcoming(event)}
                      className="flex w-full flex-col gap-4 p-5 text-left transition hover:bg-slate-50 md:flex-row md:items-center"
                    >
                      <div className="flex min-w-[150px] items-center gap-2 text-sm font-semibold text-blue-700">
                        <Calendar size={16} />
                        {event.date}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-slate-900">
                          {event.title}
                        </h3>

                        <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin size={14} />
                            {event.location}
                          </span>

                          <span>{event.details}</span>
                        </div>
                      </div>

                      <ArrowUpRight
                        size={18}
                        className="hidden text-slate-400 md:block"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* EVENTS TABLE */}
          <section className="mt-8">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Eventos publicados
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Histórico de eventos apresentados no site.
                </p>
              </div>

              <span className="text-sm text-slate-400">
                {filteredEvents.length} resultado
                {filteredEvents.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Desktop */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[900px]">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Evento
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Data
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Local
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Estado
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Multimédia
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                        Acções
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredEvents.map((event) => (
                      <tr
                        key={event.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <div className="max-w-sm">
                            <p className="font-semibold text-slate-900">
                              {event.name}
                            </p>

                            <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                              {event.description}
                            </p>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                          {event.displayDate}
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex max-w-[190px] items-center gap-1.5 text-sm text-slate-600">
                            <MapPin
                              size={14}
                              className="shrink-0 text-slate-400"
                            />
                            <span className="truncate">
                              {event.location}
                            </span>
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={event.status} />
                        </td>

                        <td className="px-5 py-4">
                          <MediaBadge event={event} />
                        </td>

                        <td className="relative px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              setMenuId(menuId === event.id ? null : event.id)
                            }
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                          >
                            <MoreVertical size={18} />
                          </button>

                          {menuId === event.id && (
                            <div className="absolute right-5 top-12 z-20 w-48 rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedEvent(event);
                                  setMenuId(null);
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                              >
                                <Eye size={16} />
                                Ver detalhes
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleAction(
                                    `Editar "${event.name}" — mock.`
                                  )
                                }
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                              >
                                <Edit3 size={16} />
                                Editar
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleAction(
                                    `Gerir multimédia de "${event.name}" — mock.`
                                  )
                                }
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                              >
                                <Images size={16} />
                                Multimédia
                              </button>

                              <div className="my-1 border-t border-slate-100" />

                              <button
                                type="button"
                                onClick={() =>
                                  handleAction(
                                    `"${event.name}" arquivado — mock.`
                                  )
                                }
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                              >
                                <Archive size={16} />
                                Arquivar
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleAction(
                                    `Eliminar "${event.name}" — mock.`
                                  )
                                }
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                              >
                                <Trash2 size={16} />
                                Eliminar
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile */}
              <div className="divide-y divide-slate-100 md:hidden">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-900">
                          {event.name}
                        </h3>

                        <div className="mt-2 flex flex-wrap gap-2">
                          <StatusBadge status={event.status} />
                          <MediaBadge event={event} />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedEvent(event)}
                        className="shrink-0 rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
                      >
                        <Eye size={17} />
                      </button>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={15} />
                        {event.displayDate}
                      </div>

                      <div className="flex items-start gap-2">
                        <MapPin size={15} className="mt-0.5 shrink-0" />
                        {event.location}
                      </div>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
                      {event.description}
                    </p>

                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleAction(`Editar "${event.name}" — mock.`)
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
                      >
                        <Edit3 size={14} />
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleAction(
                            `Gerir multimédia de "${event.name}" — mock.`
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
                      >
                        <Images size={14} />
                        Multimédia
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <Search size={20} />
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-900">
                    Nenhum evento encontrado
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Tente alterar a pesquisa ou remover os filtros.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* MEDIA OVERVIEW */}
          <section className="mt-8">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-950">
                Multimédia
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Visão geral das imagens e vídeos associados aos eventos.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {events
                .filter(
                  (event) =>
                    (event.images && event.images.length > 0) ||
                    event.video
                )
                .map((event) => {
                  const image = event.images?.[0];

                  return (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        {event.video ? (
                          <div className="flex h-full items-center justify-center bg-slate-900">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur">
                              <Play size={22} fill="currentColor" />
                            </div>

                            <span className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-semibold text-white">
                              Vídeo
                            </span>
                          </div>
                        ) : (
                          <img
                            src={image}
                            alt={event.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        )}

                        {event.images &&
                          event.images.length > 1 && (
                            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-black/65 px-2.5 py-1 text-xs font-semibold text-white">
                              <Images size={13} />
                              {event.images.length}
                            </span>
                          )}
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-slate-900">
                          {event.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {event.images
                            ? `${event.images.length} ${
                                event.images.length === 1
                                  ? "fotografia"
                                  : "fotografias"
                              }`
                            : "Vídeo"}
                        </p>
                      </div>
                    </button>
                  );
                })}
            </div>
          </section>
        </main>

        {/* EVENT DETAILS MODAL */}
        {selectedEvent && (
          <div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <div
              className="max-h-[94vh] w-full max-w-4xl overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    Detalhes do evento
                  </p>

                  <h2 className="truncate text-lg font-bold text-slate-950 sm:text-xl">
                    {selectedEvent.name}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-[calc(94vh-75px)] overflow-y-auto">
                {/* Media */}
                {selectedEvent.video && (
                  <div className="bg-black">
                    <video
                      src={selectedEvent.video}
                      controls
                      className="max-h-[420px] w-full object-contain"
                    />
                  </div>
                )}

                {selectedEvent.images &&
                  selectedEvent.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 bg-slate-100 p-3 sm:grid-cols-3 md:grid-cols-4">
                      {selectedEvent.images.slice(0, 12).map((image, index) => (
                        <div
                          key={`${image}-${index}`}
                          className="aspect-square overflow-hidden rounded-xl bg-white"
                        >
                          <img
                            src={image}
                            alt={`${selectedEvent.name} ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                <div className="space-y-6 p-5 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-950">
                        {selectedEvent.name}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-2">
                          <Calendar size={15} />
                          {selectedEvent.displayDate}
                        </span>

                        <span className="inline-flex items-center gap-2">
                          <MapPin size={15} />
                          {selectedEvent.location}
                        </span>
                      </div>
                    </div>

                    <StatusBadge status={selectedEvent.status} />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                      Descrição
                    </h4>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {selectedEvent.description}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h4 className="font-bold text-slate-900">
                      Mais detalhes
                    </h4>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {selectedEvent.details}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-5">
                    <button
                      type="button"
                      onClick={() =>
                        handleAction(
                          `Editar "${selectedEvent.name}" — mock.`
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
                    >
                      <Edit3 size={16} />
                      Editar evento
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleAction(
                          `Upload de multimédia para "${selectedEvent.name}" — mock.`
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Upload size={16} />
                      Adicionar multimédia
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* UPCOMING EVENT MODAL */}
        {selectedUpcoming && (
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            onClick={() => setSelectedUpcoming(null)}
          >
            <div
              className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Calendar size={22} />
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedUpcoming(null)}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100"
                >
                  <X size={19} />
                </button>
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-blue-600">
                Próximo evento
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-950">
                {selectedUpcoming.title}
              </h2>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center gap-3 text-slate-600">
                  <Calendar size={17} className="text-blue-600" />
                  {selectedUpcoming.date}
                </div>

                <div className="flex items-start gap-3 text-slate-600">
                  <MapPin size={17} className="mt-0.5 text-blue-600" />
                  {selectedUpcoming.location}
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <p className="text-sm leading-6 text-slate-600">
                  {selectedUpcoming.details}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleAction(
                    `Editar "${selectedUpcoming.title}" — mock.`
                  )
                }
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800"
              >
                <Edit3 size={16} />
                Editar evento
              </button>
            </div>
          </div>
        )}

        {/* CREATE EVENT MODAL */}
        {showCreateModal && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          >
            <div
              className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Gestão de eventos
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-950">
                    Criar novo evento
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5 p-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Nome do evento
                  </label>

                  <input
                    placeholder="Ex.: Torneio Nacional de Judo"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Data
                    </label>

                    <input
                      type="date"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Estado
                    </label>

                    <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50">
                      <option>Em Breve</option>
                      <option>Passado</option>
                      <option>Cancelado</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Local
                  </label>

                  <input
                    placeholder="Ex.: Pavilhão da UEM, Maputo"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Descrição
                  </label>

                  <textarea
                    rows={3}
                    placeholder="Descrição breve do evento..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Detalhes
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Informações detalhadas sobre o evento..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                  <Upload
                    size={22}
                    className="mx-auto text-slate-400"
                  />

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    Adicionar fotografias ou vídeo
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Área de upload — apenas demonstração nesta versão mock.
                  </p>
                </div>

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancelar
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      window.alert(
                        "Novo evento criado com sucesso — mock."
                      );
                    }}
                    className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
                  >
                    Criar evento
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
