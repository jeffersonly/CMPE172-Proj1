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
        itemPrice: '',
        itemDescription: ''
    };

    //open modal for editing item
    handleClickOpen = () => {
        this.setState({ open: true });
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
        price: this.state.itemPrice || this.props.currentItem.price,
        description: this.state.itemDescription || this.props.currentItem.description
        }
        API.graphql(graphqlOperation(mutations.updateItem, {input: itemDetails}));
    }

    render() {
        //variables that hold the current info of the current edited item
        let curItemName = this.props.currentItem.name;
        let curItemPrice = this.props.currentItem.price;
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
                            style={{marginRight: 10}}
                            id="itemPrice"
                            placeholder={curItemPrice}
                            label="Price"
                            type="number"
                            onChange={this.handleChange('itemPrice')}
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