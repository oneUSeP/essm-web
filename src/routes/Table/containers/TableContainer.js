import { connect } from 'react-redux'

import Table from '../components/Table'

const mapActionCreators = {

}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapActionCreators)(Table)

