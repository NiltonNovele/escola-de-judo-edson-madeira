"use client";

import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Image from "next/image";
import {
  ShoppingCart,
  X,
  Minus,
  Plus,
  Trash2,
  MessageCircle,
  MapPin,
  Phone,
  User,
  CreditCard,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  sizes: string[];
  colors: string[];
};

type CartItem = Product & {
  qty: number;
};

export default function LojaPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    bairro: "",
    payment: "MPESA",
    notes: "",
  });

  // Substitui por teu número de WhatsApp no formato internacional sem "+"
  const whatsappNumber = "258844002050";

  const products: Product[] = [
    {
      id: 1,
      name: "Kimono Branco Infantil",
      price: 3500,
      image: "/loja/kimono-de-judo-adidas-infantil.webp",
      sizes: ["110cm", "130cm", "150cm"],
      colors: ["Branco"],
    },
    {
      id: 2,
      name: "Kimono Azul Adulto",
      price: 5800,
      image: "/loja/kimono-adulto-azul.jpeg",
      sizes: ["A1", "A2", "A3"],
      colors: ["Azul"],
    },
    {
      id: 3,
      name: "Faixa Preta Profissional",
      price: 1900,
      image: "/loja/faixa-preta.jpeg",
      sizes: ["260cm", "280cm", "300cm"],
      colors: ["Preta"],
    },
    {
      id: 4,
      name: "Faixa Colorida",
      price: 900,
      image: "/loja/faixas.webp",
      sizes: ["Infantil & Adulto"],
      colors: ["Amarela", "Laranja", "Verde"],
    },
    {
      id: 5,
      name: "Saco de Desporto",
      price: 2700,
      image: "/loja/saco.jpg",
      sizes: ["Único"],
      colors: ["Azul / Preto"],
    },
    {
      id: 6,
      name: "Protetor Bucal",
      price: 350,
      image: "/loja/protetor-bucal.webp",
      sizes: ["Único"],
      colors: ["Transparente / Preto"],
    },
  ];

  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.qty, 0),
    [cart]
  );

  const total = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.qty, 0),
    [cart]
  );

  const addToCart = (product: Product) => {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart((prev) => [...prev, { ...product, qty: 1 }]);
    }

    setIsCartOpen(true);
  };

  const updateQty = (id: number, type: "inc" | "dec") => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = type === "inc" ? item.qty + 1 : item.qty - 1;
            return { ...item, qty: newQty };
          }
          return item;
        })
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    if (!customer.name.trim()) {
      alert("Por favor preencha o nome.");
      return;
    }

    if (!customer.phone.trim()) {
      alert("Por favor preencha o telefone.");
      return;
    }

    if (!customer.address.trim()) {
      alert("Por favor preencha o endereço.");
      return;
    }

    const productsText = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}\n   Quantidade: ${item.qty}\n   Preço: ${item.price.toLocaleString()} MT\n   Subtotal: ${(item.price * item.qty).toLocaleString()} MT`
      )
      .join("\n\n");

    const message = `🛒 *Novo Pedido - Loja Oficial EJEM*

👤 *Dados do Cliente*
• Nome: ${customer.name}
• Telefone: ${customer.phone}
• Endereço: ${customer.address}
• Bairro/Zona: ${customer.bairro || "-"}

📦 *Produtos do Pedido*
${productsText}

📃 *Resumo*
• Total de itens: ${totalItems}
• Total do pedido: *${total.toLocaleString()} MT*
• 💳 Pagamento preferido: ${customer.payment}

📝 *Observações*
${customer.notes || "Sem observações"}

