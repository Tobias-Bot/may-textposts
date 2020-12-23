import React from "react";
import bridge from "@vkontakte/vk-bridge";

import "../styles/Post.css";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.sendMes = this.sendMes.bind(this);
  }

  sendMes() {
    bridge.send("VKWebAppShare", { link: "https://vk.com/warmay" });
  }

  render() {
    let post = this.props.data;

    return (
      <div>
        <div className="PostView">
          <div className="PostHeader">
            <button className="ShareBtn" onClick={this.sendMes}>
              <i className="fas fa-paper-plane"></i> отправить
            </button>
          </div>
          <div className="PostText">{post.text}</div>
          <div className="ImgSlot">
            <img
              className="PostImg"
              src={post.picUrl}
              alt="textpost-pic"
              data-toggle="modal"
              data-target="#shareModal"
              onClick={this.loadFriends}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
