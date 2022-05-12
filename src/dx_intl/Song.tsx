import { Dialog, Skeleton, Slide } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import { styled } from "@mui/system"
import { forwardRef, FunctionComponent, ReactElement, Ref } from "react"
import { useNavigate, useParams } from "react-router"
import { useQuery } from "urql"
import { DxIntlSongsByIdDocument } from "../generated/graphql"

const Transition = forwardRef(
  (props: TransitionProps & { children: ReactElement }, ref: Ref<unknown>) => (
    <Slide direction="up" ref={ref} {...props} />
  )
)

const StyledDialog = styled(Dialog)`
  top: 15%;
  bottom: 0;
`

const Song: FunctionComponent = () => {
  const params = useParams<"songId">()
  const songId = params.songId ?? ""
  const navigate = useNavigate()
  const [songsResult] = useQuery({
    query: DxIntlSongsByIdDocument,
    variables: { idLike: `${songId}%` },
  })
  const song = songsResult.data?.dx_intl_songs[0]

  return (
    <StyledDialog
      fullScreen
      open={true}
      onClose={() => navigate("..")}
      TransitionComponent={Transition}
    >
      {song == null ? <Skeleton /> : <div>{song?.title ?? ""}</div>}
    </StyledDialog>
  )
}

export default Song
