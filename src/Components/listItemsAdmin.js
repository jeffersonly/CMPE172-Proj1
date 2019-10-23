import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { API, graphqlOperation, Auth }  from "aws-amplify";
import * as queries from '../graphql/queries';

import EditItem from './editItem';
import DeleteItem from './deleteItem';
import DownloadItem from './downloadItem';

const styles = {
  card: {
    minWidth: 275,
    margin: 10,
    boxShadow: "1px 2px 2px black"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  titlelabel: {
    fontSize: 30, 
    fontWeight: 800,
    fontColor: 'black',
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    fontColor: 'black',
  },
  dates: {
    fontSize: 14,
    fontWeight: 350,
  },
  description: {
    fontSize: 16,
    fontWeight: 400
  },
  span: {
      fontSize: 14,
      color: "gray"
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'inherit',
    padding: '10px'
  },
};

class ListItemsAdmin extends Component {
    state = {
        items: [],
    }

    //when site loads, call function get items
    async componentDidMount () {
        this.getItems()
    }
    
    //get items from dynamodb 
    getItems = () => {
        //check to see if user is the one who posted, if they aren display CRUD
        API.graphql(graphqlOperation(queries.listItems))
        .then(data => this.setState({items: data.data.listItems.items}))
    };

    render() {
        const { classes } = this.props;
        const { items } = this.state;
        //const bull = <span className={classes.bullet}>•</span>;
        //console.log(items)
        return (
            <div className={classes.root}>
                <h1 className={classes.titlelabel}>Admin Access - All Files</h1>
                <Grid container className={classes.root} spacing={16}>
                    {items.map(item => (
                        <Grid key={item.id} item>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography className={classes.title}>
                                        {item.name}
                                    </Typography>
                                    <br/>
                                    <Typography component="p" color="textSecondary" className={classes.dates}> 
                                        Upload Date: {item.dateUploaded}
                                        <br/>
                                        Edited Date: {item.dateEdited}
                                        <br/>
                                        File Size: {item.fileSize} bytes
                                    </Typography>
                                    <br/>

                                    <Typography component="p" className={classes.description}>
                                        <span className={classes.span}>Description:</span>
                                        &nbsp;
                                        {item.description}
                                    </Typography>

                                </CardContent>
                                    
                                <CardActions>
                                    <EditItem currentItem={item} />
                                    <DownloadItem currentItem={item} />
                                    <DeleteItem currentItem={item} />
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

ListItemsAdmin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemsAdmin);