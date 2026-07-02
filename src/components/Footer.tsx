"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FOOTER_SOCIAL_LINKS, type SocialLink } from "@/data/site";
import LogoMark from "./LogoMark";

export default function Footer() {
  return (
    <footer className="bg-white text-black pt-20 pb-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="flex flex-col items-start">
          <LogoMark
            className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg mb-4 ring-2 ring-gray-200"
            imageSizes="80px"
          />
          <p className="text-gray-700 text-sm leading-relaxed">
            Escola de Judo Edson Madeira — promovendo a educação, disciplina e
            espírito esportivo através do Judo.
          </p>
        </div>

        <div>
          <h4 className="text-black font-semibold mb-4 text-lg">Contacto</h4>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex gap-3 items-start">
              <MapPin size={20} className="text-blue-600" />
              <span>Rua de Mukumbura, 387, R/c, Maputo, Moçambique</span>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={20} className="text-blue-600" />
              <a
                href="mailto:parceria@ejem.org.mz"
                className="underline hover:text-blue-700 transition"
              >
                parceria@ejem.org.mz
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Phone size={20} className="text-blue-600" />
              +258 84 525 5636 | 87 153 8427
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-black font-semibold mb-4 text-lg">
            Links Rápidos
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <Link href="/privacy" className="hover:text-blue-700 transition">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-black font-semibold mb-4 text-lg">
            Redes Sociais
          </h4>
          <div className="flex gap-4">
            {FOOTER_SOCIAL_LINKS.map((link) => (
              <SocialIcon key={link.label} {...link} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-gray-200 pt-6">
        <div className="text-center text-gray-500 text-xs space-y-1">
          <p>
            © {new Date().getFullYear()} Escola de Judo Edson Madeira. Todos os
            direitos reservados.
          </p>
          <p>
            Desenvolvido pela{" "}
            <a
              href="https://synctechx.com"
              className="underline hover:text-blue-700 transition font-medium"
            >
              Synctechx
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, Icon }: SocialLink) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition flex items-center justify-center shadow-sm hover:shadow transform hover:scale-110"
    >
      <Icon size={20} className="text-blue-600" />
    </a>
  );
}
