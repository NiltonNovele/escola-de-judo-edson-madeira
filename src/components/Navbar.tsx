"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import {
  NAV_SECTIONS,
  NAV_SOCIAL_LINKS,
  type NavigationItem,
  type SocialLink,
} from "@/data/site";
import LogoMark from "./LogoMark";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 z-50 font-sans">
      <div className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white flex justify-end px-6 py-2 space-x-6 text-lg shadow">
        {NAV_SOCIAL_LINKS.map((link) => (
          <SocialIcon key={link.label} {...link} />
        ))}
        <button type="button" aria-label="Pesquisar">
          <FaSearch className="hover:text-blue-200 transition" />
        </button>
      </div>

      <nav className="w-full backdrop-blur-lg bg-white/90 shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex flex-col items-center">
              <LogoMark
                className="relative w-12 h-12 rounded-full overflow-hidden shadow"
                imageSizes="48px"
                priority
              />
              <span className="text-sm font-medium text-gray-700 mt-2 text-center">
                Escola de Judo Edson Madeira
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-gray-700 text-sm font-medium">
            {NAV_SECTIONS.map((section) => (
              <DesktopDropdown key={section.title} {...section} />
            ))}
            <Link href="/loja" className="hover:text-blue-800 transition">
              LOJA DE JUDO
            </Link>
            <Link href="/contacto" className="hover:text-blue-800 transition">
              CONTACTE-NOS
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/donate"
              className="px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-xl shadow-lg hover:opacity-90 transition text-sm"
            >
              QUERO APOIAR / DOAR
            </Link>
          </div>

          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setMobileOpen((open) => !open)}
            className="md:hidden text-gray-700 text-3xl"
          >
            ☰
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t shadow-lg p-6 space-y-6 text-gray-800 text-sm animate-fadeIn">
            {NAV_SECTIONS.map((section) => (
              <MobileDropdown
                key={section.title}
                {...section}
                closeMenu={() => setMobileOpen(false)}
              />
            ))}
            <Link
              href="/loja"
              onClick={() => setMobileOpen(false)}
              className="block"
            >
              LOJA DE JUDO
            </Link>
            <Link
              href="/contacto"
              onClick={() => setMobileOpen(false)}
              className="block"
            >
              CONTACTE-NOS
            </Link>
            <Link
              href="/donate"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-5 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-xl shadow-lg hover:opacity-90 transition"
            >
              QUERO APOIAR / DOAR
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

function SocialIcon({ href, label, Icon }: SocialLink) {
  return (
    <a
      href={href}
      aria-label={label}
      className="hover:scale-110 transition transform duration-200"
    >
      <Icon className="hover:text-blue-300 transition" />
    </a>
  );
}

function DesktopDropdown({
  title,
  items,
}: {
  title: string;
  items: NavigationItem[];
}) {
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
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="flex items-center space-x-1 hover:text-blue-800 transition font-semibold"
      >
        <span>{title}</span>
        <ChevronDown
          size={16}
          className={`${open ? "rotate-180" : ""} transition`}
        />
      </button>
      {open && (
        <div className="absolute bg-white shadow-xl border rounded-lg mt-3 w-64 z-50 py-3 animate-fadeIn">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-4 py-2 hover:bg-blue-50 text-gray-700 hover:text-blue-800 transition text-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileDropdown({
  title,
  items,
  closeMenu,
}: {
  title: string;
  items: NavigationItem[];
  closeMenu: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="w-full flex justify-between items-center py-2 font-semibold text-gray-900"
      >
        {title}
        <ChevronDown className={`${open ? "rotate-180" : ""} transition`} />
      </button>

      {open && (
        <div className="ml-3 mt-2 space-y-2 border-l pl-3">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className="block text-gray-600 hover:text-blue-700 transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
