import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { API, graphqlOperation }  from "aws-amplify";
import * as queries from '../graphql/queries';

import EditItem from './editItem';
import DeleteItem from './deleteItem';

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
  title: {
    fontSize: 20,
    fontWeight: 600,
    fontColor: 'black',
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

class ListItems extends Component {
    state = {
        items: []
    }

    //when site loads, call function get items
    componentDidMount = () => {
        this.getItems()
    }
    
    //get items from dynamodb 
    getItems = () => {
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
                <Grid container className={classes.root} spacing={16}>
                    {items.map(item => (
                        <Grid key={item.id} item>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography className={classes.title}>
                                        {item.name}
                                    </Typography>

                                    <br/>

                                    <Typography component="p">
                                        {item.price}
                                    </Typography>

                                    <br />

                                    <Typography component="p"> 
                                        {item.description}
                                    </Typography>

                                </CardContent>
                                    
                                <CardActions>
                                    <EditItem currentItem={item} />
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

ListItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItems);