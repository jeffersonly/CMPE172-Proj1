import React, { Component } from 'react';
import Home from './Screens/home';

import { withAuthenticator } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';

import Amplify from 'aws-amplify';

class App extends Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}
export default withAuthenticator(App);
