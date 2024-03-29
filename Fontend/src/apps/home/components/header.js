import React from 'react'
import axios from "axios";
import {Link} from 'react-router-dom'
import '../css/header.css'
import '../css/seachbox.css'
import {SearchBox} from "./search";
import './../../common/css/shadow.css'
export class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            is_message_shown:false,
            search:{search_key:'', data:null},
            fileUpload:{
                selectedFile: null,
                selectedMenu :"home"
            },
            isBusiness:false
        };
        this.shMessage = this.shMessage.bind(this);
        this.searchChange = this.searchChange.bind(this);
        this.searchEntered = this.searchEntered.bind(this);
    }
    componentWillMount() {
        axios({
            method: "post",
            url: sessionStorage["ip"]+"/myprofile/getProfile",
            data: {userId:sessionStorage["id"]},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        }).then(res => {
            if(res.status===200){
                this.setState({isBusiness:res.data.data["isBusiness"]})
            }
        })
    }
    shMessage(){
        this.setState({is_message_shown:!this.state.is_message_shown})
    }
    searchEntered(e){
        if(e.keyCode === 13){
            alert("Enter was pressed ");
        }
    }
    searchChange(event) {
        let search = this.state.search;
        search["search_key"] = event.target.value;
        this.setState({search: search}, () => {
            axios({
                method: 'post',
                url: sessionStorage["ip"]+"/app/search_key",
                data: {userId: sessionStorage["id"],search_key:this.state.search.search_key},
                headers: {Authorization: "Token " + sessionStorage["token"]}
            })
            .then(res => {
                if(res.data.data.length!==0){
                    search["data"] = res.data.data;
                    this.setState({search: search});
                }else{
                    search["data"] = null;
                    this.setState({search: search});
                }
            });
            console.log(this.state.search.search_key);
        })
    }
    render() {
        return (
            <header>
                <div id="n_home">
                    <div id="post">
                        <Link to="/"><img id="home" src={require("../icons/home.png")}/></Link>
                    </div>
                    <div id="message">
                        <img src={require('./../images/001-heart.png')} onClick={this.shMessage}/>
                        {this.state.is_message_shown ?
                            <div>
                                <div className="item">
                                    <img src={require('../images/katrina.jpeg')}/>
                                    <div id="pack">
                                        <div id="username">kali.215</div>
                                        <div id="foo">hey there ff!!</div>
                                    </div>
                                    <div id="more">
                                        23 hrs
                                    </div>
                                </div>
                                <div className="item">
                                    <img src={require('../images/smartgirl.jpg')}/>
                                    <div id="pack">
                                        <div id="username">shures.npeli</div>
                                        <div id="foo">hey there !!</div>
                                    </div>
                                    <div id="more">
                                        23 hrs
                                    </div>
                                </div>
                                <div className="item">
                                    <img src={require('../images/smartgirl.jpg')}/>
                                    <div id="pack">
                                        <div id="username">shures.npeli</div>
                                        <div id="foo">hey there !!</div>
                                    </div>
                                    <div id="more">
                                        23 hrs
                                    </div>
                                </div>
                                <div className="item">
                                    <img src={require('../images/large.jpg')}/>
                                    <div id="pack">
                                        <div id="username">samixya_hjr</div>
                                        <div id="foo">hey there ho...!!</div>
                                    </div>
                                    <div id="more">
                                        23 hrs
                                    </div>
                                </div>
                            </div> : null
                        }
                    </div>
                    <div id="notification">
                        <img src={require('./../images/005-money.png')}/>
                        <div style={{display:"none"}}>

                        </div>
                    </div>
                    <div id="ads">
                        <Link to="/follow"><img id="home" src={require("../icons/follower.png")}/></Link>
                        <div style={{display:"none"}}>

                        </div>
                    </div>
                     <div id="trends">
                        <img src={require('./../images/002-heart-1.png')}/>
                        <div style={{display:"none"}}>

                        </div>
                    </div>
                </div>
                <div id="search">
                    <input type="search" value={this.state.search.search_key} placeholder="Search" onChange={this.searchChange} onKeyUp={this.searchEntered}/>
                    <SearchBox data = {this.state.search.data}/>
                </div>
                <div id="title">
                    <img src={require("../images/app_icon.png")} />
                    <span>Tasbiralaya</span>
                </div>
                <div id="account_name">
                    {this.state.isBusiness ? <span>Business Account !!!</span>:<span>Personal Account !!!</span> }
                </div>
            </header>
        )
    }
}