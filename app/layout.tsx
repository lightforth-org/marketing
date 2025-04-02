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
      </head>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
