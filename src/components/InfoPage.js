import React from "react";
import bridge from "@vkontakte/vk-bridge";

import "../App.css";

class InfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: `Май-тесты — приложение с психологическими тестами, которое поможет тебе лучше узнать себя`,
    };

    this.shareApp = this.shareApp.bind(this);
  }

  componentDidMount() {}

  shareApp() {
    bridge.send("VKWebAppShare", {
      link: "https://vk.com/app7713167",
    });
  }

  render() {
    let info = this.state.info;

    return (
      <div>
        <div className="infoText">{info}</div>
        <div className="btnsTitle"></div>
        <div className="btnsBackground">
          <div className="row mb-4">
            <div className="col">
              <div className="iconMain" onClick={this.shareApp}>
                <i className="fas fa-share-square"></i>
                <span className="iconTitle">поделиться</span>
              </div>
            </div>
            <div className="col">
              <a
                href="https://vk.com/warmay"
                target="_blank"
                rel="noopener noreferrer"
                className="linkStyle"
              >
                <div className="iconMain">
                  <i className="fas fa-door-open"></i>
                  <span className="iconTitle">сообщество</span>
                </div>
              </a>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <a
                href="https://vk.com/im?sel=-160404048"
                target="_blank"
                rel="noopener noreferrer"
                className="linkStyle"
              >
                <div className="iconMain">
                  <i className="fas fa-bug"></i>
                  <span className="iconTitle">сообщить об ошибке</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoPage;
