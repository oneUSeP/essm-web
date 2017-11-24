import { connect } from 'react-redux'

import Table from '../components/Table'
import { getTracks, createTrack, updateTrack, deleteTrack } from 'store/modules/track'

const mapActionCreators = {
  getTracks,
  createTrack,
  updateTrack,
  deleteTrack
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  tracks: state.track.get('tracks'),
  creatingTrackSuccess: state.track.get('creatingTrackSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(Table)

