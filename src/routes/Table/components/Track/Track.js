import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TrackModal from './TrackModal'

class Track extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      count: 1000,
      delete: false,
      alert: false,
      show: false,
      open: false,
      uploadSuccess: null,
      selectedTrack: null,
      openModal: false
    }
  }

  componentWillReceiveProps (nextProps) {
    var deleteSuccess = nextProps.deletingTrackSuccess
    if (deleteSuccess) {
      this.setState({
        alert: (
          <SweetAlert success title='Deleted!' onConfirm={e => { this.setState({alert: null}) }}>
            Track has been deleted.
          </SweetAlert>
          )
      })
    }

    if (nextProps.creatingTrackSuccess) {
      let {page, count} = this.state
      this.props.getTracks(page, count)
      this.setState({
        openModal: false
      })
    }
  }

  render () {
    let {name, data} = this.props
    return (
      <div className='w-full m-x-auto'>
        <TrackModal selectedTrack={this.state.selectedTrack || null} open={this.state.openModal} onClose={e => { this.setState({ openModal: false }) }} {...this.props} />

        <div className='list-group' style={{marginTop: '2%'}}>
          <h4 className='list-group-header'>
            <div className='flextable'>
              <div className='flextable-item flextable-primary'>
                {name}
              </div>
              <div className='flextable-item'>
                <div className='btn-group'>
                  <button className='btn btn-primary-outline p-x' style={{textAlign: 'right'}} onClick={e => { this.setState({openModal: true}) }}>Add</button>
                </div>
              </div>
            </div>
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
      </div>
    )
  }
}

Track.propTypes = {

}

export default Track
