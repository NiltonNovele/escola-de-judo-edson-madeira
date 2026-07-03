"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useRef, useState } from "react";
import {
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
  Wallet,
  ShieldCheck,
  Loader2,
  Landmark,
} from "lucide-react";
import { PARTNER_IDS } from "@/data/site";
import { useHorizontalLoop } from "@/hooks/useHorizontalLoop";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://ejem-donations.onrender.com";

type BankDetails = {
  bankName: string;
  accountName: string;
  accountNumber: string;
  iban?: string;
  swift?: string;
  branch?: string;
  note?: string;
};

const QUICK_AMOUNTS = [250, 500, 1000, 2500, 5000];

const initialForm = {
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
};

export default function DonatePage() {
  const formRef = useRef<HTMLElement | null>(null);

  const [type, setType] = useState<"donate" | "partner">("donate");
  const [isCompany, setIsCompany] = useState<boolean>(false);
  const [donationMode, setDonationMode] = useState<"money" | "goods" | "both">(
    "money"
  );
  const [goods, setGoods] = useState<string[]>([]);
  const [anonymousDonation, setAnonymousDonation] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [bankDetailsError, setBankDetailsError] = useState(false);
  const [bankDetailsRetryKey, setBankDetailsRetryKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertState, setAlertState] = useState<{
    type: "" | "success" | "error";
    message: string;
  }>({
    type: "",
    message: "",
  });

  const [form, setForm] = useState(initialForm);

  const donationGoodsOptions = [
    { label: "Transporte", icon: Truck },
    { label: "Material desportivo", icon: Gift },
    { label: "Serviços profissionais", icon: Briefcase },
    { label: "Alimentação", icon: Utensils },
    { label: "Uniformes / roupa", icon: Shirt },
  ];

  const showMoneySection =
    donationMode === "money" || donationMode === "both";
  const showGoodsSection =
    donationMode === "goods" || donationMode === "both";
  const isBankTransfer =
    showMoneySection && form.paymentMethod === "Transferência Bancária";

  const donateSubmitLabel = isSubmitting
    ? "A processar..."
    : isBankTransfer
      ? "Enviar Comprovativo"
      : showMoneySection
        ? "Ir para Pagamento"
        : "Enviar Pedido de Apoio";

  const donateSubmitCaption = isBankTransfer
    ? "A nossa equipa vai validar o comprovativo e entrar em contacto consigo."
    : showMoneySection
      ? "Vai ser redirecionado para uma página de pagamento segura para concluir a doação."
      : "A nossa equipa vai entrar em contacto para combinar a entrega ou recolha.";

  useEffect(() => {
    async function loadBankDetails() {
      if (!isBankTransfer) return;
      if (bankDetails) return;

      setBankDetailsError(false);

      try {
        const res = await fetch(`${API_BASE}/api/bank-details`);
        const data = await res.json();

        if (res.ok && data?.status === "success") {
          setBankDetails(data.data);
        } else {
          setBankDetailsError(true);
        }
      } catch {
        setBankDetailsError(true);
      }
    }

    loadBankDetails();
  }, [isBankTransfer, bankDetails, bankDetailsRetryKey]);

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

  function resetAlert() {
    setAlertState({ type: "", message: "" });
  }

  function setSuccess(message: string) {
    setAlertState({ type: "success", message });
  }

  function setError(message: string) {
    setAlertState({ type: "error", message });
  }

  function resetFormAfterSuccess() {
    setForm(initialForm);
    setGoods([]);
    setProofFile(null);
    setAnonymousDonation(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    resetAlert();
    setIsSubmitting(true);

    try {
      if (type === "partner") {
        await submitPartnership();
      } else {
        await submitDonation();
      }
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao enviar o formulário."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function submitPartnership() {
    const payload = {
      profile: isCompany ? "Empresa / Organização" : "Indivíduo",
      isCompany,
      name: isCompany ? "" : form.name,
      companyName: isCompany ? form.companyName : "",
      contactPerson: isCompany ? form.contactPerson : "",
      emailOrPhone: form.email || form.phone,
      email: form.email,
      phone: form.phone,
      website: isCompany ? form.website : "",
      sector: isCompany ? form.sector : "",
      partnershipType: form.partnershipType,
      partnershipObjective: form.partnershipObjective,
      benefitsInterest: form.benefitsInterest,
      message: form.message,
    };

    const res = await fetch(`${API_BASE}/api/partnerships`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Falha ao enviar parceria.");
    }

    setSuccess("Pedido de parceria enviado com sucesso.");
    setForm(initialForm);
  }

  async function submitDonation() {
    const donorName = anonymousDonation ? "" : form.name;
    const donorContact = anonymousDonation ? "" : form.email || form.phone;

    if (showMoneySection) {
      if (!form.amount || Number(form.amount) <= 0) {
        throw new Error("Indique um valor válido para a doação.");
      }

      if (form.paymentMethod === "Transferência Bancária") {
        if (!proofFile) {
          throw new Error("Anexe o comprovativo da transferência.");
        }

        const multipart = new FormData();
        multipart.append("donorName", donorName);
        multipart.append("donorContact", donorContact);
        multipart.append("anonymousDonation", String(anonymousDonation));
        multipart.append("amount", form.amount);
        multipart.append("message", form.message);
        multipart.append("donationMode", donationMode);
        multipart.append("selectedGoods", JSON.stringify(goods));
        multipart.append("otherDonation", form.otherDonation);
        multipart.append("deliveryMethod", form.deliveryMethod);
        multipart.append("proof", proofFile);

        const res = await fetch(`${API_BASE}/api/donations/bank-transfer`, {
          method: "POST",
          body: multipart,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data?.message || "Falha ao enviar comprovativo da transferência."
          );
        }

        setSuccess(
          "Comprovativo enviado com sucesso. A sua transferência será validada em breve."
        );
        resetFormAfterSuccess();
        return;
      }

      if (form.paymentMethod === "M-Pesa" || form.paymentMethod === "e-Mola") {
        const res = await fetch(`${API_BASE}/api/donations/create-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            donorName,
            donorContact,
            anonymousDonation,
            amount: form.amount,
            paymentMethod: form.paymentMethod,
            message: form.message,
            donationMode,
            selectedGoods: goods,
            otherDonation: form.otherDonation,
            deliveryMethod: form.deliveryMethod,
            returnUrl: `${window.location.origin}/donate?payment=success`,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Falha ao iniciar pagamento.");
        }

        if (data?.data?.checkoutUrl) {
          window.location.href = data.data.checkoutUrl;
          return;
        }

        throw new Error("Link de checkout não foi devolvido.");
      }
    }

    if (showGoodsSection && !showMoneySection) {
      const res = await fetch(`${API_BASE}/api/donations/non-money`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donorName,
          donorContact,
          message: form.message,
          donationMode,
          selectedGoods: goods,
          otherDonation: form.otherDonation,
          deliveryMethod: form.deliveryMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Falha ao enviar apoio.");
      }

      setSuccess("Apoio enviado com sucesso. Obrigado!");
      resetFormAfterSuccess();
      return;
    }
  }

  const {
    containerRef: partnersRef,
    pause: pausePartners,
    resume: resumePartners,
  } = useHorizontalLoop({ speed: 1 });

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 antialiased">
      <Navbar />

      <main className="pt-16">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-red-50 border-b border-blue-100">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-100/40 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-blue-900">
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
                <div className="relative inline-block">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full bg-blue-500/70 animate-cta-glow"
                  />
                  <button
                    onClick={() => goToForm("donate")}
                    className="group/donate relative z-10 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-blue-900 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-blue-950 hover:shadow-xl hover:shadow-blue-500/40 active:translate-y-0 active:scale-95"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <HandCoins
                        size={18}
                        className="transition duration-300 group-hover/donate:scale-110"
                      />
                      Quero Doar
                    </span>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-cta-shine"
                    />
                  </button>
                </div>

                <div className="relative inline-block">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full bg-red-500/60 animate-cta-glow"
                  />
                  <button
                    onClick={() => goToForm("partner")}
                    className="group/partner relative z-10 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-red-600 bg-white px-6 py-3 font-semibold text-red-600 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-red-50 hover:shadow-xl hover:shadow-red-500/30 active:translate-y-0 active:scale-95"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <HeartHandshake
                        size={18}
                        className="transition duration-300 group-hover/partner:scale-110"
                      />
                      Tornar-me Parceiro
                    </span>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-red-400/30 to-transparent animate-cta-shine"
                    />
                  </button>
                </div>
              </div>

            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-white">
                <Image
                  src="/images/causa.avif"
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
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            {/* FORM */}
            <div>
              <div className="rounded-3xl bg-white border border-gray-200 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-8 pt-7 pb-5">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {type === "donate"
                      ? "Formulário de Apoio"
                      : "Formulário de Parceria"}
                  </h2>

                  <div className="mt-4 flex gap-6 border-b border-white/15">
                    <button
                      type="button"
                      onClick={() => setType("donate")}
                      className={`-mb-px border-b-2 pb-3 text-sm font-semibold transition ${type === "donate"
                        ? "border-white text-white"
                        : "border-transparent text-blue-200 hover:text-white"
                        }`}
                    >
                      Doar
                    </button>
                    <button
                      type="button"
                      onClick={() => setType("partner")}
                      className={`-mb-px border-b-2 pb-3 text-sm font-semibold transition ${type === "partner"
                        ? "border-white text-white"
                        : "border-transparent text-blue-200 hover:text-white"
                        }`}
                    >
                      Ser parceiro
                    </button>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  {alertState.message && (
                    <div
                      className={`mb-6 rounded-xl border px-4 py-3 text-sm ${alertState.type === "success"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-red-200 bg-red-50 text-red-700"
                        }`}
                    >
                      {alertState.message}
                    </div>
                  )}

                  {type === "donate" ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* DONATION MODE */}
                      <div>
                        <span className="text-sm font-semibold text-gray-800">
                          Como deseja apoiar?
                        </span>

                        <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl bg-gray-100 p-1">
                          {(
                            [
                              { key: "money", label: "Dinheiro", icon: Wallet },
                              { key: "goods", label: "Bens / serviços", icon: Gift },
                              { key: "both", label: "Ambos", icon: HeartHandshake },
                            ] as const
                          ).map((option) => (
                            <button
                              key={option.key}
                              type="button"
                              onClick={() => setDonationMode(option.key)}
                              className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-sm font-medium transition ${donationMode === option.key
                                ? "bg-white text-blue-900 shadow-sm"
                                : "text-gray-500 hover:text-gray-800"
                                }`}
                            >
                              <option.icon size={15} />
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* ANONYMOUS */}
                      {showMoneySection && (
                        <label className="flex items-center gap-2.5 cursor-pointer text-sm">
                          <input
                            type="checkbox"
                            checked={anonymousDonation}
                            onChange={() =>
                              setAnonymousDonation((prev) => !prev)
                            }
                            className="h-4 w-4 rounded border-gray-300 text-blue-900 focus:ring-blue-500"
                          />
                          <span className="flex items-center gap-1.5 font-medium text-gray-800">
                            <ShieldCheck size={15} className="text-blue-900" />
                            Doar de forma anónima
                          </span>
                        </label>
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
                      {showMoneySection && (
                        <div className="border-t border-gray-200 pt-6 space-y-5">
                          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-900">
                            <HandCoins size={14} />
                            Apoio financeiro
                          </p>

                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-800">
                              Quanto deseja doar? (MZN)
                            </label>

                            <div className="flex flex-wrap gap-2 mb-3">
                              {QUICK_AMOUNTS.map((value) => (
                                <button
                                  key={value}
                                  type="button"
                                  onClick={() =>
                                    setForm((prev) => ({
                                      ...prev,
                                      amount: String(value),
                                    }))
                                  }
                                  className={`rounded-full px-4 py-2 text-sm font-semibold border transition ${String(value) === form.amount
                                    ? "bg-blue-900 text-white border-blue-900"
                                    : "bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                                    }`}
                                >
                                  {value.toLocaleString("pt-PT")}
                                </button>
                              ))}
                            </div>

                            <input
                              type="number"
                              name="amount"
                              value={form.amount}
                              onChange={handleChange}
                              placeholder="Ou indique outro valor, ex: 1500"
                              min="0"
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-800">
                              Como prefere pagar?
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
                            </select>
                            <p className="mt-2 text-xs text-gray-600">
                              {form.paymentMethod === "Transferência Bancária"
                                ? "Vai ver os dados bancários para transferir e depois anexar o comprovativo."
                                : "Vai ser encaminhado para uma página de pagamento segura para concluir a doação."}
                            </p>
                          </div>

                          {isBankTransfer && (
                            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 space-y-4">
                              <div className="flex items-center gap-2 text-amber-800 font-semibold">
                                <Landmark size={18} />
                                Dados bancários
                              </div>

                              {bankDetails ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                                  <div>
                                    <p className="font-semibold text-gray-900">
                                      Banco
                                    </p>
                                    <p>{bankDetails.bankName}</p>
                                  </div>

                                  <div>
                                    <p className="font-semibold text-gray-900">
                                      Titular
                                    </p>
                                    <p>{bankDetails.accountName}</p>
                                  </div>

                                  <div>
                                    <p className="font-semibold text-gray-900">
                                      Nº da conta
                                    </p>
                                    <p>{bankDetails.accountNumber}</p>
                                  </div>

                                  {bankDetails.branch && (
                                    <div>
                                      <p className="font-semibold text-gray-900">
                                        Balcão
                                      </p>
                                      <p>{bankDetails.branch}</p>
                                    </div>
                                  )}

                                  {bankDetails.iban && (
                                    <div>
                                      <p className="font-semibold text-gray-900">
                                        IBAN
                                      </p>
                                      <p>{bankDetails.iban}</p>
                                    </div>
                                  )}

                                  {bankDetails.swift && (
                                    <div>
                                      <p className="font-semibold text-gray-900">
                                        SWIFT
                                      </p>
                                      <p>{bankDetails.swift}</p>
                                    </div>
                                  )}
                                </div>
                              ) : bankDetailsError ? (
                                <div className="text-sm text-red-700">
                                  Não foi possível carregar os dados bancários.{" "}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setBankDetailsRetryKey((key) => key + 1)
                                    }
                                    className="font-semibold underline"
                                  >
                                    Tentar novamente
                                  </button>
                                </div>
                              ) : (
                                <p className="text-sm text-gray-700">
                                  A carregar dados bancários...
                                </p>
                              )}

                              {bankDetails?.note && (
                                <p className="text-sm text-gray-700">
                                  {bankDetails.note}
                                </p>
                              )}

                              <div>
                                <label className="block text-sm font-medium mb-2 text-gray-800">
                                  Comprovativo da transferência
                                </label>
                                <input
                                  type="file"
                                  accept=".jpg,.jpeg,.png,.webp,.pdf"
                                  onChange={(e) =>
                                    setProofFile(e.target.files?.[0] || null)
                                  }
                                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* GOODS / SERVICES */}
                      {showGoodsSection && (
                        <div className="border-t border-gray-200 pt-6 space-y-5">
                          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-red-700">
                            <Gift size={14} />
                            Bens e serviços
                          </p>

                          <div>
                            <label className="block text-sm font-medium mb-3 text-gray-800">
                              O que gostaria de doar?
                            </label>

                            <div className="flex flex-wrap gap-2">
                              {donationGoodsOptions.map((item) => {
                                const Icon = item.icon;
                                const active = goods.includes(item.label);

                                return (
                                  <button
                                    key={item.label}
                                    type="button"
                                    onClick={() => toggleGood(item.label)}
                                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${active
                                      ? "border-red-600 bg-red-600 text-white"
                                      : "border-gray-300 text-gray-700 hover:border-red-300 hover:bg-red-50"
                                      }`}
                                  >
                                    <Icon size={15} />
                                    {item.label}
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

                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-4 text-white font-semibold hover:bg-red-700 transition shadow-lg disabled:opacity-70"
                        >
                          {isSubmitting ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <HandCoins size={18} />
                          )}
                          {donateSubmitLabel}
                        </button>
                        <p className="mt-3 text-center text-xs text-gray-500">
                          {donateSubmitCaption}
                        </p>
                      </div>
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
                            className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium border transition ${!isCompany
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
                            className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium border transition ${isCompany
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
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-4 text-white font-semibold hover:bg-red-700 transition shadow-lg disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <MessageSquare size={18} />
                        )}
                        {isSubmitting ? "A enviar..." : "Enviar"}
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
                <h3 className="text-xl font-bold text-blue-900">
                  Apoio financeiro
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Contribua com qualquer valor para apoiar treinos, competições,
                  material e desenvolvimento contínuo dos atletas.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-blue-900">
                  Bens e serviços
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Transporte, alimentação, uniformes, material desportivo,
                  consultoria e apoio técnico também são valiosos.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition">
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
        <section className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 text-center">

            <h2 className="text-4xl font-extrabold text-blue-900 mb-6">
              Parceiros & Apoiantes
            </h2>

            <p className="text-gray-700 max-w-2xl mx-auto text-lg mb-14 leading-relaxed">
              Agradecemos aos parceiros, patrocinadores e apoiantes que ajudam a
              tornar possível o crescimento da Escola de Judo Edson Madeira.
            </p>

            <div
              ref={partnersRef}
              onMouseEnter={pausePartners}
              onMouseLeave={resumePartners}
              className="flex gap-6 overflow-hidden whitespace-nowrap py-4"
            >
              {[...PARTNER_IDS, ...PARTNER_IDS].map((id, index) => (
                <div
                  key={`${id}-${index}`}
                  className="min-w-[220px] h-44 flex-none rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:shadow-lg flex items-center justify-center"
                >
                  <Image
                    src={`/images/parceiros/partner${id}.png`}
                    alt={`Parceiro ${id}`}
                    width={160}
                    height={96}
                    sizes="160px"
                    className="max-h-24 w-auto opacity-80 transition duration-300 hover:opacity-100 object-contain"
                  />
                </div>
              ))}
            </div>

            <p className="text-gray-600 mt-14 text-sm">
              Agradecemos cada parceiro que acredita na nossa missão.<br /><br />
            </p>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes ctaGlow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.1);
            opacity: 0;
          }
        }

        .animate-cta-glow {
          animation: ctaGlow 2.4s ease-in-out infinite;
        }

        @keyframes ctaShine {
          0% {
            transform: translateX(-20%) skewX(-12deg);
          }
          100% {
            transform: translateX(320%) skewX(-12deg);
          }
        }

        .animate-cta-shine {
          animation: ctaShine 2.8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-cta-glow,
          .animate-cta-shine {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
