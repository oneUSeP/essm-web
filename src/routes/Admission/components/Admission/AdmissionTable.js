import React, { Component } from 'react'
import Immutable from 'immutable'
import moment from 'moment'
import cx from 'classnames'
import SweetAlert from 'react-bootstrap-sweetalert'
import PropTypes from 'prop-types'
import AdmissionModal from './AdmissionModal'

class AdmissionTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      count: 30,
      delete: false,
      selectedRecord: null,
      openModal: false
    }
  }

  handlePaginationClick = (type) => {
    let { page, count } = this.state
    if (type === 'prev') {
      if (page === 1) {
        return
      }
      page -= 1
    } else {
      let { admissions } = this.props
      if (admissions) {
        var data = admissions.get('data')
      }
      if (data.length === 0) {
        return
      }
      page += 1
    }
    this.props.getAdmissions(page, count)
    this.setState({page})
  }

  handleClick = (data) => {
    this.setState({selectedRecord: data, openModal: true})
  }

  handleModalClose = () => {
    this.setState({selectedRecord: null, openModal: false})
  }

  render () {
    let { admissions, fetchingAdmissions } = this.props
    if (admissions) {
      var data = admissions.get('data')
    }
    return (
      <div className='w-full m-x-auto'>
        <AdmissionModal selectedRecord={this.state.selectedRecord} open={this.state.openModal} closeModal={e => { this.handleModalClose() }} {...this.props} />
        <div className='table-full'>
          <div className='table-responsive'>
            <table className='table' data-sort='table'>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Birthday</th>
                  <th>Gender</th>
                  <th>Status</th>
                  <th>Home Address</th>
                  <th>Alternate Address</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Academic Year Applied</th>
                  <th>(1) Course Pref Campus</th>
                  <th>(1) Course Pref Course</th>
                  <th>(1) Course Pref Major</th>
                  <th>(2) Course Pref Campus</th>
                  <th>(2) Course Pref Course</th>
                  <th>(2) Course Pref Major</th>
                  <th>(3) Course Pref Campus</th>
                  <th>(3) Course Pref Course</th>
                  <th>(3) Course Pref Major</th>
                  <th>Father/Guardian Name</th>
                  <th>Father's Occupation</th>
                  <th>Father's Annual Income</th>
                  <th>Mother/Guardian Name</th>
                  <th>Mother's Occupation</th>
                  <th>Mother's Annual Income</th>
                  <th>Emergency Name</th>
                  <th>Emergency Relationship</th>
                  <th>Emergency Address</th>
                  <th>Emergency Contact Number</th>
                  <th>Elementary School</th>
                  <th>Address</th>
                  <th>Year Graduated</th>
                  <th>Jr. High School</th>
                  <th>Address</th>
                  <th>Year Graduated</th>
                  <th>Senior High School</th>
                  <th>Address</th>
                  <th>Year Graduated</th>
                  <th>Senior High School Track</th>
                  <th>Senior High School Strand</th>
                  <th>Other Strand</th>
                  <th>Grade 9</th>
                  <th>Grade 10</th>
                  <th>Grade 11</th>
                  <th>Grade 12 (First Sem)</th>
                  <th>Testing Center</th>
                </tr>
              </thead>
              <tbody>
              {data && (data.map(admission => {
                return (
                  <tr key={admission.get('AppNo')}>
                    <td><a href='#' onClick={e => { this.handleClick(admission) }}>{admission.get('LastName')}, {admission.get('FirstName')} {admission.get('MiddleName')}</a></td>
                    <td>{moment(admission.get('DateOfBirth')).format('MM/DD/YYYY')}</td>
                    <td>{admission.get('Gender')}</td>
                    <td>{admission.get('CivilStatusID')}</td>
                    <td>{admission.get('Res_Barangay')}</td>
                    <td>{admission.get('Res_TownCity')}</td>
                    <td>{admission.get('Email')}</td>
                    <td>{admission.get('TelNo')}</td>
                    <td>{admission.get('TermID')}</td>
                    <td>{admission.get('Choice1_CampusID')}</td>
                    <td>{admission.get('Choice1_Course')}</td>
                    <td>{admission.get('Choice1_CourseMajor')}</td>
                    <td>{admission.get('Choice2_CampusID')}</td>
                    <td>{admission.get('Choice2_Course')}</td>
                    <td>{admission.get('Choice2_CourseMajor')}</td>
                    <td>{admission.get('Choice3_CampusID')}</td>
                    <td>{admission.get('Choice3_Course')}</td>
                    <td>{admission.get('Choice3_CourseMajor')}</td>
                    <td>{admission.get('Father')}</td>
                    <td>{admission.get('Father_Occupation')}</td>
                    <td>{admission.get('Father_Income')}</td>
                    <td>{admission.get('Mother')}</td>
                    <td>{admission.get('Mother_Occupation')}</td>
                    <td>{admission.get('Mother_Income')}</td>
                    <td>{admission.get('Emergency_Contact')}</td>
                    <td>{admission.get('emergency_relation')}</td>
                    <td>{admission.get('Emergency_Address')}</td>
                    <td>{admission.get('Emergency_TelNo')}</td>
                    <td>{admission.get('Elem_School')}</td>
                    <td>{admission.get('Elem_Address')}</td>
                    <td>{admission.get('Elem_InclDates')}</td>
                    <td>{admission.get('HS_School')}</td>
                    <td>{admission.get('HS_Address')}</td>
                    <td>{admission.get('HS_InclDates')}</td>
                    <td>{admission.get('College_School')}</td>
                    <td>{admission.get('College_Address')}</td>
                    <td>{admission.get('College_InclDates')}</td>
                    <td>{admission.get('Track_ID')}</td>
                    <td>{admission.get('Strand_ID')}</td>
                    <td>{admission.get('Other_Strand')}</td>
                    <td>{admission.get('Grade_9')}</td>
                    <td>{admission.get('Grade_10')}</td>
                    <td>{admission.get('Grade_11')}</td>
                    <td>{admission.get('Grade_12')}</td>
                    <td>{admission.get('ES_Test_Center')}</td>
                    {/* <td>{admission.get('roomTypes') && JSON.parse(admission.get('roomTypes')).map(room => {
                      return (<button type='button' className='btn btn-xs btn-pill btn-info'>{room.name}</button>)
                    })}</td>
                    <td>
                      <div className='btn-group'>
                        <button type='button' className='btn btn-primary-outline' onClick={e => (this.setState({selectedBranch: admission, open: true}))}>
                          <span className='icon icon-pencil' />
                        </button>
                        <button type='button' className='btn btn-primary-outline' onClick={e => { this.handleDelete(admission.get('code')) }}>
                          <span className='icon icon-erase' />
                        </button>
                      </div></td> */}
                  </tr>
                )
              }))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='text-center'>
          <ul className='pagination'>
            <li>
              <a aria-label='Previous' onClick={e => this.handlePaginationClick('prev')} style={{display: cx({'none': this.state.page < 2 || fetchingAdmissions})}} >
                <span aria-hidden='true'>&laquo;</span>
              </a>
            </li>
            <li>
              <a aria-label='Next' onClick={e => this.handlePaginationClick('next')} style={{display: cx({'none': (data && data.size === 0) || fetchingAdmissions})}} >
                <span aria-hidden='true'>&raquo;</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

AdmissionTable.propTypes = {

}

export default AdmissionTable