🤝 _Pagamento e confirmação serão tratados manualmente via WhatsApp._`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");

    setCheckoutOpen(false);
    setIsCartOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-white text-black">
      <Navbar />

      {/* HEADER */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-14 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-900 px-4 py-2 text-xs sm:text-sm font-semibold mb-5">
            Loja Oficial EJEM
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 tracking-tight">
            Loja Oficial
          </h1>

          <p className="max-w-2xl mx-auto mt-4 text-neutral-600 text-base sm:text-lg leading-relaxed px-2">
            Equipamentos oficiais de Judô com qualidade profissional. Escolha os
            seus produtos e finalize o pedido pelo WhatsApp.
          </p>
        </div>
      </section>

      {/* FLOATING CART BUTTON */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-blue-900 text-white p-4 rounded-full shadow-2xl z-50 hover:scale-105 transition duration-300"
        aria-label="Abrir carrinho"
      >
        <ShoppingCart size={22} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[22px] h-[22px] px-1 rounded-full flex items-center justify-center font-bold">
            {totalItems}
          </span>
        )}
      </button>

      {/* PRODUCTS */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
            >
              <div className="relative w-full h-64 sm:h-72 bg-neutral-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-5 sm:p-6 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-semibold text-black leading-snug">
                    {item.name}
                  </h3>

                  <span className="text-blue-900 font-extrabold text-base sm:text-lg whitespace-nowrap">
                    {item.price.toLocaleString()} MT
                  </span>
                </div>

                <p className="text-sm text-neutral-500 leading-relaxed">
                  Tamanhos: {item.sizes.join(", ")}
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed">
                  Cores: {item.colors.join(", ")}
                </p>

                <button
                  onClick={() => addToCart(item)}
                  className="w-full mt-4 py-3 bg-blue-900 text-white rounded-2xl hover:bg-blue-800 transition font-semibold text-sm sm:text-base"
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CART SIDEBAR */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div className="w-full sm:max-w-md bg-white h-full p-4 sm:p-6 shadow-2xl overflow-y-auto">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-blue-900">
                  Carrinho
                </h2>
                <p className="text-sm text-neutral-500 mt-1">
                  {totalItems} item(ns)
                </p>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-neutral-100 transition"
              >
                <X />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingCart
                  className="mx-auto text-neutral-300 mb-4"
                  size={40}
                />
                <p className="text-neutral-500">Carrinho vazio</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="border border-neutral-200 rounded-2xl p-4"
                    >
                      <div className="flex gap-3 sm:gap-4">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-semibold leading-snug text-sm sm:text-base">
                                {item.name}
                              </p>
                              <p className="text-sm text-neutral-500 mt-1">
                                {item.price.toLocaleString()} MT
                              </p>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-neutral-400 hover:text-red-500 transition shrink-0"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-4 gap-3 flex-wrap">
                            <div className="flex items-center gap-2 bg-neutral-100 rounded-full px-2 py-1">
                              <button
                                onClick={() => updateQty(item.id, "dec")}
                                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="min-w-[24px] text-center font-medium">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, "inc")}
                                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            <p className="font-bold text-blue-900 text-sm sm:text-base">
                              {(item.price * item.qty).toLocaleString()} MT
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t pt-5">
                  <div className="flex items-center justify-between text-base sm:text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-900">
                      {total.toLocaleString()} MT
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <button
                      onClick={clearCart}
                      className="py-3 border border-neutral-300 rounded-2xl hover:bg-neutral-50 transition font-medium text-sm sm:text-base"
                    >
                      Limpar
                    </button>

                    <button
                      onClick={() => setCheckoutOpen(true)}
                      className="py-3 bg-blue-900 text-white rounded-2xl hover:bg-blue-800 transition font-semibold text-sm sm:text-base"
                    >
                      Finalizar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT */}
      {checkoutOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 px-0 sm:px-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b sticky top-0 bg-white z-10">
              <div className="pr-3">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-900">
                  Finalizar Compra
                </h2>
                <p className="text-sm text-neutral-500 mt-1">
                  O pedido será enviado para confirmação via WhatsApp
                </p>
              </div>

              <button
                onClick={() => setCheckoutOpen(false)}
                className="p-2 rounded-full hover:bg-neutral-100 transition shrink-0"
              >
                <X />
              </button>
            </div>

            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 overflow-y-auto">
              {/* CUSTOMER INFO */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Seus dados</h3>

                <div className="space-y-4">
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                    <input
                      type="text"
                      placeholder="Nome completo"
                      className="w-full pl-11 pr-4 py-3 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-200 text-sm sm:text-base"
                      value={customer.name}
                      onChange={(e) =>
                        setCustomer({ ...customer, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                    <input
                      type="tel"
                      placeholder="Telefone / WhatsApp"
                      className="w-full pl-11 pr-4 py-3 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-200 text-sm sm:text-base"
                      value={customer.phone}
                      onChange={(e) =>
                        setCustomer({ ...customer, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-4 text-neutral-400"
                    />
                    <textarea
                      placeholder="Endereço completo"
                      className="w-full pl-11 pr-4 py-3 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-200 resize-none text-sm sm:text-base"
                      rows={3}
                      value={customer.address}
                      onChange={(e) =>
                        setCustomer({ ...customer, address: e.target.value })
                      }
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Bairro / Zona"
                    className="w-full px-4 py-3 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-200 text-sm sm:text-base"
                    value={customer.bairro}
                    onChange={(e) =>
                      setCustomer({ ...customer, bairro: e.target.value })
                    }
                  />

                  <div className="relative">
                    <CreditCard
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                    <select
                      className="w-full pl-11 pr-4 py-3 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-200 appearance-none bg-white text-sm sm:text-base"
                      value={customer.payment}
                      onChange={(e) =>
                        setCustomer({ ...customer, payment: e.target.value })
                      }
                    >
                      <option>MPESA</option>
                      <option>EMOLA</option>
                      <option>Transferência Bancária</option>
                      <option>Dinheiro</option>
                    </select>
                  </div>

                  <textarea
                    placeholder="Observações do pedido (opcional)"
                    className="w-full px-4 py-3 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-200 resize-none text-sm sm:text-base"
                    rows={4}
                    value={customer.notes}
                    onChange={(e) =>
                      setCustomer({ ...customer, notes: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* ORDER SUMMARY */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Resumo do pedido</h3>

                <div className="border rounded-3xl p-4 sm:p-5 bg-neutral-50">
                  <div className="space-y-4 max-h-[260px] sm:max-h-[320px] overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <p className="font-medium leading-snug text-sm sm:text-base">
                            {item.name}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {item.qty} × {item.price.toLocaleString()} MT
                          </p>
                        </div>

                        <p className="font-semibold text-blue-900 whitespace-nowrap text-sm sm:text-base">
                          {(item.qty * item.price).toLocaleString()} MT
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t mt-5 pt-5 space-y-2">
                    <div className="flex justify-between text-sm text-neutral-600">
                      <span>Total de itens</span>
                      <span>{totalItems}</span>
                    </div>

                    <div className="flex justify-between text-base sm:text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-900">
                        {total.toLocaleString()} MT
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-green-50 border border-green-200 p-4">
                  <div className="flex items-start gap-3">
                    <MessageCircle
                      className="text-green-600 mt-0.5 shrink-0"
                      size={20}
                    />
                    <p className="text-sm text-green-800 leading-relaxed">
                      Ao confirmar, o pedido será enviado por WhatsApp com todos
                      os detalhes. O pagamento e a confirmação serão tratados
                      manualmente.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full mt-5 py-4 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <MessageCircle size={18} />
                  Enviar Pedido por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}