import React, { FunctionComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, List, ListItem, Grid } from '@material-ui/core'
import { Route, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import TimelineDetail from './TimelineDetail'
import { getTimeline } from '../actions'
import { RootState } from '../../reducers'
import { Link as RouterLink } from 'react-router-dom'

const TimelineComponenet: FunctionComponent = () => {
  const params = useParams<{ nickname: string }>()
  const timeline = useSelector((state: RootState) => state.laundry.timeline)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTimeline.request(params.nickname))
  }, [params.nickname])
  
  return (
    <Grid container={true}>
      <Grid item={true} sm={2}>
        <Button component={RouterLink} to={encodeURI(`/mai/${params.nickname}`)}>&lt; Back</Button>
        <List>
          {(timeline) ? timeline.map(time => (
            <ListItem button={true} key={time} component={RouterLink} to={encodeURI(`/mai/${params.nickname}/timeline/${time}`)}>{format(new Date(time), 'PP', { locale: zhTW })}</ListItem>
          )) : <></>}
        </List>
      </Grid>
      <Grid item={true} sm={10}>
        <Route path='/mai/:nickname/timeline/:time' component={TimelineDetail} />
      </Grid>
    </Grid>
  )
}
export default TimelineComponenet
