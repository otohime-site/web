import { useHead } from "@unhead/react"
import { Link } from "wouter"
import { PageMeta } from "../components/PageMeta"

const NotFound = () => {
  useHead({
    htmlAttrs: { lang: "en" },
    link: [{ rel: "stylesheet", href: "/404.css" }],
  })

  return (
    <main className="otohime-not-found">
      <PageMeta noIndex title="Page Not Found - Otohime" />
      <h1>Page Not Found</h1>
      <p>This URL does not exist, or the page has moved.</p>
      <Link href="~/">Return to the Otohime homepage</Link>
    </main>
  )
}

export default NotFound
