import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SweetAlert from 'react-bootstrap-sweetalert'
import TextFieldGroup from 'components/common/TextFieldGroup'
import _ from 'lodash'
const { List } = require('immutable')
import AdmissionTable from './AdmissionTable'

class Admission extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      alert: null,
      search: '',
      errors: [],
      page: 1,
      count: 99,
      filterReq: '',
      filterUpd: '',
      filterTelNo: '',
      filterEmail: '',
      filterFirstName: '',
      filterLastName: '',
      isSearch: false
    }
  }

  componentWillMount () {
    let { page, count } = this.state
    this.props.getAdmissions(page, count)
    this.props.getAyTerms(page, 999)
    this.props.getCampuses(page, count)
    this.props.getCivilStatuses(page, count)
    this.props.getIncomeBrackets(page, count)
    this.props.getStrands(page, count)
    this.props.getTracks(page, count)
    this.props.getTestingCenters(page, count)
    this.props.getInterviews(page, 9999)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.creatingAdmissionSuccess) {
      let {page, count} = this.state
      this.setState({
        updateSuccess: (<SweetAlert success title='Success!' onConfirm={e => { this.setState({updateSuccess: null}) }}>
        Record updated.
        </SweetAlert>)
      })
      this.props.getAdmissions(page, count)
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    let {keyword, filterReq, filterUpd, filterEmail, filterFirstName, filterLastName, filterTelNo} = this.state
    let filter = []
    if (filterReq) {
      filter.push('is_reqcomplete')
    }
    if (filterUpd) {
      filter.push('updated_at')
    }
    if (filterEmail) {
      filter.push('Email')
    }
    if (filterFirstName) {
      filter.push('FirstName')
    }
    if (filterLastName) {
      filter.push('LastName')
    }
    if (filterTelNo) {
      filter.push('TelNo')
    }
    this.setState({isSearch: true})
    this.props.searchAdmissions(keyword, filter)
  }

  handleFilterChange = (e) => {
    if (e.target.value === 'req') {
      if (e.target.checked) {
        this.setState({filterReq: true})
      } else {
        this.setState({filterReq: false})
      }
    }
    if (e.target.value === 'upd') {
      if (e.target.checked) {
        this.setState({filterUpd: true})
      } else {
        this.setState({filterUpd: false})
      }
    }
    if (e.target.value === 'TelNo') {
      if (e.target.checked) {
        this.setState({filterTelNo: true})
      } else {
        this.setState({filterTelNo: false})
      }
    }
    if (e.target.value === 'Email') {
      if (e.target.checked) {
        this.setState({filterEmail: true})
      } else {
        this.setState({filterEmail: false})
      }
    }
    if (e.target.value === 'LastName') {
      if (e.target.checked) {
        this.setState({filterLastName: true})
      } else {
        this.setState({filterLastName: false})
      }
    }
    if (e.target.value === 'FirstName') {
      if (e.target.checked) {
        this.setState({filterFirstName: true})
      } else {
        this.setState({filterFirstName: false})
      }
    }
  }

  render () {
    return (
      <div className='container-fluid container-fluid-spacious' style={{marginTop: '0%'}} >
      {this.state.updateSuccess}
        <div className='col-sm-12 content'>
          <div className='dashhead'>
            <div className='dashhead-titles'>
              <h6 className='dashhead-subtitle'>USEP-KMSD | Admission's Support Module</h6>
              <h3 className='dashhead-title'>Registered Applicants</h3>
            </div>
          </div>
          <div className='flextable'>
            <div className='flextable-item flextable-primary'>
              <input type='text' className='form-control' onChange={e => { this.setState({keyword: e.target.value}) }} placeholder='Search' />
            </div>
            <div className='flextable-item'>
              <div className='btn-group'>
                <button type='button' className='btn btn-primary-outline' onClick={this.onSubmit}>
                  <span className='icon icon-magnifying-glass'>Search</span>
                </button>
              </div>
            </div>
          </div>
          <div className='flextable'>
            <div className='flextable-item'>
              <div className='checkbox-inline custom-control custom-checkbox'>
                <label>
                  <input type='checkbox' value={'FirstName'} onChange={e => { this.handleFilterChange(e) }} />
                  <span className='custom-control-indicator'></span>
                  First Name
                </label>
              </div>
              <div className='checkbox-inline custom-control custom-checkbox'>
                <label>
                  <input type='checkbox' value={'LastName'} onChange={e => { this.handleFilterChange(e) }} />
                  <span className='custom-control-indicator'></span>
                  Last Name
                </label>
              </div>
              <div className='checkbox-inline custom-control custom-checkbox'>
                <label>
                  <input type='checkbox' value={'Email'} onChange={e => { this.handleFilterChange(e) }} />
                  <span className='custom-control-indicator'></span>
                  Email
                </label>
              </div>
              <div className='checkbox-inline custom-control custom-checkbox'>
                <label>
                  <input type='checkbox' value={'TelNo'} onChange={e => { this.handleFilterChange(e) }} />
                  <span className='custom-control-indicator'></span>
                  Contact Number
                </label>
              </div>
            </div>
            <div className='flextable-item'>
              <div className='checkbox-inline custom-control custom-checkbox'>
                <label>
                  <input type='checkbox' value={'req'} onChange={e => { this.handleFilterChange(e) }} />
                  <span className='custom-control-indicator'></span>
                  Complete Requirements
                </label>
              </div>
              <div className='checkbox-inline custom-control custom-checkbox'>
                <label>
                  <input type='checkbox' value={'upd'} onChange={e => { this.handleFilterChange(e) }} />
                  <span className='custom-control-indicator'></span>
                  Updated
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='col-sm-12 content'>
          <AdmissionTable isSearch={this.state.isSearch} {...this.props} />
        </div>
      </div>
    )
  }
}

Admission.propTypes = {

}

export default Admission
