import "./globals.css";

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
        {/* Hotjar Script */}
        {/* <Script
          id="hotjar"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)}
                  h._hjSettings={hjid:5333842,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        /> */}
      </head>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
