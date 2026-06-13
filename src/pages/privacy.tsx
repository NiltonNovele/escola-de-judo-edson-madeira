"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            <Navbar />

            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="pt-32 text-center px-6"
            >
                <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
                    Política de Privacidade
                </h1>

                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    A sua privacidade é importante para nós. Esta página explica como
                    recolhemos, utilizamos e protegemos os seus dados.
                </p>
            </motion.div>

            {/* CONTENT */}
            <section className="max-w-4xl mx-auto px-6 mt-12 space-y-6">

                {/* Card */}
                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:shadow-lg transition">
                    <h2 className="text-xl font-bold text-blue-900 mb-2">
                        Recolha de Dados
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Recolhemos apenas os dados necessários fornecidos voluntariamente
                        através de formulários de contacto ou inscrição.
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:shadow-lg transition">
                    <h2 className="text-xl font-bold text-blue-900 mb-2">
                        Utilização da Informação
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Utilizamos os dados exclusivamente para comunicação, gestão de alunos
                        e funcionamento das atividades da escola.
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:shadow-lg transition">
                    <h2 className="text-xl font-bold text-blue-900 mb-2">
                        Proteção de Dados
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Aplicamos medidas técnicas e organizacionais para proteger os dados
                        contra acesso não autorizado ou uso indevido.
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:shadow-lg transition">
                    <h2 className="text-xl font-bold text-blue-900 mb-2">
                        Partilha de Dados
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Não partilhamos dados pessoais com terceiros, exceto quando exigido
                        por lei.
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:shadow-lg transition">
                    <h2 className="text-xl font-bold text-blue-900 mb-2">
                        Direitos do Utilizador
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Pode solicitar acesso, alteração ou eliminação dos seus dados pessoais
                        a qualquer momento.
                    </p>
                </div>

                {/* Footer note */}
                <p className="text-center text-sm text-gray-400 pt-6">
                    Última actualização: 2026
                </p>

            </section>

            <div className="mt-20">
                <Footer />
            </div>
        </div>
    );
}