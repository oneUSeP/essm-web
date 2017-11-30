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
      count: 99
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
    let {keyword} = this.state
    this.props.searchAdmissions(keyword)
  }

  render () {
    return (
      <div className='container-fluid container-fluid-spacious' style={{marginTop: '0%'}} >
      {this.state.updateSuccess}
        <div className='col-sm-12 content'>
          <div className='dashhead'>
            <div className='dashhead-titles'>
              <h6 className='dashhead-subtitle'>USEP-KMSD | ESSM</h6>
              <h3 className='dashhead-title'>Registered Applicants</h3>
            </div>
          </div>
          <div className='flextable'>
            <div className='flextable-item flextable-primary'>
              <input type='text' className='form-control' onChange={e => { this.setState({keyword: e.target.value}) }} placeholder='Search (Lastname/Firstname/Email/ContactNumber)' />
            </div>
            <div className='flextable-item'>
              <div className='btn-group'>
                <button type='button' className='btn btn-primary-outline' onClick={this.onSubmit}>
                  <span className='icon icon-magnifying-glass'></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='col-sm-12 content'>
          <AdmissionTable {...this.props} />
        </div>
      </div>
    )
  }
}

Admission.propTypes = {

}

export default Admission
