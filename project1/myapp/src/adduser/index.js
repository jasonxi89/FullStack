import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import Slide from "@material-ui/core/Slide";
import {connect} from 'react-redux'
import{ createUser } from '../redux/actions';
import { red700 } from 'material-ui/styles/colors';






const styles = theme => ({
    root: {
        background: 'linear-gradient(to right bottom, #00897B, #FFE082)',
      },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    snackbartheme:{
        backgroundColor: theme.palette.error.dark,
    },
    message: {
        width:'500px',
        display: 'flex',
        alignItems: 'center',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });

class App extends React.Component{
    constructor(props){
        super(props);
        this.state= {valid:false,
                    fnameinput:'',
                    lnameinput:'',
                    sexinput:'female',
                    ageinput:'',
                    pwdinput:'',
                    secpwdinput:'',
                    pwdstatus:false,
                    
    }}

    checkstatus=()=>{
        if(this.state.fnameinput && this.state.lnameinput && this.state.lnameinput && this.state.ageinput && this.state.pwdstatus){
            this.setState({valid:true})
        }
        else{
            this.setState({valid:false})
        }

    }


    async fircheckstatus(str){
        if(str && this.state.secpwdinput === str){
            await this.setState({pwdstatus:true});
            this.checkstatus(); 
        }else{
            await this.setState({pwdstatus:false});
            this.checkstatus(); 
        }
    }

    async seccheckstatus(str){
        if(str && this.state.pwdinput === str){
            await this.setState({pwdstatus:true});
            this.checkstatus();
        }else{
            await this.setState({pwdstatus:false});
            this.checkstatus(); 
        }

    }

    handleAgeChange=(e)=>{
        // const re = /^[0-9]+.?[0-9]*/;
        if(!isNaN(e.target.value)){
            this.setState({ageinput:e.target.value.trim()})}
    }
    

    handleSubmit = (e)=>{
        // fname,lname,pwd,age,sex
        e.preventDefault();
        this.props.createUser(this.state.fnameinput,
                              this.state.lnameinput,
                              this.state.pwdinput,
                              this.state.ageinput,
                              this.state.sexinput,
                              this.props,
            )
        // this.props.history.push('/users');
        console.log(this.props.history)
    }
    render(){
        const { classes} = this.props;
        return(
            <div className='reg-container'>
                <form onSubmit={this.handleSubmit}>
                    <p><h2>Create New User:</h2></p>
                    <p className='adduser input fname'>
                        <TextField
                            value={this.state.fnameinput}
                            onChange={e=>this.setState({fnameinput:e.target.value.trim()})}
                            fullWidth
                            label="First Name"
                            required 
                            id="standard-required"
                            placeholder="First Name"
                            margin="normal"
                        />
                    </p>
                    <p className='adduser input lname'>
                       <TextField
                            value={this.state.lnameinput}
                            onChange={e=>this.setState({lnameinput:e.target.value.trim()})}
                            fullWidth
                            required
                            id="standard-required"
                            label="Last Name"
                            placeholder="Last Name"
                            margin="normal"
                        />
                    </p>
                    
                    <p className='sex adduser input '>
                    <FormControl required component="fieldset" >
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            fullWidth
                            aria-label="Gender"
                            name="gender1"
                            value={this.state.sexinput}
                            onChange={e=>{this.setState({sexinput:e.target.value})}}
                        >
                            <FormControlLabel  value="female" control={<Radio />} label="Female" />
                            <FormControlLabel  value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>

                    </p>
                    <p className='adduser input age'>
                        <TextField
                            value={this.state.ageinput}
                            onChange={this.handleAgeChange}
                            required
                            fullWidth
                            id="standard-required"
                            label="Age"
                            placeholder="Age"
                            margin="nromal"
                        />
                    </p>
                    <p className='adduser input pwd'>
                        <TextField
                            fullWidth
                            required
                            value={this.state.pwdinput}
                            onChange={e=>{this.setState({pwdinput:e.target.value.trim()});this.fircheckstatus(e.target.value.trim());}}
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            margin="normal"
                        />
                    </p>
                    <p className='adduser input pwd2'>
                      <TextField
                            fullWidth
                            required
                            value={this.state.secpwdinput}
                            onChange={e=>{this.setState({secpwdinput:e.target.value.trim()});this.seccheckstatus(e.target.value.trim());}}
                            id="standard-password-input"
                            label="Repeat Password"
                            placeholder="Repeat Password"
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                        />
                    </p>
                    {this.state.valid?
                    <Button onClick={this.handleClick}
                    className="adduser input btn"  variant="outlined" color='Green' type='submit'>
                        <CloudUploadIcon /> Submit
                    </Button>:<Button 
                    className="adduser input btn" disabled variant="outlined" color='Green' type='submit'>
                        <CloudUploadIcon /> Submit
                    </Button>
                    }
                    
                    <Snackbar
                        
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        // className={classes.snackbartheme}
                        open={this.state.pwdinput && this.state.secpwdinput && !this.state.pwdstatus}
                        TransitionComponent={this.state.Transition}
                        message={<span>The Two Passwords Are Not The Same</span>}
                        ContentProps={{
                            classes: {
                                root: classes.snackbartheme
                            }
                        }}
                    />
                </form>
            </div>
        )
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.node,
  };

const mapStateToProps = state =>{
    return {
    };
}
const mapDispatchToProps = dispatch =>{
    return {
    createUser: (fname,lname,pwd,age,sex,props) => {
        dispatch(createUser(fname,lname,pwd,age,sex,props));
    }
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
