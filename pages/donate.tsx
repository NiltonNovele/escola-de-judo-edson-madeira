"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useRef, useState } from "react";
import {
  Heart,
  HeartHandshake,
  HandCoins,
  Building2,
  User,
  Truck,
  Gift,
  Briefcase,
  Utensils,
  Shirt,
  MessageSquare,
  CheckCircle2,
  HelpingHand,
  Wallet,
  ShieldCheck,
} from "lucide-react";

export default function DonatePage() {
  const formRef = useRef<HTMLElement | null>(null);

  const [type, setType] = useState<"donate" | "partner">("donate");
  const [isCompany, setIsCompany] = useState<boolean>(false);
  const [donationMode, setDonationMode] = useState<"money" | "goods" | "both">(
    "money"
  );
  const [goods, setGoods] = useState<string[]>([]);
  const [anonymousDonation, setAnonymousDonation] = useState(false);

  const [form, setForm] = useState({
    name: "",
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    amount: "",
    paymentMethod: "M-Pesa",
    message: "",
    otherDonation: "",
    deliveryMethod: "Posso entregar",
    partnershipType: "Apoio financeiro",
    partnershipObjective: "",
    benefitsInterest: "Gostaria de saber mais",
    sector: "",
    website: "",
  });

  const donationGoodsOptions = [
    { label: "Transporte", icon: Truck },
    { label: "Material desportivo", icon: Gift },
    { label: "Serviços profissionais", icon: Briefcase },
    { label: "Alimentação", icon: Utensils },
    { label: "Uniformes / roupa", icon: Shirt },
  ];

  function goToForm(selectedType: "donate" | "partner") {
    setType(selectedType);

    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function toggleGood(item: string) {
    setGoods((prev) =>
      prev.includes(item)
        ? prev.filter((good) => good !== item)
        : [...prev, item]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      mode: type,
      anonymousDonation,
      profile: isCompany ? "Empresa / Organização" : "Indivíduo",
      donationMode,
      selectedGoods: goods,
      ...form,
    };

    console.log("Submitted data:", payload);
    alert("Formulário enviado com sucesso! Ligue este formulário à sua API.");
  }

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 antialiased">
      <Navbar />

      <main className="pt-24">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-red-50 border-b border-blue-100">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-100/40 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-100 text-red-700 px-4 py-2 text-sm font-semibold">
                <Heart size={16} />
                APOIE A NOSSA MISSÃO
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-blue-900">
                Faça parte desta
                <br />
                transformação
              </h1>

              <p className="mt-6 max-w-2xl text-lg sm:text-xl text-gray-700 leading-relaxed">
                A sua contribuição ajuda a formar atletas, apoiar crianças e
                jovens, fortalecer programas sociais e expandir o impacto da
                Escola de Judo Edson Madeira dentro e fora do tatami.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => goToForm("donate")}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition bg-blue-900 text-white hover:bg-blue-950"
                >
                  <HandCoins size={18} />
                  Quero Doar
                </button>

                <button
                  onClick={() => goToForm("partner")}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition border-2 border-red-600 text-red-600 hover:bg-red-50"
                >
                  <HeartHandshake size={18} />
                  Tornar-me Parceiro
                </button>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/90 backdrop-blur rounded-2xl border border-blue-100 shadow-sm p-5">
                  <Wallet className="text-blue-900 mb-3" size={22} />
                  <h3 className="font-bold text-blue-900">Doação simples</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Valor livre, processo rápido e possibilidade de doar
                    anonimamente.
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur rounded-2xl border border-blue-100 shadow-sm p-5">
                  <HelpingHand className="text-blue-900 mb-3" size={22} />
                  <h3 className="font-bold text-blue-900">Outras formas</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Transporte, alimentação, equipamentos, uniformes e apoio
                    profissional.
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur rounded-2xl border border-blue-100 shadow-sm p-5">
                  <Building2 className="text-blue-900 mb-3" size={22} />
                  <h3 className="font-bold text-blue-900">Parcerias</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Para indivíduos, empresas, organizações e iniciativas
                    sociais.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-white">
                <Image
                  src="/causa.avif"
                  alt="Equipa de Judo"
                  width={900}
                  height={700}
                  className="object-cover w-full h-[320px] sm:h-[420px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* MAIN SECTION */}
        <section
          ref={formRef}
          className="bg-white py-16 lg:py-20 scroll-mt-28"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT INFO */}
            {/* <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6 shadow-sm">
                <h2 className="text-2xl font-extrabold text-blue-900">
                  {type === "donate" ? "Apoio rápido e flexível" : "Parcerias com impacto"}
                </h2>

                <p className="mt-4 text-gray-700 leading-relaxed">
                  {type === "donate"
                    ? "Escolha a forma de apoio mais conveniente. Quer doar em dinheiro, bens ou serviços? Pode fazê-lo de forma simples e direta."
                    : "Queremos construir relações duradouras com pessoas, empresas e organizações que acreditam no poder do desporto para transformar vidas."}
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    "Doações em dinheiro com valor livre",
                    "Possibilidade de doação anónima",
                    "Apoio com bens, transporte e serviços",
                    "Parcerias simples, relevantes e com propósito",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2
                        className="text-red-500 mt-0.5 flex-shrink-0"
                        size={18}
                      />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm">
                <div className="bg-blue-900 px-6 py-4">
                  <h3 className="text-white font-bold text-lg">
                    O seu apoio faz diferença
                  </h3>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <p className="font-semibold text-blue-900">
                      Formação de atletas
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Treinos, participação em eventos, competições e apoio
                      contínuo.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-900">
                      Desenvolvimento social
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Mais oportunidades para crianças e jovens crescerem com
                      disciplina, respeito e propósito.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-900">
                      Estrutura e logística
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Transporte, equipamentos, alimentação e operação dos
                      programas.
                    </p>
                  </div>
                </div>
              </div>
            </div> */}

            {/* FORM */}
            <div className="lg:col-span-8">
              <div className="rounded-3xl bg-white border border-gray-200 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-8 py-7">
                  <div className="flex flex-wrap gap-3 mb-5">
                    <button
                      type="button"
                      onClick={() => setType("donate")}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        type === "donate"
                          ? "bg-white text-blue-900"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      Quero Doar
                    </button>
                    <button
                      type="button"
                      onClick={() => setType("partner")}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        type === "partner"
                          ? "bg-white text-blue-900"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      Tornar-me Parceiro
                    </button>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {type === "donate"
                      ? "Formulário de Apoio / Doação"
                      : "Formulário de Parceria"}
                  </h2>
                  <p className="text-blue-100 mt-2">
                    {type === "donate"
                      ? "Preencha apenas o essencial para apoiar a escola da forma que preferir."
                      : "Preencha os dados abaixo para iniciar uma parceria simples e objetiva."}
                  </p>
                </div>

                <div className="p-6 sm:p-8">
                  {type === "donate" ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* DONATION MODE */}
                      <div className="rounded-2xl bg-gray-50 border border-gray-200 p-5">
                        <label className="block text-sm font-semibold text-gray-800 mb-4">
                          Como deseja apoiar?
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <button
                            type="button"
                            onClick={() => setDonationMode("money")}
                            className={`rounded-2xl px-4 py-4 font-medium border transition ${
                              donationMode === "money"
                                ? "bg-blue-900 text-white border-blue-900"
                                : "bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                            }`}
                          >
                            Só dinheiro
                          </button>

                          <button
                            type="button"
                            onClick={() => setDonationMode("goods")}
                            className={`rounded-2xl px-4 py-4 font-medium border transition ${
                              donationMode === "goods"
                                ? "bg-blue-900 text-white border-blue-900"
                                : "bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                            }`}
                          >
                            Só bens / serviços
                          </button>

                          <button
                            type="button"
                            onClick={() => setDonationMode("both")}
                            className={`rounded-2xl px-4 py-4 font-medium border transition ${
                              donationMode === "both"
                                ? "bg-blue-900 text-white border-blue-900"
                                : "bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                            }`}
                          >
                            Ambos
                          </button>
                        </div>
                      </div>

                      {/* ANONYMOUS */}
                      {(donationMode === "money" || donationMode === "both") && (
                        <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={anonymousDonation}
                              onChange={() => setAnonymousDonation((prev) => !prev)}
                              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-900 focus:ring-blue-500"
                            />
                            <div>
                              <span className="flex items-center gap-2 font-semibold text-blue-900">
                                <ShieldCheck size={18} />
                                Fazer doação anónima
                              </span>
                              <p className="text-sm text-gray-600 mt-1">
                                Se selecionar esta opção, não precisa preencher
                                nome nem contacto para a doação.
                              </p>
                            </div>
                          </label>
                        </div>
                      )}

                      {/* OPTIONAL CONTACT FOR DONATION */}
                      {!anonymousDonation && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-800">
                              Nome
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              placeholder="Seu nome"
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-800">
                              Email ou telefone
                            </label>
                            <input
                              type="text"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="Opcional para contacto"
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      )}

                      {/* MONEY DONATION */}
                      {(donationMode === "money" || donationMode === "both") && (
                        <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 space-y-5">
                          <div className="flex items-center gap-2 text-blue-900 font-bold">
                            <HandCoins size={18} />
                            Apoio financeiro
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-800">
                                Quanto deseja doar?
                              </label>
                              <input
                                type="number"
                                name="amount"
                                value={form.amount}
                                onChange={handleChange}
                                placeholder="Ex: 1000"
                                min="0"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-800">
                                Método de doação
                              </label>
                              <select
                                name="paymentMethod"
                                value={form.paymentMethod}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option>M-Pesa</option>
                                <option>e-Mola</option>
                                <option>Transferência Bancária</option>
                                <option>Dinheiro</option>
                                <option>Cartão</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* GOODS / SERVICES */}
                      {(donationMode === "goods" || donationMode === "both") && (
                        <div className="rounded-2xl border border-red-100 bg-red-50/50 p-5 space-y-5">
                          <div className="flex items-center gap-2 text-red-700 font-bold">
                            <Gift size={18} />
                            Bens e serviços
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-3 text-gray-800">
                              O que gostaria de doar?
                            </label>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {donationGoodsOptions.map((item) => {
                                const Icon = item.icon;
                                const active = goods.includes(item.label);

                                return (
                                  <button
                                    key={item.label}
                                    type="button"
                                    onClick={() => toggleGood(item.label)}
                                    className={`flex items-center gap-3 text-left rounded-2xl px-4 py-4 border transition ${
                                      active
                                        ? "bg-white border-red-500 text-red-700 shadow-sm"
                                        : "bg-white border-gray-300 text-gray-700 hover:border-red-300"
                                    }`}
                                  >
                                    <Icon size={18} />
                                    <span className="font-medium">
                                      {item.label}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-800">
                                Outro tipo de apoio
                              </label>
                              <input
                                type="text"
                                name="otherDonation"
                                value={form.otherDonation}
                                onChange={handleChange}
                                placeholder="Ex: combustível, impressão..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-800">
                                Entrega / disponibilidade
                              </label>
                              <select
                                name="deliveryMethod"
                                value={form.deliveryMethod}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
                              >
                                <option>Posso entregar</option>
                                <option>Preciso que recolham</option>
                                <option>Disponível sob agendamento</option>
                                <option>Vamos combinar</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-800">
                          Mensagem
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Opcional: deixe uma mensagem ou detalhe o apoio que pretende dar..."
                          rows={5}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-4 text-white font-semibold hover:bg-red-700 transition shadow-lg"
                      >
                        <MessageSquare size={18} />
                        Enviar
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* PROFILE SELECT */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-3">
                          Sou:
                        </label>

                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => setIsCompany(false)}
                            className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium border transition ${
                              !isCompany
                                ? "bg-blue-900 text-white border-blue-900"
                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                            }`}
                          >
                            <User size={17} />
                            Indivíduo
                          </button>

                          <button
                            type="button"
                            onClick={() => setIsCompany(true)}
                            className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium border transition ${
                              isCompany
                                ? "bg-blue-900 text-white border-blue-900"
                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                            }`}
                          >
                            <Building2 size={17} />
                            Empresa / Organização
                          </button>
                        </div>
                      </div>

                      {!isCompany ? (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-800">
                                Nome
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Seu nome"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-800">
                                Email ou telefone
                              </label>
                              <input
                                type="text"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Como podemos contactá-lo?"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-800">
                              Tipo de parceria
                            </label>
                            <select
                              name="partnershipType"
                              value={form.partnershipType}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option>Apoio financeiro</option>
                              <option>Apoio com serviços</option>
                              <option>Apoio logístico</option>
                              <option>Mentoria / formação</option>
                              <option>Voluntariado</option>
                              <option>Outro</option>
                            </select>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-800">
                                Nome da Empresa / Organização
                              </label>
                              <input
                                type="text"
                                name="companyName"
                                value={form.companyName}
                                onChange={handleChange}
                                placeholder="Nome da empresa"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-800">
                                Pessoa de contacto
                              </label>
                              <input
                                type="text"
                                name="contactPerson"
                                value={form.contactPerson}
                                onChange={handleChange}
                                placeholder="Nome do responsável"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-800">
                                Email ou telefone
                              </label>
                              <input
                                type="text"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Como podemos contactar?"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-800">
                                Website
                              </label>
                              <input
                                type="text"
                                name="website"
                                value={form.website}
                                onChange={handleChange}
                                placeholder="Opcional"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-800">
                                Setor
                              </label>
                              <input
                                type="text"
                                name="sector"
                                value={form.sector}
                                onChange={handleChange}
                                placeholder="Ex: tecnologia, saúde, logística"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-800">
                                Tipo de parceria
                              </label>
                              <select
                                name="partnershipType"
                                value={form.partnershipType}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option>Apoio financeiro</option>
                                <option>Patrocínio de eventos</option>
                                <option>Patrocínio de atletas</option>
                                <option>Doação de bens</option>
                                <option>Apoio logístico / transporte</option>
                                <option>Responsabilidade social</option>
                                <option>Outro</option>
                              </select>
                            </div>
                          </div>
                        </>
                      )}

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-800">
                          Objetivo ou proposta
                        </label>
                        <input
                          type="text"
                          name="partnershipObjective"
                          value={form.partnershipObjective}
                          onChange={handleChange}
                          placeholder="Ex: impacto social, visibilidade, apoio comunitário..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-800">
                          Interesse em benefícios de parceiro
                        </label>
                        <select
                          name="benefitsInterest"
                          value={form.benefitsInterest}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option>Gostaria de saber mais</option>
                          <option>Sim</option>
                          <option>Não</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-800">
                          Mensagem
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Descreva como gostaria de colaborar..."
                          rows={5}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-4 text-white font-semibold hover:bg-red-700 transition shadow-lg"
                      >
                        <MessageSquare size={18} />
                        Enviar
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SUPPORT BLOCKS */}
        <section className="bg-gray-50 border-t py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
                Como a sua ajuda se transforma em impacto
              </h2>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                Cada contribuição ajuda-nos a continuar a formar atletas,
                fortalecer a comunidade e criar mais oportunidades para crianças
                e jovens.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition">
                <CheckCircle2 className="text-blue-900 mb-4" size={24} />
                <h3 className="text-xl font-bold text-blue-900">
                  Apoio financeiro
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Contribua com qualquer valor para apoiar treinos, competições,
                  material e desenvolvimento contínuo dos atletas.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition">
                <CheckCircle2 className="text-red-600 mb-4" size={24} />
                <h3 className="text-xl font-bold text-blue-900">
                  Bens e serviços
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Transporte, alimentação, uniformes, material desportivo,
                  consultoria e apoio técnico também são valiosos.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition">
                <CheckCircle2 className="text-blue-900 mb-4" size={24} />
                <h3 className="text-xl font-bold text-blue-900">Parcerias</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Crie uma parceria com propósito e ajude a expandir o impacto
                  social e desportivo da escola.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNERS */}
        <section className="bg-white py-20 border-t">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-6">
              Parceiros & Apoiantes
            </h2>

            <p className="text-gray-700 max-w-2xl mx-auto text-lg mb-14 leading-relaxed">
              Agradecemos aos parceiros, patrocinadores e apoiantes que ajudam a
              tornar possível o crescimento da Escola de Judo Edson Madeira.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-center">
              {[1, 2, 3, 4].map((id) => (
                <div
                  key={id}
                  className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
                >
                  <img
                    src={`/parceiros/partner${id}.png`}
                    alt={`Parceiro ${id}`}
                    className="w-28 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}