import { useHead, useSeoMeta } from "@unhead/react"

const SITE_ORIGIN = "https://otohi.me"

export const SITE_DESCRIPTION =
  "Otohime 是適用於 maimai DX 國際版的成績單系統，提供成績單的同步、公開分享、篩選搜尋與統計功能。"

export const SiteMeta = () => {
  useSeoMeta(
    {
      title: "Otohime",
      description: SITE_DESCRIPTION,
      ogTitle: "Otohime",
      ogDescription: SITE_DESCRIPTION,
      ogLocale: "zh_TW",
      ogSiteName: "Otohime",
      ogType: "website",
      twitterCard: "summary",
    },
    { tagPriority: "low" },
  )
  useHead({ htmlAttrs: { lang: "zh-Hant" } }, { tagPriority: "low" })
  return null
}

interface PageMetaProps {
  canonicalPath: string
  description?: string
  noIndex?: boolean
  title: string
}

export const PageMeta = ({
  canonicalPath,
  description,
  noIndex = false,
  title,
}: PageMetaProps) => {
  const canonicalUrl = new URL(canonicalPath, SITE_ORIGIN).href

  useSeoMeta({
    title,
    ...(description == null ? {} : { description, ogDescription: description }),
    ogTitle: title,
    ogLocale: "zh_TW",
    ogSiteName: "Otohime",
    ogType: "website",
    ogUrl: canonicalUrl,
    robots: noIndex ? "noindex, follow" : "index, follow",
    twitterCard: "summary",
  })
  useHead({ link: [{ rel: "canonical", href: canonicalUrl }] })
  return null
}
