import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Track extends Component {

  render () {
    let {name, data} = this.props
    return (
      <div className='w-sm m-x-auto'>
        <div className='list-group' style={{marginTop: '2%'}}>
          <h4 className='list-group-header'>
            {name}
          </h4>
          {
            data && data.map((track, i) => {
              return (
                <a className='list-group-item' href='#'>
                  <span className='list-group-progress' style={{width: '100%'}}></span>
                  <span className='pull-right text-muted'>{track.get('is_active') ? 'Active' : 'Inactive'}</span>
                  {track.get('track_name')}
                </a>
              )
            })
          }

        </div>
        <a href='#' className='btn btn-primary-outline p-x'>Add {name}</a>
      </div>
    )
  }
}

Track.propTypes = {

}

export default Track
