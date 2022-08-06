import React from "react";
import ReactDOM from "react-dom";
import { useState, useRef } from "react";
import * as d3 from "d3";

export default function App() {
  const [CountGame, setCountGame] = useState(10);
  const CountGameRef = useRef(10); //G数
  const [Flags, setFlags] = useState([...Array(CountGame)]); //フラグ
  const settingcount = 6; //設定は6段階
  const [Setteing, setSetting] = useState(1); //設定
  const [Replay_P, setReplay_P] = useState(7.3); //リプレイ確率
  const ExistiongGrapes_P = [5.92, 5.84, 5.84, 5.84, 5.76, 5.76]; //設定ごとのブドウ確率
  const [Grapes_P, setGrapes_P] = useState(ExistiongGrapes_P[0]); //ブドウ確率
  const ExistiongCherry_P = [38.3, 37.2, 36.4, 35.6, 35.6, 35.6]; //設定ごとのチェリー確率
  const [Cherry_P, setCherry_P] = useState(ExistiongCherry_P[0]); //チェリー確率
  const ExisitiongA_Big_P = [413.56, 400, 394.01, 382.26, 346.5, 334.89]; //単独BIG
  const [A_Big_P, setA_Big_P] = useState(ExisitiongA_Big_P[0]); //
  const ExisitiongA_Reg_P = [628.93, 598.8, 498, 402.25, 381.67, 330.59]; //単独REG
  const [A_Reg_P, setA_Reg_P] = useState(ExisitiongA_Reg_P[0]); //
  const ExisitiongC_Big_P = [
    1388.88, 1388.88, 1285.34, 1149.42, 1240.69, 1199.04,
  ]; //チェリBIG
  const [C_Big_P, setC_Big_P] = useState(ExisitiongC_Big_P[0]); //
  const ExisitiongC_Reg_P = [1041.66, 1173.7, 1075.26, 1057.08, 871.08, 814.33]; //チェリREG
  const [C_Reg_P, setC_Reg_P] = useState(ExisitiongC_Reg_P[0]); //
  const ExisitiongA_C_Big_P = [
    3267.97, 3597.12, 3731.34, 3401.36, 3333.33, 3676.47,
  ]; //単独BIG
  const [A_C_Big_P, setA_C_Big_P] = useState(ExisitiongA_C_Big_P[0]);

  // 差枚
  var number = 0;

  var BBcount = 0;
  var RBcount = 0;
  var grapecount = 0;
  var cherrycount = 0;

  const Diff_N = Flags.map((value) => {
    if (1 / Replay_P > value) {
    } else if (1 / Replay_P + 1 / Grapes_P > value) {
      grapecount++;
      return (number += 5);
    } else if (1 / Replay_P + 1 / Grapes_P + 1 / Cherry_P > value) {
      cherrycount++;
      return (number -= 1);
    } else if (
      1 / Replay_P + 1 / Grapes_P + 1 / Cherry_P + 1 / A_Big_P >
      value
    ) {
      BBcount++;
      return (number += 236);
    } else if (
      1 / Replay_P + 1 / Grapes_P + 1 / Cherry_P + 1 / A_Big_P + 1 / A_Reg_P >
      value
    ) {
      RBcount++;
      return (number += 92);
    } else if (
      1 / Replay_P +
        1 / Grapes_P +
        1 / Cherry_P +
        1 / A_Big_P +
        1 / A_Reg_P +
        1 / C_Big_P >
      value
    ) {
      BBcount++;
      number += 238;
    } else if (
      1 / Replay_P +
        1 / Grapes_P +
        1 / Cherry_P +
        1 / A_Big_P +
        1 / A_Reg_P +
        1 / C_Big_P +
        1 / C_Reg_P >
      value
    ) {
      RBcount++;
      number += 94;
    } else if (
      1 / Replay_P +
        1 / Grapes_P +
        1 / Cherry_P +
        1 / A_Big_P +
        1 / A_Reg_P +
        1 / C_Big_P +
        1 / C_Reg_P +
        1 / A_C_Big_P >
      value
    ) {
      BBcount++;
      number += 237;
    } else {
      number -= 3;
    }
    return number;
  });

  const width = 600,
    height = 500;
  const chartx = width / 8,
    charty = height / 6,
    chartw = width - 30,
    charth = height - 50;

  const xScale = d3
    .scaleLinear()
    .domain([0, CountGame])
    .range([chartx, chartw])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(Diff_N))
    .range([charth, charty])
    .nice();

  const xTicks = xScale.ticks();
  const yTicks = yScale.ticks();

  const AllTime = 1;
  const OneTime = AllTime / CountGame;

  const P_text = (x) => {
    if (x !== 0) {
      return "1/" + parseInt(CountGame / x);
    } else {
      return " ";
    }
  };

  return (
    <div>
      <header className="hero is-dark is-blod">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">juggler simulate</h1>
          </div>
        </div>
      </header>
      <main>
        <section className="section">
          <div>
            {/* 初期設定 */}
            <form>
              <div className="field has-addons">
                {/* リプレ確率 */}
                <div>
                  <label>Replay_P</label>
                  <input
                    className="input is-small"
                    type="number"
                    name="Replay_P"
                    value={Replay_P}
                    onChange={(event) => {
                      setReplay_P(event.target.value);
                    }}
                  ></input>
                </div>
                {/* ブドウ確率 */}
                <div>
                  <label>Grapes_P</label>
                  <input
                    className="input is-small"
                    type="number"
                    name="Grapes_P"
                    value={Grapes_P}
                    onChange={(event) => {
                      setGrapes_P(event.target.value);
                    }}
                  ></input>
                </div>

                {/* チェリー確率 */}
                <div>
                  <label>CherryProbability</label>
                  <input
                    className="input is-small"
                    type="number"
                    name="CherryProbability"
                    value={Cherry_P}
                    onChange={(event) => {
                      setCherry_P(event.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="field has-addons">
                {/* 単独BIG確率 */}
                <div>
                  <label>Alone_BIG_Probability</label>
                  <input
                    className="input is-small"
                    type="number"
                    name="Alone_BIG_Probability"
                    value={A_Big_P}
                    onChange={(event) => {
                      setA_Big_P(event.target.value);
                    }}
                  ></input>
                </div>

                {/* 単独REG確率 */}
                <div>
                  <label>Alone_REG_Probability</label>
                  <input
                    className="input is-small"
                    type="number"
                    name="Alone_REG_Probability"
                    value={A_Reg_P}
                    onChange={(event) => {
                      setA_Reg_P(event.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="field has-addons">
                {/* チェリーBIG確率 */}
                <div>
                  <label>Cherry_BIG_Probability</label>
                  <input
                    className="input is-small"
                    type="number"
                    name="Cherry_BIG_Probability"
                    value={C_Big_P}
                    onChange={(event) => {
                      setC_Big_P(event.target.value);
                    }}
                  ></input>
                </div>

                {/* チェリーREG確率 */}
                <div>
                  <label>Cherry_REG_Probability</label>
                  <input
                    className="input is-small"
                    type="number"
                    name="Cherry_REG_Probability"
                    value={C_Reg_P}
                    onChange={(event) => {
                      setC_Reg_P(event.target.value);
                    }}
                  ></input>
                </div>

                {/* 単独チェリ－BIG確率 */}
                <div>
                  <label>Alone_Cherry_BIG_Probability</label>
                  <input
                    className="input is-small"
                    type="number"
                    name="Alone_Cherry_BIG_Probability"
                    value={A_C_Big_P}
                    onChange={(event) => {
                      setA_C_Big_P(event.target.value);
                    }}
                  ></input>
                </div>
              </div>
              {/* 設定 */}
              <div className="field">
                <label className="label">setting</label>
                <select
                  className="select is-large"
                  name="setting"
                  defaultValue="1"
                  onChange={(event) => {
                    setSetting(event.target.value);
                    setGrapes_P(
                      ExistiongGrapes_P[Number(event.target.value) - 1]
                    );
                    setCherry_P(
                      ExistiongCherry_P[Number(event.target.value) - 1]
                    );
                    setA_Big_P(
                      ExisitiongA_Big_P[Number(event.target.value) - 1]
                    );
                    setA_Reg_P(
                      ExisitiongA_Reg_P[Number(event.target.value) - 1]
                    );
                    setC_Big_P(
                      ExisitiongC_Big_P[Number(event.target.value) - 1]
                    );
                    setC_Reg_P(
                      ExisitiongC_Reg_P[Number(event.target.value) - 1]
                    );
                    setA_C_Big_P(
                      ExisitiongA_C_Big_P[Number(event.target.value) - 1]
                    );
                  }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>

                <div className="field has-addons">
                  <div>
                    {/* G数選択 */}
                    <label className="label">Count Game</label>
                    <input
                      className="input is-large"
                      ref={CountGameRef}
                      type="number"
                      name="Count Game"
                      defaultValue="10"
                    ></input>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* チャート */}
          <svg width={width} height={height}>
            <g>
              <text
                x="140"
                y="52.5"
                textAnchor="middle"
                dominantBaseline="middle"
                className="button"
              >
                start
              </text>
              <rect
                className="button"
                id="startButton"
                x="100"
                y="30"
                rx="5"
                height="25"
                width="80"
                fill="black"
                fillOpacity="0.2"
                stroke="black"
                strokeWidth="1"
                onClick={(event) => {
                  const newFlag = [0];
                  for (let i = 0; i < CountGameRef.current.value; i++) {
                    newFlag.push(Math.random());
                  }
                  setFlags(newFlag);
                  setCountGame(CountGameRef.current.value);
                }}
              />
            </g>
            {/* x軸 */}
            <g>
              <line
                x1={chartx}
                x2={chartw}
                y1={charth}
                y2={charth}
                stroke="black"
              />
              {/* x軸目盛 */}
              <g>
                {xTicks.map((xTick) => {
                  return (
                    <g key={xTick}>
                      <line
                        x1={xScale(xTick)}
                        x2={xScale(xTick)}
                        y1={charth}
                        y2={charth + 10}
                        stroke="black"
                      />
                      <text
                        fontSize="12"
                        textAnchor="middle"
                        x={xScale(xTick)}
                        y={charth + 25}
                      >
                        {xTick}
                      </text>
                    </g>
                  );
                })}
              </g>
            </g>

            {/* y軸 */}
            <g>
              <line
                x1={chartx}
                x2={chartx}
                y1={charty}
                y2={charth}
                stroke="black"
              />
              {/* y軸目盛 */}
              <g>
                {yTicks.map((yTick) => {
                  return (
                    <g key={yTick}>
                      <line
                        x1={chartx - 10}
                        x2={chartx}
                        y1={yScale(yTick)}
                        y2={yScale(yTick)}
                        stroke="black"
                      ></line>
                      <text
                        fontSize="12"
                        dominantBaseline="middle"
                        textAnchor="end"
                        x={chartx - 20}
                        y={yScale(yTick)}
                      >
                        {yTick}
                      </text>
                    </g>
                  );
                })}
              </g>
            </g>

            {/* コンテンツ */}
            <g>
              {console.log(Diff_N)}
              {Diff_N.map((value, index) => {
                if (index === 0) {
                  return (
                    <g key={index}>
                      <title>
                        Gamecount:{index},差枚{value}
                      </title>
                      <path d="" stroke="black" strokeWidth="0.5%">
                        <animate
                          id={`${index}draw`}
                          attributeName="d"
                          begin="startButton.click"
                          dur={`${OneTime}s`}
                          fill="freeze"
                          from={`M
                ${xScale(index)}
                ${yScale(value)}
                L
                ${xScale(index)}
                ${yScale(value)}`}
                          to={`M
                ${xScale(index)}
                ${yScale(value)}
                L
                ${xScale(index + 1)}
                ${yScale(Diff_N[index + 1])}`}
                        />
                      </path>
                    </g>
                  );
                } else {
                  return (
                    <g key={index}>
                      <title>
                        Gamecount:{index},差枚{value}
                      </title>
                      <path d="" stroke="black" strokeWidth="0.5%">
                        <animate
                          id={`${index}draw`}
                          attributeName="d"
                          begin={`${index - 1}draw.end`}
                          dur={`${OneTime}s`}
                          end="startButton.click"
                          fill="freeze"
                          from={`M
                ${xScale(index)}
                ${yScale(value)}
                L
                ${xScale(index)}
                ${yScale(value)}`}
                          to={`M
                ${xScale(index)}
                ${yScale(value)}
                L
                ${xScale(index + 1)}
                ${yScale(Diff_N[index + 1])}`}
                        />
                        <set
                          attributeName="d"
                          to="M 0 0"
                          begin="startButton.click"
                        />
                      </path>
                    </g>
                  );
                }
              })}
            </g>
          </svg>
          <div className="is-fullwidth">
            <table align="center" className="table is-striped ">
              <thead align="center">
                <tr>
                  <td>BONUS</td>
                  <td>BB</td>
                  <td>RB</td>
                  <td>grape</td>
                  <td>cherry</td>
                </tr>
                <tr>
                  <td> {`${BBcount + RBcount}`}</td>
                  <td>{`${BBcount}`}</td>
                  <td>{`${RBcount}`}</td>
                  <td>{`${grapecount}`}</td>
                  <td>{`${cherrycount}`}</td>
                </tr>
                <tr>
                  <td> {`${P_text(BBcount + RBcount)}`}</td>
                  <td>{`${P_text(BBcount)}`}</td>
                  <td>{`${P_text(RBcount)}`}</td>
                  <td>{`${P_text(grapecount)}`}</td>
                  <td>{`${P_text(cherrycount)}`}</td>
                </tr>
              </thead>
            </table>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>yuisuro</p>
        </div>
      </footer>
    </div>
  );
}
