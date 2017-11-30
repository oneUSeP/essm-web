import React, { Component } from 'react'
import AdmissionForm from './AdmissionForm'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose
} from 'react-modal-bootstrap'

class AdmissionModal extends Component {

  hideModal = () => {
    this.props.closeModal()
  }

  render () {
    return (
      <Modal isOpen={this.props.open} size='modal-lg' onRequestHide={this.hideModal}>
        <ModalHeader>
          <ModalClose onClick={this.hideModal} />
          <ModalTitle >Update Record {this.props.selectedRecord && this.props.selectedRecord.get('AppNo')}</ModalTitle>
        </ModalHeader>
        <AdmissionForm {...this.props} />
      </Modal>
    )
  }
}

AdmissionModal.propTypes = {

}

export default AdmissionModal
