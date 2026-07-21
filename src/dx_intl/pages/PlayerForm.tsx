import { Dialog } from "@ark-ui/react/dialog"
import { Field } from "@ark-ui/react/field"
import { Portal } from "@ark-ui/react/portal"
import { RadioGroup } from "@ark-ui/react/radio-group"
import { ReactElement, useState } from "react"
import { useMutation, useQuery } from "urql"
import { useLocation } from "wouter"
import IconClose from "~icons/mdi/close"
import IconLock from "~icons/mdi/lock"
import IconPublic from "~icons/mdi/public"
import { Alert } from "../../common/components/ui/Alert"
import { RadioGroupItem } from "../../common/components/ui/RadioGroupItem"
import { useUser } from "../../common/contexts"
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

interface PlayerFormProps {
  params: { nickname?: string }
  trigger?: ReactElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onSaved?: () => void
}

const PlayerForm = ({
  params,
  trigger,
  open,
  onOpenChange,
  onSaved,
}: PlayerFormProps) => {
  const user = useUser()
  const [, navigate] = useLocation()
  const [localOpen, setLocalOpen] = useState(false)
  const dialogOpen = open ?? localOpen
  const [, insertPlayer] = useMutation(insertDxIntlPlayerDocument)
  const [, updatePlayer] = useMutation(updateDxIntlPlayerDocument)
  const [, deletePlayer] = useMutation(deleteDxIntlPlayerDocument)
  const [playerResult] = useQuery({
    query: dxIntlPlayersEditableDocument,
    variables: { userId: user?.uid ?? "", nickname: params.nickname ?? "" },
    pause: user == null || !dialogOpen || params.nickname == null,
  })
  const [serverErrors, setServerErrors] = useState<{ nickname?: string }>({})

  const setDialogOpen = (nextOpen: boolean) => {
    if (open == null) {
      setLocalOpen(nextOpen)
    }
    if (!nextOpen) {
      setServerErrors({})
    }
    onOpenChange?.(nextOpen)
  }

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
      onSaved?.()
      setDialogOpen(false)
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
    onSaved?.()
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
    onSaved?.()
    navigate("~/")
  }

  return (
    <Dialog.Root
      open={dialogOpen}
      onOpenChange={({ open }) => setDialogOpen(open)}
      lazyMount
      unmountOnExit
    >
      {trigger != null ? (
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      ) : null}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className={classes.dialog}>
            <header className={classes.header}>
              <Dialog.Title>
                {params.nickname == null ? "新增成績單" : "編輯成績單"}
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <button aria-label="關閉">
                  <IconClose />
                </button>
              </Dialog.CloseTrigger>
            </header>
            {playerResult.fetching ? (
              <p className={classes.loading}>載入中…</p>
            ) : user == null ? (
              <Alert severity="info">請先登入。</Alert>
            ) : playerResult.error != null ? (
              <Alert severity="error">無法載入成績單，請重試。</Alert>
            ) : (
              <form className={classes.form} onSubmit={onSubmit}>
                <Field.Root
                  className={classes.field}
                  invalid={serverErrors.nickname != null}
                >
                  <Field.Label>暱稱（作為網址的一部分）</Field.Label>
                  <Field.Input
                    name="nickname"
                    pattern="^[0-9a-z\-_]{2,20}$"
                    required
                    defaultValue={params.nickname ?? ""}
                  />
                  <Field.ErrorText>{serverErrors.nickname}</Field.ErrorText>
                </Field.Root>
                <div className={classes["section-label"]}>隱私設定</div>
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
                      <strong className={classes["option-title"]}>
                        <IconPublic /> 公開
                      </strong>
                      <ul>
                        <li>憑成績單網址或搜尋即可瀏覽。</li>
                        <li>成績、達成狀況、Rating 會加入全站統計。</li>
                      </ul>
                    </div>
                  </RadioGroupItem>
                  <RadioGroupItem value="private" asChild>
                    <div>
                      <strong className={classes["option-title"]}>
                        <IconLock />
                        私人
                      </strong>
                      <ul>
                        <li>需要登入原登錄的帳號。</li>
                        <li>不會加入任何全站統計跟排行榜中。</li>
                      </ul>
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
                <div className={classes.actions}>
                  {params.nickname != null ? (
                    <button
                      type="button"
                      className={`${classes["delete-button"]} danger`}
                      onClick={handleDeletePlayer}
                    >
                      刪除成績單
                    </button>
                  ) : null}
                  <Dialog.CloseTrigger asChild>
                    <button type="button">取消</button>
                  </Dialog.CloseTrigger>
                  <button type="submit" className="primary">
                    {params.nickname == null ? "新增" : "儲存"}
                  </button>
                </div>
              </form>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default PlayerForm
