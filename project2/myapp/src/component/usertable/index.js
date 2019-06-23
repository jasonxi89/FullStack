

import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Row from './row'
import imgSrc from '../../default.jpg'
import axios from 'axios'
import {connect} from 'react-redux'
import{ getList, getDetail, delUser,} from '../../redux/actions';







class Scroll2 extends Component {
  constructor(props) {
    super(props);
    this.initialLoad = true;
    this.state = {
      searchTextValue: "",
      hasMore: true,
      loading: false,
      pageNum: 0,
      data: [],

    };
  }
  // componentDidUpdate() {
  //   this.attachScrollListener();
  // }
  // componentDidMount(){
  //   this.initialLoad = false;
  // }
  showItems=() => {
    return (
    <table>
            <thead className='header'> 
              <tr>
                <th className='ava'></th>
                <th className='name'>Name</th>
                <th className='title'>Title</th>
                <th className='sex'>Sex</th>
                <th className='sdate'>Start Date</th>
                <th className='ophone'>Office Phone</th>
                <th className='cphone'>Cell Phone</th>
                <th className='sms'>SMS</th>
                <th className='email'>Email</th>
                <th className='manager'>Manager</th>
                <th className='numofdr'># of DR</th>
                <th className='edit'></th>
                <th className='delete'></th>
              </tr>
            </thead>

            <tbody>
            
              {this.state.data.map(person=>(
                <tr key={person._id}>
                  <img className='ava' src={person.uploadedFileCloudinaryUrl?person.uploadedFileCloudinaryUrl:imgSrc} alt=""/>
                  <td className='name'>{person.name}</td>
                  <td className='title'>{person.title}</td>
                  <td className='sex'>{person.sex}</td>
                  <td className='sdate'>{person.sdate}</td>
                  <td className='ophone' style={{  color:"blue",cursor:"pointer"}} oonClick = {()=>window.open('tel:' + person.ophone)}>{person.ophone}</td>
                  <td className='cphone' style={{  color:"blue",cursor:"pointer"}} oonClick = {()=>window.open('tel:' + person.cphone)}>{person.cphone}</td>
                  <td className='sms' style={{  color:"blue",cursor:"pointer"}} onClick = {()=>window.open('sms:' + person.sms)}>{person.sms}</td>
                  <td className='email' style={{  color:"blue",cursor:"pointer"}} onClick = {()=>window.open('mailto:' + person.email)}>{person.email}</td>
                  {person.managerid?<td className='manager' onClick={()=>this.handleManagerClick(person.managerid._id)}>{person.managerid.name}</td>:<td className='manager'></td>}
                  <Row onClick={()=>this.handleDRClick(person._id)} id={person._id} />
                  <td className='edit' onClick={()=>this.handleEdit(person._id)}><i class="iconfont">&#xe794;</i>Edit</td>
                  <td className='delete' onClick={()=>this.handleDelete(person._id)}><i class="iconfont">&#xe795;</i>Delete</td>
                </tr>
              ))}
            </tbody>
    </table>
    )
  }
  handleEdit(id){
    this.props.history.push(`/users/${id}`)
  }
  async handleDelete(id){
    await axios.delete(`http://localhost:8888/api/users/${id}`)
    .then(res => {
      this.getData();
    })
    .catch(err => {
      // props.history.push('/users/');
      console.log(err)
    });
  }

  

  componentDidMount(){
    this.initialData();
  }
  getData(){
    axios
    .get(`http://localhost:8888/api/users/?page=0`)
    .then(res => {
      if(res.data.length < 20){
        this.setState({data:res.data,hasMore:false})
        return
      }
      this.setState({data:res.data,loading:false})
      // console.log(this.state.data)
    })
    .catch(err => {
      console.log(err)
    });
  }

  initialData (page){
    axios
          .get(`http://localhost:8888/api/users/?page=${page?page:0}`)
          .then(res => {
            if(res.data.length < 20){
              this.setState({data:this.state.data.concat(res.data),hasMore:false})
              return
            }
            this.setState({data:this.state.data.concat(res.data),loading:false})
          })
          .catch(err => {
            console.log(err)
          });
  }
  
  loadMore(){
    if (this.state.loading) {
      console.log("Test")
      return 
    }
    this.setState({
            loading: true,
            pageNum: this.state.pageNum + 1
        }, () => {
          console.log("hello")
          this.initialData(this.state.pageNum)
        })
    
  }
  


  render() {
    const { total,data} = this.state;
    const {  order, orderBy, selected, rowsPerPage, page } = this.state;
    return (
      <div className="table-ctn-home">   
        <div style={{ height: "100%", overflow: "auto" }}>  
          <InfiniteScroll
            initialLoad={false}
            thedshold={250}
            pageStart={0}
            loadMore={this.loadMore.bind(this)}
            hasMore={!this.state.loading && this.state.hasMore}
            loader={<div className="loader"> Loading... </div>}
            useWindow={true}
          >
            {this.showItems()}{" "}
            {!this.state.hasMore ? <div className="end-text">Finished</div> : ""}
          </InfiniteScroll>{" "}
        </div>{" "}
      </div>
    );
  }

}



const mapStateToProps = state =>{
  return {
  };
}
const mapDispatchToProps = dispatch =>{
  return {
  };
}
    

export default connect(mapStateToProps, mapDispatchToProps)(Scroll2);

