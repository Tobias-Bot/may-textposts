import React from "react";
import bridge from "@vkontakte/vk-bridge";
import { NavLink } from "react-router-dom";

import SelfValueTestData from "../data/SelfValueTestData";
import testsInfo from "../data/testsInfo";

import "../styles/TestPage.css";

class SelfValueTest extends React.Component {
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
    let len = SelfValueTestData.length;

    let q = SelfValueTestData[index - 1];

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

    if (questionNum <= SelfValueTestData.length) {
      let text = SelfValueTestData[questionNum - 1].text;

      sum += score;

      this.setState({ questionNum, text, answerSum: sum });
    } else {
      this.setState({ text: "результаты теста", showResults: true });
    }
  }

  getTestResults() {
    let sum = this.state.answerSum;
    let scores = Math.round((sum * 100) / 27);
    let text = "";

    this.saveTestResults(scores);

    switch (true) {
      case sum >= 21 && sum <= 27:
        text = `Ваша самоценность находится на достаточно высоком уровне. Вы не дадите
        себя в обиду и сможете о себе позаботиться. Вы слышите себя и ориентируетесь
        на свои чувства и желания в принятии решений. Есть моменты над которыми еще
        можно поработать, но в целом у вас есть ощущение, что вы себе важны и ценны.`;
        break;
      case sum >= 11 && sum <= 20:
        text = `Ваша самоценность напоминает море в период приливов и отливов. Если
        вокруг все спокойно и вы довольны тем, как идут дела, то вы себя цените и
        одобряете. Как только что-то идет не так, вы склонны начать критиковать себя
        или ругать за ошибки. Если вы повысите свою самоценность, то внутри почувствуете
        больше гармонии, спокойствия и удовлетворенности собой. А изменения к лучшему в
        отношениях, карьере, деньгах и здоровье не заставят себя долго ждать.`;
        break;
      case sum >= 0 && sum <= 10:
        text = `Вы почти не цените себя. Для этого вам нужен веский повод. Чаще всего вы
        слышите голос внутреннего критика, который говорит о том, что вы опять все сделали
        не так. Вы уже смирились с тем, что не достаточно хороши, чтобы жить счастливо и
        привыкли терпеть лишения. Внутри много напряжения, грусти и безысходности.`;
        break;
    }

    return {
      scores,
      text,
    };
  }

  shareTest() {
    bridge.send("VKWebAppShare", {
      link: "https://vk.com/app7713167#test-selfvalue",
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
              <div className="TextResults">уровень самоценности (из 100):</div>
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
                onClick={() => setTimeout(() => {
                  bridge.send("VKWebAppJoinGroup", { group_id: 160404048 });
                }, 1000)}
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

export default SelfValueTest;
