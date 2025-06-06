import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import { CANONICAL_DOMAIN } from "../../constants";
import { useTranslations } from "next-intl";
import { isNotEmpty, isNotVoid } from "@/shared/utils";

interface SEOProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

export const SEO: React.FC<SEOProps> = ({ children, description, title }) => {
  const { asPath } = useRouter();

  const t = useTranslations("SEO");

  const metaTitle =
    isNotVoid(title) && isNotEmpty(title)
      ? `${title} | ${t("title_prefix")}`
      : t("title_prefix");

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="googlebot" content="notranslate" />
      <meta name="google" content="notranslate" />
      <meta name="description" content={description || t("description")} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#FFFFFF" />{" "}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={CANONICAL_DOMAIN + asPath} />
      <meta property="og:title" content={metaTitle} />
      <link rel="canonical" href={CANONICAL_DOMAIN + asPath} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
