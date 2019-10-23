import React, { Component } from 'react';
import Home from './Screens/home';

import { withAuthenticator } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';

import Amplify from 'aws-amplify';
import aws_config from './aws-exports';
Amplify.configure(aws_config);

//function for signing user out
function signOut() {
  Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

class App extends Component {
  render() {

    return (
      <div>
        <button onClick={signOut}>Log Out</button>
        <Home />
      </div>
      
    );
  }
}
export default withAuthenticator(App);