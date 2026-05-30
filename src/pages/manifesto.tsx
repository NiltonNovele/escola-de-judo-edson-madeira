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

                </section>
            </main>
            
            <Footer />
        </div>
    );
}
