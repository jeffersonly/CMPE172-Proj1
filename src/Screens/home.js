import React, { Component } from 'react';
import NavBar from '../Components/navBar';
import ListItemsEdit from '../Components/listItemsEdit';

import ListItems from '../Components/listItems';
import { Auth } from 'aws-amplify';

class Home extends Component {
  render() {
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