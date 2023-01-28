import { FunctionComponent, PropsWithChildren } from "react"
import { UseQueryState } from "urql"
import { Alert } from "./ui/Alert"

interface Props {
  result: UseQueryState
  errorMsg?: string
  skeletonVariant?: "text" | "circular" | "rectangular"
  skeletonWidth?: number | string
  skeletonHeight?: number | string
}

export const QueryResult: FunctionComponent<PropsWithChildren<Props>> = ({
  result,
  errorMsg,
  skeletonVariant,
  skeletonWidth,
  skeletonHeight,
  children,
}) => {
  if (result.fetching) {
    return <div />
  }
  if (result.error != null) {
    return <Alert severity="error">{errorMsg ?? "發生問題，請重試。"}</Alert>
  }
  return <>{children}</>
}
