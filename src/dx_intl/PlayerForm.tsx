import React, { FunctionComponent, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { Link as RouterLink } from "react-router-dom"
import { useMutation, useQuery } from "urql"
import {
  DeleteDxIntlPlayerDocument,
  DxIntlPlayersEditableDocument,
  InsertDxIntlPlayerDocument,
  UpdateDxIntlPlayerDocument,
} from "../generated/graphql"
import firebase from "firebase/app"
import { useAuth } from "../auth"
import {
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Button,
  Container,
} from "@material-ui/core"
import { useForm, Controller } from "react-hook-form"
import PublicIcon from "@material-ui/icons/Public"
import LockIcon from "@material-ui/icons/Lock"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import styled from "@emotion/styled"


const StyledFormControl = styled(FormControl)`
  margin: 16px 0;
`

const StyledList = styled("ul")`
  margin: 0;
`

const LabelContainer = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const ActionsContainer = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const SpacedTypo = styled(Typography)`
  margin-left: 8px;
`

interface FormParams {
  nickname: string
  private: "public" | "private"
}

const PlayerForm: FunctionComponent = () => {
  const [user] = useAuth(firebase.auth())
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<FormParams>()
  const params = useParams<{ nickname?: string }>()
  const history = useHistory()
  const [, insertPlayer] = useMutation(InsertDxIntlPlayerDocument)
  const [, updatePlayer] = useMutation(UpdateDxIntlPlayerDocument)
  const [, deletePlayer] = useMutation(DeleteDxIntlPlayerDocument)
  const [playerResult] = useQuery({
    query: DxIntlPlayersEditableDocument,
    variables: { userId: user?.uid ?? "", nickname: params.nickname ?? "" },
    pause: user == null && params.nickname != null,
  })

  useEffect(() => {
    if (
      playerResult.error == null &&
      playerResult.data?.dx_intl_players[0] != null
    ) {
      const player = playerResult.data?.dx_intl_players[0]
      reset({
        nickname: player.nickname,
        private: player.private ? "private" : "public",
      })
    }
  }, [playerResult])

  const onSubmit = async (data: FormParams): Promise<void> => {
    if (params.nickname == null) {
      const result = await insertPlayer({
        nickname: data.nickname,
        private: data.private === "private",
      })
      if (result.error != null) {
        setError("nickname", {
          message: result.error.message.includes("Unique")
            ? "暱稱已經被使用。"
            : "發生不明錯誤。",
        })
        return
      }
      history.push("/")
      return
    }
    const playerId = playerResult.data?.dx_intl_players[0]?.id
    if (playerId == null) {
      throw new Error("No Player ID!")
    }
    const result = await updatePlayer({
      pk: playerId,
      nickname: data.nickname,
      private: data.private === "private",
    })
    if (result.error != null) {
      setError("nickname", {
        message: result.error.message.includes("Unique")
          ? "暱稱已經被使用。"
          : "發生不明錯誤。",
      })
      return
    }
    history.push(`/dxi/p/${data.nickname}`)
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
    history.push("/")
  }

  if (user == null) {
    return <>請先登入。</>
  }
  return (
    <Container component="main" maxWidth="sm">
      <LabelContainer>
        {params.nickname != null ? (
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            component={RouterLink}
            to={`/dxi/p/${params.nickname}`}
          >
            回成績單
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            component={RouterLink}
            to="/"
          >
            回首頁
          </Button>
        )}
        <SpacedTypo variant="h6">
          {params.nickname == null ? "新增成績單" : "編輯成績單"}
        </SpacedTypo>
      </LabelContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFormControl fullWidth error={errors.nickname != null}>
          <InputLabel htmlFor="nickname">暱稱</InputLabel>
          <Controller
            render={({ field }) => <Input id="nickname" {...field} />}
            name="nickname"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: "請輸入暱稱。" },
              pattern: {
                value: /^[0-9a-z\-_]{2,20}$/,
                message: "暱稱格式不正確。",
              },
            }}
          />
          {errors.nickname == null ? (
            <FormHelperText>
              可包含小寫英數字與「-」、「_」，將成為成績單網址一部分。
            </FormHelperText>
          ) : (
            <FormHelperText>{errors.nickname.message}</FormHelperText>
          )}
        </StyledFormControl>
        <StyledFormControl fullWidth error={errors.private != null}>
          <FormLabel component="legend">隱私設定</FormLabel>
          <Controller
            name="private"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label={
                    <LabelContainer>
                      <PublicIcon /> 公開
                    </LabelContainer>
                  }
                />
                <FormHelperText>
                  <StyledList>
                    <li>
                      任何擁有成績單網址的人都能瀏覽。
                      <i>別人將也能用卡名或暱稱搜尋到你的成績單。</i>
                    </li>
                    <li>
                      <i>
                        同時會將你的成績與 Rating 加入全站排行中（敬請期待！）
                      </i>
                    </li>
                  </StyledList>
                </FormHelperText>
                <FormControlLabel
                  value="private"
                  control={<Radio />}
                  label={
                    <LabelContainer>
                      <LockIcon /> 私人
                    </LabelContainer>
                  }
                />
                <FormHelperText>
                  <StyledList>
                    <li>只有以你的帳號登入才能檢視這個成績單。</li>
                    <li>成績與 Rating 就只有你自己知道了 :)</li>
                  </StyledList>
                </FormHelperText>
              </RadioGroup>
            )}
          ></Controller>
          {errors.private != null ? (
            <FormHelperText>請選擇一個。</FormHelperText>
          ) : (
            ""
          )}
        </StyledFormControl>
        {params.nickname == null ? (
          <Button variant="contained" type="submit" color="primary">
            新增成績單
          </Button>
        ) : (
          <ActionsContainer>
            <Button variant="contained" type="submit" color="primary">
              編輯成績單
            </Button>
            <Button variant="contained" onClick={handleDeletePlayer}>
              刪除成績單
            </Button>
          </ActionsContainer>
        )}
      </form>
    </Container>
  )
}

export default PlayerForm
