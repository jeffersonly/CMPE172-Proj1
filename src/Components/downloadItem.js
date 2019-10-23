import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { API, graphqlOperation, Storage } from "aws-amplify"; //import for talking to dynamodb
import * as mutations from '../graphql/mutations'; //import all mutations from graphql, used for deleting

class DownloadItem extends Component {
    state = {
        open: false
    };

    //open up modal to check if user wants to download
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    //close modal if user finished deleting or doesn't want to download
    handleClose = () => {
        this.setState({ open: false });
    };

    //download item from s3
    handleDownload = () => {
        this.setState({ open: false });
        //download item based on its item key
        try {
            //get a promise containing the info we want based on avatar key
            const file = Storage.get(this.props.currentItem.avatar.key)
            .then(res => {
                //console.log("info: " + res);
                window.open(res, '_blank');
            })
            
        } catch(err) {
            console.log('error: ', err)
        }
    };

    render() {
        return (
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Button style={{marginLeft: "120px"}}size='small' color="inherit" aria-label="Add" onClick={this.handleClickOpen}>
                    Download
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Are you sure you want to download: {this.props.currentItem.name}?</DialogTitle>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        No, Cancel
                    </Button>
                    <Button onClick={this.handleDownload} color="primary">
                        Yes, Download
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default DownloadItem;