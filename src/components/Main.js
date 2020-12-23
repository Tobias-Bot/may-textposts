import React from "react";
import bridge from "@vkontakte/vk-bridge";

import Post from "./Post";

import "../App.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };

    this.offset = 50;
    this.currOffset = 0;

    this.loadPosts = this.loadPosts.bind(this);
    this.getPosts = this.getPosts.bind(this);
  }

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts() {
    bridge
      .send("VKWebAppGetAuthToken", {
        app_id: 7706189,
        scope: "photos",
      })
      .then((data) => {
        let token = data.access_token;

        bridge
          .send("VKWebAppCallAPIMethod", {
            method: "photos.get",
            params: {
              owner_id: "-199824380",
              album_id: "276543931",
              count: this.offset,
              offset: this.currOffset,
              v: "5.76",
              access_token: token,
            },
          })
          .then((r) => {
            this.setState({ posts: r.response.items });
          });
      });
  }

  getPosts() {
    let posts = this.state.posts;

    let response = posts.map((post) => {
      let obj = {
        text: post.text,
        picUrl: post.photo_807,
        url: "photo_" + post.owner_id + "_" + post.id,
      };

      return <Post key={post.id} data={obj} />;
    });

    return response;
  }

  render() {
    let posts = this.getPosts();

    return (
      <div>
        <div className="Header"></div>
        <div>{posts}</div>
      </div>
    );
  }
}

export default Main;
