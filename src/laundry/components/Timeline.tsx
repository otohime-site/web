import React, { FunctionComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useRouter from 'use-react-router'
import { Link, Route } from 'react-router-dom'
import { Button, Grid, Menu } from 'semantic-ui-react'
import moment from 'moment'
import TimelineDetail from './TimelineDetail'
import { getTimeline } from '../actions'
import { RootState } from '../../reducers'

const TimelineComponenet: FunctionComponent = () => {
  const { match } = useRouter<{ nickname: string }>()
  const timeline = useSelector((state: RootState) => state.laundry.timeline)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTimeline.request(match.params.nickname))
  }, [match.params.nickname])
  moment.locale('zh-TW')
  return (
    <div>
      <Button as={Link} to={encodeURI(`/mai/${match.params.nickname}`)}>&lt; Back</Button>
      <Grid columns={2} stackable={true}>
        <Grid.Column width={4}>
          <Menu vertical={true}>
            {/* tslint:disable-next-line:jsx-no-multiline-js*/}
            {(timeline) ? timeline.map(time => (
              <Menu.Item key={time} as={Link} to={encodeURI(`/mai/${match.params.nickname}/timeline/${time}`)}>{(moment(time).format('LLL'))}</Menu.Item>
            )) : <></>}
          </Menu>
        </Grid.Column>
        <Grid.Column width={12}>
          <Route path='/mai/:nickname/timeline/:time' component={TimelineDetail} />
        </Grid.Column>
      </Grid>
    </div>
  )
}
export default TimelineComponenet
