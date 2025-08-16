// filepath: resources/js/components/seo.tsx
import { Head, usePage } from '@inertiajs/react';

type SEOProps = {
    title?: string;
    description?: string;
    image?: string;
    canonical?: string;
    noIndex?: boolean;
    robots?: string; // e.g., "index,follow"
    keywords?: string[] | string;
    publisher?: string;
    locale?: string; // e.g., 'id_ID'
};

export default function SEO({ title, description, image, canonical, noIndex = false, robots, keywords, publisher, locale }: SEOProps) {
    const { props } = usePage<{ name?: string; ziggy?: { location?: string } }>();
    const appName = props?.name || 'St Paulus Kwimi';

    const currentUrl = (() => {
        if (canonical) return canonical;
        if (typeof window !== 'undefined') return window.location.href;
        const loc = props?.ziggy?.location;
        return typeof loc === 'string' ? loc : undefined;
    })();

    const metaTitle = title ? `${title} | ${appName}` : appName;
    const metaDescription = description || 'Gereja St. Paulus Kwimi — informasi pengumuman, jadwal ibadah, dan kegiatan jemaat.';
    const metaImage = image || '/images/logo.png';
    const metaRobots = noIndex ? 'noindex,nofollow' : robots || 'index,follow';
    const metaKeywords = Array.isArray(keywords)
        ? keywords.join(', ')
        : keywords || 'gereja, st paulus, kwimi, pengumuman gereja, jadwal ibadah, kegiatan gereja, komunitas, umat';
    const metaPublisher = publisher || appName;
    const ogLocale = locale || 'id_ID';

    return (
        <Head title={title || appName}>
            {/* Basic */}
            <meta name="description" content={metaDescription} />
            <meta name="robots" content={metaRobots} />
            <meta name="keywords" content={metaKeywords} />
            <meta name="publisher" content={metaPublisher} />
            <meta httpEquiv="content-language" content={ogLocale.startsWith('id') ? 'id' : ogLocale} />
            <meta name="theme-color" content="#ffffff" />

            {/* Canonical */}
            {currentUrl && <link rel="canonical" href={currentUrl} />}

            {/* Open Graph */}
            <meta property="og:site_name" content={appName} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content="website" />
            {currentUrl && <meta property="og:url" content={currentUrl} />}
            <meta property="og:image" content={metaImage} />
            <meta property="og:locale" content={ogLocale} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />

            {/* JSON-LD: Organization */}
            <script type="application/ld+json">
                {JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Church',
                    name: appName,
                    url: currentUrl || '',
                    logo: metaImage,
                })}
            </script>
        </Head>
    );
}
