import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from '../graphql/mutations';

class EditItem extends Component {
    state = {
        open: false,
        itemName: '',
        itemDescription: '',
        dateEdited: '',
    };

    //open modal for editing item
    handleClickOpen = () => {
        this.setState({ open: true });
        //get the current date 
        const currDate = new Date().getDate();
        const currMonth = new Date().getMonth();
        const currYear = new Date().getFullYear();
        const currHour = new Date().getHours();
        const currMin = new Date().getMinutes();
        const currSec = new Date().getSeconds();
        const uploadDate = currMonth + '/' + currDate + '/' + currYear + ' ' + currHour + ':' + currMin + ':' + currSec;
        this.setState({
            dateEdited: uploadDate
        })
    };

    //close model for editing item
    handleClose = () => {
        this.setState({ open: false });
    };

    //track when changes are occuring for text input
    handleChange = name => event => {
        this.setState({
        [name]: event.target.value,
        });
    };

    //on submit, track the changed edits, push to dynamodb
    handleSubmit = (e) => {
        this.setState({ open: false });
        var itemDetails = {
            id: this.props.currentItem.id,
            name: this.state.itemName || this.props.currentItem.name,
            description: this.state.itemDescription || this.props.currentItem.description,
            dateEdited: this.state.dateEdited
        }
        //push updates to dynamodb
        API.graphql(graphqlOperation(mutations.updateItem, {input: itemDetails})).then(() => {
            //reload page after editing item
            window.location.reload();
        });
    }

    render() {
        //variables that hold the current info of the current edited item
        let curItemName = this.props.currentItem.name;
        let curItemDesc = this.props.currentItem.description;
        return (
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Button size='small' color="inherit" aria-label="Edit" onClick={this.handleClickOpen}>
                    Edit
                </Button>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit Item: {this.props.currentItem.name}</DialogTitle>
                    <DialogContent>
                        <TextField
                            style={{marginRight: 10}}
                            id="itemName"
                            placeholder={curItemName}
                            label="Name"
                            type="string"
                            onChange={this.handleChange('itemName')}
                        />
                        <TextField
                            style={{marginTop: 10}}
                            multiline
                            id="itemDescription"
                            placeholder={curItemDesc}
                            label="Description"
                            type="string"
                            rows="4"
                            fullWidth
                            onChange={this.handleChange('itemDescription')}
                        />
                    </DialogContent>
            
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EditItem;