import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_URL = "https://alpinetechnologynetwork.com";
const SITE_NAME = "Alpine Technology Network";
const SITE_DESCRIPTION =
  "Alpine Technology Network (ATN) designs, develops, and delivers custom software solutions. Expert web development, mobile apps, cloud architecture, AI/ML, UI/UX design, and staff augmentation services to help companies scale with world-class technology.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1628",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Alpine Technology Network | Custom Software Development & IT Solutions",
    template: "%s | Alpine Technology Network",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "custom software development",
    "web development company",
    "mobile app development",
    "staff augmentation services",
    "cloud solutions",
    "AI machine learning development",
    "UI UX design agency",
    "cybersecurity services",
    "technology consulting",
    "software outsourcing",
    "React Next.js development",
    "full-stack development",
    "Alpine Technology Network",
    "ATN",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Alpine Technology Network | Custom Software Development & IT Solutions",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Alpine Technology Network - Custom Software Development",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpine Technology Network | Custom Software Development & IT Solutions",
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
    creator: "@alpinetech",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    foundingDate: "2020",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 20,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@atn.com",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.linkedin.com/company/alpine-technology-network",
      "https://github.com/alpine-technology-network",
      "https://x.com/alpinetech",
    ],
    knowsAbout: [
      "Custom Software Development",
      "Web Development",
      "Mobile App Development",
      "Cloud Solutions",
      "AI and Machine Learning",
      "UI/UX Design",
      "Cybersecurity",
      "Staff Augmentation",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Software Development Services",
    description: "End-to-end technology solutions by Alpine Technology Network",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Web Development",
          description:
            "Custom web applications built with modern frameworks like React and Next.js, optimized for performance and scalability.",
          provider: { "@type": "Organization", name: SITE_NAME },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Mobile App Development",
          description:
            "Native and cross-platform mobile applications for iOS and Android using Flutter, React Native, and Swift.",
          provider: { "@type": "Organization", name: SITE_NAME },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "UI/UX Design",
          description:
            "User-centered design combining aesthetics with functionality for digital products people love to use.",
          provider: { "@type": "Organization", name: SITE_NAME },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Service",
          name: "Cloud Solutions",
          description:
            "Scalable cloud infrastructure and DevOps services on AWS, Azure, and GCP.",
          provider: { "@type": "Organization", name: SITE_NAME },
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Service",
          name: "AI & Machine Learning",
          description:
            "Intelligent solutions powered by AI and ML to automate processes and gain actionable insights.",
          provider: { "@type": "Organization", name: SITE_NAME },
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "Service",
          name: "Cybersecurity",
          description:
            "Comprehensive security audits, penetration testing, and secure architecture to protect digital assets.",
          provider: { "@type": "Organization", name: SITE_NAME },
        },
      },
    ],
  };

  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <link
          rel="preload"
          href="/earth_atmos_2048.jpg"
          as="image"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/earth_clouds_2048.png"
          as="image"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
