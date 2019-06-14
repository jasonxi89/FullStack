import { statement } from "@babel/template";

import React from 'react'
import imgSrc from '../default.jpg'
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import MaskedInput from 'react-text-mask';
import {connect} from 'react-redux'
import {getManagerList} from '../redux/actions'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import request from 'superagent';



import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';


import FormHelperText from '@material-ui/core/FormHelperText';


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

import{ createUser } from '../redux/actions';
import { red700 } from 'material-ui/styles/colors';

const CLOUDINARY_UPLOAD_PRESET = 'tice2nsu';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/sach1130/image/upload';

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }
  
  TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
  };

class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            inputname:"123",
            inputtitle:"123",
            sexinput:"female",
            inputdate:"2019-03-17",
            inputophone:"123",
            inputcphone:"123",
            inputsms:"123",
            inputemail:"123@123.com",
            inputmanager:"",
            uploadedFileCloudinaryUrl: '',
            isuploading:false,
        }
    }
    handleSubmit = (e)=>{
        // fname,lname,pwd,age,sex
        e.preventDefault();
        this.props.createUser(this.state.inputname,
                              this.state.inputtitle,
                              this.state.sexinput,
                              this.state.inputdate,
                              this.state.inputophone,
                              this.state.inputcphone,
                              this.state.inputsms,
                              this.state.inputemail,
                              this.state.uploadedFileCloudinaryUrl,
                              this.state.inputmanager,
                              this.props,
            )
    }
    componentDidMount(){
        this.props.getManagerList();
    }

    handleImageUpload(file) {
        console.log("Uploading")
        this.setState({isuploading:true})
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file);
    
        upload.end((err, response) => {
          if (err) {
            console.error(err);
            this.setState({isuploading:false,})
            console.log("isuploading false")
          }
    
          if (response.body.secure_url !== '') {
            this.setState({
              uploadedFileCloudinaryUrl: response.body.secure_url,
              isuploading:false,
            });
          }
        });
    }
    
    uploadPic = e =>{
        console.log("Here");
        // console.log(e.target.files[0]);
        this.setState({isloading:true});
        this.handleImageUpload(e.target.files[0]);
    }
    handleOphoneChange=(e)=>{
        // const re = /^[0-9]+.?[0-9]*/;
        if(!isNaN(e.target.value)){
            this.setState({inputophone:e.target.value.trim()})}
    }
    handleCphoneChange=(e)=>{
        // const re = /^[0-9]+.?[0-9]*/;
        if(!isNaN(e.target.value)){
            this.setState({inputcphone:e.target.value.trim()})}
    }
    handleSMSChange=(e)=>{
        // const re = /^[0-9]+.?[0-9]*/;
        if(!isNaN(e.target.value)){
            this.setState({inputsms:e.target.value.trim()})}
    }

    handleChange = (e) => {
        this.setState({inputmanager:e.target.value})
      }
    render(){
        const { userDetail} = this.props;
        // .forEach(key=>console.log(`key is ${key}, value is ${userDetail.manager[key]}`))
        // console.log(Object.keys(userDetail.manager) instanceof Array);
        return(
            <div className='add-ctn'>
                <div className='btn-ctn'>
                    <h2>New Employee</h2>
                    <button form="myform" type='submit' className='btn'><i class="iconfont">&#xe606;</i>Submit</button>
                    <button className='btn' onClick={()=>this.props.history.push('/users/')}><i class="iconfont">&#xe603;</i>Back</button>
                    <div className="info-ctn"> 
                        <div className='table-ctn'>
                    <form id="myform" onSubmit={this.handleSubmit}>
                        <p className='adduser input name'>
                            <TextField
                                value={this.state.inputname}
                                onChange={e=>this.setState({inputname:e.target.value.trim()})}
                                fullWidth
                                label="Name"
                                required 
                                id="standard-required"
                                placeholder="Name"
                                margin="normal"
                            />
                        </p>
                        <p className='adduser input title'>
                            <TextField
                                value={this.state.inputtitle}
                                onChange={e=>this.setState({inputtitle:e.target.value.trim()})}
                                fullWidth
                                required
                                id="standard-required"
                                label="Title"
                                placeholder="Title"
                                margin="normal"
                            />
                        </p>
                    
                        <p className='sex adduser input '>
                            <FormControl required component="fieldset" >
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                    aria-label="Office Phone:"
                                    name="gender1"
                                    value={this.state.sexinput}
                                    onChange={e=>{this.setState({sexinput:e.target.value})}}
                                >
                                    <FormControlLabel  value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel  value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </FormControl>
                        </p>
                        <p className='adduser input sdate'>
                        <TextField
                                id="date"
                                label="Start Date"
                                type="date"
                                required
                                defaultValue="2019-03-17"
                                onChange={e=>{this.setState({inputdate:e.target.value});console.log(e.target.value)}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </p>
                        <p className='adduser input ophone'>
                            <TextField
                                value={this.state.inputophone}
                                onChange={this.handleOphoneChange}
                                required
                                fullWidth
                                id="standard-required"
                                label="Office Phone"
                                margin="nromal"
                            />
                        </p>
                        <p className='adduser input cphone'>
                            <TextField
                                value={this.state.inputcphone}
                                onChange={this.handleCphoneChange}
                                required
                                fullWidth
                                id="standard-required"
                                label="Cell Phone"
                                margin="nromal"
                            />
                        </p>
                        <p className='adduser input SMS'>
                            <TextField
                                value={this.state.inputsms}
                                onChange={this.handleSMSChange}
                                required
                                fullWidth
                                id="standard-required"
                                label="SMS"
                                margin="nromal"
                            />
                        </p>
                        <p className='adduser input Email'>
                            <TextField
                                value={this.state.inputemail}
                                onChange={e=>this.setState({inputemail:e.target.value})}
                                required
                                fullWidth
                                id="standard-required"
                                label="Email"
                                margin="nromal"
                            />
                        </p>
                        <p className='adduser input manager'>
                            {userDetail.isManagerLoading?
                            <FormControl fullWidth disabled> 
                                <InputLabel htmlFor="name-disabled">Avaliable Mangers List is Loading...</InputLabel>
                                <Select
                                input={<Input name="name" id="name-disabled" />}
                                >
                                </Select>
                            </FormControl>:
                            <FormControl fullWidth >
                                <InputLabel tmlFor="age-simple">Manager</InputLabel>
                                <Select
                                    value={this.state.inputmanager}
                                    onChange={this.handleChange}
                                    input={<Input name="manager" id="age-auto-width" />}
                                    fullWidth
                                >   
                                <MenuItem value=""> None </MenuItem>
                                {Object.keys(userDetail.manager).map(id=>{
                                    return <MenuItem value={id}> {userDetail.manager[id]} </MenuItem>}
                                )}
                                </Select>
                            </FormControl>}
                        </p>
                    </form>
                    </div>
                        <div className='ava-ctn'>
                            {this.state.isuploading?<img src={imgSrc} alt="" />:
                                this.state.uploadedFileCloudinaryUrl?
                                    <img src={this.state.uploadedFileCloudinaryUrl} alt="" />: <img src={imgSrc} alt="" />}
                            <div className = 'img'>
                                <p>Please select a photo as avatar</p>
                                <input type="file" onChange={this.uploadPic} />
                            </div>
                            
                        </div>       
                    </div>
                </div>
                <Snackbar
                        
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        // className={classes.snackbartheme}
                        open={this.state.isuploading}
                        TransitionComponent={this.state.Transition}
                        message={<span>Uploading your avatar, Please Wait!</span>}
                    />
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        userDetail: state.detail
    };
}
const mapDispatchToProps = dispatch =>{
    return {
    createUser:(name,title,sex,sdate,ophone,cphone,sms,email,uploadedFileCloudinaryUrl,managerid,props)=>{
        dispatch(createUser(name,title,sex,sdate,ophone,cphone,sms,email,uploadedFileCloudinaryUrl,managerid,props))
    },
    getManagerList: () => {
        dispatch(getManagerList());
    },}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
