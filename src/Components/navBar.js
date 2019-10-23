import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddItem from './addItem';
import { Auth } from 'aws-amplify';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: 'right',
  },
  root: {
    flexGrow: 1
  },
  grow: {
   flexGrow: 1,
 },
});

//function for signing user out
function signOut() {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err))
}

class NavBar extends Component {
render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Files
            </Typography>
            <AddItem />
            <Button onClick={signOut}>Log Out</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(NavBar);