import React, { Component } from 'react';
import NavBar from '../Components/navBar';
import ListItems from '../Components/listItems';

class Home extends Component {
  render() {
    return (
        <div>
            <NavBar />
            <ListItems />
        </div>
    );
  }
}
export default Home;