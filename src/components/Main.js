import React from "react";
import bridge from "@vkontakte/vk-bridge";
import qs from "querystring";
import { Route, HashRouter, Switch, NavLink } from "react-router-dom";
import Transition from "react-transition-group/Transition";

import DepressionTest from "./DepressionTest";
import EmpathyTest from "./EmpathyTest";
import ColorLoveTest from "./ColorLoveTest";
import EQTest from "./EQTest";
import SelfValueTest from "./SelfValueTest";

import "../App.css";

import testsInfo from "../data/testsInfo.js";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testInfo: "",
      headerStyles: {},

      show: false,
    };

    this.getTests = this.getTests.bind(this);
    this.setModalText = this.setModalText.bind(this);
    this.getHeaderStyle = this.getHeaderStyle.bind(this);
    this.showAnimation = this.showAnimation.bind(this);
    this.openMainApp = this.openMainApp.bind(this);
  }

  componentDidMount() {
    this.setState({ headerStyles: this.getHeaderStyle() });

    this.showAnimation();
  }

  showAnimation() {
    this.setState({ show: true });
  }

  getHeaderStyle() {
    const str = window.location.search.slice(1);
    const objParams = qs.parse(str);

    let platform = objParams.vk_platform;

    if (platform === "mobile_iphone") {
      return {
        header: {
          height: "70px",
          paddingTop: "30px",
        },
        body: {
          paddingTop: "20px",
        },
      };
    } else {
      return {};
    }
  }

  setModalText(text) {
    this.setState({ testInfo: text });
  }

  openMainApp() {
    bridge.send("VKWebAppOpenApp", { app_id: 7646928 });
  }

  getTests() {
    let response = testsInfo.map((test, i) => {
      return (
        <div key={i}>
          <Transition in={this.state.show} timeout={100 + i * 150}>
            {(state) => {
              return (
                <div
                  className={"testView-" + state}
                  style={{ backgroundColor: test.color }}
                >
                  <div className="testTitle">{test.title}</div>
                  <button
                    type="button"
                    className="infoBtn"
                    style={{ backgroundColor: test.color }}
                    data-toggle="modal"
                    data-target="#infoModal"
                    onClick={(e) => this.setModalText(test.text, e)}
                  >
                    <i className="fas fa-info-circle"></i> инфо
                  </button>
                  <br />
                  <NavLink to={test.url}>
                    <button
                      type="button"
                      className="testComeInBtn"
                      style={{ borderColor: test.color, color: test.color }}
                    >
                      пройти тест
                    </button>
                  </NavLink>
                  <div className="testCount">
                    кол-во вопросов: {test.questionsCount}
                  </div>
                </div>
              );
            }}
          </Transition>
        </div>
      );
    });

    return response;
  }

  render() {
    let tests = this.getTests();
    let styles = this.state.headerStyles;

    return (
      <div>
        <div className="modal fade" id="infoModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">О тесте</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="testText">{this.state.testInfo}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="Header" style={styles.header}>
          <span className="titleMark" onClick={this.openMainApp}>
            Мαú
          </span>{" "}
          <span className="titleApp">тесты</span>
        </div>
        <div className="Body" style={styles.body}>
          <HashRouter>
            <Switch>
              <Route exact path="/">
                {tests}
              </Route>
              <Route exact path="/test-depression">
                <DepressionTest name="тест на уровень депрессии" />
              </Route>
              <Route exact path="/test-empathy">
                <EmpathyTest name="тест на уровень эмпатии" />
              </Route>
              <Route exact path="/test-colorlove">
                <ColorLoveTest name="как ты любишь" />
              </Route>
              <Route exact path="/test-eq">
                <EQTest name="тест на уровень эмоционального интеллекта" />
              </Route>
              <Route exact path="/test-selfvalue">
                <SelfValueTest name="тест на уровень самоценности" />
              </Route>
            </Switch>
          </HashRouter>
          <a
            href="https://vk.com/warmay"
            className="linkStyle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="copyrightText">Май</div>
          </a>
        </div>
      </div>
    );
  }
}

export default Main;
