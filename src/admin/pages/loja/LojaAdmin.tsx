"use client";

import { useMemo, useState } from "react";
import AdminLayout from "../../AdminLayout";
import {
  Search,
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Eye,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  AlertTriangle,
  Box,
  CreditCard,
  CalendarDays,
  X,
  ChevronRight,
  RefreshCw,
  Filter,
  Download,
  BarChart3,
  CircleDollarSign,
} from "lucide-react";

type OrderStatus =
  | "Pendente"
  | "Confirmado"
  | "Processando"
  | "Enviado"
  | "Concluído"
  | "Cancelado";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  sold: number;
  category: string;
  image: string;
  status: "Ativo" | "Baixo stock" | "Esgotado";
};

type Order = {
  id: string;
  customer: string;
  phone: string;
  items: number;
  total: number;
  payment: string;
  status: OrderStatus;
  date: string;
  address: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Kimono Branco Infantil",
    price: 3500,
    stock: 14,
    sold: 28,
    category: "Kimonos",
    image: "/images/loja/kimono-de-judo-adidas-infantil.webp",
    status: "Ativo",
  },
  {
    id: 2,
    name: "Kimono Azul Adulto",
    price: 5800,
    stock: 7,
    sold: 21,
    category: "Kimonos",
    image: "/images/loja/kimono-adulto-azul.jpeg",
    status: "Ativo",
  },
  {
    id: 3,
    name: "Faixa Preta Profissional",
    price: 1900,
    stock: 5,
    sold: 17,
    category: "Faixas",
    image: "/images/loja/faixa-preta.jpeg",
    status: "Baixo stock",
  },
  {
    id: 4,
    name: "Faixa Colorida",
    price: 900,
    stock: 31,
    sold: 43,
    category: "Faixas",
    image: "/images/loja/faixas.webp",
    status: "Ativo",
  },
  {
    id: 5,
    name: "Saco de Desporto",
    price: 2700,
    stock: 9,
    sold: 16,
    category: "Acessórios",
    image: "/images/loja/saco.jpg",
    status: "Ativo",
  },
  {
    id: 6,
    name: "Protetor Bucal",
    price: 350,
    stock: 3,
    sold: 34,
    category: "Proteção",
    image: "/images/loja/protetor-bucal.webp",
    status: "Baixo stock",
  },
];

const orders: Order[] = [
  {
    id: "#EJM-1048",
    customer: "Carlos Manuel",
    phone: "84 321 9876",
    items: 2,
    total: 9300,
    payment: "M-Pesa",
    status: "Concluído",
    date: "17 Set, 10:42",
    address: "Matola, Maputo",
  },
  {
    id: "#EJM-1047",
    customer: "Ana Paula",
    phone: "82 456 1234",
    items: 3,
    total: 6500,
    payment: "E-Mola",
    status: "Processando",
    date: "17 Set, 09:18",
    address: "Polana, Maputo",
  },
  {
    id: "#EJM-1046",
    customer: "João António",
    phone: "84 789 3210",
    items: 1,
    total: 5800,
    payment: "Transferência",
    status: "Confirmado",
    date: "16 Set, 16:32",
    address: "Costa do Sol, Maputo",
  },
  {
    id: "#EJM-1045",
    customer: "Marta Luís",
    phone: "86 234 5678",
    items: 4,
    total: 8700,
    payment: "M-Pesa",
    status: "Enviado",
    date: "16 Set, 14:05",
    address: "Sommerschield, Maputo",
  },
  {
    id: "#EJM-1044",
    customer: "Pedro Ernesto",
    phone: "87 654 3210",
    items: 2,
    total: 4500,
    payment: "Dinheiro",
    status: "Pendente",
    date: "16 Set, 11:27",
    address: "Baixa, Maputo",
  },
  {
    id: "#EJM-1043",
    customer: "Sofia Alberto",
    phone: "84 987 6543",
    items: 1,
    total: 1900,
    payment: "M-Pesa",
    status: "Cancelado",
    date: "15 Set, 18:41",
    address: "Maxaquene, Maputo",
  },
];

const salesData = [
  { day: "Seg", value: 18500 },
  { day: "Ter", value: 24300 },
  { day: "Qua", value: 19800 },
  { day: "Qui", value: 31700 },
  { day: "Sex", value: 28600 },
  { day: "Sáb", value: 39200 },
  { day: "Dom", value: 34100 },
];

