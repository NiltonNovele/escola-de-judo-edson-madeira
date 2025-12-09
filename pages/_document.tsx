import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt">
      <Head>

        {/* ----------- FAVICONS / LOGOS ----------- */}
        <link rel="icon" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />

        {/* ----------- BASIC META ----------- */}
        <meta name="description"
              content="EJEM - Escola De Judo Edson Madeira" />

        <meta name="keywords"
              content="judo, edson madeira, educação, desporto, crianças, jovens, projetos sociais, ejem" />

        <meta name="author" content="SyncTechX" />
        <meta name="theme-color" content="#0A3A75" />

        {/* ----------- OPEN GRAPH (FACEBOOK, WHATSAPP, LINKEDIN) ----------- */}
        <meta property="og:title" content="EJEM" />
        <meta property="og:description"
              content="Transformamos vidas através do judo, educação e desenvolvimento humano." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://www.ejem.org.mz" />
        <meta property="og:type" content="website" />

        {/* ----------- TWITTER CARDS ----------- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EJEM" />
        <meta name="twitter:description"
              content="Esporte, educação e desenvolvimento humano através do judo." />
        <meta name="twitter:image" content="/logo.png" />

        {/* ----------- FONTS (se quiseres) ----------- */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
        {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" /> */}

      </Head>

      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
