import React, { Component } from 'react'
import Immutable from 'immutable'
import moment from 'moment'
import cx from 'classnames'
import SweetAlert from 'react-bootstrap-sweetalert'
import PropTypes from 'prop-types'
import AdmissionModal from './AdmissionModal'
import getData from 'utils/pagination'
import renderHTML from 'react-render-html'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class AdmissionTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: props.page || 1,
      count: props.count || 9999,
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
    this.props.getAdmissions(page, count, Array.from(this.props.filters))
    this.setState({page})
    this.props.updatePage(page)
  }

  handleClick = (data) => {
    console.log(data)
    this.setState({selectedRecord: data, openModal: true})
  }

  handleModalClose = () => {
    this.setState({selectedRecord: null, openModal: false})
  }

  renderNumberedPages = (page, lastPage) => {
    let prev5 = page - 5

    if (page && lastPage) {
      var list = ''
      for (let i = page; i <= lastPage; i++) {
        if (i == page) {
          list += `<li className=${i == page ? 'active' : ''}><a href=''>${i}</a></li>`
        }
      }
      return renderHTML(list)
    }
  }

  render () {
    let { admissions, fetchingAdmissions, ayterms,
      campuses, civilstatuses, incomebrackets, strands,
      testingcenters, tracks, interviews, scheds } = this.props
    if (admissions) {
      var page = admissions.get('page')
      var lastPage = admissions.get('lastPage')
    }
    var admissionsData = getData(admissions)
    var civilStatusesData = getData(civilstatuses)
    var incomeBracketsData = getData(incomebrackets)
    var aYTermsData = getData(ayterms)
    var strandsData = getData(strands)
    var testingCentersData = getData(testingcenters)
    var tracksData = getData(tracks)
    var campusesData = getData(campuses)
    var interviewsData = getData(interviews)
    var testingSchedsData = getData(scheds)

    const data = [{
      name: 'Tanner Linsley',
      age: 26,
      friend: {
        name: 'Jason Maurer',
        age: 23
      }
    }]

    const columns = [{
      Header: 'Full Name',
      accessor: 'fullName',
      Cell: props => <a href='#' onClick={e => { this.handleClick(props.original.selectedRecord) }}>{props.value}</a>
    }, {
      Header: 'Schedule',
      accessor: 'schedule'
    }, {
      Header: 'Requirements',
      accessor: 'requirements',
      Cell: props => <div className='text-center'><small className={cx('label', { 'label-success': props.value == 'Complete' }, { 'label-danger': props.value == 'Incomplete' })} >{props.value}</small></div>
    }, {
      Header: 'Email',
      accessor: 'email'
    }, {
      Header: 'Contact Number',
      accessor: 'contactNumber'
    }, {
      Header: 'Average Grade',
      accessor: 'averageGrade',
      Cell: props => <div className='text-center'><small className={cx('label', { 'label-success': props.value >= 85 }, { 'label-danger': props.value < 85 })} >{props.value}</small></div>
    }, {
      Header: 'Academic Year Applied',
      accessor: 'academicYearApplied'
    }, {
      Header: 'Testing Center',
      accessor: 'testingCenter'
    }, {
      Header: 'Registration Date',
      accessor: 'registrationDate'
    }, {
      Header: 'Updated At',
      accessor: 'updatedAt'
    }]
    let dataSource = []

    admissionsData && (admissionsData.map(admission => {
      dataSource.push({
        fullName: `${admission.get('LastName')}, ${admission.get('FirstName')} ${admission.get('MiddleName')}`,
        schedule: admission.get('TestingSchedID') && admission.get('TestingSchedID') != 0 ? testingSchedsData && testingSchedsData.map(sched => {
          if (admission.get('TestingSchedID') == sched.get('IndexID')) {
            return `${sched.get('BatchName')}  | ${moment.utc(sched.get('TestingDate')).format('MMMM Do YYYY')}  | ${moment.utc(sched.get('TimeFrom')).format('h:mm A')} - ${moment.utc(sched.get('TimeTo')).format('h:mm A')} `
          }
        }) : 'Not yet',
        requirements: admission.get('is_reqcomplete') && admission.get('is_reqcomplete') == true ? 'Complete' : 'Incomplete',
        email: admission.get('Email'),
        contactNumber: admission.get('TelNo'),
        averageGrade: ((admission.get('Grade_9') + admission.get('Grade_10') + admission.get('Grade_11') + admission.get('Grade_12')) / 4 > 99 ? 'Invalid' : (admission.get('Grade_9') + admission.get('Grade_10') + admission.get('Grade_11') + admission.get('Grade_12')) / 4),
        academicYearApplied: aYTermsData && aYTermsData.map((term, i) => {
          return term.get('TermID') === admission.get('TermID') ? term.get('AcademicYear') + ' - ' + term.get('SchoolTerm') : null
        }),
        testingCenter: testingCentersData && testingCentersData.map((center, i) => {
          return center.get('TC_ID') === admission.get('ES_Test_Center') ? center.get('TC_Name') : null
        }),
        registrationDate: moment.utc(admission.get('AppDate')).format('MMM. D, YYYY'),
        updatedAt: admission.get('updated_at') ? moment.utc(admission.get('updated_at')).format('MMM. D, YYYY hh:mm:ss A') : null,
        selectedRecord: admission
      })
    }))

    return (
      <div className='w-full m-x-auto'>
        <AdmissionModal testingSchedsData={testingSchedsData} campusesData={campusesData} civilStatusesData={civilStatusesData} incomeBracketsData={incomeBracketsData} aYTermsData={aYTermsData} strandsData={strandsData} testingCentersData={testingCentersData} tracksData={tracksData} selectedRecord={this.state.selectedRecord} open={this.state.openModal} closeModal={e => { this.handleModalClose() }} {...this.props} />
        <ReactTable
          data={dataSource}
          columns={columns}
            />
      </div>
    )
  }
}

AdmissionTable.propTypes = {

}

export default AdmissionTable
