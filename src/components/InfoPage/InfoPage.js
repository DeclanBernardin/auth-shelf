import React, { Component } from 'react';
import { connect } from 'react-redux';


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {

  state={}

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
      return (<tr><td>{item.description}</td><td><img src = {item.image_url}/></td><td><button onClick = {() => this.handleDelete(item.id, item.user_id)}>Delete</button></td></tr>)
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
