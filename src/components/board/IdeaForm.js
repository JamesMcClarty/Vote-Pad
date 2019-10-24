/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import APIManager from '../../modules/APIManager'

class IdeaForm extends Component{

  state = {
    isModalOpen: false,
    newIdea: "",
    loadingStatus: false,
    user: []
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  addIdea = () => {
    this.setState({ loadingStatus: true });
    const newObject ={
      userId: this.state.user[0].id,
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
    APIManager.getAllByCondition("users","email",this.props.email)
    .then((data) => {
        this.setState({user:data})
        console.log(this.state.user[0].email)
    })
  }
  toggle = () => {
    this.setState({isModalOpen: !this.state.isModalOpen})
  }

  render(){
  return (
    <div>
      <Button onClick={this.toggle}>Add Idea</Button>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggle} className="isOpen">
        <ModalBody>
          <fieldset>
          <label htmlFor="newIdea">Submit your idea!</label>
            <div className="formgrid">
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="newIdea"
                value={this.state.newIdea}
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

export default IdeaForm;