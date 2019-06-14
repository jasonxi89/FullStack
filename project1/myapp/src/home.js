import React , {Fragment} from 'react';
import Search from './component/search'
import EnhancedTable from './component/usertable'
import {connect} from 'react-redux'
import{ getList, getDetail, delUser,} from './redux/actions';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={filter:""}
    }
    
    componentDidMount(){
        this.props.getUserList();
    }

    handleDelete =(id)=>{
        this.props.delUser(id)    
    }

    datafilter =(ele)=>{
        if (ele.fname.toUpperCase().indexOf(this.state.filter.toUpperCase()) > -1 
        || ele.lname.toUpperCase().indexOf(this.state.filter.toUpperCase()) > -1) {return true;}
        return false;
    }

    changeFilter = (str)=>{
        this.setState({filter:str})
    }

    handleEdit = (id)=>{
        console.log(id)
        console.log(this.props)
        this.props.history.push(`/users/${id}`)
    }
    render(){
        return(
            <Fragment >
                <Search props = {this.props} changeFilter = {this.changeFilter}/>
                {this.props.userList.isLoading?<div>Loading...</div>:<EnhancedTable handleDelete = {this.handleDelete} handleEdit = {this.handleEdit} data = {this.props.userList.data.filter(this.datafilter)}/>}
                <a href="/add"><button className='btn-adduser'><i class="iconfont">&#xeb8b;</i>Create New User</button></a>
            </Fragment>
        )
    }}


const mapStateToProps = state =>{
    return {
    userList: state.list,
    userDetail: state.detail
    };
}
const mapDispatchToProps = dispatch =>{
    return {
        
    getUserList: () => {
        dispatch(getList());
    },
    getUserDetail: (id) => {
        dispatch(getDetail(id));
    },
    delUser:(id)=>{
        dispatch(delUser(id));
    },}
}
      
export default connect(mapStateToProps, mapDispatchToProps)(Home);
