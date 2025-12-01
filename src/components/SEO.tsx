import Head from "next/head";
import { siteUrl } from "@/utils/seo";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  twitterCard?: "summary" | "summary_large_image";
  noindex?: boolean;
  nofollow?: boolean;
  schema?: Record<string, unknown>;
  hreflang?: Array<{ lang: string; url: string }>;
  geo?: {
    region?: string;
    placename?: string;
    position?: string;
  };
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
}

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = `${siteUrl}/images/printalliance-logo.png`,
  ogType = "website",
  twitterCard = "summary_large_image",
  noindex = false,
  nofollow = false,
  schema,
  hreflang = [
    { lang: "en-US", url: `${siteUrl}${canonical || ""}` },
    { lang: "en-GB", url: `${siteUrl}${canonical || ""}` },
  ],
  geo,
  author = "PrintAlliance",
  publishedTime,
  modifiedTime,
  articleAuthor,
  articleSection,
  articleTags,
}: SEOProps) => {
  const fullTitle = title.includes("PrintAlliance")
    ? title
    : `${title} | PrintAlliance`;
  const fullCanonical = canonical
    ? `${siteUrl}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
    : siteUrl;
  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${siteUrl}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <meta name="robots" content={`${noindex ? "noindex" : "index"}, ${nofollow ? "nofollow" : "follow"}`} />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Language and Geo Tags */}
      <meta httpEquiv="content-language" content="en-US, en-GB" />
      <link rel="alternate" hrefLang="en-US" href={hreflang[0]?.url || fullCanonical} />
      <link rel="alternate" hrefLang="en-GB" href={hreflang[1]?.url || fullCanonical} />
      <link rel="alternate" hrefLang="x-default" href={fullCanonical} />
      {geo && (
        <>
          {geo.region && <meta name="geo.region" content={geo.region} />}
          {geo.placename && <meta name="geo.placename" content={geo.placename} />}
          {geo.position && <meta name="geo.position" content={geo.position} />}
        </>
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content="PrintAlliance" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_GB" />

      {/* Article Specific OG Tags */}
      {ogType === "article" && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {articleAuthor && <meta property="article:author" content={articleAuthor} />}
          {articleSection && <meta property="article:section" content={articleSection} />}
          {articleTags && articleTags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@printalliance" />
      <meta name="twitter:creator" content="@printalliance" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#E63946" />
      <meta name="msapplication-TileColor" content="#E63946" />
      <meta name="application-name" content="PrintAlliance" />
      <meta name="apple-mobile-web-app-title" content="PrintAlliance" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Structured Data */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      )}
    </Head>
  );
};

export default SEO;

