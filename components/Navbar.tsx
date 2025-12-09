"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTiktok,
  FaSearch,
} from "react-icons/fa";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu when window is resized above md
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 z-50 font-sans">

      {/* 🌈 TOP SOCIAL BAR WITH GRADIENT */}
      <div className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white flex justify-end px-6 py-2 space-x-6 text-lg shadow">
        <SocialIcon href="#" Icon={FaInstagram} />
        <SocialIcon href="#" Icon={FaFacebookF} />
        <SocialIcon href="#" Icon={FaLinkedinIn} />
        <SocialIcon href="#" Icon={FaTiktok} />
        <button>
          <FaSearch className="hover:text-blue-200 transition" />
        </button>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="w-full backdrop-blur-lg bg-white/90 shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">

          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow">
                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-medium text-gray-700 mt-2 text-center">
                Escola de Judo Edson Madeira
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8 text-gray-700 text-sm font-medium">
            <DesktopDropdown title="EJEM" items={[
              { href: "/quem-somos", label: "Quem somos" },
              { href: "#", label: "Onde estamos" },
              { href: "#", label: "Manifesto" },
              { href: "#", label: "Equipe" },
              { href: "#", label: "Parceiros" },
              { href: "#", label: "Reconhecimento" },
              { href: "#", label: "Blog" },
            ]}/>
            <DesktopDropdown title="PROGRAMAS" items={[
              { href: "#", label: "Reação Escola Faixa-Preta" },
              { href: "#", label: "Reação Educação" },
              { href: "#", label: "Reação Alto Rendimento" },
              { href: "#", label: "Reação Bolsas de Estudo" },
              { href: "#", label: "Reação com Elas" },
              { href: "#", label: "Reação Conecta" },
              { href: "#", label: "Reação Jiu-Jitsu" },
            ]}/>
            <DesktopDropdown title="TRANSPARÊNCIA" items={[
              { href: "#", label: "Perguntas Frequentes" },
              { href: "#", label: "Termos de Compromisso" },
              { href: "#", label: "Organograma" },
              { href: "#", label: "Relatório Técnico" },
              { href: "#", label: "Estatuto e Atas" },
              { href: "#", label: "Lei de Incentivo" },
              { href: "#", label: "Política de Compliance" },
              { href: "#", label: "Publicações Contábeis" },
              { href: "#", label: "Edital de Convocação" },
            ]}/>
            <DesktopDropdown title="EXTRAS" items={[
              { href: "/eventos", label: "Eventos" },
              { href: "/actividades", label: "Actividades" },
            ]}/>
            <Link href="/loja" className="hover:text-blue-800 transition">LOJA DE JUDO</Link>
            <Link href="/contacto" className="hover:text-blue-800 transition">CONTACTE-NOS</Link>
          </div>

          {/* DESKTOP BUTTON */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="#"
              className="px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-xl shadow-lg hover:opacity-90 transition text-sm"
            >
              QUERO APOIAR / DOAR
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-700 text-3xl"
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t shadow-lg p-6 space-y-6 text-gray-800 text-sm animate-fadeIn">
            <MobileDropdown title="EJEM" items={[
              { href: "/quem-somos", label:"Quem somos"},
              { href: "#", label:"Onde estamos"},
              { href: "#", label:"Manifesto"},
              { href: "#", label:"Equipe"},
              { href: "#", label:"Parceiros"},
              { href: "#", label:"Reconhecimento"},
              { href: "#", label:"Blog"},
            ]} closeMenu={() => setMobileOpen(false)}/>
            <MobileDropdown title="PROGRAMAS" items={[
              { href:"#", label:"Reação Escola Faixa-Preta"},
              { href:"#", label:"Reação Educação"},
              { href:"#", label:"Reação Alto Rendimento"},
              { href:"#", label:"Reação Bolsas de Estudo"},
              { href:"#", label:"Reação com Elas"},
              { href:"#", label:"Reação Conecta"},
              { href:"#", label:"Reação Jiu-Jitsu"},
            ]} closeMenu={() => setMobileOpen(false)}/>
            <MobileDropdown title="TRANSPARÊNCIA" items={[
              { href:"#", label:"Perguntas Frequentes"},
              { href:"#", label:"Termos de Compromisso"},
              { href:"#", label:"Organograma"},
              { href:"#", label:"Relatório Técnico"},
              { href:"#", label:"Estatuto e Atas"},
              { href:"#", label:"Lei de Incentivo"},
              { href:"#", label:"Política de Compliance"},
              { href:"#", label:"Publicações Contábeis"},
              { href:"#", label:"Edital de Convocação"},
            ]} closeMenu={() => setMobileOpen(false)}/>
            <Link href="/loja" onClick={() => setMobileOpen(false)} className="block">LOJA DE JUDO</Link>
            <Link href="/contacto" onClick={() => setMobileOpen(false)} className="block">CONTACTE-NOS</Link>
            <Link href="#" onClick={() => setMobileOpen(false)} className="block w-full text-center px-5 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-xl shadow-lg hover:opacity-90 transition">
              QUERO APOIAR / DOAR
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

/* ─────────────────────────────────────
    COMPONENTS
────────────────────────────────────── */

function SocialIcon({ href, Icon }: { href: string; Icon: any }) {
  return (
    <a href={href} className="hover:scale-110 transition transform duration-200">
      <Icon className="hover:text-blue-300 transition" />
    </a>
  );
}

// Desktop dropdown opens on click, closes if clicked outside
function DesktopDropdown({ title, items }: { title: string, items: {href:string,label:string}[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="flex items-center space-x-1 hover:text-blue-800 transition font-semibold">
        <span>{title}</span>
        <ChevronDown size={16} className={`${open ? "rotate-180" : ""} transition`} />
      </button>
      {open && (
        <div className="absolute bg-white shadow-xl border rounded-lg mt-3 w-64 z-50 py-3 animate-fadeIn">
          {items.map(item => (
            <Link key={item.label} href={item.href} className="block px-4 py-2 hover:bg-blue-50 text-gray-700 hover:text-blue-800 transition text-sm">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileDropdown({ title, items, closeMenu }: { title: string, items: {href:string,label:string}[], closeMenu: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-2 font-semibold text-gray-900"
      >
        {title}
        <ChevronDown className={`${open ? "rotate-180" : ""} transition`} />
      </button>

      {open && (
        <div className="ml-3 mt-2 space-y-2 border-l pl-3">
          {items.map((item) => (
            <Link key={item.label} href={item.href} onClick={closeMenu} className="block text-gray-600 hover:text-blue-700 transition">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* Smooth Fade-in Animation */
<style jsx global>{`
  .animate-fadeIn {
    animation: fadeIn 0.25s ease-in-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }
`}</style>
