import React, { Component } from 'react';
import {connect} from 'react-redux'; // connect action creators to app component
import {bindActionCreators} from 'redux';
import {addReminder, deleteReminder, clearReminders} from '../actions/index';
import moment from 'moment';
//import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; // Import
//import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import FlipMove from 'react-flip-move';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text:'',
      dueDate:'',
      showDialog: false
    }
  }

  addReminder(){
    //console.log('this', this);
    console.log('this.state.dueDate', this.state.dueDate);
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id){
    console.log('deleting in application', id);
    console.log('this.props', this.props);
    this.props.deleteReminder(id);
  }
 //
 //  clearReminders(){
 //
 //  //this.setState ({showDialog: true});
 //  return (
 //  <div>
 //    console.log("I am here")
 //
 //      <div>{
 //    //  this.state.showDialog &&
 //      <ReactConfirmAlert
 //        title="Confirm to Delete"
 //        message="Are you sure to do this."
 //        confirmLabel="Confirm"
 //        cancelLabel="Cancel"
 //        onConfirm={() => this.props.clearReminders()}
 //      />}
 //      </div>
 //      </div>
 // )
 //  }
//    onCancel={() => alert('Action after Cancel')}
  // another helper function to display the add items
  renderReminder(){
    const { reminders } = this.props;
  //  console.log("reminders",reminders);
    return (
      <ul className ="list-group col-sm-4">
        <FlipMove duration={250} easing="ease-out">
      {
        reminders.map(reminder => {
          return (
            <li key={reminder.id} className="list-group-item">
            <div className ="list-item">
              <div>{reminder.text} </div>
              <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em> </div>
            </div>
            <div
              className ="list-item delete-button"
              onClick={() =>{this.deleteReminder(reminder.id)}}>
              &#x2715;
            </div>
            </li>
          )
        })
      }
      </FlipMove>
      </ul>
    )


  }

  render() {
  //  console.log('this.props', this.props);
    return (
      <div className ="App">
        <div className ="title">
          Reminder App
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="I have to ..."
              onChange = {event => this.setState({text: event.target.value})}/>
            <input
              className="form-control"
              type="datetime-local"
              onChange={event => this.setState({dueDate: event.target.value})} />
          </div>
          <button
            type="button"
            className ="btn btn-success"
            onClick ={() => this.addReminder()}> Add Reminder
          </button>
          <button
            type="button"
            className ="btn btn-danger"
            onClick ={() => {if (window.confirm('Are you sure to delete all items')) this.props.clearReminders()}}  >
            Clear All reminders
          </button>
        </div>
          {this.renderReminder()}

      </div>

    )
  }
}
function mapStateToProps(state){
  //console.log('state', state);
  // return a plain object
  // this reminders are reducer for global reducer
  return {
    reminders : state
  }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({addReminder, deleteReminder, clearReminders}, dispatch);

}
// connect app component to action creators
export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default connect(null, {addReminder})(App);
// we dont need to add mapDispatchToProps function
