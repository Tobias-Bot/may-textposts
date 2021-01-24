import React from "react";
import bridge from "@vkontakte/vk-bridge";
import { NavLink } from "react-router-dom";

import DepressionTestData from "../data/DepressionTestData";

import "../styles/TestPage.css";

class DepressionTest extends React.Component {
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
  }

  getQuestion() {
    let index = this.state.questionNum;
    let len = DepressionTestData.length;

    let response = (
      <div>
        <div className="Counter">
          вопрос {index} из {len}
        </div>
        <div className="Text">{DepressionTestData[index - 1].text}</div>
      </div>
    );

    return response;
  }

  setNextQuestion(score) {
    let questionNum = this.state.questionNum + 1;
    let sum = this.state.answerSum;

    if (questionNum <= DepressionTestData.length) {
      let text = DepressionTestData[questionNum - 1].text;

      this.setState({ questionNum, text });

      if (DepressionTestData[questionNum - 2].revert) {
        switch (score) {
          case 1:
            sum += 4;
            break;
          case 2:
            sum += 3;
            break;
          case 3:
            sum += 2;
            break;
          case 4:
            sum += 1;
            break;
        }
      } else {
        sum += score;
      }

      this.setState({ answerSum: sum });
    } else {
      this.setState({ text: "результаты теста", showResults: true });
    }
  }

  getTestResults() {
    let sum = this.state.answerSum;
    let scores = Math.round((sum * 100) / 80);
    let text = "";

    switch (true) {
      case sum <= 50:
        text = "Состояние без депрессии";
        break;
      case sum > 50 && sum <= 59:
        text = `Состояние легкой депрессии ситуативного или невротического генеза.
        Невротическая депрессия  (или ситуационная депрессия) это один из видов
        нарушений психо-эмоционального состояния личности, зачастую имеющего
        ситуационный характер. Данное заболевание включает в себя проявления сразу
        двух психологических заболеваний: невроза и депрессии. Тем не менее, этот
        факт не указывает на особую тяжесть заболевания, а лишь определяет
        особенности протекания и симптомы.`;
        break;
      case sum >= 60 && sum <= 69:
        text = `Субдепрессивное состояние или маскированная депрессия. При маскированной
        депрессии классические аффективные компоненты депрессии (пониженный эмоциональный
          фон, апатия, уход от контактов с внешним миром и т. д.) могут быть очень
          незначительными или даже совсем отсутствовать. Пациент, как правило, не осознаёт
          депрессивного расстройства. Часто он убежден в наличии у себя какого-либо редкого
          и трудно диагностируемого соматического заболевания, либо имеет какие-либо
          невротические симптомы, расстройства биологического ритма и т.п.`;
        break;
      case sum >= 70:
        text = `Истинное депрессивное состояние. Основными признаками такого состояния являются
        сниженное настроение и снижение или утрата способности получать удовольствие (ангедония).
        Обычно также присутствуют некоторые из следующих симптомов: сниженная самооценка,
        неадекватное чувство вины, пессимизм, нарушение концентрации внимания, усталость или
        отсутствие энергии, расстройства сна и аппетита, суицидальные тенденции. Тяжёлые формы
        депрессии характеризуются так называемой «депрессивной триадой»: снижением настроения,
        заторможенностью мышления и двигательной заторможенностью.`;
        break;
    }

    return {
      scores,
      text,
    };
  }

  shareTest() {
    bridge.send("VKWebAppShare", {
      link: "https://vk.com/app7713167#test-depression",
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
            <div>
              {q}
              <button
                className="AnswerBtn"
                onClick={(e) => this.setNextQuestion(1, e)}
              >
                никогда или изредка
              </button>
              <button
                className="AnswerBtn"
                onClick={(e) => this.setNextQuestion(2, e)}
              >
                иногда
              </button>
              <button
                className="AnswerBtn"
                onClick={(e) => this.setNextQuestion(3, e)}
              >
                часто
              </button>
              <button
                className="AnswerBtn"
                onClick={(e) => this.setNextQuestion(4, e)}
              >
                почти всегда или постоянно
              </button>
            </div>
          ) : (
            <div>
              <div className="Text">{this.state.text}</div>
              <div className="TextResults">уровень депрессии (из 100):</div>
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

export default DepressionTest;
