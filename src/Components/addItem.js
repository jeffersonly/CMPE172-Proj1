import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { API, graphqlOperation, Storage, Auth } from "aws-amplify";
import * as mutations from '../graphql/mutations';
import Input from '@material-ui/core/Input';
import uuid from 'uuid/v4';
import config from '../aws-exports';

const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config

class AddItem extends Component {
    state = {
        open: false,
        itemName: '',
        itemPrice: '',
        itemDescription: '',
        fileUrl: '',
        file: '',
        filename: '',
        userID: ''
    };
    
    //on mount, save the current userid
    componentDidMount() {
        //get user that is uploading file
        Auth.currentSession()
        .then(data => {
            let idToken = data.getIdToken();
            console.dir(idToken);
            console.log(idToken.payload["cognito:username"]);
            this.setState({
                userID: idToken.payload["cognito:username"]
            })
        })
    }

    //handle opening window model for adding items
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    //handle closing the window model for adding items
    handleClose = () => {
        this.setState({ open: false });
    };

    //handle when events are changed within the add item window model
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    //submit new added item button action
    handleSubmit = (e) => {
        const { name: fileName, type: mimeType } = this.state.file;
        const key = `${uuid()}${fileName}`;
        const fileUpload = {
            bucket,
            key,
            region,
        }
        this.setState({ open: false });

        var itemDetails = {
            name: this.state.itemName,
            price: this.state.itemPrice,
            description: this.state.itemDescription,
            filename: this.state.filename,
            key,
            avatar: fileUpload,
            userID: this.state.userID
        }

        //save the file
        Storage.put(key, this.state.file, {contentType: this.state.file.type})
        .then(() => {
            console.log("saved file successfully");
            this.setState({ fileUrl: '', file: '', filename: ''})
        })
        .catch(err => {
            console.log("error uploading file: ", err);
        })

        //push/create items to dynamodb
        API.graphql(graphqlOperation(mutations.createItem, { input: itemDetails }));
        //window.location.reload();
    }

    //handle file upload
    handleFile = e => {
        const file = e.target.files[0]
        this.setState({
            fileUrl: URL.createObjectURL(file),
            file,
            filename: file.name
        })
    }

    render() {
        return (
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Button variant="fab" mini color="inherit" aria-label="Add" onClick={this.handleClickOpen}>
                    Add Item
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add a New Item</DialogTitle>
                    
                    <DialogContent>
                        <TextField
                            style={{marginRight: 10}}
                            id="itemName"
                            label="Name"
                            type="string"
                            onChange={this.handleChange('itemName')}
                        />
                        <TextField
                            style={{marginRight: 10}}
                            id="itemPrice"
                            label="Size (in Bytes)"
                            type="number"
                            onChange={this.handleChange('itemPrice')}
                        />
                        <Input 
                            style={{marginRight: 10}}
                            id="itemFile"
                            label="File"
                            type="file"
                            onChange={this.handleFile}
                        />
                        <TextField
                            style={{marginTop: 10}}
                            multiline
                            id="itemDescription"
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
                            Add Item
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AddItem;