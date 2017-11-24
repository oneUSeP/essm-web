import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Track from '../Track'
import { Tabs, Tab } from 'react-bootstrap'
import _ from 'lodash'
import cx from 'classnames'

class Table extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      count: 15
    }
  }

  handleSelect = (e) => {
    event.preventDefault()
    this.setState({ selectedTab: e })
  }

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
        <div className='col-sm-12 content'>
          <Tabs bsStyle='nav nav-bordered' activeKey={this.state.selectedTab || 'track'} onSelect={this.handleSelect} id='controlled-tab-example'>
            <Tab style={{textAlign: 'left'}} key='track' eventKey='track' title='Tracks'><Track /></Tab>
            <Tab style={{textAlign: 'left'}} key='strand' eventKey='strand' title='Track Strands'><Track /></Tab>
            <Tab style={{textAlign: 'left'}} key='grade' eventKey='grade' title='Grades'><Track /></Tab>
            <Tab style={{textAlign: 'left'}} key='income' eventKey='income' title='Annual Income'><Track /></Tab>
            <Tab style={{textAlign: 'left'}} key='testing' eventKey='testing' title='Testing Centers'><Track /></Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

Table.propTypes = {

}

export default Table
