"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Image from "next/image";
import { ShoppingCart, X, Minus, Plus } from "lucide-react";

export default function LojaPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    payment: "MPESA",
  });

  const products = [
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

  const addToCart = (product: any) => {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
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

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = () => {
    alert(
      `Pedido realizado!\n\nNome: ${customer.name}\nTelefone: ${customer.phone}\nPagamento: ${customer.payment}\n\nLevantamento: Clube Naval Maputo`
    );

    setCart([]);
    setCheckoutOpen(false);
    setIsCartOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-white text-black">
      <Navbar />

      {/* HEADER */}
      <section className="pt-32 pb-16 text-center px-4">
        <h1 className="text-5xl font-extrabold text-blue-900">Loja Oficial</h1>
        <p className="max-w-2xl mx-auto mt-4 text-neutral-600 text-lg">
          Equipamentos oficiais de Judô com qualidade profissional.
        </p>
      </section>

      {/* FLOATING CART BUTTON */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-900 text-white p-4 rounded-full shadow-xl z-50 hover:scale-105 transition"
      >
        <ShoppingCart />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {cart.length}
          </span>
        )}
      </button>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
          >
            <div className="relative w-full h-64 bg-neutral-100">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5 space-y-2">
              <h3 className="text-lg font-semibold text-black">
                {item.name}
              </h3>

              <p className="text-blue-900 font-bold text-lg">
                {item.price.toLocaleString()} MT
              </p>

              <p className="text-sm text-neutral-500">
                {item.sizes.join(", ")} • {item.colors.join(", ")}
              </p>

              <button
                onClick={() => addToCart(item)}
                className="w-full mt-3 py-2 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CART SIDEBAR */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full p-6 shadow-xl overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Carrinho</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X />
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-neutral-500">Carrinho vazio</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center mb-5"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-neutral-500">
                        {item.price} MT
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.id, "dec")}> 
                        <Minus size={16} />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, "inc")}> 
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mt-6 border-t pt-4 font-bold text-lg">
                  Total: {total.toLocaleString()} MT
                </div>

                <button
                  onClick={() => setCheckoutOpen(true)}
                  className="w-full mt-6 py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-800"
                >
                  Finalizar Compra
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT */}
      {checkoutOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Finalizar Compra</h2>

            <input
              type="text"
              placeholder="Nome"
              className="w-full mb-3 p-3 border rounded-lg"
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
            />

            <input
              type="tel"
              placeholder="Telefone"
              className="w-full mb-3 p-3 border rounded-lg"
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
            />

            <select
              className="w-full mb-4 p-3 border rounded-lg"
              onChange={(e) =>
                setCustomer({ ...customer, payment: e.target.value })
              }
            >
              <option>MPESA</option>
              <option>MKESH</option>
              <option>EMOLA</option>
            </select>

            <p className="text-sm mb-4 text-neutral-500">
              Levantamento no Clube Naval Maputo
            </p>

            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
            >
              Confirmar Pedido
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
