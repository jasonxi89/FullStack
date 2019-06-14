import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withSnackbar } from 'notistack';

const styles = {
    root: {
        flexGrow: 1,
        display: 'flex',
        margin: 16,
        justifyContent: 'center',
        alignItems: 'middle',
    },
    button: {
        margin: 8,
        color: '#fff',
        backgroundColor: '#313131',
    },
    success: {
        backgroundColor: '#43a047',
    },
    error: {
        backgroundColor: '#d32f2f',
    },
    info: {
        backgroundColor: '#2979ff',
    },
    warning: {
        backgroundColor: '#ffa000',
    },
};

const buttons = [
    { variant: 'success', message: 'Successfully done the operation.' },
    { variant: 'error', message: 'The Passwords didn\'t matcht!'},
    { variant: 'warning', message: 'Be careful of what you just did!' },
    { variant: 'info', message: 'For your info...' },
];


class MessageButtons extends Component {
    // handleClick = button => () => {
    //     // Avoid material-ui warnings. more info: https://material-ui.com/style/typography/#migration-to-typography-v2
    //     // eslint-disable-next-line no-underscore-dangle
    //     window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    //     this.props.enqueueSnackbar(button.message, { variant: button.variant });
    // };
    
    // handleClickWithAction = () => {
    //     this.props.enqueueSnackbar('The Passwords didn\'t matcht!', {
    //         variant: 'error',

    //     });
    // };

    render() {
        return (
           <div>
               {this.props.enqueueSnackbar('The Passwords didn\'t matcht!', {variant: 'error'})}
           </div>
        );
    }
}

MessageButtons.propTypes = {
    classes: PropTypes.object.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
};

export default withStyles(styles)(
    withSnackbar(MessageButtons),
);
