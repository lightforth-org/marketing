import "./globals.css";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Lightforth - Get 5+ Job Offers in 21 Days</title>
        <meta
          name="description"
          content="Flood your inbox with job offers in just 21 days"
        />
        <link rel="icon" href="/favicon.ico" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              var head = document.head;
              var script = document.createElement('script');
              script.type = 'text/javascript';
              script.src = "https://t.lightforth.org/v1/lst/universal-script?ph=b18b330f9b6aca0d4ee43dee583f31d90b7f725528683d35d1beb4819d0cf9c3&tag=!clicked&ref_url=" + encodeURI(document.URL);
              head.appendChild(script);
            `,
          }}
        ></script>

        {/* Google Tag Manager Script */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WBLXD62P');
            `,
          }}
        />

        {/* Lightforth Script */}
        <Script
          id="lightforth-universal"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var head = document.head;
              var script = document.createElement('script');
              script.type = 'text/javascript';
              script.src = "https://t.lightforth.org/v1/lst/universal-script?ph=b18b330f9b6aca0d4ee43dee583f31d90b7f725528683d35d1beb4819d0cf9c3&tag=!clicked&ref_url=" + encodeURI(document.URL);
              head.appendChild(script);
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WBLXD62P"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {children}
      </body>
    </html>
  );
}
