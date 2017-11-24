import { connect } from 'react-redux'

import Table from '../components/Table'
import { getTracks } from 'store/modules/track'

const mapActionCreators = {
  getTracks
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  tracks: state.track.get('tracks')
})

export default connect(mapStateToProps, mapActionCreators)(Table)

