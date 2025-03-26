import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import localFont from "next/font/local"

// Chargement d'une police plus technique/industrielle
const techFont = localFont({
  src: [
    {
      path: "../public/fonts/Audiowide-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-tech",
  display: "swap",
})

// Police de secours
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "SoundFlow - Gestion de projets musicaux",
  description: "Plateforme de gestion de projets musicaux avec visualisation audio avancée",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="preload" href="/fonts/Audiowide-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body className={`${techFont.variable} ${inter.variable} font-tech antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'