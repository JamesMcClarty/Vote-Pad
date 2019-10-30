/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import APIManager from '../../modules/APIManager'

class EditBoardForm extends Component {

  state = {
    isModalOpen: false,
    editedSubject: "",
    stateChange: 0,
    loadingStatus: false
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  insertEdit = () => {
    this.setState({ loadingStatus: true });
    const editedBoard = {
      id: parseInt(this.props.boardId),
      userId: this.props.userId,
      subjectName: this.state.editedSubject,
      dateCreated: this.props.currentDate,
      boardstateId: parseInt(this.state.stateChange)
    }
    APIManager.update("boards", editedBoard)
      .then(() => {
        this.props.reload();
        this.toggle();
        this.setState({ loadingStatus: false })
      })
  }

  componentDidMount() {
    this.setState({
      editedSubject: this.props.subjectName,
      stateChange: parseInt(this.props.boardId)
    })
  }

  toggle = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle}>Edit Board</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggle} className="isOpen">
          <ModalBody>
            <fieldset>
              <label htmlFor="editedId">Edit your idea!</label>
              <div className="formgrid">
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="editedSubject"
                  value={this.state.editedSubject}
                />
                <FormGroup tag="fieldset">
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" 
                      name="stateradio" 
                      id="stateChange" 
                      onClick = {this.handleFieldChange}
                      value = "1"/>{' '}
                      Open for ideas!
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" 
                      name="stateradio" 
                      id="stateChange" 
                      onClick = {this.handleFieldChange}
                      value = "2"/>{' '}
                      Open for votes!
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" 
                      name="stateradio" 
                      id ="stateChange" 
                      onClick = {this.handleFieldChange}
                      value = "3"/>{' '}
                      Close
                    </Label>
                  </FormGroup>
                </FormGroup>
              </div>
            </fieldset>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" disabled={this.state.loadingStatus} onClick={this.insertEdit}>Confirm</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default EditBoardForm;