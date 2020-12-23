import React from "react";
import bridge from "@vkontakte/vk-bridge";
import qs from "querystring";

import Post from "./Post";

import "../App.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      friends: [],

      submitProfile: "",
      submitPost: {},
    };

    this.offset = 50;
    this.currOffset = 0;
    this.user_id = 0;
    this.token = "";
    this.comToken =
      "9207d0b2bd3f2aafef7faed922b0125cf19a50468cd7851677ce381757bf24f9ea367d8700be600466816";

    this.loadPosts = this.loadPosts.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.setProfile = this.setProfile.bind(this);
  }

  componentDidMount() {
    this.loadPosts();

    const params = window.location.search.slice(1);
    const obj = qs.parse(params);

    this.user_id = obj.vk_user_id;
  }

  loadPosts() {
    bridge
      .send("VKWebAppGetAuthToken", {
        app_id: 7706189,
        scope: "photos",
      })
      .then((data) => {
        this.token = data.access_token;

        bridge
          .send("VKWebAppCallAPIMethod", {
            method: "photos.get",
            params: {
              owner_id: "-199824380",
              album_id: "276543931",
              count: this.offset,
              offset: this.currOffset,
              v: "5.76",
              access_token: this.token,
            },
          })
          .then((r) => {
            this.setState({ posts: r.response.items });
          });
      });
  }

  setProfile(profile) {
    this.setState({ submitProfiles: profile });
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
