import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from "react"

import { CANONICAL_DOMAIN } from '../../constants';
import { useTranslations } from 'next-intl';
import { isNotEmpty, isNotVoid } from '@/shared/utils';

interface SEOProps {
  title?: string;
  children?: ReactNode;
}

export const SEO: React.FC<SEOProps> = ({ children, title }) => {
  const { asPath } = useRouter();

  const t = useTranslations("Settings");

  const metaTitle = isNotVoid(title) && isNotEmpty(title) ?  `${title} | ${t("title_prefix")}` : t("title_prefix");

  return (
    <Head>
      {children}
      <title>{metaTitle}</title>
      <meta property="og:url" content={CANONICAL_DOMAIN + asPath} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#FFFFFF" />
      <link rel="canonical" href={CANONICAL_DOMAIN + asPath} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}