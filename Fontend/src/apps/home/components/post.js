import React from 'react'
import '../css/post.css';
import axios from "axios";

export class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.post.id,
            caption: this.props.post.caption,
            content: this.props.post.content,
            pp:this.props.post.pp,
            liked: false,
            commented: false,
            likeCount: this.props.post.likeCount,
            commentCount: this.props.post.commentCount,
            date: this.props.post.date,
            username:this.props.post.username,
            fn:this.props.post.fn,
            commentInput: '',
            playPauseVideo: false,
            isImage: 'false',
            isLiked:this.props.post.isLiked,
            comments:this.props.post.comments,
            addr:this.props.post.addr,
            isSaved:false,
        };
        this.handleLike = this.handleLike.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleCommentInput = this.handleCommentInput.bind(this);
        this.playPauseVideo = this.playPauseVideo.bind(this);
        this.handleSaved = this.handleSaved.bind(this);

    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(this.state.postId===this.props.post.id){
            console.log(this.props.post.comments);
            this.setState({likeCount:this.props.post.likeCount,commentCount:this.props.post.commentCount,comments:this.props.post.comments})
        }

    }

    handleSaved() {
        this.setState({isSaved: !this.state.isSaved});
        axios({
            method: 'post',
            data: {userId: sessionStorage["id"], postId: this.state.postId},
            url: sessionStorage["ip"]+"/app/savePost",
            headers: {Authorization: "Token " + sessionStorage["token"]}
        }).then(res => {

        });
    }
    componentWillMount() {
        let dotPosition = this.state.content.lastIndexOf('.');
        let extension = this.state.content.substr(dotPosition + 1);
        if (extension === "mp4") {
            this.setState({isImage: false});
        } else if (extension === "jpg" || extension === "png") {
            this.setState({isImage: true});
        }

    }


    playPauseVideo(event) {
        this.state.playPauseVideo ? event.target.pause() : event.target.play();
        this.setState({playPauseVideo: !this.state.playPauseVideo})

    }

    handleCommentInput(event) {
        this.setState({commentInput: event.target.value})
    }

    handleLike() {
        this.setState({isLiked: !this.state.isLiked});
        axios({
            method: 'post',
            data: {userId: sessionStorage["id"], postId: this.state.postId},
            url: sessionStorage["ip"]+"/app/handleLike",
            headers: {Authorization: "Token " + sessionStorage["token"]}
        })
            .then(res => {

            });
    }

    handleComment(e) {
        if (e.key === "Enter") {
            axios({
                method: 'post',
                data: {userId: sessionStorage["id"], postId: this.state.postId, comment: this.state.commentInput},
                url: sessionStorage["ip"]+"/app/handleComment",
                headers: {Authorization: "Token " + sessionStorage["token"]}
            }).then(res => {
                this.setState({commentInput:''})
            });
        }
    }

    render() {
        return (
            <div className="post">
                <div id="head">
                    <img src={sessionStorage["ip"]+"/media/" + this.state.pp}/>
                    <div id="pack">
                        <div id="name">
                            <span>{this.state.username}</span><span>{this.state.fn}</span>
                        </div>
                        <div id="detail">{this.state.addr}</div>
                    </div>
                </div>
                <div id="caption">
                    {this.state.caption}
                </div>
                <div id="time">{this.state.date}</div>
                <div id="content">
                    {this.state.isImage ? <div id="imagePost">
                            <img src={sessionStorage["ip"]+"/media/" + this.state.content}/>
                        </div> :
                        <div id="videoPost">
                            <video onClick={this.playPauseVideo} loop
                                   poster={sessionStorage["ip"]+"/media/thumbnails/" + this.state.content.replace("mp4", "png")}
                                   preload="none">
                                <source src={sessionStorage["ip"]+"/media/" + this.state.content}/>
                            </video>
                        </div>}
                </div>
                <div id="post_action">
                    {this.state.isLiked ? <img src={require("../images/002-heart-1.png")} onClick={this.handleLike}/> :
                        <img src={require("../images/001-heart.png")} onClick={this.handleLike}/>}
                    <img src={require("../images/003-comment.png")} onClick={this.handleComment}/>
                    <img src={require("../images/004-share.png")}/>
                    <img src={require("../images/005-money.png")} onClick={this.handleSaved}/>
                </div>
                <div id="count">
                    <span>{this.state.likeCount} likes</span>
                    <span>{this.state.commentCount} Comments</span>
                </div>
                <div id="comment">
                    <div id="list">
                        {this.state.comments.map((item,index)=>{
                             return <Comment item={item} key={index}/>
                        })}
                    </div>
                    <div id="add_comment">
                        <input type="text" onKeyPress={this.handleComment} value={this.state.commentInput}
                               onChange={this.handleCommentInput} placeholder="Add a Comment..."/>
                    </div>
                </div>
            </div>

        )
    }
}

class Comment extends React.Component {
    render() {
        return (
            <div className="item">
                <div id="pack">
                    <span>{this.props.item.username}</span>
                    <span>{this.props.item.comment}</span>
                    <img src={require('./../images/001-heart.png')}/>
                </div>
            </div>
        )
    }
}
