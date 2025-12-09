"use client";

import Link from "next/link";
import {
  Instagram,
  Facebook,
  Linkedin,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-black pt-20 pb-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">

        {/* Logo & Short Description */}
        <div className="flex flex-col items-start">
          <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg mb-4 ring-2 ring-gray-200">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            Escola de Judo Edson Madeira — promovendo a educação, disciplina e espírito esportivo através do Judo.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-black font-semibold mb-4 text-lg">Contacto</h4>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex gap-3 items-start">
              <MapPin size={20} className="text-blue-600" />
              <span>Avenida Principal, Maputo, Moçambique</span>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={20} className="text-blue-600" />
              <a
                href="mailto:ajuda@ejem.org.mz"
                className="underline hover:text-blue-700 transition"
              >
                ajuda@ejem.org.mz
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Phone size={20} className="text-blue-600" />
              +258 84 123 4567
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-black font-semibold mb-4 text-lg">Links Rápidos</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <Link href="/privacy" className="hover:text-blue-700 transition">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-black font-semibold mb-4 text-lg">Redes Sociais</h4>
          <div className="flex gap-4">
            <SocialIcon href="https://instagram.com" Icon={Instagram} />
            <SocialIcon href="https://facebook.com" Icon={Facebook} />
            <SocialIcon href="https://linkedin.com" Icon={Linkedin} />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 border-t border-gray-200 pt-6">
        <div className="text-center text-gray-500 text-xs space-y-1">
          <p>
            © {new Date().getFullYear()} Escola de Judo Edson Madeira. Todos os direitos reservados.
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

/* Social Icon Component */
function SocialIcon({ href, Icon }: { href: string; Icon: any }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition flex items-center justify-center shadow-sm hover:shadow transform hover:scale-110"
    >
      <Icon size={20} className="text-blue-600" />
    </a>
  );
}
