import IconArrowBack from "~icons/mdi/arrow-back"
import IconLock from "~icons/mdi/lock"
import IconPublic from "~icons/mdi/public"

import { Field } from "@ark-ui/react/field"
import { RadioGroup } from "@ark-ui/react/radio-group"
import { useMutation, useQuery } from "urql"
import { Alert } from "../../common/components/ui/Alert"
import { LinkButton } from "../../common/components/ui/Button"
import { RadioGroupItem } from "../../common/components/ui/RadioGroupItem"
import { useUser } from "../../common/contexts"

import { useState } from "react"
import { Params, useLocation } from "wouter"
import { graphql } from "../../graphql"
import { dxIntlPlayersEditableDocument } from "../models/queries"
import classes from "./PlayerForm.module.css"

const insertDxIntlPlayerDocument = graphql(`
  mutation insertDxIntlPlayer($nickname: String!, $private: Boolean!) {
    insert_dx_intl_players_one(
      object: { nickname: $nickname, private: $private }
    ) {
      id
    }
  }
`)

const updateDxIntlPlayerDocument = graphql(`
  mutation updateDxIntlPlayer(
    $pk: Int!
    $nickname: String!
    $private: Boolean!
  ) {
    update_dx_intl_players_by_pk(
      pk_columns: { id: $pk }
      _set: { nickname: $nickname, private: $private }
    ) {
      id
    }
  }
`)

const deleteDxIntlPlayerDocument = graphql(`
  mutation deleteDxIntlPlayer($pk: Int!) {
    delete_dx_intl_players_by_pk(id: $pk) {
      id
    }
  }
`)

const PlayerForm = ({ params }: { params: Params }) => {
  const user = useUser()
  const [, navigate] = useLocation()
  const [, insertPlayer] = useMutation(insertDxIntlPlayerDocument)
  const [, updatePlayer] = useMutation(updateDxIntlPlayerDocument)
  const [, deletePlayer] = useMutation(deleteDxIntlPlayerDocument)
  const [playerResult] = useQuery({
    query: dxIntlPlayersEditableDocument,
    variables: { userId: user?.uid ?? "", nickname: params.nickname ?? "" },
    pause: user == null && params.nickname != null,
  })
  const [serverErrors, setServerErrors] = useState<{ nickname?: string }>({})

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
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
        setServerErrors(
          result.error.message.includes("Unique")
            ? { nickname: "暱稱已被使用。" }
            : { nickname: "發生不明錯誤，請重試。" },
        )
        return
      }
      navigate("~/")
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
      setServerErrors(
        result.error.message.includes("Unique")
          ? { nickname: "暱稱已被使用。" }
          : { nickname: "發生不明錯誤，請重試。" },
      )
      return
    }
    navigate(`~/dxi/p/${data.nickname}`)
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
    navigate("~/")
  }

  if (playerResult.fetching) {
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
          <LinkButton href={`~/dxi/p/${params.nickname}`}>
            <IconArrowBack />
          </LinkButton>
        ) : (
          <LinkButton href="~/">
            <IconArrowBack />
          </LinkButton>
        )}
        <h4>{params.nickname == null ? "新增成績單" : "編輯成績單"}</h4>
      </div>
      <form onSubmit={onSubmit}>
        <Field.Root invalid={serverErrors.nickname != null}>
          <label>暱稱（作為網址的一部分）</label>
          <Field.Input
            name="nickname"
            pattern="^[0-9a-z\-_]{2,20}$"
            required
            defaultValue={params.nickname ?? ""}
          />
          <Field.ErrorText>{serverErrors.nickname}</Field.ErrorText>
        </Field.Root>
        隱私設定
        <RadioGroup.Root
          name="private"
          defaultValue={
            playerResult.data?.dx_intl_players[0]?.private
              ? "private"
              : "public"
          }
          className={classes["radio-group"]}
        >
          <RadioGroupItem value="public" asChild>
            <div>
              <dt>
                <IconPublic /> 公開
              </dt>
              <dd>
                <ul>
                  <li>憑成績單網址或搜尋即可瀏覽。</li>
                  <li>成績、達成狀況、Rating 會加入全站統計。</li>
                </ul>
              </dd>
            </div>
          </RadioGroupItem>
          <RadioGroupItem value="private" asChild>
            <div>
              <dt>
                <IconLock />
                私人
              </dt>
              <dd>
                <ul>
                  <li>需要登入原登錄的帳號。</li>
                  <li>不會加入任何全站統計跟排行榜中。</li>
                </ul>
              </dd>
            </div>
          </RadioGroupItem>
        </RadioGroup.Root>
        <div className={classes.notes}>
          <p>
            Otohime 會記錄的東西如下，也建議您詳閱我們的
            <a
              href="https://littlebtc.gitbook.io/otohime-docs/data-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              隱私權與資料使用政策
            </a>
            。
          </p>
          <ul>
            <li>卡名、Rating、稱號、段位與對戰階級</li>
            <li>每個譜面的分數、Combo Flag、Sync Flag</li>
          </ul>
        </div>
        {params.nickname == null ? (
          <button type="submit">新增</button>
        ) : (
          <div>
            <button type="submit">編輯</button>
            <button onClick={handleDeletePlayer}>刪除成績單</button>
          </div>
        )}
      </form>
    </main>
  )
}

export default PlayerForm
