import { useEffect, useState } from "react"
import { Titled } from "react-titled"
import { useMutation } from "urql"
import { useLocation } from "wouter"
import { graphql } from "../../graphql"
import { Alert } from "../components/ui/Alert"
import { useUser } from "../contexts"

const tokenTransferDocument = graphql(`
  mutation tokenTransfer($token: String!) {
    tokenTransfer(token: $token) {
      finale_players_count
      dx_intl_players_count
    }
  }
`)

const Transfer = () => {
  const [, navigate] = useLocation()
  const user = useUser()
  const [, tokenTransfer] = useMutation(tokenTransferDocument)
  const [token, setToken] = useState("")

  useEffect(() => {
    const listener = (e: MessageEvent) => {
      console.log(e.origin)
      console.log(typeof e.data)
      if (e.origin === window.origin && typeof e.data === "object") {
        setToken(e.data.token ?? "")
      }
    }
    window.addEventListener("message", listener, false)
    return () => {
      window.removeEventListener("message", listener)
    }
  }, [])

  const handleTransfer = async (): Promise<void> => {
    try {
      await tokenTransfer({ token: token })
      navigate("/")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log()
    }
  }
  console.log(handleTransfer)

  if (user == null) {
    return <Alert severity="info">請先登入。</Alert>
  }

  return (
    <div>
      <Titled title={(title) => `成績單資料轉移 - ${title}`} />
      <h3>成績單資料轉移</h3>
      {token}
    </div>
  )
}

export default Transfer
