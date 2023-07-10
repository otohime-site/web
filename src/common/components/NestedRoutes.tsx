import { PropsWithChildren } from "react"
import { Router, useLocation, useRouter } from "wouter"

// https://github.com/molefrog/wouter#are-relative-routes-and-links-supported
export const NestedRoutes = (props: PropsWithChildren<{ base: string }>) => {
  const router = useRouter()
  const [parnetLocation] = useLocation()

  const nestedBase = `${router.base}${props.base}`

  if (!parnetLocation.startsWith(nestedBase)) {
    return null
  }

  return (
    <Router base={nestedBase} key={nestedBase}>
      {props.children}
    </Router>
  )
}
