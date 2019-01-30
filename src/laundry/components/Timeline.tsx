import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { Button, Grid, Menu } from 'semantic-ui-react'
import moment from 'moment'
import TimelineDetail from './TimelineDetail'
import { getTimeline } from '../actions'

class Timeline extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ nickname: PropTypes.string }),
      url: PropTypes.string
    }).isRequired,
    timeline: PropTypes.arrayOf(PropTypes.string),
    dGetTimeline: PropTypes.func.isRequired
  }

  static defaultProps = {
    timeline: []
  }

  componentDidMount () {
    const { match, dGetTimeline } = this.props
    dGetTimeline(match.params.nickname)
  }

  componentDidUpdate (prevProps) {
    const { match, dGetTimeline } = this.props
    if (prevProps.match !== match) {
      dGetTimeline(match.params.nickname)
    }
  }

  render () {
    const { match, timeline } = this.props
    moment.locale('zh-TW')
    return (
      <div>
        <Button as={Link} to={encodeURI(`/mai/${match.params.nickname}`)}>&lt; Back</Button>
        <Grid columns={2} stackable={true}>
          <Grid.Column width={4}>
            <Menu vertical={true}>
              {timeline.map(time => (
                <Menu.Item key={time} as={Link} to={encodeURI(`/mai/${match.params.nickname}/timeline/${time}`)}>{(moment(time).format('LLL'))}</Menu.Item>
              ))}
            </Menu>
          </Grid.Column>
          <Grid.Column width={12}>
            <Route path='/mai/:nickname/timeline/:time' component={TimelineDetail} />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  timeline: state.laundry.timeline
})

const mapDispatchToProps = dispatch => ({
  dGetTimeline: (nickname) => {
    dispatch(getTimeline.request(nickname))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
