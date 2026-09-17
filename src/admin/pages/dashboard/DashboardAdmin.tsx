"use client";

import AdminLayout from "../../AdminLayout";
import {
  Activity,
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  FolderOpen,
  Image as ImageIcon,
  Info,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
  Video,
  Wrench,
} from "lucide-react";

type ActivityItem = {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
};

const activities: ActivityItem[] = [
  {
    id: 1,
    title: "Nova publicação criada",
    description: "Exame de Graduação 2026 foi publicado.",
    time: "Hoje, 09:42",
    icon: <FileText size={16} />,
  },
  {
    id: 2,
    title: "Novo evento actualizado",
    description: "Torneio Escolar de Judo foi actualizado.",
    time: "Hoje, 08:15",
    icon: <Calendar size={16} />,
  },
  {
    id: 3,
    title: "Multimédia adicionada",
    description: "15 fotografias adicionadas à galeria.",
    time: "Ontem, 16:30",
    icon: <ImageIcon size={16} />,
  },
  {
    id: 4,
    title: "Publicação visualizada",
    description: "Johannesburg Open 2026 recebeu novas visualizações.",
    time: "Ontem, 14:20",
    icon: <TrendingUp size={16} />,
  },
];

const upcomingEvents = [
  {
    date: "20 JUN",
    title: "Graduação intermédia",
    location: "EJEM",
  },
  {
    date: "26 JUN",
    title: "Open da África do Sul",
    location: "Joanesburgo",
  },
  {
    date: "JUL",
    title: "Jogos da Commonwealth",
    location: "Glasgow",
  },
];

const recentPosts = [
  {
    title: "Exame de Graduação",
    type: "Aviso",
    status: "Publicada",
    views: 482,
  },
  {
    title: "Johannesburg Open 2026",
    type: "Conquista",
    status: "Publicada",
    views: 1268,
  },
  {
    title: "Calendário de actividades 2026",
    type: "Calendário",
    status: "Publicada",
    views: 734,
  },
];

const developmentPages = [
  {
    name: "Alunos",
    description: "Gestão de alunos e atletas",
    icon: <Users size={18} />,
  },
  {
    name: "Inscrições",
    description: "Gestão de inscrições",
    icon: <FileText size={18} />,
  },
  {
    name: "Financeiro",
    description: "Quotas, pagamentos e receitas",
    icon: <TrendingUp size={18} />,
  },
  {
    name: "Relatórios",
    description: "Relatórios e estatísticas avançadas",
    icon: <Activity size={18} />,
  },
  {
    name: "Configurações",
    description: "Configuração geral da plataforma",
    icon: <Settings size={18} />,
  },
];

