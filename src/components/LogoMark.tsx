import Image from "next/image";
import { SITE_LOGO } from "@/data/site";

type LogoMarkProps = {
  className: string;
  imageSizes: string;
  priority?: boolean;
};

export default function LogoMark({
  className,
  imageSizes,
  priority = false,
}: LogoMarkProps) {
  return (
    <div className={className}>
      <Image
        src={SITE_LOGO}
        alt="Logo"
        fill
        sizes={imageSizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
