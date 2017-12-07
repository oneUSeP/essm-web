import React, { Component } from 'react'
import Immutable from 'immutable'
import moment from 'moment-timezone'
import cx from 'classnames'
import SweetAlert from 'react-bootstrap-sweetalert'
import PropTypes from 'prop-types'
import AdmissionModal from './AdmissionModal'
import getData from 'utils/pagination'

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
    let { admissions, fetchingAdmissions, ayterms,
      campuses, civilstatuses, incomebrackets, strands,
      testingcenters, tracks, interviews } = this.props

    var admissionsData = getData(admissions)
    var civilStatusesData = getData(civilstatuses)
    var incomeBracketsData = getData(incomebrackets)
    var aYTermsData = getData(ayterms)
    var strandsData = getData(strands)
    var testingCentersData = getData(testingcenters)
    var tracksData = getData(tracks)
    var campusesData = getData(campuses)
    var interviewsData = getData(interviews)

    return (
      <div className='w-full m-x-auto'>
        <AdmissionModal campusesData={campusesData} civilStatusesData={civilStatusesData} incomeBracketsData={incomeBracketsData} aYTermsData={aYTermsData} strandsData={strandsData} testingCentersData={testingCentersData} tracksData={tracksData} selectedRecord={this.state.selectedRecord} open={this.state.openModal} closeModal={e => { this.handleModalClose() }} {...this.props} />
        <div className='table-full'>
          <div className='table-responsive'>
            <table className='table' data-sort='table'>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Schedule</th>
                  <th>Requirements</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Academic Year Applied</th>
                  <th>Testing Center</th>
                  <th>Registration Date</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
              {admissionsData && (admissionsData.map(admission => {
                return (
                  <tr key={admission.get('AppNo')}>
                    <td><a href='#' onClick={e => { this.handleClick(admission) }}>{admission.get('LastName')}, {admission.get('FirstName')} {admission.get('MiddleName')}</a></td>
                    <td>{interviewsData && interviewsData.map((sched, i) => {
                      return sched.get('AppNo') === admission.get('AppNo') ? moment(admission.get('InterviewDate')).tz('Asia/Manila').format('MMM. D, YYYY') : null
                    })}</td>
                    <td>{admission.get('is_reqcomplete') && admission.get('is_reqcomplete') == true ? <button type='button' className='btn btn-xs btn-pill btn-success'>Complete</button> : <button type='button' className='btn btn-xs btn-pill btn-default'>Incomplete</button>}</td>
                    <td>{admission.get('Email')}</td>
                    <td>{admission.get('TelNo')}</td>
                    <td>{aYTermsData && aYTermsData.map((term, i) => {
                      return term.get('TermID') === admission.get('TermID') ? term.get('AcademicYear') + ' - ' + term.get('SchoolTerm') : null
                    })}</td>
                    <td>{testingCentersData && testingCentersData.map((center, i) => {
                      return center.get('TC_ID') === admission.get('ES_Test_Center') ? center.get('TC_Name') : null
                    })}</td>
                    <td>{moment(admission.get('AppDate')).tz('Asia/Manila').format('MMM. D, YYYY')}</td>
                    <td>{admission.get('updated_at') ? moment(admission.get('updated_at')).tz('Asia/Manila').format('MMM. D, YYYY hh:mm:ss A') : null}</td>
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
              <a aria-label='Previous' onClick={e => this.handlePaginationClick('prev')} style={{display: cx({'none': this.state.page < 2 || fetchingAdmissions || this.props.isSearch})}} >
                <span aria-hidden='true'>&laquo;</span>
              </a>
            </li>
            <li>
              <a aria-label='Next' onClick={e => this.handlePaginationClick('next')} style={{display: cx({'none': (admissionsData && admissionsData.size === 0) || fetchingAdmissions || this.props.isSearch})}} >
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
