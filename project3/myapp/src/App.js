import { connect } from 'react-redux';
import React, { Component } from 'react';
// import { getList } from "./redux/actions"
import Post from './component/post'
import './App.css';
import { getData, likeClick} from './redux/actions';

class App extends Component {

  componentDidMount(){
    this.props.getPostList();
  }
  
  render(){

  const {postList, users, currentuserliked} = this.props;
  return (
    <div className="web-container">
        {postList.map((post, index)=>{
          return(
            <Post key={index} user={users.filter(user => user.id === post.user)[0]} likeClick={this.props.handlelikeClick(index)} post={post} liked={currentuserliked.includes(index)} />
          )
        })}
    </div>
  );}
}



const mapStateToProps = state => {
  return {
    postList:state.data.designs,
    users:state.data.users,
    currentuserliked:state.data.current_user.liked_designs,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPostList: () => {
      dispatch(getData());
    },
    handlelikeClick:(id) =>{
      dispatch(likeClick(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
