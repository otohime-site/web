import * as Form from "@radix-ui/react-form"
import { MdArrowBack, MdLock, MdPublic } from "react-icons/md"
import { useNavigate, useParams } from "react-router"
import { useMutation, useQuery } from "urql"
import { useAuth } from "../../auth"
import { Alert } from "../../common/components/ui/Alert"
import { Button, LinkButton } from "../../common/components/ui/Button"
import { RadioCard, RadioCardRoot } from "../../common/components/ui/RadioCard"
import { TextField } from "../../common/components/ui/TextField"
import {
  DeleteDxIntlPlayerDocument,
  DxIntlPlayersEditableDocument,
  InsertDxIntlPlayerDocument,
  UpdateDxIntlPlayerDocument,
} from "../../generated/graphql"

import { useState } from "react"
import classes from "./PlayerForm.module.css"

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
  const serverErrorsBase = {
    nickname: false,
    others: false,
  }
  const [serverErrors, setServerErrors] = useState({ ...serverErrorsBase })
  console.log(serverErrors)

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
        setServerErrors({
          ...serverErrorsBase,
          ...(result.error.message.includes("Unique")
            ? { nickname: true }
            : { others: true }),
        })
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
      setServerErrors({
        ...serverErrorsBase,
        ...(result.error.message.includes("Unique")
          ? { nickname: true }
          : { others: true }),
      })
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
      <Form.Root
        onSubmit={onSubmit}
        onClearServerErrors={() => setServerErrors({ ...serverErrorsBase })}
      >
        <Form.Field
          name="nickname"
          serverInvalid={serverErrors.nickname || serverErrors.others}
        >
          <Form.Label>暱稱（作為網址的一部分）</Form.Label>
          <Form.Control asChild>
            <TextField
              pattern="^[0-9a-z\-_]{2,20}$"
              required
              defaultValue={params.nickname ?? ""}
            />
          </Form.Control>
          <Form.Message match="valueMissing">請輸入暱稱。</Form.Message>
          <Form.Message match="patternMismatch">暱稱格式不正確。</Form.Message>
          {serverErrors.nickname && <Form.Message>暱稱已被使用。</Form.Message>}
          {serverErrors.others && (
            <Form.Message>發生不明錯誤，請重試。</Form.Message>
          )}
        </Form.Field>
        隱私設定
        <RadioCardRoot
          name="private"
          defaultValue={
            playerResult.data?.dx_intl_players[0]?.private
              ? "private"
              : "public"
          }
        >
          <RadioCard className={classes["radio-card-private"]} value="public">
            <div>
              <dt>
                <MdPublic /> 公開
              </dt>
              <dd>
                <ul>
                  <li>憑成績單網址或搜尋即可瀏覽。</li>
                  <li>成績、達成狀況、Rating 會加入全站統計。</li>
                </ul>
              </dd>
            </div>
          </RadioCard>
          <RadioCard className={classes["radio-card-private"]} value="private">
            <div>
              <dt>
                <MdLock />
                私人
              </dt>
              <dd>
                <ul>
                  <li>需要登入原登錄的帳號。</li>
                  <li>不會加入任何全站統計跟排行榜中。</li>
                </ul>
              </dd>
            </div>
          </RadioCard>
        </RadioCardRoot>
        <div className={classes.notes}>
          <p>
            Otohime 會記錄的東西如下，也建議您詳閱我們的
            <a href="#" target="_blank" rel="noopener noreferrer">
              隱私政策與資料使用方針
            </a>
            。
          </p>
          <ul>
            <li>雜湊後的 Friend ID（不公開，僅用於自動對應多卡成績）</li>
            <li>卡名、Rating、稱號、段位與對戰階級</li>
            <li>每個譜面的分數、Combo Flag、Sync Flag</li>
          </ul>
        </div>
        {params.nickname == null ? (
          <Button variant="violet" type="submit" color="primary">
            新增
          </Button>
        ) : (
          <div>
            <Button variant="violet" type="submit" color="primary">
              編輯
            </Button>
            <Button variant="red" onClick={handleDeletePlayer}>
              刪除成績單
            </Button>
          </div>
        )}
      </Form.Root>
    </main>
  )
}

export default PlayerForm
