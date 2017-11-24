import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Track from '../Track'

class Table extends Component {
  render () {
    return (
      <div className='container-fluid container-fluid-spacious' style={{marginTop: '0%'}} >
        <div className='col-sm-12 content'>
          <div className='dashhead'>
            <div className='dashhead-titles'>
              <h6 className='dashhead-subtitle'>USEP-KMSD | ESSM</h6>
              <h3 className='dashhead-title'>Registration Form Fields</h3>
            </div>
          </div>
        </div>
        <div className='hr-divider m-t-lg m-b-md'>
          <h3 className='hr-divider-content hr-divider-heading'></h3>
        </div>
        <div className='row'>
          <Track />
        </div>
      </div>
    )
  }
}

Table.propTypes = {

}

export default Table
