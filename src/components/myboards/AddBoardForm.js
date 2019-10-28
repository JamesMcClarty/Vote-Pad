/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import APIManager from '../../modules/APIManager'
import moment from 'moment'


class AddBoardForm extends Component {

  state = {
    isModalOpen: false,
    newsubject: "",
    loadingStatus: false,
    boards: []
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  addBoard = () => {
    this.setState({loadingStatus: true});
    const newObject = {
        userId: this.props.userId,
        dateCreated: moment().format("MMM Do YYYY"),
        subjectName: this.state.newsubject,
        boardstateId: 1
    }

    APIManager.post("boards", newObject)
      .then(() => {
        this.toggle();
        this.props.reload();
        this.setState({loadingStatus:false})
      })
  }

  componentDidMount() {
    APIManager.getAllDataExpandAnother("boards","user")
      .then((data) => {
        this.setState({ boards: data})
      })
  }

  toggle = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle}>Add Board</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggle} className="isOpen">
          <ModalBody>
            <fieldset>
              <label htmlFor="form-control">Submit your board!</label>
              <div className="formgrid">
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="newsubject"
                  value={this.state.newsubject}
                />
              </div>
            </fieldset>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" disabled={this.state.loadingStatus} onClick={this.addIdea}>Confirm</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default AddBoardForm;