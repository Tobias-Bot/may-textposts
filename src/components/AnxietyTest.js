import React from "react";
import bridge from "@vkontakte/vk-bridge";
import { NavLink } from "react-router-dom";

import AnxietyTestData from "../data/AnxietyTestData";
import testsInfo from "../data/testsInfo";

import "../styles/TestPage.css";

class AnxietyTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      questionNum: 1,

      showResults: false,
      answerSum: 0,
    };

    this.getQuestion = this.getQuestion.bind(this);
    this.setNextQuestion = this.setNextQuestion.bind(this);
    this.getTestResults = this.getTestResults.bind(this);
    this.shareTest = this.shareTest.bind(this);
    this.saveTestResults = this.saveTestResults.bind(this);
  }

  getQuestion() {
    let index = this.state.questionNum;
    let len = AnxietyTestData.length;

    let q = AnxietyTestData[index - 1];

    let btns = q.btns.map((b, i) => {
      return (
        <div key={b.title + i}>
          <button
            className="AnswerBtn"
            onClick={(e) => this.setNextQuestion(b.value, e)}
          >
            {b.title}
          </button>
        </div>
      );
    });

    let response = (
      <div>
        <div className="Counter">
          вопрос {index} из {len}
        </div>
        <div className="Text">{q.text}</div>
        {btns}
      </div>
    );

    return response;
  }

  setNextQuestion(score) {
    let questionNum = this.state.questionNum + 1;
    let sum = this.state.answerSum;

    if (questionNum <= AnxietyTestData.length) {
      let text = AnxietyTestData[questionNum - 1].text;

      sum += score;

      this.setState({ questionNum, text, answerSum: sum });
    } else {
      this.setState({ text: "результаты теста", showResults: true });
    }
  }

  getTestResults() {
    let sum = this.state.answerSum;
    let scores = Math.round((sum * 100) / 49);
    let text = "";

    this.saveTestResults(scores);

    switch (true) {
      case sum > 39 && sum <= 49:
        text = `Очень высокий уровень тревоги`;
        break;
      case sum > 24 && sum <= 39:
        text = `Высокий уровень тревоги`;
        break;
      case sum > 14 && sum <= 24:
        text = `Средний уровень тревоги (с тенденцией к высокому)`;
        break;
      case sum > 4 && sum <= 14:
        text = `Средний уровень тревоги (с тенденцией к низкому)`;
        break;
      case sum >= 0 && sum <= 4:
        text = `Низкий уровень тревоги`;
        break;
      default:
        break;
    }

    return {
      scores,
      text,
    };
  }

  shareTest() {
    bridge.send("VKWebAppShare", {
      link: "https://vk.com/app7713167#test-anxiety",
    });
  }

  saveTestResults(res) {
    let index = testsInfo.findIndex((test) => test.id === this.props.id);
    let test = testsInfo[index];

    bridge.send("VKWebAppStorageSet", {
      key: test.url.substring(1, test.url.length),
      value: `${res}`,
    });
  }

  render() {
    let q = this.getQuestion();
    let showResults = this.state.showResults;
    let results = {};
    let testName = this.props.name;

    if (this.state.text === "результаты теста") {
      results = this.getTestResults();
    }

    return (
      <div>
        <div className="infoText">{testName}</div>
        <div className="QuestionView">
          {!showResults ? (
            <div>{q}</div>
          ) : (
            <div>
              <div className="Text">{this.state.text}</div>
              <div className="TextResults">уровень тревожности (из 100):</div>
              <div className="ScoresResults">{results.scores}</div>
              <div className="progress" style={{ height: 12 + "px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: results.scores + "%" }}
                ></div>
              </div>
              <div className="TextResults">{results.text}</div>
            </div>
          )}
        </div>
        {!showResults ? (
          <NavLink to="/" className="linkStyle">
            <div className="testAbortBtn">выйти в меню</div>
          </NavLink>
        ) : (
          ""
        )}
        {showResults ? (
          <div style={{ textAlign: "center" }}>
            <div className="icon" onClick={this.shareTest}>
              <i className="fas fa-share-square"></i>
            </div>
            <NavLink to="/" className="linkStyle">
              <div
                className="icon"
                onClick={() =>
                  setTimeout(() => {
                    bridge.send("VKWebAppJoinGroup", { group_id: 160404048 });
                  }, 1000)
                }
              >
                <i className="fas fa-stream"></i>
              </div>
            </NavLink>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default AnxietyTest;
