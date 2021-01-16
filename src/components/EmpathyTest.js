import React from "react";
import bridge from "@vkontakte/vk-bridge";
import { NavLink } from "react-router-dom";

import EmpathyTestData from "../data/EmpathyTestData";

import "../styles/TestPage.css";

class EmpathyTest extends React.Component {
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
    let len = EmpathyTestData.length;

    let response = (
      <div>
        <div className="Counter">
          вопрос {index} из {len}
        </div>
        <div className="Text">{EmpathyTestData[index - 1].text}</div>
      </div>
    );

    return response;
  }

  setNextQuestion(score) {
    let tasks = [
      2,
      5,
      8,
      9,
      10,
      12,
      13,
      15,
      16,
      19,
      21,
      22,
      24,
      25,
      26,
      27,
      29,
      32,
    ];

    let questionNum = this.state.questionNum + 1;
    let sum = this.state.answerSum;

    if (questionNum <= EmpathyTestData.length) {
      let text = EmpathyTestData[questionNum - 1].text;

      if (tasks.includes(questionNum - 1)) {
        sum += score;
      }

      this.setState({ questionNum, text, answerSum: sum });
    } else {
      this.setState({ text: "результаты теста", showResults: true });
    }
  }

  getTestResults() {
    let sum = this.state.answerSum;
    let scores = Math.round((sum * 100) / 90);
    let text = "";

    switch (true) {
      case sum >= 82 && sum <= 90:
        text = `Очень высокий уровень эмпатийности. У вас болезненно развито сопереживание.
        В общении, как барометр, тонко реагируете на настроение собеседника, еще не
        успевшего сказать ни слова. Вам трудно от того, что окружающие используют вас
        в качестве громоотвода, обрушивая на вас эмоциональное состояние. Плохо
        чувствуете себя в присутствии «тяжелых» людей. Взрослые и дети охотно доверяют
        вам свои тайны и идут за советом. Нередко испытываете комплекс вины, опасаясь
        причинить людям хлопоты; не только словом, но даже взглядом боитесь задеть их.
        В то же время сами очень ранимы. Ваша впечатлительность порой долго не дает
        заснуть. Будучи в расстроенных чувствах, нуждаетесь в эмоциональной поддержке
        со стороны. При таком отношении к жизни вы близки к невротическим срывам.
        Побеспокойтесь о психическом здоровье.`;
        break;
      case sum >= 63 && sum <= 81:
        text = `Высокая эмпатийность. Вы чувствительны к нуждам и проблемам окружающих,
        великодушны, склонны многое им прощать. С неподдельным интересом относитесь к
        людям. Вам нравиться «читать» их лица и «заглядывать» в их будущее, вы
        эмоционально отзывчивы, общительны, быстро устанавливаете контакты с окружающими
        и находите общий язык. Должно быть, и дети тянутся к вам. Окружающие ценят вашу
        душевность. Вы стараетесь не допускать конфликты и находить компромиссные решения.
        Хорошо переносите критику в свой адрес. В оценке событий больше доверяете своим
        чувствам и интуиции, чем аналитическим выводам. Предпочитаете работать с людьми,
        нежели в одиночку. Постоянно нуждаетесь в социальном одобрении своих действий.
        При всех перечисленных качествах вы не всегда аккуратны в точной и кропотливой
        работе. Не стоит особого труда вывести вас из равновесия.`;
        break;
      case sum >= 37 && sum <= 62:
        text = `Нормальный уровень эмпатийности, присущий подавляющему большинству людей.
        Окружающие не могут назвать вас «толстокожим», но в то же время вы не относитесь
        к числу особо чувствительных лиц. В межличностных отношениях судить о других
        более склонны по их поступкам, чем доверять своим личным впечатлениям. Вам не
        чужды эмоциональные проявления, но в большинстве своем они находятся под самоконтролем.
        В общении внимательны, стараетесь понять больше, чем сказано словами, но при излишнем
        влиянии чувств собеседника теряете терпение. Затрудняетесь прогнозировать развитие
        отношений между людьми, поэтому, случается, что их поступки оказываются для вас
        неожиданными. У вас нет раскованности чувств, и это мешает вашему полноценному
        восприятию людей.`;
        break;
      case sum >= 12 && sum <= 36:
        text = `Низкий уровень эмпатийности. Вы испытываете затруднения в установлении
        контактов с людьми, неуютно чувствуете себя в большой компании. Эмоциональные проявления
        в поступках окружающих подчас кажутся Вам непонятными и лишенными смысла. Бывает,
        когда чувствуете свою отчужденность, окружающие не слишком жалуют вас вниманием.
        Но это поправимо, если вы раскроете панцирь и станете пристальнее всматриваться в
        поведение близких и принимать их проблемы как свои.`;
        break;
      case sum <= 11:
        text = `Очень низкий уровень. Эмпатийные тенденции личности не развиты. Особенно
        трудны контакты с детьми и лицами, которые намного старше вас. В межличностных
        отношениях нередко оказываетесь в неловком положении. Во многом не находите взаимопонимания
        с окружающими. Любите острые ощущения, спортивные состязания предпочитаете искусству.
        В деятельности слишком сконцентрированы на себе. Вы можете быть очень продуктивны в
        индивидуальной работе, во взаимодействии же с другими не всегда выглядите в лучшем свете.
        Болезненно переносите критику в свой адрес, хотя можете на нее бурно не реагировать.
        Необходима гимнастика чувств.`;
        break;
    }

    return {
      scores,
      text,
    };
  }

  shareTest() {
    bridge.send("VKWebAppShare", {
      link: "https://vk.com/app7713167#test-empathy",
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
                onClick={(e) => this.setNextQuestion(1, e)}
              >
                нет, никогда
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
                почти всегда
              </button>
              <button
                className="AnswerBtn"
                onClick={(e) => this.setNextQuestion(5, e)}
              >
                да, всегда
              </button>
            </div>
          ) : (
            <div>
              <div className="Text">{this.state.text}</div>
              <div className="TextResults">уровень эмпатии (из 100):</div>
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

export default EmpathyTest;
