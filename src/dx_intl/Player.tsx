import React, { FunctionComponent } from 'react'
import { useParams } from 'react-router'
import { useQuery } from 'urql'
import { DxIntlRecordWithScoresDocument, DxIntlSongsDocument } from '../generated/graphql'
import Record from './Record'

const Player: FunctionComponent = () => {
  const params = useParams<{ nickname: string }>()
  const [recordResult, refetchRecord] = useQuery({
    query: DxIntlRecordWithScoresDocument,
    variables: { ...params }
  })
  const [songsResult] = useQuery({ query: DxIntlSongsDocument })

  if (recordResult.error != null || recordResult.data == null ||
    songsResult.data == null || songsResult.data == null) {
    return <></>
  }
  if (recordResult.data.dx_intl_records.length === 0) {
    return <></>
  }
  const songs = songsResult.data.dx_intl_songs
  const record = recordResult.data.dx_intl_records[0]
  const scores = recordResult.data.dx_intl_scores
  return <>
    <Record record={record} />
    {JSON.stringify(scores)}
  </>
}

export default Player
