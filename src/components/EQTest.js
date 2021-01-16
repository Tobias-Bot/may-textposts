import React from "react";
import bridge from "@vkontakte/vk-bridge";
import { NavLink } from "react-router-dom";

import EQTestData from "../data/EQTestData";

import "../styles/TestPage.css";

class EQTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      questionNum: 1,

      showResults: false,
      answerSum: 0,

      p1: 0,
      p2: 0,
      p3: 0,
      p4: 0,
      p5: 0,
    };

    this.getQuestion = this.getQuestion.bind(this);
    this.setNextQuestion = this.setNextQuestion.bind(this);
    this.getTestResults = this.getTestResults.bind(this);
    this.shareTest = this.shareTest.bind(this);
  }

  getQuestion() {
    let index = this.state.questionNum;
    let len = EQTestData.length;

    let response = (
      <div>
        <div className="Counter">
          вопрос {index} из {len}
        </div>
        <div className="Text">{EQTestData[index - 1].text}</div>
      </div>
    );

    return response;
  }

  setNextQuestion(score) {
    let questionNum = this.state.questionNum + 1;
    let sum = this.state.answerSum;

    let p1 = this.state.p1;
    let p2 = this.state.p2;
    let p3 = this.state.p3;
    let p4 = this.state.p4;
    let p5 = this.state.p5;

    if (questionNum <= EQTestData.length) {
      let text = EQTestData[questionNum - 1].text;

      this.setState({ questionNum, text });

      let val = questionNum - 1;

      if (
        val === 1 ||
        val === 2 ||
        val === 4 ||
        val === 17 ||
        val === 19 ||
        val === 25
      )
        p1 += score;
      if (
        val === 3 ||
        val === 7 ||
        val === 8 ||
        val === 10 ||
        val === 18 ||
        val === 30
      )
        p2 += score;
      if (
        val === 5 ||
        val === 6 ||
        val === 13 ||
        val === 14 ||
        val === 16 ||
        val === 22
      )
        p3 += score;
      if (
        val === 9 ||
        val === 11 ||
        val === 20 ||
        val === 21 ||
        val === 23 ||
        val === 28
      )
        p4 += score;
      if (val === 12 || val === 15 || val === 24 || val === 26 || val === 27)
        p5 += score;

      sum += score;

      this.setState({ answerSum: sum, p1, p2, p3, p4, p5 });
    } else {
      this.setState({ text: "результаты теста", showResults: true });
    }
  }

  getTestResults() {
    let sum = this.state.answerSum;
    let p1 = Math.round((this.state.p1 * 100) / 18);
    let p2 = Math.round((this.state.p2 * 100) / 18);
    let p3 = Math.round((this.state.p3 * 100) / 18);
    let p4 = Math.round((this.state.p4 * 100) / 18);
    let p5 = Math.round((this.state.p5 * 100) / 15);
    let scores = Math.round((sum * 100) / 90);
    let text = "";

    switch (true) {
      case sum >= 70:
        text = "Высокий уровень эмоционального интеллекта";
        break;
      case sum >= 49 && sum <= 69:
        text = "Средний уровень эмоционального интеллекта";
        break;
      case sum <= 39:
        text = "Низкий уровень эмоционального интеллекта";
        break;
    }

    return {
      scores,
      text,
      p1,
      p2,
      p3,
      p4,
      p5,
    };
  }

  shareTest() {
    bridge.send("VKWebAppShare", {
      link: "https://vk.com/app7713167#test-eq",
    });
  }

  render() {
    let q = this.getQuestion();
    let showResults = this.state.showResults;
    let results = {};

    if (this.state.text === "результаты теста") {
      results = this.getTestResults();
    }

    return (
      <div>
        <div className="QuestionView">
          {!showResults ? (
            <div>
              {q}
              <button
                className="AnswerBtn"
                onClick={(e) => this.setNextQuestion(3, e)}
              >
                Полностью согласен
              </button>
              <button
                className="AnswerBtn"
                onClick={(e) => this.setNextQuestion(2, e)}
              >
                В основном согласен
              </button>
              <button
                className="AnswerBtn"
                onClick={(e) => this.setNextQuestion(1, e)}
              >
                Отчасти согласен
              </button>
              <button
                className="AnswerBtn"
                onClick={(e) => this.setNextQuestion(-1, e)}
              >
                Отчасти не согласен
              </button>
              <button
                className="AnswerBtn"
                onClick={(e) => this.setNextQuestion(-2, e)}
              >
                В основном не согласен
              </button>
              <button
                className="AnswerBtn"
                onClick={(e) => this.setNextQuestion(-3, e)}
              >
                Полностью не согласен
              </button>
            </div>
          ) : (
            <div>
              <div className="Text">{this.state.text}</div>
              <div className="TextResults">уровень EQ (из 100):</div>
              <div className="ScoresResults">{results.scores}</div>
              <div className="progress" style={{ height: 12 + "px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: results.scores + "%" }}
                ></div>
              </div>
              <div className="TextResults">{results.text}</div>
              <br />
              <br />
              <span>Эмоциональная осведомленность</span>
              <div className="progress" style={{ height: 15 + "px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: results.p1 + "%", backgroundColor: "#FFB99D" }}
                ></div>
              </div>
              <br />
              <span>Управление своими эмоциями</span>
              <div className="progress" style={{ height: 15 + "px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: results.p2 + "%", backgroundColor: "#FFF59D" }}
                ></div>
              </div>
              <br />
              <span>Самомотивация</span>
              <div className="progress" style={{ height: 15 + "px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: results.p3 + "%", backgroundColor: "#AFFF9D" }}
                ></div>
              </div>
              <br />
              <span>Эмпатия</span>
              <div className="progress" style={{ height: 15 + "px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: results.p4 + "%", backgroundColor: "#E69DFF" }}
                ></div>
              </div>
              <br />
              <span>Распознавание эмоций других людей</span>
              <div className="progress" style={{ height: 15 + "px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: results.p4 + "%", backgroundColor: "#7DBAFF" }}
                ></div>
              </div>
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
              <div className="icon">
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

export default EQTest;