export default function DashboardAdmin() {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50">
        {/* HEADER */}
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-700">
                  <LayoutDashboard size={16} />
                  Painel administrativo
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Overview
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Visão geral da actividade e conteúdos da EJEM.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    window.alert("Centro de notificações — mock.")
                  }
                  className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 transition hover:bg-slate-50"
                >
                  <Bell size={19} />

                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    window.alert("Nova publicação — mock.")
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                >
                  <Plus size={17} />
                  Nova publicação
                </button>
              </div>
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* SYSTEM STATUS */}
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <ShieldCheck size={18} />
              </div>

              <div>
                <p className="text-sm font-bold text-emerald-900">
                  Sistema operacional
                </p>

                <p className="mt-0.5 text-xs text-emerald-700">
                  Conteúdo público e área administrativa estão disponíveis.
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm sm:self-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Online
            </span>
          </div>

          {/* KPIs */}
          <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
              title="Publicações"
              value="6"
              description="Conteúdos publicados"
              icon={<FileText size={20} />}
              iconClass="bg-blue-50 text-blue-700"
            />

            <StatCard
              title="Eventos"
              value="5"
              description="Eventos registados"
              icon={<Calendar size={20} />}
              iconClass="bg-purple-50 text-purple-700"
            />

            <StatCard
              title="Multimédia"
              value="140+"
              description="Fotos e vídeos"
              icon={<ImageIcon size={20} />}
              iconClass="bg-orange-50 text-orange-700"
            />

            <StatCard
              title="Visualizações"
              value="3.8K"
              description="Conteúdo publicado"
              icon={<TrendingUp size={20} />}
              iconClass="bg-emerald-50 text-emerald-700"
            />
          </section>

          {/* MAIN GRID */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            {/* RECENT ACTIVITY */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div>
                  <h2 className="font-bold text-slate-950">
                    Actividade recente
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Últimas alterações no painel
                  </p>
                </div>

                <Activity size={18} className="text-slate-400" />
              </div>

              <div className="divide-y divide-slate-100">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 px-5 py-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      {activity.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900">
                        {activity.title}
                      </p>

                      <p className="mt-0.5 text-xs leading-5 text-slate-500">
                        {activity.description}
                      </p>

                      <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                        <Clock3 size={12} />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 p-4">
                <button
                  type="button"
                  onClick={() =>
                    window.alert("Histórico completo — mock.")
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  Ver actividade completa
                  <ArrowRight size={15} />
                </button>
              </div>
            </section>

            {/* UPCOMING EVENTS */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div>
                  <h2 className="font-bold text-slate-950">
                    Próximos eventos
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Agenda da escola
                  </p>
                </div>

                <Calendar size={18} className="text-slate-400" />
              </div>

              <div className="divide-y divide-slate-100">
                {upcomingEvents.map((event) => (
                  <button
                    key={event.title}
                    type="button"
                    onClick={() =>
                      window.alert(`${event.title} — detalhes mock.`)
                    }
                    className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex h-12 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <span className="text-[10px] font-bold">
                        {event.date}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {event.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {event.location}
                      </p>
                    </div>

                    <ChevronRight
                      size={16}
                      className="shrink-0 text-slate-300"
                    />
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-100 p-4">
                <button
                  type="button"
                  onClick={() =>
                    window.alert("Gestão de eventos — mock.")
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  Ver todos os eventos
                  <ArrowRight size={15} />
                </button>
              </div>
            </section>
          </div>

          {/* RECENT PUBLICATIONS */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-bold text-slate-950">
                  Publicações recentes
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Conteúdo actualmente disponível no site
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  window.alert("Gestão de publicações — mock.")
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50"
              >
                Ver todas
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {recentPosts.map((post) => (
                <div
                  key={post.title}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    <FileText size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {post.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {post.type}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {post.status}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <TrendingUp size={14} />
                    {post.views.toLocaleString("pt-PT")}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      window.alert(`Acções para "${post.title}" — mock.`)
                    }
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* QUICK ACTIONS */}
          <section className="mt-6">
            <div className="mb-4">
              <h2 className="font-bold text-slate-950">
                Acesso rápido
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Acções frequentes no painel administrativo.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <QuickAction
                icon={<FileText size={20} />}
                title="Nova publicação"
                description="Criar notícia ou aviso"
                onClick={() =>
                  window.alert("Nova publicação — mock.")
                }
              />

              <QuickAction
                icon={<Calendar size={20} />}
                title="Novo evento"
                description="Adicionar evento à agenda"
                onClick={() =>
                  window.alert("Novo evento — mock.")
                }
              />

              <QuickAction
                icon={<ImageIcon size={20} />}
                title="Adicionar multimédia"
                description="Gerir fotos e vídeos"
                onClick={() =>
                  window.alert("Upload de multimédia — mock.")
                }
              />

              <QuickAction
                icon={<FolderOpen size={20} />}
                title="Ver galeria"
                description="Explorar álbuns"
                onClick={() =>
                  window.alert("Galeria — mock.")
                }
              />
            </div>
          </section>

          {/* UNDER DEVELOPMENT */}
          <section className="mt-8 overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm">
            <div className="border-b border-amber-100 bg-amber-50 px-5 py-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <Wrench size={19} />
                </div>

                <div>
                  <h2 className="font-bold text-amber-950">
                    Funcionalidades em desenvolvimento
                  </h2>

                  <p className="mt-1 text-sm text-amber-800/80">
                    Algumas áreas do painel ainda estão a ser
                    desenvolvidas e estarão disponíveis numa próxima
                    versão.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
              {developmentPages.map((page) => (
                <button
                  key={page.name}
                  type="button"
                  onClick={() =>
                    window.alert(
                      `${page.name}: funcionalidade ainda em desenvolvimento.`
                    )
                  }
                  className="group flex items-center gap-3 p-5 text-left transition hover:bg-slate-50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-amber-50 group-hover:text-amber-700">
                    {page.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-bold text-slate-800">
                        {page.name}
                      </p>

                      <Info
                        size={13}
                        className="shrink-0 text-amber-500"
                      />
                    </div>

                    <p className="mt-0.5 line-clamp-1 text-[11px] text-slate-400">
                      {page.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* FOOTER INFO */}
          <div className="mt-6 flex flex-col gap-2 pb-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Painel administrativo EJEM · Versão de demonstração
            </p>

            <p className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={13} />
              Dados demonstrativos
            </p>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
  iconClass,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Overview
        </span>
      </div>

      <p className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">
        {title}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
          {icon}
        </div>

        <ArrowRight
          size={16}
          className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
        />
      </div>

      <p className="mt-4 text-sm font-bold text-slate-900">
        {title}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </button>
  );
}
