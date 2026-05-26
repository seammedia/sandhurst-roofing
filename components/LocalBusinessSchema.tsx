/**
 * LocalBusiness / RoofingContractor JSON-LD structured data.
 * Rendered once in the root layout so every page surfaces it for Google rich results.
 *
 * See:
 *   - https://schema.org/RoofingContractor
 *   - https://developers.google.com/search/docs/appearance/structured-data/local-business
 */
export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": "https://sandhurstroofing.com.au/#business",
    name: "Sandhurst Roofing",
    description:
      "Family-run roofing specialists serving Melbourne's south-east and the Mornington Peninsula. Roof restoration, re-roofing, COLORBOND® steel roofing, gutter repairs and replacement. 35+ years of experience.",
    url: "https://sandhurstroofing.com.au",
    telephone: "+61448812800",
    email: "info@sandhurstroofing.com.au",
    address: {
      "@type": "PostalAddress",
      streetAddress: "10 Duiker Crt",
      addressLocality: "Langwarrin",
      addressRegion: "VIC",
      postalCode: "3910",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -38.1656,
      longitude: 145.1747,
    },
    areaServed: [
      { "@type": "City", name: "Frankston" },
      { "@type": "City", name: "Mornington" },
      { "@type": "City", name: "Mount Eliza" },
      { "@type": "City", name: "Mount Martha" },
      { "@type": "City", name: "Cranbourne" },
      { "@type": "City", name: "Berwick" },
      { "@type": "City", name: "Dandenong" },
      { "@type": "City", name: "Chelsea" },
      { "@type": "City", name: "Mordialloc" },
      { "@type": "City", name: "Cheltenham" },
      { "@type": "City", name: "Moorabbin" },
      { "@type": "City", name: "Sorrento" },
      { "@type": "City", name: "Portsea" },
      { "@type": "City", name: "Hastings" },
      { "@type": "City", name: "Flinders" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "17:00",
    },
    priceRange: "$$",
    foundingDate: "1991",
    slogan: "For all your roofing solutions",
    sameAs: [
      "https://www.facebook.com/sandhurstroofing/",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Roof Restoration",
          serviceType: "Roof Restoration",
          url: "https://sandhurstroofing.com.au/roof-restoration/",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Re-Roofing",
          serviceType: "Re-Roofing",
          url: "https://sandhurstroofing.com.au/re-roofing/",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "COLORBOND® steel Roofing",
          serviceType: "COLORBOND® steel Roofing",
          url: "https://sandhurstroofing.com.au/colorbond-roofing/",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Roof Repairs",
          serviceType: "Roof Repairs",
          url: "https://sandhurstroofing.com.au/roof-repairs/",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Roof Painting",
          serviceType: "Roof Painting",
          url: "https://sandhurstroofing.com.au/roof-painting/",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Guttering",
          serviceType: "Gutter Repairs and Replacement",
          url: "https://sandhurstroofing.com.au/guttering/",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Flat Metal Roofing",
          serviceType: "Flat Metal Roofing",
          url: "https://sandhurstroofing.com.au/flat-metal-roofing/",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Asbestos Roof Removal & Replacement",
          serviceType: "Asbestos Roof Removal & Replacement",
          url: "https://sandhurstroofing.com.au/asbestos-roof-removal-and-replacement/",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
