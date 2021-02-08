import React from "react";
import bridge from "@vkontakte/vk-bridge";
import { NavLink } from "react-router-dom";

import testsInfo from "../data/testsInfo";

import "../styles/TestPage.css";

class ColorLoveTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      questionNum: 1,

      showResults: false,
      answerSum: 0,
    };

    this.colorStyle = {
      width: "50px",
      height: "50px",
      display: "inline",
      borderRadius: "100px",
    };

    this.getTestResults = this.getTestResults.bind(this);
    this.shareTest = this.shareTest.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
    this.saveTestResults = this.saveTestResults.bind(this);
  }

  setAnswer(color) {
    this.setState({
      answerSum: color,
      showResults: true,
      text: "результаты теста",
    });
  }

  getTestResults() {
    let color = this.state.answerSum;
    let text = "";

    this.saveTestResults(color);

    switch (true) {
      case color === "magenta":
        text = `Этот цвет символизирует абсолютную, идеалистическую,
        романтическую любовь, которой вы отдаетесь телом и душой. Когда
        вы любите, ничто не может вас остановить. Вы стремитесь к
        священному союзу и скорее останетесь в одиночестве, чем заведете
        роман с тем, кто вам неинтересен.
        <br />
        <br />
        Кто вам нужен?<br />
        Родственная душа, стремящаяся к абсолютной страсти. Тот, кто
        умеет отрываться от земли и действительно это делает, кто отдает
        себя целиком и способен достичь тех же уровней сознания.
        <br />
        <br />
        Совместимые цвета.<br />
        Красный, который позволит вам заземлиться. Оранжевый: его вы
        можете увлечь своей страстью. И разумеется, другой пурпурный.`;
        break;
      case color === "red":
        text = `Этот цвет символизирует энергию матери-земли. Вы любите
        быть нужным. Вы по-матерински заботитесь о партнере и ежедневно
        укрепляете вашу связь. Ваша самореализация — отдавать себя партнеру,
        следить за его комфортом. Вы поддерживаете, утешаете, ваш дом похож
        на убежище.
        <br />
        <br />
        Кто вам нужен?<br />
        Тот, кто оценит вашу заботу, но при этом умеет быть независимым,
        обладает характером и стремится к прочным отношениям, в идеале —
        к созданию семьи.
        <br />
        <br />
        Совместимые цвета.<br />
        Синий — чувственный, артистичный, ищущий привязанностей. Зеленый —
        щедрый, сентиментальный, отзывчивый; он ценит, когда его холят и
        лелеют. Фиолетовый, ответственный и серьезный; с ним можно создать
        семью.`;
        break;
      case color === "orange":
        text = `Этот цвет символизирует фонтанирующие и взрыво-опасные
        эмоции, воплощает радость жизни, энергию и энтузиазм. В кратких
        ярких романах или долгосрочных отношениях вы одинаково показываете
        себя любовником импульсивным, экстравертным и стремящимся к
        наслаждению. Вы любите без меры, но и без драм.
        <br />
        <br />
        Кто вам нужен?<br />
        Тот, кто не менее сексуален, чем вы, или ждет, что вы его разбудите.
        Партнер, ценящий движение, приключения, праздник, избегающий рутины,
        самокопания и не склонный «усложнять».
        <br />
        <br />
        Совместимые цвета.<br />
        Другой оранжевый, с которым можно жать до отказа на газ. Красный,
        чтобы дать выход вашим эмоциям. Изысканный синий, чтобы реализовать
        ваши таланты.`;
        break;
      case color === "yellow":
        text = `Этот цвет символизирует образ, репутацию, место в социуме.
        Вы уделяете большое внимание одежде, манерам, культуре, равно как
        и статусу. Ваша любовь рациональна, однако вы соблазнитель. Вы
        обожаете флирт, а еще больше любите восхищаться и восхищать.
        <br />
        <br />
        Кто вам нужен?<br />
        Воспитанный, блестящий, могущественный партнер. Личность, внушающая
        уважение, зависть и восхищение. Тот, кого желают все и кого лишь вам
        удалось соблазнить. Тот, с кем вы сможете блистать в обществе.
        <br />
        <br />
        Совместимые цвета.<br />
        Другой желтый, солнечный и амбициозный, придающий вам вес. Фиолетовый
        — требовательный, эффектный, любящий власть.`;
        break;
      case color === "green":
        text = `Этот цвет символизирует чувства, глубокую, щедрую и нежную
        любовь. Вы отдаете и делитесь, стремясь к симбиозу. Когда вы влюбляетесь,
        то вовлечены в роман полностью. Вы цельны, доверчивы и немного наивны,
        видите в партнере лишь положительные стороны и готовы расточать себя без
        оглядки, порой даже чересчур. Вы предупредительны и заботливы и считаете,
        что нужно быть еще и другом для того, кого любите.
        <br />
        <br />
        Кто вам нужен?<br />
        Сентиментальный, альтруистичный идеалист, тот, кто считает любовь и целью,
        и средством и с которым вы можете делить все. Кто-то, перед кем можно
        открыться, не боясь, что партнер вас осудит или ранит.
        <br />
        <br />
        Совместимые цвета.<br />
        Синий — чувствительный, интуитивный и идеалистичный. Зеленый, родственная
        душа. Красный — надежный, внимательный, щедрый.`;
        break;
      case color === "blue":
        text = `Этот цвет символизирует интуицию и артистизм. Вы очень чувствительны
        и доверяетесь тому, что ощущаете. А еще вы экстраверт, оригинально выражающий
        свою любовь. Любовь должна вас вдохновлять, окрылять и быть областью бурных,
        но ясных отношений.
        <br />
        <br />
        Кто вам нужен?<br />
        Партнер спонтанный, естественный, чувствительный, готовый оценить вашу оригинальность,
        но также и раздвинуть границы своих привычек и представлений. Кто-то, кто будет щедро
        делиться своим опытом.
        <br />
        <br />
        Совместимые цвета.<br />
        Оранжевый — авантюрист и энтузиаст. Красный, который будет восхищаться вами, холить и
        лелеять. Пурпурный, который будет вдохновлять вас и создаст между вами сердечную связь.`;
        break;
      case color === "violet":
        text = `Этот цвет символизирует самоконтроль и авторитет. Вы владеете собой, укрощаете
        свои чувства и импульсы. Вы любите выбирать, решать, управлять. В любви вы осторожны.
        Вы склонны к прочным отношениям, предпочтительно с партнерами, ожидающими от вас
        принятия решений и защиты. Вы любите устанавливать рамки и следите, чтобы партнер не
        выходил за них.
        <br />
        <br />
        Кто вам нужен?<br />
        Сдержанный, мягкий партнер, лучше всего восхищенный вами. Вы избегаете экстравертов,
        искателей приключений, соблазнителей.
        <br />
        <br />
        Совместимые цвета.<br />
        Красный, дающий чувство безопасности. Желтый — блестящий и светский. Пурпурный, способный
        внушить любовь с первого взгляда и пробить вашу броню.`;
        break;
      case color === "silver":
        text = `Этот цвет символизирует принятие и способность прислушиваться к себе. В любви он
        представляет чистую женственность, независимо от того, относится он к мужчине или
        женщине. Вы чувствительны и понимаете чувства других, излучаете мягкую и светлую энергию,
        которая влечет, успокаивает и околдовывает.
        <br />
        <br />
        Кто вам нужен?<br />
        Чувствительный, восприимчивый и достаточно зрелый партнер, чтобы принять свое и ваше
        женское начало. Доверие должно быть полным, а общение — живым, легким и изощренным.
        <br />
        <br />
        Совместимые цвета.<br />
        Зеленый — из-за его чувствительности. Синий — из-за его фантазии, чувства прекрасного,
        утонченности. Пурпурный — из-за симбиоза сердца, тела и духа.`;
        break;
    }

    return text;
  }

  shareTest() {
    bridge.send("VKWebAppShare", {
      link: "https://vk.com/app7713167#test-colorlove",
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
    let q = `Этот тест требует, чтобы вы временно отказались от уже
    сложившихся у вас представлений, которые, например, связывают
    красный со страстью. Пройдитесь взглядом по палитре, затем
    спонтанно выберите один из оттенков. Вы должны ощутить особую
    связь именно с этим цветом.`;
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
              <br />
              <br />
              <br />
              <button
                className="AnswerBtn"
                style={{
                  width: "60px",
                  height: "60px",
                  display: "inline",
                  borderRadius: "100px",
                  backgroundColor: "magenta",
                }}
                onClick={(e) => this.setAnswer("magenta", e)}
              ></button>
              <button
                className="AnswerBtn"
                style={{
                  width: "60px",
                  height: "60px",
                  display: "inline",
                  borderRadius: "100px",
                  backgroundColor: "red",
                }}
                onClick={(e) => this.setAnswer("red", e)}
              ></button>
              <button
                className="AnswerBtn"
                style={{
                  width: "60px",
                  height: "60px",
                  display: "inline",
                  borderRadius: "100px",
                  backgroundColor: "orange",
                }}
                onClick={(e) => this.setAnswer("orange", e)}
              ></button>
              <button
                className="AnswerBtn"
                style={{
                  width: "60px",
                  height: "60px",
                  display: "inline",
                  borderRadius: "100px",
                  backgroundColor: "yellow",
                }}
                onClick={(e) => this.setAnswer("yellow", e)}
              ></button>
              <button
                className="AnswerBtn"
                style={{
                  width: "60px",
                  height: "60px",
                  display: "inline",
                  borderRadius: "100px",
                  backgroundColor: "green",
                }}
                onClick={(e) => this.setAnswer("green", e)}
              ></button>
              <button
                className="AnswerBtn"
                style={{
                  width: "60px",
                  height: "60px",
                  display: "inline",
                  borderRadius: "100px",
                  backgroundColor: "blue",
                }}
                onClick={(e) => this.setAnswer("blue", e)}
              ></button>
              <button
                className="AnswerBtn"
                style={{
                  width: "60px",
                  height: "60px",
                  display: "inline",
                  borderRadius: "100px",
                  backgroundColor: "purple",
                }}
                onClick={(e) => this.setAnswer("violet", e)}
              ></button>
              <button
                className="AnswerBtn"
                style={{
                  width: "60px",
                  height: "60px",
                  display: "inline",
                  borderRadius: "100px",
                  backgroundColor: "silver",
                }}
                onClick={(e) => this.setAnswer("silver", e)}
              ></button>
            </div>
          ) : (
            <div>
              <div className="Text">{this.state.text}</div>
              <div
                className="TextResults"
                dangerouslySetInnerHTML={{ __html: results }}
              ></div>
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
            <NavLink
              to="/"
              className="linkStyle"
              onClick={() =>
                setTimeout(() => {
                  bridge.send("VKWebAppJoinGroup", { group_id: 160404048 });
                }, 1000)
              }
            >
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

export default ColorLoveTest;