const activities = [
  {
    icon: ShoppingBag,
    title: "Novo pedido recebido",
    description: "Pedido #EJM-1048 de Carlos Manuel",
    time: "Há 18 min",
    type: "blue",
  },
  {
    icon: CheckCircle2,
    title: "Pedido concluído",
    description: "Pedido #EJM-1042 foi concluído",
    time: "Há 42 min",
    type: "green",
  },
  {
    icon: AlertTriangle,
    title: "Stock baixo",
    description: "Protetor Bucal tem apenas 3 unidades",
    time: "Há 1h",
    type: "orange",
  },
  {
    icon: Package,
    title: "Produto atualizado",
    description: "Kimono Azul Adulto atualizado",
    time: "Há 2h",
    type: "purple",
  },
];

function formatMoney(value: number) {
  return `${value.toLocaleString("pt-PT")} MT`;
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const styles: Record<OrderStatus, string> = {
    Pendente: "bg-amber-50 text-amber-700 border-amber-200",
    Confirmado: "bg-blue-50 text-blue-700 border-blue-200",
    Processando: "bg-purple-50 text-purple-700 border-purple-200",
    Enviado: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Concluído: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Cancelado: "bg-red-50 text-red-700 border-red-200",
  };

  const icons: Record<OrderStatus, React.ReactNode> = {
    Pendente: <Clock size={13} />,
    Confirmado: <CheckCircle2 size={13} />,
    Processando: <RefreshCw size={13} />,
    Enviado: <Truck size={13} />,
    Concluído: <CheckCircle2 size={13} />,
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

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
        <XCircle size={12} />
        Esgotado
      </span>
    );
  }

  if (stock <= 5) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
        <AlertTriangle size={12} />
        {stock} unidades
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
      <Box size={12} />
      {stock} unidades
    </span>
  );
}

