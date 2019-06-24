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
import {getManagerList , updateUser, getDetail} from '../redux/actions'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import request from 'superagent';


import Snackbar from '@material-ui/core/Snackbar';



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
            inputname:"",
            inputtitle:"",
            sexinput:"female",
            inputdate:"",
            inputophone:"",
            inputcphone:"",
            inputsms:"",
            inputemail:"",
            inputmanager:"",
            uploadedFileCloudinaryUrl: '',
            isuploading:false,
        }
    }

    componentDidMount(){
        // console.log(this.props.match.params.id)
        this.props.getEmployeeDetail(this.props.match.params.id);
        this.props.getManagerList(this.props.match.params.id);
    }
    handleSubmit = (e)=>{

        e.preventDefault();
        console.log("---------")
        // console.log(this.props)
        console.log(this.props.match.params.id)
        // const id = this.props.match.params.id.toString()
        // id,name,title,sex,sdate,ophone,cphone,sms,email,uploadedFileCloudinaryUrl,managerid,props
        this.props.updateUser(this.props.match.params.id,
                              this.state.inputname?this.state.inputname:this.props.userDetail.data.name,
                              this.state.inputtitle?this.state.inputtitle:this.props.userDetail.data.title,
                              this.state.sexinput?this.state.sexinput:this.props.userDetail.data.sex,
                              this.state.inputdate?this.state.inputdate:this.props.userDetail.data.sdate,
                              this.state.inputophone?this.state.inputophone:this.props.userDetail.data.ophone,
                              this.state.inputcphone?this.state.inputcphone:this.props.userDetail.data.cphone,
                              this.state.inputsms?this.state.inputsms:this.props.userDetail.data.sms,
                              this.state.inputemail?this.state.inputemail:this.props.userDetail.data.email,
                              this.state.uploadedFileCloudinaryUrl?this.state.uploadedFileCloudinaryUrl:this.props.userDetail.data.uploadedFileCloudinaryUrl,
                              this.state.inputmanager?this.state.inputmanager:
                                                    this.props.userDetail.data.managerid?this.props.userDetail.data.managerid.id:"",
                              this.props
            )
        
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
       
        // console.log(userDetail.data)
        return(
            <div className='add-ctn'>
                {!this.props.userDetail.isLoading?
                    <div className='btn-ctn'>
                        <h2>Edit Employee</h2>
                        <button form="myform"  type='submit' className='btn'><i class="iconfont">&#xe606;</i>Submit</button>
                        <button className='btn' onClick={()=>this.props.history.push('/users/')}><i class="iconfont">&#xe603;</i>Back</button>
                        <div className="info-ctn"> 
                            <div className='table-ctn'>
                        <form id="myform" onSubmit={this.handleSubmit}>
                            <p className='adduser input name'>
                                <TextField
                                    // value={this.state.inputname}
                                    defaultValue={userDetail.data.name}
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
                                    defaultValue={userDetail.data.title}
                                    // value={this.state.inputtitle}
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
                                        defaultValue={this.props.userDetail.data.sex}
                                        // value={this.state.sexinput}
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
                                    defaultValue={userDetail.data.sdate}
                                    onChange={e=>{this.setState({inputdate:e.target.value});console.log(e.target.value)}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </p>
                            <p className='adduser input ophone'>
                                <TextField
                                    defaultValue={userDetail.data.ophone}
                                    onChange={this.handleOphoneChange}
                                    required
                                    fullWidth
                                    id="standard-required"
                                    label="Office Phone"
                                    margin="none"
                                />
                            </p>
                            <p className='adduser input cphone'>
                                <TextField
                                    // value={this.state.inputcphone}
                                    defaultValue={userDetail.data.cphone}
                                    onChange={this.handleCphoneChange}
                                    required
                                    fullWidth
                                    id="standard-required"
                                    label="Cell Phone"
                                    margin="none"
                                />
                            </p>
                            <p className='adduser input SMS'>
                                <TextField
                                    // value={this.state.inputsms}
                                    defaultValue={userDetail.data.sms}
                                    onChange={this.handleSMSChange}
                                    required
                                    fullWidth
                                    id="standard-required"
                                    label="SMS"
                                    margin="none"
                                />
                            </p>
                            <p className='adduser input Email'>
                                <TextField
                                    // value={this.state.inputemail}
                                    defaultValue={userDetail.data.email}
                                    onChange={e=>this.setState({inputemail:e.target.value})}
                                    required
                                    fullWidth
                                    id="standard-required"
                                    label="Email"
                                    margin="none"
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
                                        // defaultValue={"5d0fbfb6add7ab6beb7f7b98"}
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
                                {/* {this.props.data.uploadedFileCloudinaryUrl?} */}
                                {this.state.isuploading?<img src={this.props.userDetail.data.uploadedFileCloudinaryUrl?this.props.userDetail.data.uploadedFileCloudinaryUrl:imgSrc} alt="" />:
                                    this.state.uploadedFileCloudinaryUrl?
                                        <img src={this.state.uploadedFileCloudinaryUrl} alt="" />: <img src={this.props.userDetail.data.uploadedFileCloudinaryUrl?this.props.userDetail.data.uploadedFileCloudinaryUrl:imgSrc} alt="" />}
                                <div className = 'img'>
                                    <p>Please select a photo as avatar</p>
                                    <input type="file" onChange={this.uploadPic} />
                                </div>
                                
                            </div>       
                        </div>
                    </div>:
                <h2>Loading...</h2>}
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
    updateUser:(id,name,title,sex,sdate,ophone,cphone,sms,email,uploadedFileCloudinaryUrl,managerid,props)=>{
        dispatch(updateUser(id,name,title,sex,sdate,ophone,cphone,sms,email,uploadedFileCloudinaryUrl,managerid,props));
    },
    getManagerList: (id) => {
        dispatch(getManagerList(id));
    },
    getEmployeeDetail:(id)=>{
        dispatch(getDetail(id));
    }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
