import type { ComponentType } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";

export type IconComponent = ComponentType<{
  className?: string;
  size?: number | string;
}>;

export type NavigationItem = {
  href: string;
  label: string;
};

export type NavigationSection = {
  title: string;
  items: NavigationItem[];
};

export type SocialLink = {
  href: string;
  label: string;
  Icon: IconComponent;
};

export const SITE_LOGO = "/images/logo.jpg";
export const PARTNER_IDS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export const NAV_SECTIONS: NavigationSection[] = [
  {
    title: "EJEM",
    items: [
      { href: "/quem-somos", label: "Quem somos" },
      { href: "/onde-estamos", label: "Onde estamos" },
      { href: "/manifesto", label: "Manifesto" },
      { href: "/equipa", label: "Equipa" },
    ],
  },
  {
    title: "PROGRAMAS",
    items: [
      { href: "/aulas", label: "Aulas de Judo" },
      { href: "/teambuilding", label: "Team Building" },
      { href: "/ferias", label: "Actividades de Férias" },
      { href: "/social", label: "Social" },
    ],
  },
  {
    title: "EXTRAS",
    items: [
      { href: "/galeria", label: "Galeria" },
      { href: "/eventos", label: "Eventos" },
      { href: "/graduacoes", label: "Graduações" },
    ],
  },
];

export const NAV_SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://www.instagram.com/escoladejudoedsonmadeira/",
    label: "Instagram",
    Icon: FaInstagram,
  },
  {
    href: "https://web.facebook.com/profile.php?id=100064625562311",
    label: "Facebook",
    Icon: FaFacebookF,
  },
  {
    href: "https://www.linkedin.com/in/edson-madeira-oly-0858b8a0/",
    label: "LinkedIn",
    Icon: FaLinkedinIn,
  },
  {
    href: "https://www.tiktok.com/@escoladejudoedsonmadeira?lang=en",
    label: "TikTok",
    Icon: FaTiktok,
  },
];

export const FOOTER_SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://www.instagram.com/escoladejudoedsonmadeira/",
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: "https://web.facebook.com/profile.php?id=100064625562311",
    label: "Facebook",
    Icon: Facebook,
  },
  {
    href: "https://www.linkedin.com/in/edson-madeira-oly-0858b8a0/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "https://www.tiktok.com/@escoladejudoedsonmadeira?lang=en",
    label: "TikTok",
    Icon: FaTiktok,
  },
];
