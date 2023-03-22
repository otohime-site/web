import * as Form from "@radix-ui/react-form"
import { MdArrowBack } from "react-icons/md"
import { useNavigate, useParams } from "react-router"
import { useMutation, useQuery } from "urql"
import { useAuth } from "../../auth"
import { Alert } from "../../common/components/ui/Alert"
import { Button, LinkButton } from "../../common/components/ui/Button"
import { TextField } from "../../common/components/ui/TextField"
import {
  DeleteDxIntlPlayerDocument,
  DxIntlPlayersEditableDocument,
  InsertDxIntlPlayerDocument,
  UpdateDxIntlPlayerDocument,
} from "../../generated/graphql"

const PlayerForm = () => {
  const [user, loading] = useAuth()
  const params = useParams<"nickname">()
  const navigate = useNavigate()
  const [, insertPlayer] = useMutation(InsertDxIntlPlayerDocument)
  const [, updatePlayer] = useMutation(UpdateDxIntlPlayerDocument)
  const [, deletePlayer] = useMutation(DeleteDxIntlPlayerDocument)
  const [playerResult] = useQuery({
    query: DxIntlPlayersEditableDocument,
    variables: { userId: user?.uid ?? "", nickname: params.nickname ?? "" },
    pause: loading || (user == null && params.nickname != null),
  })

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    event.stopPropagation()

    const formData = new FormData(event.currentTarget)
    const data = {
      nickname: (formData.get("nickname") as string) ?? "",
      private: formData.get("private") === "private",
    }
    if (params.nickname == null) {
      const result = await insertPlayer(data)
      if (result.error != null) {
        /*setError("nickname", {
          message: result.error.message.includes("Unique")
            ? "暱稱已經被使用。"
            : "發生不明錯誤。",
        })*/
        return
      }
      navigate("/")
      return
    }
    const playerId = playerResult.data?.dx_intl_players[0]?.id
    if (playerId == null) {
      throw new Error("No Player ID!")
    }
    const result = await updatePlayer({
      pk: playerId,
      ...data,
    })
    if (result.error != null) {
      /*setError("nickname", {
        message: result.error.message.includes("Unique")
          ? "暱稱已經被使用。"
          : "發生不明錯誤。",
      })*/
      return
    }
    navigate(`/dxi/p/${data.nickname}`)
  }

  const handleDeletePlayer = async (): Promise<void> => {
    if (
      prompt(`
是否確定要移除成績單？成績單與你在網站上的歷史紀錄將被移除。
此動作無法復原！
如果你只是希望隱藏你的成績單只讓自己看，你可以調整為私人成績單。

如果您已經確定了，請在下面重新輸入你的成績單暱稱（${
        params.nickname ?? ""
      }）。`) !== params.nickname
    ) {
      return
    }
    const playerId = playerResult.data?.dx_intl_players[0]?.id
    if (playerId == null) {
      throw new Error("No Player ID!")
    }
    await deletePlayer({ pk: playerId })
    navigate("/")
  }

  if (loading) {
    return <main>Loading...</main>
  }

  if (user == null) {
    return (
      <main>
        <Alert severity="info">請先登入。</Alert>
      </main>
    )
  }
  return (
    <main>
      <div>
        {params.nickname != null ? (
          <LinkButton to={`/dxi/p/${params.nickname}`} variant="violet">
            <MdArrowBack />
          </LinkButton>
        ) : (
          <LinkButton to="/" variant="violet">
            <MdArrowBack />
          </LinkButton>
        )}
        <h4>{params.nickname == null ? "新增成績單" : "編輯成績單"}</h4>
      </div>
      <Form.Root onSubmit={onSubmit}>
        <Form.Field name="nickname">
          <Form.Label>暱稱</Form.Label>
          <Form.Control asChild>
            <TextField
              pattern="^[0-9a-z\-_]{2,20}$"
              required
              defaultValue={params.nickname ?? ""}
            />
          </Form.Control>
          <Form.Message match="valueMissing">請輸入暱稱。</Form.Message>
          <Form.Message match="patternMismatch">暱稱格式不正確。</Form.Message>
        </Form.Field>
        <label>
          <input type="radio" name="private" value="public" required /> Public
        </label>
        <label>
          <input type="radio" name="private" value="private" required /> Private
        </label>
        {params.nickname == null ? (
          <Button variant="violet" type="submit" color="primary">
            新增
          </Button>
        ) : (
          <div>
            <Button variant="violet" type="submit" color="primary">
              編輯
            </Button>
            <Button variant="indigo" onClick={handleDeletePlayer}>
              刪除成績單
            </Button>
          </div>
        )}
      </Form.Root>
    </main>
  )
}

export default PlayerForm
