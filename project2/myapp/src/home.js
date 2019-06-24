import React , {Fragment} from 'react';
import Search from './component/search'
import EnhancedTable from './component/usertable'
import {connect} from 'react-redux'
import{ getList, getDetail, delUser,} from './redux/actions';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';

const WithRouterEnhancedTable = withRouter(EnhancedTable);
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={filter:"",page:1}
    }
    
    componentDidMount(){
        this.props.getUserList();
    }

    handleDelete =(id)=>{
        console.log(id)
        // this.props.delUser(id)    
    }

    datafilter =(ele)=>{
        if (ele.fname.toUpperCase().indexOf(this.state.filter.toUpperCase()) > -1 
        || ele.lname.toUpperCase().indexOf(this.state.filter.toUpperCase()) > -1) {return true;}
        return false;
    }

    // changeFilter = (str)=>{
    //     this.setState({filter:str})
    // }

    handleEdit = (id)=>{
        console.log(id)
        console.log(this.props)
        this.props.history.push(`/users/${id}`)
    }
    // <DebounceInput
    // minLength={2}
    // debounceTimeout={300}
    // onChange={event => this.setState({value: event.target.value})} />
    // loadMore =() => {
    //     this.props.getUserList(this.state.page);
    //     console.log(this.state.page)
    //     this.setState({oage:this.state.page+1})
    // }

    render(){
        // console.log(this.state.filter)
        return(
            <Fragment >
                {/* <Search props = {this.props} changeFilter = {this.changeFilter}/> */}
                {/* <a href="/"><button className='btn-adduser'><i class="iconfont">&#xeb8b;</i>Reset</button></a>
                <a href="/add"><button className='btn-adduser'><i class="iconfont">&#xeb8b;</i>Create New User</button></a> */}
                <WithRouterEnhancedTable filter = {this.state.filter} loadMore={this.loadMore} handleEdit = {this.handleEdit} />
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
    getUserList: (page) => {
        dispatch(getList(page));
    },
    getUserDetail: (id) => {
        dispatch(getDetail(id));
    },
    delUser:(id)=>{
        dispatch(delUser(id));
    },}
}
      
export default connect(mapStateToProps, mapDispatchToProps)(Home);
