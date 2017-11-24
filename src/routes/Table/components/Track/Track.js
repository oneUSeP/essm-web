import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Track extends Component {
  render () {
    return (
      <div className='w-sm m-x-auto'>
        <div className='list-group' style={{marginTop: '2%'}}>
          <h4 className='list-group-header'>
            Countries
          </h4>

          <a className='list-group-item' href='#'>
            <span className='list-group-progress' style={{width: '62.4%'}}></span>
            <span className='pull-right text-muted'>62.4%</span>
            United States
          </a>

          <a className='list-group-item' href='#'>
            <span className='list-group-progress' style={{width: '62.4%'}}></span>
            <span className='pull-right text-muted'>15.0%</span>
            India
          </a>

          <a className='list-group-item' href='#'>
            <span className='list-group-progress' style={{width: '62.4%'}}></span>
            <span className='pull-right text-muted'>5.0%</span>
            United Kingdom
          </a>

          <a className='list-group-item' href='#'>
            <span className='list-group-progress' style={{width: '62.4%'}}></span>
            <span className='pull-right text-muted'>5.0%</span>
            Canada
          </a>

          <a className='list-group-item' href='#'>
            <span className='list-group-progress' style={{width: '62.4%'}}></span>
            <span className='pull-right text-muted'>4.5%</span>
            Russia
          </a>

          <a className='list-group-item' href='#'>
            <span className='list-group-progress' style={{width: '62.4%'}}></span>
            <span className='pull-right text-muted'>2.3%</span>
            Mexico
          </a>

          <a className='list-group-item' href='#'>
            <span className='list-group-progress' style={{width: '62.4%'}}></span>
            <span className='pull-right text-muted'>1.7%</span>
            Spain
          </a>

          <a className='list-group-item' href='#'>
            <span className='list-group-progress' style={{width: '62.4%'}}></span>
            <span className='pull-right text-muted'>1.5%</span>
            France
          </a>

          <a className='list-group-item' href='#'>
            <span className='list-group-progress' style={{width: '62.4%'}}></span>
            <span className='pull-right text-muted'>1.4%</span>
            South Africa
          </a>

          <a className='list-group-item' href='#'>
            <span className='list-group-progress' style={{width: '62.4%'}}></span>
            <span className='pull-right text-muted'>1.2%</span>
            Japan
          </a>

        </div>
        <a href='#' className='btn btn-primary-outline p-x'>All countries</a>
      </div>
    )
  }
}

Track.propTypes = {

}

export default Track
