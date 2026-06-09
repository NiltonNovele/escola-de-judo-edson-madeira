import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Manifesto() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-14">
                <section className="max-w-6xl mx-auto px-6 py-16">

                    <div className="relative overflow-hidden rounded-[32px] border border-gray-200 shadow-xl bg-black">
                        <video
                            src="/videos/manifesto.mp4"
                            autoPlay
                            playsInline
                            controls
                            className="w-full h-auto max-h-[80vh] object-cover"
                        />
                    </div>

                    {/* MESSAGE */}
                    <div className="mt-8 max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-blue-900">
                            Mais do que um desporto, uma forma de vida
                        </h2>
                        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                            Na Escola de Judo Edson Madeira, acreditamos que o judo
                            vai além do tatami. Formamos atletas e cidadãos através
                            da disciplina, do respeito, da perseverança e da busca
                            constante pela excelência.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}