import React, { Component } from 'react'
import { Link } from 'react-router'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import activeComponent from 'react-router-active-component'

const NavLink = activeComponent('li')

class NavBar extends Component {
  render () {
    return (
      <nav className='iconav'>
        <Link to='/' className='iconav-brand'>
          <img src='http://localhost:3000/usep-logo.png' width='25' />
        </Link>
        <div className='iconav-slider'>
          <ul className='nav nav-pills iconav-nav' role='tablist'>
            <OverlayTrigger
              placement='right' overlay={<Tooltip id='accounts'>Accounts</Tooltip>}>
              <NavLink to='/accounts' onlyActiveOnIndex>
                <span className='icon icon-users' />
                <small className='iconav-nav-label visible-xs-block'>Accounts</small></NavLink></OverlayTrigger>
            <OverlayTrigger
              placement='right' overlay={<Tooltip id='entities'>Entities</Tooltip>}>
              <NavLink to='/tables' onlyActiveOnIndex>
                <span className='icon icon-flow-parallel' />
                <small className='iconav-nav-label visible-xs-block'>Entities</small></NavLink></OverlayTrigger>
          </ul>
        </div>
      </nav>
    )
  }
}

NavBar.propTypes = {

}

export default NavBar