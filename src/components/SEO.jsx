import { useEffect } from 'react';

/**
 * SEO Component - Updates document head for each page
 * Compatible with React 19 (no external dependencies)
 */
const SEO = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = 'https://elitedetailing.com/og-image.jpg',
}) => {
  const siteTitle = 'Elite Detailing';
  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | Luxury Auto & Private Jet Detailing in New England`;
  const defaultDescription = 'Professional luxury auto and private jet detailing services across New England. Ceramic coating, paint correction, and premium detailing packages.';

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const updateMetaTag = (attribute, value, content) => {
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // Update meta description
    updateMetaTag('name', 'description', description || defaultDescription);
    updateMetaTag('name', 'title', fullTitle);

    // Update Open Graph tags
    updateMetaTag('property', 'og:title', fullTitle);
    updateMetaTag('property', 'og:description', description || defaultDescription);
    updateMetaTag('property', 'og:type', ogType);
    updateMetaTag('property', 'og:image', ogImage);
    if (canonical) {
      updateMetaTag('property', 'og:url', canonical);
    }

    // Update Twitter tags
    updateMetaTag('property', 'twitter:title', fullTitle);
    updateMetaTag('property', 'twitter:description', description || defaultDescription);
    updateMetaTag('property', 'twitter:image', ogImage);
    if (canonical) {
      updateMetaTag('property', 'twitter:url', canonical);
    }

    // Update canonical link
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', canonical);
      } else {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        canonicalLink.setAttribute('href', canonical);
        document.head.appendChild(canonicalLink);
      }
    }

    // Cleanup function to reset to defaults when component unmounts
    return () => {
      // Optional: reset to default title when navigating away
      // document.title = siteTitle;
    };
  }, [fullTitle, description, canonical, ogType, ogImage]);

  // This component doesn't render anything
  return null;
};

export default SEO;
