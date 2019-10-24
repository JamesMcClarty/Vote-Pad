/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import APIManager from '../../modules/APIManager'

class EditIdeaForm extends Component{

  state = {
    isModalOpen: false,
    newIdea: "",
    loadingStatus: false
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  addIdea = () => {
    this.setState({ loadingStatus: true });
    const newObject ={
      userId: this.props.userId,
      boardId: this.props.boardId,
      description: this.state.newIdea,
      "isChosen": false
    }    
    APIManager.post("ideas", newObject)
    .then(() =>{
    this.toggle();
    this.props.reload();
    })
  }

  componentDidMount(){
    this.setState({editedIdea:this.props.idea.description})
  }

  toggle = () => {
    this.setState({isModalOpen: !this.state.isModalOpen})
  }

  render(){
  return (
    <div>
      <Button onClick={this.toggle}>Edit</Button>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggle} className="isOpen">
        <ModalBody>
          <fieldset>
            <div className="formgrid">
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="editedIdea"
                value={this.state.editedIdea}
              />
              <label htmlFor="editedId">Edit your idea!</label>
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

export default EditIdeaForm;