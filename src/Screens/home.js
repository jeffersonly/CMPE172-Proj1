import React, { Component } from 'react';
import NavBar from '../Components/navBar';
import ListItemsEdit from '../Components/listItemsEdit';
import ListItemsAdmin from '../Components/listItemsAdmin';
import ListItems from '../Components/listItems';
import { Auth } from 'aws-amplify';

class Home extends Component {
  state = {
    userID: '',
    adminID: 'admin',
  }

  //track current logged in user
  async componentDidMount() {
    Auth.currentSession()
      .then(data => {
        let idToken = data.getIdToken();
        this.setState({
            userID: idToken.payload["cognito:username"]
        })
      })
  }


  render() {
    //check if user is admin
    if(this.state.userID === this.state.adminID) {
      return <div><NavBar/><ListItemsAdmin/></div>;
    }

    return (
        <div>
            <NavBar /> 
            <ListItemsEdit />
            <ListItems />
        </div>
    );
  }
}
export default Home;