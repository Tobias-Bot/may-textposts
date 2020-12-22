import React from "react";
import bridge from "@vkontakte/vk-bridge";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };

    this.offset = 50;
    this.currOffset = 0;

    this.loadPosts = this.loadPosts.bind(this);
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
            request_id: this.currOffset,
            params: {
              owner_id: "-199824380",
              album_id: "276543931",
              count: this.offset,
              offset: this.currOffset,
              v: "5.73",
              access_token: token,
            },
          })
          .then((r) => {
            this.setState({ posts: r.items });
            console.log(r);
          });
      });
  }

  render() {
    

    return <div>Hello</div>;
  }
}

export default Main;
