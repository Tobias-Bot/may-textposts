import React from "react";
import bridge from "@vkontakte/vk-bridge";

import "../App.css";
import "../styles/UserPage.css";

import testsInfo from "../data/testsInfo";
import { NavLink } from "react-router-dom";

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UserInfo: {
        name: "",
        photo: "",
      },

      UserResults: {},
    };

    this.getUserVkData = this.getUserVkData.bind(this);
    this.getTestResults = this.getTestResults.bind(this);
    this.loadTestResults = this.loadTestResults.bind(this);
    this.getCompleteTestsCount = this.getCompleteTestsCount.bind(this);
  }

  componentDidMount() {
    this.getUserVkData();
    this.loadTestResults();
  }

  getUserVkData() {
    bridge.send("VKWebAppGetUserInfo").then((r) => {
      this.setState({ UserInfo: { name: r.first_name, photo: r.photo_100 } });
    });
  }

  loadTestResults() {
    let testNames = testsInfo.map((test) =>
      test.url.substring(1, test.url.length)
    );

    bridge
      .send("VKWebAppStorageGet", {
        keys: testNames,
      })
      .then((r) => {
        let res = {};

        for (let item of r.keys) {
          if (item.value) res[item.key] = item.value;
          else res[item.key] = "";
        }

        this.setState({ UserResults: res });
      });
  }

  getTestResults() {
    let response = [];
    let res = this.state.UserResults;

    response = testsInfo.map((test) => {
      if (test.results) {
        let testName = test.url.substring(1, test.url.length);
        let result = res[testName];

        return (
          <div key={testName} className="Test">
            <div className="TestTitle">
              {test.title + " "} {result ? " (" + result + ")" : ""}
            </div>
            <NavLink className="linkStyle" to={test.url}>
              <div
                className="RunTestBtn"
                style={{ backgroundColor: test.color }}
              >
                <i className="fas fa-play"></i>
              </div>
            </NavLink>
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: result + "%", backgroundColor: test.color }}
                role="progressbar"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        );
      }
    });

    return response;
  }

  getCompleteTestsCount() {
    let i = 0;
    let results = this.state.UserResults;

    for (let key in results) {
      if (results[key]) i++;
    }

    return i;
  }

  render() {
    let userInfo = this.state.UserInfo;
    let results = this.getTestResults();
    let complete = this.getCompleteTestsCount();

    return (
      <div>
        <div className="ProfileCard">
          <div className="row">
            <div className="col-4">
              <img className="UserPhoto" src={userInfo.photo} alt="avatar" />
            </div>
            <div className="col">
              <div className="UserName">{userInfo.name}</div>
              <br />
              <div className="UserText">
                пройдено тестов: {complete} из {testsInfo.length}
              </div>
            </div>
          </div>
        </div>
        <div className="TestResultsCard">{results}</div>
      </div>
    );
  }
}

export default UserPage;
