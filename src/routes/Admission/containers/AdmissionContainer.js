import { connect } from 'react-redux'

import Admission from '../components/Admission'
import { getAdmissions, createAdmission, updateAdmission, deleteAdmission } from 'store/modules/admission'

const mapActionCreators = {
  getAdmissions,
  createAdmission,
  updateAdmission,
  deleteAdmission
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  admissions: state.admission.get('admissions'),
  creatingAdmissionSuccess: state.admission.get('creatingAdmissionSuccess'),
  deletingAdmissionSuccess: state.admission.get('deletingAdmissionSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(Admission)

