import React, { Component } from 'react';
const imgscrCom ="https://s3.amazonaws.com/temp-for-interview/design_images/misc/comment.png";
const imgscrCrown ="https://s3.amazonaws.com/temp-for-interview/design_images/misc/crown.png";
const imgscrLikeEm ="https://s3.amazonaws.com/temp-for-interview/design_images/misc/like-empty.png";
const imgscrLikeFi ="https://s3.amazonaws.com/temp-for-interview/design_images/misc/like-filled.png";
const imgscrShare ="https://s3.amazonaws.com/temp-for-interview/design_images/misc/share.png";


class App extends Component{
    constructor(props){
        super(props);
        this.state={
            liked:this.props.liked
        }
    }
    handleClick = ()=> {
        this.setState({liked:!this.state.liked})
    }
    render(){
        if(this.props.user && this.props.post){
            // console.log(this.props)
        return (
            <div className="post-container">
                    <div className="top-post-container">
                        <img src={this.props.user.image}  className ="avatar" alt=""/> 
                        <div className="post-top-right">
                            <div className="post-user">{this.props.user.name} {this.props.user.crown?<img src={imgscrCrown} alt=""/>:""}</div>
                            <div className="login-time">{this.props.user.last_sign_in} min ago</div>
                        </div>
                    </div>
                    <div className="mid-post-container">
                        <img src = {this.props.post.image} alt='' />
                    </div>
                    <div className="mid-post-container-btn">
                        <div className="first-mid-post-container-btn" onClick={()=>this.handleClick()}>
                            {this.state.liked?
                                <img src={imgscrLikeFi} alt="" />:
                                <img src={imgscrLikeEm} alt="" />}
                        </div>
                        <div className="second-mid-post-container-btn">
                            <img src={imgscrCom} alt="" />
                        </div>
                        <div className="third-mid-post-container-btn">
                            <img src={imgscrShare} alt="" />
                        </div>
                    </div>
                    <div className="post-container-commment">
                        <div className ="comment-user-name">Bella</div>
                        <div className ="comment">{this.props.post.title}</div>
                    </div>
                    <div className="post-container-likecomts">
                        {this.props.post.likes} likes, {this.props.post.comments} comments
                    </div>
            </div>
        );}else{
            console.log("hello")
            return(
                <div>isLoading</div>
            )
        }}
}

export default App;