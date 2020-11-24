import { Card, CardContent, Button, Typography, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@material-ui/core'
import React, { FunctionComponent, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import { useQuery } from 'urql'
import { DxIntlRecordWithScoresDocument, DxIntlSongsDocument } from '../generated/graphql'
import Record from './Record'
import HistoryIcon from '@material-ui/icons/History'
import styled from '../styled'
import { formatDistance } from 'date-fns'
import { zhTW } from 'date-fns/locale'

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`

const SizedSelect = styled(Select)`
  width: 12em;
`

const Player: FunctionComponent = () => {
  const [groupBy, setGroupBy] = useState<'category' | 'version' | 'level'>('category')
  const [orderBy, setOrderBy] = useState<
  'default' | 'score_asc' | 'score_desc' | 'combo_asc' | 'combo_desc' | 'sync_asc' | 'sync_desc'
  >('default')
  const params = useParams<{ nickname: string }>()
  const [recordResult, refetchRecord] = useQuery({
    query: DxIntlRecordWithScoresDocument,
    variables: { ...params }
  })
  const [songsResult] = useQuery({ query: DxIntlSongsDocument })

  const handleChangeGroupBy = (event: React.ChangeEvent<{value: unknown}>): void => {
    const { value } = event.target
    if (value !== 'category' && value !== 'version' && value !== 'level') {
      return
    }
    setGroupBy(value)
  }
  const handleChangeOrderBy = (event: React.ChangeEvent<{value: unknown}>): void => {
    const { value } = event.target
    switch (value) {
      case 'default':
      case 'score_asc':
      case 'score_desc':
      case 'combo_asc':
      case 'combo_desc':
      case 'sync_asc':
      case 'sync_desc':
        setOrderBy(value)
        break
      default:
    }
  }

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
    <Helmet>
      <title>{record.card_name} - maimai DX 成績單 - Otohime</title>
    </Helmet>
    <Card>
      <CardContent>
        <Container>
          <div>
            <Record record={record} />
            <Typography variant='body2'>
              {formatDistance(new Date(record.start), new Date(), { locale: zhTW })}前更新
            </Typography>
          </div>
          <div>
            <p>
              <Button component={RouterLink} to={`/dxi/p/${params.nickname}/history`} variant='contained' startIcon={<HistoryIcon />}>歷史紀錄</Button>
            </p>
            <p>
              <FormControl>
                <InputLabel>頁籤</InputLabel>
                <SizedSelect value={groupBy} onChange={handleChangeGroupBy}>
                  <MenuItem value='category'>分類</MenuItem>
                  <MenuItem value='version'>版本</MenuItem>
                  <MenuItem value='level'>樂曲等級</MenuItem>
                </SizedSelect>
              </FormControl>
              <Tooltip title='同時顯示多難易度時，請點擊難易度標題以其排序。'>
                <FormControl>
                  <InputLabel>排序</InputLabel>
                  <SizedSelect value={orderBy} onChange={handleChangeOrderBy}>
                    <MenuItem value='default'>預設順序</MenuItem>
                    <MenuItem value='score_asc'>成績 (低→高)</MenuItem>
                    <MenuItem value='score_desc'>成績 (高→低)</MenuItem>
                    <MenuItem value='combo_asc'>Combo 標記 (無→AP+)</MenuItem>
                    <MenuItem value='combo_desc'>Combo 標記 (AP+→無)</MenuItem>
                    <MenuItem value='sync_asc'>Sync 標記 (無→FDX+)</MenuItem>
                    <MenuItem value='sync_desc'>Sync 標記 (FDX+→無)</MenuItem>
                  </SizedSelect>
                </FormControl>
              </Tooltip>
            </p>
          </div>
        </Container>
      </CardContent>
    </Card>
  </>
}

export default Player
