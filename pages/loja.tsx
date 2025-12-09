"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Image from "next/image";
import { Construction, MessageSquare, Eye, X } from "lucide-react";

export default function LojaPage() {
  const [phone, setPhone] = useState("");

  // Modal state
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  function handleSubmit(e: any) {
    e.preventDefault();
    alert("Obrigado! Vamos avisar pelo WhatsApp assim que a loja estiver pronta!");
  }

  // MOCK PRODUCTS ------------------
  const products = [
    {
      name: "Kimono Branco Infantil",
      price: "3.500 MT",
      image: "/loja/kimono-de-judo-adidas-infantil.webp",
      preview: "/loja/kimono-infantil-prev.jpg", // real model preview placeholder
      sizes: ["110cm", "130cm", "150cm"],
      colors: ["Branco"],
      quantity: "Disponível",
    },
    {
      name: "Kimono Azul Adulto",
      price: "5.800 MT",
      image: "/loja/kimono-adulto-azul.jpeg",
      preview: "/loja/kimono-adulto-prev.jpg",
      sizes: ["A1", "A2", "A3"],
      colors: ["Azul"],
      quantity: "Disponível",
    },
    {
      name: "Faixa Preta Profissional",
      price: "1.900 MT",
      image: "/loja/faixa-preta.jpeg",
      preview: "/loja/faixa-preta-prev.jpg",
      sizes: ["260cm", "280cm", "300cm"],
      colors: ["Preta"],
      quantity: "Poucas Unidades",
    },
    {
      name: "Faixa Colorida (Amarela, Laranja, Verde)",
      price: "900 MT",
      image: "/loja/faixas.webp",
      preview: "/loja/faixa-prev.jpg",
      sizes: ["Infantil & Adulto"],
      colors: ["Amarela", "Laranja", "Verde"],
      quantity: "Disponível",
    },
    {
      name: "Saco de Desporto",
      price: "2.700 MT",
      image: "/loja/saco.jpg",
      preview: "/loja/saco.jpg",
      sizes: ["Único"],
      colors: ["Azul / Preto"],
      quantity: "Disponível",
    },
    {
      name: "Protetor Bucal",
      price: "350 MT",
      image: "/loja/protetor-bucal.webp",
      preview: "/loja/protetor-bucal.webp",
      sizes: ["Único"],
      colors: ["Transparente / Preto"],
      quantity: "Disponível",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white relative">
      <Navbar />

      {/* HEADER */}
      <section className="pt-32 pb-12 text-center px-4">
        <h1 className="text-5xl font-extrabold text-blue-900">Loja Oficial</h1>

        <p className="max-w-2xl mx-auto mt-4 text-neutral-700 text-lg leading-relaxed">
          Nossa loja de Judô está passando pelos toques finais! Aqui está uma prévia
          dos produtos que estarão disponíveis em breve.
        </p>
      </section>

      {/* UNDER CONSTRUCTION NOTICE */}
      <div className="max-w-6xl mx-auto px-6 mb-12 bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 flex items-center gap-3">
        <Construction size={32} />
        <p className="text-lg font-medium">
          ⚠️ Nossa loja de Judô está passando pelos toques finais! Aqui está uma prévia
          dos produtos que estarão disponíveis em breve.
        </p>
      </div>

      {/* PRODUCT GRID (MOCK ITEMS) */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {products.map((item, index) => (
          <div
            key={index}
            className="relative group border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition bg-white"
          >
            {/* IMAGE */}
            <div className="relative w-full h-64 overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                width={600}
                height={400}
                className="w-full h-full object-cover blur-[2px] group-hover:blur-none transition"
              />

              {/* Over Construction Overlay */}
              <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center opacity-100 group-hover:opacity-0 transition">
                <p className="text-white text-lg font-semibold">Em Breve</p>
              </div>
            </div>

            {/* DETAILS */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-900">{item.name}</h3>

              <p className="text-red-600 text-lg font-semibold mt-1">{item.price}</p>

              <p className="text-neutral-700 text-sm mt-2">
                <strong>Tamanhos:</strong> {item.sizes.join(", ")}
              </p>

              <p className="text-neutral-700 text-sm">
                <strong>Cores:</strong> {item.colors.join(", ")}
              </p>

              <p className="text-neutral-700 text-sm mb-3">
                <strong>Stock:</strong> {item.quantity}
              </p>

              {/* PREVIEW BUTTON */}
              <button
                onClick={() => setSelectedProduct(item)}
                className="w-full py-2 mt-2 bg-blue-900 text-white rounded-xl hover:bg-blue-950 transition flex items-center justify-center gap-2"
              >
                <Eye size={18} /> Ver Prévia
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* WHATSAPP SIGNUP */}
      <div className="max-w-xl mx-auto bg-white border rounded-2xl shadow-lg p-10 mt-20 text-center">
        <h3 className="text-2xl font-bold text-blue-900 mb-3 flex items-center justify-center gap-2">
          <MessageSquare size={26} />
          Seja Notificado
        </h3>

        <p className="text-neutral-700 mb-6">
          Informe seu WhatsApp e avisaremos assim que a loja estiver disponível.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5  placeholder-black" >
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Seu WhatsApp — ex: +258 84 000 0000"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none  placeholder-black"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-900 text-white font-semibold rounded-xl shadow-md hover:bg-blue-950 transition"
          >
            Enviar
          </button>
        </form>
      </div>

      <div className="h-24"></div>

      {/* === PREVIEW MODAL === */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl p-6 relative animate-fade-in">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-neutral-600 hover:text-black"
            >
              <X size={28} />
            </button>

            <h2 className="text-2xl font-extrabold text-blue-900 mb-4">
              {selectedProduct.name}
            </h2>

            {/* Image Preview */}
            <div className="w-full h-80 relative rounded-xl overflow-hidden shadow-lg mb-6">
              <Image
                src={selectedProduct.preview}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>

            {/* Product Info */}
            <p className="text-neutral-700 mb-2">
              <strong>Preço:</strong> {selectedProduct.price}
            </p>

            <p className="text-neutral-700 mb-2">
              <strong>Tamanhos:</strong> {selectedProduct.sizes.join(", ")}
            </p>

            <p className="text-neutral-700 mb-2">
              <strong>Cores:</strong> {selectedProduct.colors.join(", ")}
            </p>

            <p className="text-neutral-700">
              <strong>Stock:</strong> {selectedProduct.quantity}
            </p>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
