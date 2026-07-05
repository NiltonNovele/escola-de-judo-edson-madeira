import { Construction } from "lucide-react";

type UnderDevelopmentProps = {
  title: string;
};

const UnderDevelopment = ({ title }: UnderDevelopmentProps) => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="relative w-full max-w-md rounded-3xl border border-blue-100 bg-white p-10 text-center shadow-xl">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl bg-blue-500/10 blur-2xl animate-pulse"
        />
        <div className="relative">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0A3A75] text-white">
            <Construction size={30} className="animate-bounce" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0A3A75]">{title}</h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Em Desenvolvimento
          </p>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Esta secção ainda está a ser construída. Volte em breve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;
