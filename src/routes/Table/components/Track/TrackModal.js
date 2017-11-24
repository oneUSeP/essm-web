import React, { Component } from 'react'
import TrackCreateForm from './TrackCreateForm'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose
} from 'react-modal-bootstrap'

class TrackModal extends Component {

  hideModal = () => {
    this.props.onClose()
  }

  render () {
    return (
      <Modal isOpen={this.props.open} onRequestHide={this.hideModal}>
        <ModalHeader>
          <ModalClose onClick={this.hideModal} />
          <ModalTitle >Create New Track</ModalTitle>
        </ModalHeader>
        <TrackCreateForm {...this.props} />
      </Modal>
    )
  }
}

TrackModal.propTypes = {

}

export default TrackModal
