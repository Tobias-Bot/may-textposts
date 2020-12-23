import React from "react";

import "../styles/Post.css";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let post = this.props.data;

    return (
      <div className="PostView">
        <div className="PostHeader">
          <button className="ShareBtn">
            <i className="fas fa-paper-plane"></i> отправить
          </button>
        </div>
        <div className="PostText">{post.text}</div>
        <div className="ImgSlot">
          <img className="PostImg" src={post.picUrl} alt="textpost-image" />
        </div>
      </div>
    );
  }
}

export default Post;
