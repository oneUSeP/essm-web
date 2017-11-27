import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextFieldGroup from 'components/common/TextFieldGroup'
import validateInput from 'utils/validators/admission'
import SweetAlert from 'react-bootstrap-sweetalert'
import {ModalBody,
  ModalFooter,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton } from 'react-bootstrap'

class AdmissionForm extends Component {
  state = {
    appNo: '',
    lastName: '',
    firstName: '',
    middleName: '',
    dateOfBirth: '',
    gender: '',
    civilStatusId: '',
    resBarangay: '',
    resTownCity: '',
    email: '',
    telNo: '',
    termId: '',
    choice1CampusId: '',
    choice1CampusCourse: '',
    choice1CampusCourseMajor: '',
    choice2CampusId: '',
    choice2CampusCourse: '',
    choice2CampusCourseMajor: '',
    choice3CampusId: '',
    choice3CampusCourse: '',
    choice3CampusCourseMajor: '',
    father: '',
    fatherOccupation: '',
    fatherIncome: '',
    mother: '',
    motherOccupation: '',
    motherIncome: '',
    emergencyContact: '',
    emergencyRelation: '',
    emergencyAddress: '',
    emergencyTelNo: '',
    elemSchool: '',
    elemAddres: '',
    elemInclDates: '',
    hsSchool: '',
    hsAddres: '',
    hsInclDates: '',
    collegeSchool: '',
    collegeAddress: '',
    collegeInclDates: '',
    trackId: '',
    strandId: '',
    otherStrand: '',
    grade9: '',
    grade10: '',
    grade11: '',
    grade12: '',
    testingCenter: '',
    active: '0',
    errors: [],
    delete: false,
    isLoading: false
  }

  componentWillReceiveProps (nextProps) {
    let { selectedTrack } = nextProps

    if (selectedTrack && selectedTrack != null) {
      this.setState({
        id: '' + selectedTrack.get('track_id') || '',
        trackName: selectedTrack.get('track_name') || '',
        active: '' + selectedTrack.get('is_active') || ''
      })
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state)

    if (!isValid) {
      this.setState({ errors, isLoading: false })
    }

    return isValid
  }

  onSubmit = (e) => {
    e.preventDefault()
    let data = this.state
    if (this.isValid(data)) {
      this.setState({ id: '', trackName: '',
        active: '0',
        errors: {}, isLoading: true })
      if (this.props.selectedRecord) {
        this.props.updateAdmission(data)
      } else {
        // this.props.createTrack(data)
      }
    }
  }

  handleDelete = (id) => {
    this.setState({delete: (<SweetAlert
      warning
      showCancel
      confirmBtnText='Yes, delete it!'
      confirmBtnBsStyle='danger'
      cancelBtnBsStyle='default'
      title='Are you sure?'
      onConfirm={this.handleDeleteAction}
      onCancel={e => { this.setState({delete: null}) }}
    >
    You will not be able to recover this record!
    </SweetAlert>)})
  }

  handleDeleteAction = () => {
    this.setState({delete: null})
    this.props.deleteTrack(this.state.id)
  }