export default function LojaAdmin() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "products">(
    "overview"
  );

  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderFilter, setOrderFilter] = useState<"Todos" | OrderStatus>("Todos");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.phone.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        orderFilter === "Todos" || order.status === orderFilter;

      return matchesSearch && matchesFilter;
    });
  }, [search, orderFilter]);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const lowStockProducts = products.filter((product) => product.stock <= 5);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#f7f8fa] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1500px]">
          {/* TOP HEADER */}
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2 text-sm text-neutral-500">
                <span>Admin</span>
                <ChevronRight size={14} />
                <span className="text-neutral-900">Loja</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
                Loja Oficial EJEM
              </h1>

              <p className="mt-1 text-sm text-neutral-500">
                Gestão de produtos, pedidos, stock e vendas.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50"
                onClick={() => alert("Dados atualizados — mock")}
              >
                <RefreshCw size={16} />
                Atualizar
              </button>

              <button
                className="inline-flex items-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                onClick={() => alert("Adicionar produto — mock")}
              >
                <Plus size={17} />
                Novo produto
              </button>
            </div>
          </div>

          {/* TABS */}
          <div className="mb-6 flex items-center gap-1 overflow-x-auto rounded-xl border border-neutral-200 bg-white p-1 shadow-sm">
            {[
              {
                id: "overview",
                label: "Visão geral",
                icon: BarChart3,
              },
              {
                id: "orders",
                label: "Pedidos",
                icon: ShoppingBag,
              },
              {
                id: "products",
                label: "Produtos",
                icon: Package,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(
                      tab.id as "overview" | "orders" | "products"
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

          {/* SEARCH */}
          {activeTab !== "overview" && (
            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                />

                <input
                  type="text"
                  placeholder={
                    activeTab === "orders"
                      ? "Pesquisar por pedido, cliente ou telefone..."
                      : "Pesquisar produtos..."
                  }
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {activeTab === "orders" && (
                <div className="flex items-center gap-2">
                  <Filter size={17} className="text-neutral-400" />

                  <select
                    value={orderFilter}
                    onChange={(e) =>
                      setOrderFilter(e.target.value as "Todos" | OrderStatus)
                    }
                    className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium outline-none"
                  >
                    <option value="Todos">Todos os estados</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="Processando">Processando</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* ========================= */}
          {/* OVERVIEW */}
          {/* ========================= */}

          {activeTab === "overview" && (
            <>
              {/* KPI CARDS */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-500">
                        Vendas este mês
                      </p>

                      <p className="mt-2 text-2xl font-bold text-neutral-950">
                        182.400 MT
                      </p>

                      <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <ArrowUpRight size={14} />
                        +18,4%
                        <span className="font-normal text-neutral-400">
                          vs. mês anterior
                        </span>
                      </div>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                      <CircleDollarSign size={21} />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-500">
                        Pedidos
                      </p>

                      <p className="mt-2 text-2xl font-bold text-neutral-950">
                        148
                      </p>

                      <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <ArrowUpRight size={14} />
                        +12,7%
                        <span className="font-normal text-neutral-400">
                          este mês
                        </span>
                      </div>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                      <ShoppingBag size={21} />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-500">
                        Produtos ativos
                      </p>

                      <p className="mt-2 text-2xl font-bold text-neutral-950">
                        {products.length}
                      </p>

                      <div className="mt-2 flex items-center gap-1 text-xs font-medium text-neutral-500">
                        <Box size={13} />
                        {totalStock} unidades em stock
                      </div>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <Package size={21} />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-500">
                        Clientes
                      </p>

                      <p className="mt-2 text-2xl font-bold text-neutral-950">
                        96
                      </p>

                      <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <ArrowUpRight size={14} />
                        +8,2%
                        <span className="font-normal text-neutral-400">
                          este mês
                        </span>
                      </div>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                      <Users size={21} />
                    </div>
                  </div>
                </div>
              </div>

              {/* CHART + STOCK */}
              <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
                {/* SALES CHART */}
                <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-bold text-neutral-950">
                        Vendas da semana
                      </h2>

                      <p className="mt-1 text-sm text-neutral-500">
                        Receita gerada nos últimos 7 dias
                      </p>
                    </div>

                    <button className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100">
                      <MoreHorizontal size={19} />
                    </button>
                  </div>

                  <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">
                    {salesData.map((item, index) => {
                      const max = Math.max(...salesData.map((x) => x.value));
                      const height = (item.value / max) * 100;

                      return (
                        <div
                          key={item.day}
                          className="flex h-full flex-1 flex-col justify-end"
                        >
                          <div className="group relative flex h-full items-end">
                            <div
                              className="w-full rounded-t-lg bg-blue-900 transition-all duration-300 group-hover:bg-blue-700"
                              style={{ height: `${height}%` }}
                            />

                            <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-neutral-950 px-2 py-1 text-[10px] font-semibold text-white opacity-0 transition group-hover:opacity-100">
                              {formatMoney(item.value)}
                            </div>
                          </div>

                          <p className="mt-3 text-center text-xs font-medium text-neutral-400">
                            {item.day}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4">
                    <div>
                      <p className="text-xs text-neutral-400">
                        Receita total
                      </p>
                      <p className="mt-1 font-bold text-neutral-950">
                        176.200 MT
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-neutral-400">
                        Média diária
                      </p>
                      <p className="mt-1 font-bold text-neutral-950">
                        25.171 MT
                      </p>
                    </div>

                    <div className="hidden sm:block">
                      <p className="text-xs text-neutral-400">
                        Crescimento
                      </p>
                      <p className="mt-1 flex items-center gap-1 font-bold text-emerald-600">
                        <TrendingUp size={14} />
                        18,4%
                      </p>
                    </div>
                  </div>
                </div>

                {/* STOCK */}
                <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-bold text-neutral-950">
                        Estado do stock
                      </h2>

                      <p className="mt-1 text-sm text-neutral-500">
                        Produtos que precisam de atenção
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                      <AlertTriangle size={19} />
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    {lowStockProducts.map((product) => (
                      <div key={product.id}>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-neutral-900">
                                {product.name}
                              </p>

                              <p className="mt-0.5 text-xs text-neutral-400">
                                {product.category}
                              </p>
                            </div>
                          </div>

                          <span className="whitespace-nowrap text-xs font-bold text-amber-600">
                            {product.stock} restantes
                          </span>
                        </div>

                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-100">
                          <div
                            className="h-full rounded-full bg-amber-500"
                            style={{
                              width: `${Math.min(product.stock * 15, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveTab("products")}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                  >
                    Ver todos os produtos
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>

              {/* ORDERS + ACTIVITY */}
              <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
                {/* RECENT ORDERS */}
                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-neutral-100 p-5 sm:p-6">
                    <div>
                      <h2 className="font-bold text-neutral-950">
                        Pedidos recentes
                      </h2>

                      <p className="mt-1 text-sm text-neutral-500">
                        Últimas encomendas recebidas
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab("orders")}
                      className="flex items-center gap-1 text-sm font-semibold text-blue-900 hover:underline"
                    >
                      Ver todos
                      <ArrowUpRight size={15} />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px]">
                      <thead>
                        <tr className="border-b border-neutral-100 bg-neutral-50/70 text-left">
                          <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                            Pedido
                          </th>
                          <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                            Cliente
                          </th>
                          <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                            Total
                          </th>
                          <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                            Estado
                          </th>
                          <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                            Data
                          </th>
                          <th />
                        </tr>
                      </thead>

                      <tbody>
                        {orders.slice(0, 5).map((order) => (
                          <tr
                            key={order.id}
                            className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/60"
                          >
                            <td className="px-5 py-4">
                              <p className="text-sm font-bold text-blue-900">
                                {order.id}
                              </p>
                            </td>

                            <td className="px-5 py-4">
                              <p className="text-sm font-semibold text-neutral-900">
                                {order.customer}
                              </p>
                              <p className="mt-0.5 text-xs text-neutral-400">
                                {order.items} item(ns)
                              </p>
                            </td>

                            <td className="px-5 py-4">
                              <p className="text-sm font-bold text-neutral-900">
                                {formatMoney(order.total)}
                              </p>
                              <p className="mt-0.5 text-xs text-neutral-400">
                                {order.payment}
                              </p>
                            </td>

                            <td className="px-5 py-4">
                              <StatusBadge status={order.status} />
                            </td>

                            <td className="px-5 py-4 text-sm text-neutral-500">
                              {order.date}
                            </td>

                            <td className="px-5 py-4">
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900"
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

                {/* ACTIVITY */}
                <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-bold text-neutral-950">
                        Atividade recente
                      </h2>

                      <p className="mt-1 text-sm text-neutral-500">
                        Eventos da loja
                      </p>
                    </div>

                    <button className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>

                  <div className="mt-6 space-y-5">
                    {activities.map((activity, index) => {
                      const Icon = activity.icon;

                      const iconStyles: Record<string, string> = {
                        blue: "bg-blue-50 text-blue-700",
                        green: "bg-emerald-50 text-emerald-700",
                        orange: "bg-amber-50 text-amber-700",
                        purple: "bg-purple-50 text-purple-700",
                      };

                      return (
                        <div
                          key={index}
                          className="flex gap-3"
                        >
                          <div
                            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${iconStyles[activity.type]}`}
                          >
                            <Icon size={16} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-neutral-900">
                              {activity.title}
                            </p>

                            <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">
                              {activity.description}
                            </p>

                            <p className="mt-1 text-[11px] text-neutral-400">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ========================= */}
          {/* ORDERS */}
          {/* ========================= */}

          {activeTab === "orders" && (
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-neutral-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <h2 className="font-bold text-neutral-950">
                    Todos os pedidos
                  </h2>

                  <p className="mt-1 text-sm text-neutral-500">
                    {filteredOrders.length} pedido(s) encontrado(s)
                  </p>
                </div>

                <button
                  onClick={() => alert("Exportação de pedidos — mock")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  <Download size={16} />
                  Exportar
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-neutral-100 bg-neutral-50/70 text-left">
                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Pedido
                      </th>
                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Cliente
                      </th>
                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Produtos
                      </th>
                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Pagamento
                      </th>
                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Total
                      </th>
                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Estado
                      </th>
                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Data
                      </th>
                      <th />
                    </tr>
                  </thead>

                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/60"
                      >
                        <td className="px-5 py-4">
                          <span className="text-sm font-bold text-blue-900">
                            {order.id}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-neutral-900">
                            {order.customer}
                          </p>
                          <p className="mt-0.5 text-xs text-neutral-400">
                            {order.phone}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-neutral-600">
                          {order.items} item(ns)
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <CreditCard size={15} />
                            {order.payment}
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm font-bold text-neutral-900">
                          {formatMoney(order.total)}
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={order.status} />
                        </td>

                        <td className="px-5 py-4 text-sm text-neutral-500">
                          {order.date}
                        </td>

                        <td className="px-5 py-4">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"
                          >
                            <Eye size={17} />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {filteredOrders.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-5 py-16 text-center">
                          <ShoppingBag
                            size={36}
                            className="mx-auto text-neutral-300"
                          />
                          <p className="mt-3 text-sm font-semibold text-neutral-700">
                            Nenhum pedido encontrado
                          </p>
                          <p className="mt-1 text-xs text-neutral-400">
                            Tenta alterar a pesquisa ou o filtro.
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
          {/* PRODUCTS */}
          {/* ========================= */}

          {activeTab === "products" && (
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-neutral-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <h2 className="font-bold text-neutral-950">
                    Produtos da loja
                  </h2>

                  <p className="mt-1 text-sm text-neutral-500">
                    {products.length} produtos cadastrados
                  </p>
                </div>

                <button
                  onClick={() => alert("Novo produto — mock")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  <Plus size={17} />
                  Adicionar produto
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-neutral-100 bg-neutral-50/70 text-left">
                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Produto
                      </th>
                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Categoria
                      </th>
                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Preço
                      </th>
                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Stock
                      </th>
                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Vendidos
                      </th>
                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Estado
                      </th>
                      <th />
                    </tr>
                  </thead>

                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/60"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-neutral-900">
                                {product.name}
                              </p>

                              <p className="mt-0.5 text-xs text-neutral-400">
                                SKU-EJM-{String(product.id).padStart(3, "0")}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
                            {product.category}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm font-bold text-neutral-900">
                          {formatMoney(product.price)}
                        </td>

                        <td className="px-5 py-4">
                          <StockBadge stock={product.stock} />
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-neutral-900">
                              {product.sold}
                            </span>

                            <span className="text-xs text-neutral-400">
                              unidades
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          {product.status === "Ativo" && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                              <span className="h-2 w-2 rounded-full bg-emerald-500" />
                              Ativo
                            </span>
                          )}

                          {product.status === "Baixo stock" && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600">
                              <span className="h-2 w-2 rounded-full bg-amber-500" />
                              Baixo stock
                            </span>
                          )}

                          {product.status === "Esgotado" && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600">
                              <span className="h-2 w-2 rounded-full bg-red-500" />
                              Esgotado
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <button
                            onClick={() =>
                              alert(`Editar ${product.name} — mock`)
                            }
                            className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"
                          >
                            <MoreHorizontal size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-5 py-16 text-center">
                          <Package
                            size={36}
                            className="mx-auto text-neutral-300"
                          />
                          <p className="mt-3 text-sm font-semibold text-neutral-700">
                            Nenhum produto encontrado
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* FOOTER INFO */}
          <div className="mt-5 flex flex-col gap-2 pb-8 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
            <p>Loja Oficial EJEM · Painel Administrativo</p>

            <p className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Sistema operacional
            </p>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* ORDER DETAILS MODAL */}
      {/* ========================= */}

      {selectedOrder && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                  Detalhes do pedido
                </p>

                <h2 className="mt-1 text-xl font-bold text-neutral-950">
                  {selectedOrder.id}
                </h2>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-full p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="space-y-5 p-5 sm:p-6">
              {/* CUSTOMER */}
              <div className="rounded-2xl bg-neutral-50 p-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Cliente
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-neutral-500">Nome</span>
                    <span className="text-right text-sm font-semibold text-neutral-900">
                      {selectedOrder.customer}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-neutral-500">
                      Telefone
                    </span>
                    <span className="text-right text-sm font-semibold text-neutral-900">
                      {selectedOrder.phone}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-neutral-500">Morada</span>
                    <span className="max-w-[220px] text-right text-sm font-semibold text-neutral-900">
                      {selectedOrder.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* ORDER */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Pedido
                </p>

                <div className="rounded-2xl border border-neutral-200 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500">
                      Quantidade
                    </span>

                    <span className="text-sm font-semibold text-neutral-900">
                      {selectedOrder.items} item(ns)
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-neutral-500">
                      Pagamento
                    </span>

                    <span className="text-sm font-semibold text-neutral-900">
                      {selectedOrder.payment}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
                    <span className="font-semibold text-neutral-900">
                      Total
                    </span>

                    <span className="text-lg font-bold text-blue-900">
                      {formatMoney(selectedOrder.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* STATUS */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Estado atual
                </p>

                <div className="flex items-center justify-between rounded-2xl border border-neutral-200 p-4">
                  <StatusBadge status={selectedOrder.status} />

                  <button
                    onClick={() =>
                      alert("Alteração de estado — mock")
                    }
                    className="text-sm font-semibold text-blue-900 hover:underline"
                  >
                    Alterar estado
                  </button>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => alert("Abrir WhatsApp — mock")}
                  className="rounded-xl border border-neutral-200 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  Contactar cliente
                </button>

                <button
                  onClick={() => alert("Pedido atualizado — mock")}
                  className="rounded-xl bg-blue-900 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  Atualizar pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
