import React, { Component } from 'react';
import Home from './Screens/home';

import { withAuthenticator } from 'aws-amplify-react';

import Amplify from 'aws-amplify';
import aws_config from './aws-exports';
Amplify.configure(aws_config);

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
