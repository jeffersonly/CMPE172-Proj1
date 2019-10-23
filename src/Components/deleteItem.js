import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { API, graphqlOperation } from "aws-amplify"; //import for talking to dynamodb
import * as mutations from '../graphql/mutations'; //import all mutations from graphql, used for deleting

class DeleteItem extends Component {
    state = {
        open: false
    };

    //open up modal to check if user wants to delete
    handleClickOpen = () => {
        console.log("Item id: " + this.props.currentItem.id);
        this.setState({ open: true });
    };

    //close modal if user finished deleting or doesn't want to delete
    handleClose = () => {
        this.setState({ open: false });
    };

    //delete item from dynamodb
    handleDelete = () => {
        this.setState({ open: false });
        //delete item based on its item id
        var itemDetails = { id: this.props.currentItem.id, }
        //delete item from dynamodb
        API.graphql(graphqlOperation(mutations.deleteItem, { input: itemDetails }))
        //reload window based on item deletion
        window.location.reload()
    };

    render() {
        return (
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Button style={{marginLeft: "125px"}}size='small' color="inherit" aria-label="Add" onClick={this.handleClickOpen}>
                    Delete
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Are you sure you want to delete item: {this.props.currentItem.name}?</DialogTitle>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        No, Cancel
                    </Button>
                    <Button onClick={this.handleDelete} color="primary">
                        Yes, Delete Item
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default DeleteItem;