  render () {
    return (
      <form className='form-access' >
        {this.state.delete}
        <ModalBody>
          <div className='row text-center m-t-md'>
            <div className='col-sm-6 m-b-md'>
              <div className='w-lg m-x-auto'>
                <strong className='text-muted'>PERSONAL INFORMATION</strong>
                <div className='form-group row'>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.lastName}
                    field='lastName'
                    placeholder='Last Name'
                    error={this.state.errors.lastName}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.firstName}
                    field='firstName'
                    placeholder='First Name'
                    error={this.state.errors.firstName}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.middleName}
                    field='middleName'
                    placeholder='Middle Name'
                    error={this.state.errors.middleName}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.dateOfBirth}
                    field='dateOfBirth'
                    placeholder='Birthday'
                    error={this.state.errors.dateOfBirth}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.gender}
                    field='gender'
                    placeholder='Gender'
                    error={this.state.errors.gender}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.civilStatusId}
                    field='civilStatusId'
                    placeholder='Status'
                    error={this.state.errors.civilStatusId}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.resBarangay}
                    field='resBarangay'
                    placeholder='House Address'
                    error={this.state.errors.resBarangay}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.resTownCity}
                    field='resTownCity'
                    placeholder='Alternate Address'
                    error={this.state.errors.resTownCity}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.email}
                    field='email'
                    placeholder='Email'
                    error={this.state.errors.email}
                />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.telNo}
                    field='telNo'
                    placeholder='Contact Number'
                    error={this.state.errors.telNo}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.termId}
                    field='termId'
                    placeholder='Academic Year Applied'
                    error={this.state.errors.termId}
                />
                </div>
              </div>
            </div>
            <div className='col-sm-6 m-b-md'>
              <div className='w-lg m-x-auto'>
                <strong className='text-muted'>COURSE PREFERENCES</strong>
                <div className='form-group row'>
                  <strong className='text-muted'>PREFERENCE 1</strong>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.choice1CampusId}
                    field='choice1CampusId'
                    placeholder='Campus'
                    error={this.state.errors.choice1CampusId}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.choice1CampusCourse}
                    field='choice1CampusCourse'
                    placeholder='Course'
                    error={this.state.errors.choice1CampusCourse}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.choice1CampusCourseMajor}
                    field='choice1CampusCourseMajor'
                    placeholder='Major'
                    error={this.state.errors.choice1CampusCourseMajor}
                  />
                </div>
                <div className='form-group row'>
                  <strong className='text-muted'>PREFERENCE 2</strong>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.choice2CampusId}
                    field='choice2CampusId'
                    placeholder='Campus'
                    error={this.state.errors.choice2CampusId}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.choice2CampusCourse}
                    field='choice2CampusCourse'
                    placeholder='Course'
                    error={this.state.errors.choice2CampusCourse}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.choice2CampusCourseMajor}
                    field='choice2CampusCourseMajor'
                    placeholder='Major'
                    error={this.state.errors.choice2CampusCourseMajor}
                  />
                </div>
                <div className='form-group row'>
                  <strong className='text-muted'>PREFERENCE 2</strong>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.choice3CampusId}
                    field='choice3CampusId'
                    placeholder='Campus'
                    error={this.state.errors.choice3CampusId}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.choice3CampusCourse}
                    field='choice3CampusCourse'
                    placeholder='Course'
                    error={this.state.errors.choice3CampusCourse}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.choice3CampusCourseMajor}
                    field='choice3CampusCourseMajor'
                    placeholder='Major'
                    error={this.state.errors.choice3CampusCourseMajor}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row text-center m-t-md'>
            <div className='col-sm-6 m-b-md'>
              <div className='w-lg m-x-auto'>
                <strong className='text-muted'>FAMILY BACKGROUND</strong>
                <div className='form-group row'>
                  <strong className='text-muted'>FATHER</strong>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.father}
                    field='father'
                    placeholder='Father/Guardian Name'
                    error={this.state.errors.father}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.fatherOccupation}
                    field='fatherOccupation'
                    placeholder='Father/Guardian Occupation'
                    error={this.state.errors.fatherOccupation}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.fatherIncome}
                    field='fatherIncome'
                    placeholder='Father/Guardian Income'
                    error={this.state.errors.fatherIncome}
                  />
                </div>
                <div className='form-group row'>
                  <strong className='text-muted'>MOTHER</strong>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.mother}
                    field='mother'
                    placeholder='Mother`s Name'
                    error={this.state.errors.mother}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.motherOccupation}
                    field='motherOccupation'
                    placeholder='Mother`s Occupation'
                    error={this.state.errors.motherOccupation}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.motherIncome}
                    field='motherIncome'
                    placeholder='Mother`s Income'
                    error={this.state.errors.motherIncome}
                  />
                </div>
              </div>
            </div>
            <div className='col-sm-6 m-b-md'>
              <div className='w-lg m-x-auto'>
                <strong className='text-muted'>PERSON TO CONTACT IN CASE OF EMERGENCY</strong>
                <div className='form-group row'>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.emergencyContact}
                    field='emergencyContact'
                    placeholder='Name'
                    error={this.state.errors.emergencyContact}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.emergencyRelation}
                    field='emergencyRelation'
                    placeholder='Emergency Relation'
                    error={this.state.errors.emergencyRelation}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.emergencyAddress}
                    field='emergencyAddress'
                    placeholder='Address'
                    error={this.state.errors.emergencyAddress}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.emergencyContact}
                    field='emergencyContact'
                    placeholder='Contact Number'
                    error={this.state.errors.emergencyContact}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row text-center m-t-md'>
            <div className='col-sm-6 m-b-md'>
              <div className='w-lg m-x-auto'>
                <strong className='text-muted'>EDUCATION BACKGROUND</strong>
                <div className='form-group row'>
                  <strong className='text-muted'>ELEMENTARY</strong>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.elemSchool}
                    field='elemSchool'
                    placeholder='Elementary School'
                    error={this.state.errors.elemSchool}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.elemAddress}
                    field='elemAddress'
                    placeholder='Adress'
                    error={this.state.errors.elemAddress}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.elemInclDates}
                    field='elemInclDates'
                    placeholder='Year Graduated'
                    error={this.state.errors.elemInclDates}
                  />
                </div>
                <div className='form-group row'>
                  <strong className='text-muted'>JR. HIGH</strong>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.hsSchool}
                    field='hsSchool'
                    placeholder='Jr. High School'
                    error={this.state.errors.hsSchool}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.hsAddress}
                    field='hsAddress'
                    placeholder='Adress'
                    error={this.state.errors.hsAddress}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.hsInclDates}
                    field='hsInclDates'
                    placeholder='Year Graduated'
                    error={this.state.errors.hsInclDates}
                  />
                </div>
                <div className='form-group row'>
                  <strong className='text-muted'>SR. HIGH</strong>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.collegeSchool}
                    field='collegeSchool'
                    placeholder='Sr. High School'
                    error={this.state.errors.collegeSchool}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.collegeAddress}
                    field='collegeAddress'
                    placeholder='Year Graduated'
                    error={this.state.errors.collegeAddress}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.collegeInclDates}
                    field='collegeInclDates'
                    placeholder='Address'
                    error={this.state.errors.collegeInclDates}
                  />
                </div>
              </div>
            </div>
            <div className='col-sm-6 m-b-md'>
              <div className='w-lg m-x-auto'>
                <strong className='text-muted'>SCHOLASTIC BACKGROUND</strong>
                <div className='form-group row'>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.trackId}
                    field='trackId'
                    placeholder='Senior High School Track'
                    error={this.state.errors.trackId}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.strandId}
                    field='strandId'
                    placeholder='Senior High School Strand	'
                    error={this.state.errors.strandId}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.otherStrand}
                    field='otherStrand'
                    placeholder='Other Strand'
                    error={this.state.errors.otherStrand}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.grade9}
                    field='grade9'
                    placeholder='Grade 9'
                    error={this.state.errors.grade9}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.grade10}
                    field='grade10'
                    placeholder='Grade 10'
                    error={this.state.errors.grade10}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.grade11}
                    field='grade11'
                    placeholder='Grade 11'
                    error={this.state.errors.grade11}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.grade12}
                    field='grade12'
                    placeholder='Grade 12'
                    error={this.state.errors.grade12}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.testingCenter}
                    field='testingCenter'
                    placeholder='Testing Center'
                    error={this.state.errors.testingCenter}
                  />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button type='button' className='btn btn-md btn-pill btn-primary' onClick={this.onSubmit}>Save</button>
        </ModalFooter>
      </form>
    )
  }
}

AdmissionForm.propTypes = {

}

export default AdmissionForm
