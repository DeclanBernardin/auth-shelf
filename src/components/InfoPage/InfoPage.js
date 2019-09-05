import React, { Component } from 'react';
import { connect } from 'react-redux';


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {

  state={
    description: '',
    image_url: ''
  }

  handlePost = (event) => {
    event.preventDefault()
console.log(' i clicked submit');
this.props.dispatch({
  type: 'ADD_ITEM',
  payload: this.state
})}

handleChangeDescription = (event) => {
  this.setState({
    description: event.target.value,
  })
}

handleChangeItemURL =(event) => {
  this.setState({
    image_url: event.target.value
  })
}

  componentDidMount(){
    this.props.dispatch({type: 'FETCH_ITEMS'})
  }

  handleDelete(id, user_id){
    console.log(id);
    console.log(user_id);
    
    this.props.dispatch({type: 'DELETE_ITEM', payload: {id: id, userId: user_id}})
  }

  render(){
    let table = this.props.reduxStore.itemReducer.map(item => {
      return (<tr><td>{item.description}</td><td><img src = {item.image_url} alt = ""/></td><td><button onClick = {() => this.handleDelete(item.id, item.user_id)}>Delete</button></td></tr>)
    })
    return(
      <div>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {table}
          </tbody>

        </table>
        <form onSubmit = {this.handlePost}>
          <input onChange= {this.handleChangeDescription} type = "text" placeholder= "Insert the description of your item"/>
          <input onChange = {this.handleChangeItemURL} type = "text" placeholder = "Insert the URL of your image here" />
          <button type = "submit">SUBMIT</button>
        </form>
        </div>
    )
  }
};

const mapStateToProps = reduxStore => {
  return {
    reduxStore
  };
};
export default connect(mapStateToProps)(InfoPage);
