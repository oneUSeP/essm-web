import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import validateInput from 'utils/validators/track'

import {ModalBody,
  ModalFooter,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton } from 'react-bootstrap'

class TrackCreateForm extends Component {
  state = {
    id: '',
    trackName: '',
    active: '0',
    errors: [],
    isLoading: false
  }

  componentWillReceiveProps (nextProps) {
    let { selectedTrack } = nextProps
    if (selectedTrack) {
      this.setState({
        id: '' + selectedTrack.get('track_id'),
        trackName: selectedTrack.get('track_name'),
        active: '' + selectedTrack.get('is_active')
      })
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state)

    if (!isValid) {
      this.setState({ errors, isLoading: false })
    }

    return isValid
  }

  handleStatus = (value) => {
    this.setState({active: value})
  }

  onSubmit = (e) => {
    e.preventDefault()
    let data = this.state
    if (this.isValid(data)) {
      this.setState({ trackName: '',
        active: '0',
        errors: {}, isLoading: true })
      if (this.props.selectedTrack) {
        console.log('FORM', data)
        this.props.updateTrack(data)
      } else {
        this.props.createTrack(data)
      }
    }
  }

  render () {
    return (
      <form className='form-access' onSubmit={this.onSubmit}>
        <ModalBody>
          <div className='form-group row'>
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
              <TextFieldGroup
                onChange={this.onChange}
                value={this.state.trackName}
                field='trackName'
                placeholder='Track Name'
                error={this.state.errors.trackName}
                />
            </div>
          </div>
          <div className='form-group row'>
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
              <ButtonToolbar>
                <ToggleButtonGroup type='radio'
                  name='active'
                  onChange={e => { this.handleStatus(e) }}
                  value={this.state.active}>
                  <ToggleButton value='1'>Active</ToggleButton>
                  <ToggleButton value='0'>Disable</ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
            </div>
          </div>

        </ModalBody>
        <ModalFooter>
          <button className='btn btn-lg btn-pill btn-primary'>
            Submit
          </button>
        </ModalFooter>
      </form>
    )
  }
}

TrackCreateForm.propTypes = {

}

export default TrackCreateForm