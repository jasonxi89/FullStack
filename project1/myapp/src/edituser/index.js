import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';


import Snackbar from '@material-ui/core/Snackbar';


import {connect} from 'react-redux'
import{ getDetail, updateDetail } from '../redux/actions';






const styles = theme => ({
    root: {
        background: 'linear-gradient(to right bottom, #00897B, #FFE082)',
      },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
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
        this.state= {valid:true,
                    fnameinput:'',
                    lnameinput:'',
                    sexinput:'female',
                    ageinput:'',
                    pwdinput:'',
                    
    }}
    componentDidMount(){
        this.props.getUserDetail(this.props.match.params.id)
    }

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


    handleAgeChange=(e)=>{
        // const re = /^[0-9]+.?[0-9]*/;
        if(!isNaN(e.target.value)){
            this.setState({ageinput:e.target.value.trim()})}
    }
    

    handleSubmit = (e)=>{
        // fname,lname,pwd,age,sex
        e.preventDefault();
        this.props.updateUper(this.props.match.params.id,
                              this.state.fnameinput?this.state.fnameinput:this.props.userDetail.data.fname,
                              this.state.lnameinput?this.state.lnameinput:this.props.userDetail.data.lname,
                              this.state.pwdinput,
                              this.state.ageinput?this.state.ageinput:this.props.userDetail.data.age,
                              this.state.sexinput?this.state.sexinput:this.props.userDetail.data.sex
        )
        this.props.history.push('/users');
    }
    render(){
        return(
            <div className='reg-container'>
                {!this.props.userDetail.isLoading?
                <form onSubmit={this.handleSubmit}>
                    <p><h2>Edit User:</h2></p>
                    <p className='adduser input fname'>
                        <TextField                
                            // value={this.state.fnameinput}
                            defaultValue={this.props.userDetail.data.fname}
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
                            defaultValue={this.props.userDetail.data.lname}
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
                            defaultValue={this.props.userDetail.data.sex}
                            onChange={e=>{this.setState({sexinput:e.target.value})}}
                        >
                            <FormControlLabel  value="female" control={<Radio />} label="Female" />
                            <FormControlLabel  value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>

                    </p>
                    <p className='adduser input age'>
                        <TextField
                            defaultValue={this.props.userDetail.data.age}
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
                            onChange={e=>{this.setState({pwdinput:e.target.value.trim()});}}
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            placeholder="Password"
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
                            horizontal: 'left',
                        }}
                        open={this.state.pwdinput && this.state.secpwdinput && !this.state.pwdstatus}
                        TransitionComponent={this.state.Transition}
                        message={<span>The Two Passwords Are Not The Same</span>}
                    />
                </form>:<h2>Loading...</h2>}
            </div>
        )
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = state =>{
    return {
        userList: state.list,
        userDetail: state.detail
    };
}
const mapDispatchToProps = dispatch =>{
    return {
    getUserDetail: (id) => {
        dispatch(getDetail(id));
    },
    updateUper: (id,fname,lname,pwd,age,sex) => {
        dispatch(updateDetail(id,fname,lname,pwd,age,sex));
    }
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
