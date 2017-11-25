import React, { Component } from 'react'
import Immutable from 'immutable'
import moment from 'moment'
import cx from 'classnames'
import SweetAlert from 'react-bootstrap-sweetalert'
import PropTypes from 'prop-types'

class AdmissionTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      count: 15,
      delete: false,
      alert: false,
      open: false
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

  render () {
    let { admissions, fetchingAdmissions } = this.props
    if (admissions) {
      var data = admissions.get('data')
    }
    return (
      <div className='w-full m-x-auto'>
        <div className='table-full'>
          <div className='table-responsive'>
            <table className='table' data-sort='table'>
              <thead>
                <tr>
                  <th>AppNo</th>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Birthday</th>
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
