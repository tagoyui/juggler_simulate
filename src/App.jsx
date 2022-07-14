import React from "react";
import ReactDOM from "react-dom";
import { useState, useRef } from "react";
import * as d3 from "d3";
//import * as d3 from "d3";

export default function App() {
  const [CountGame, setCountGame] = useState(0);
  const CountGameRef = useRef(0); //G数
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
  const Diff_N = Flags.map((value) => {
    if (1 / Replay_P > value) {
    } else if (1 / Replay_P + 1 / Grapes_P > value) {
      return (number += 5);
    } else if (1 / Replay_P + 1 / Grapes_P + 1 / Cherry_P > value) {
      return (number -= 1);
    } else if (
      1 / Replay_P + 1 / Grapes_P + 1 / Cherry_P + 1 / A_Big_P >
      value
    ) {
      return (number += 236);
    } else if (
      1 / Replay_P + 1 / Grapes_P + 1 / Cherry_P + 1 / A_Big_P + 1 / A_Reg_P >
      value
    ) {
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
      number += 237;
    } else {
      number -= 3;
    }
    return number;
  });

  const width = 800,
    height = 600;
  const chartx = 100,
    charty = 100,
    chartw = 700,
    charth = 500;

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

  return (
    <div>
      <div>
        {/* 初期設定 */}
        <div>
          {/* 設定 */}
          <div>
            <label>setting</label>
            <select
              name="setting"
              defaultValue="1"
              onChange={(event) => {
                setSetting(event.target.value);
                setGrapes_P(ExistiongGrapes_P[Number(event.target.value) - 1]);
                setCherry_P(ExistiongCherry_P[Number(event.target.value) - 1]);
                setA_Big_P(ExisitiongA_Big_P[Number(event.target.value) - 1]);
                setA_Reg_P(ExisitiongA_Reg_P[Number(event.target.value) - 1]);
                setC_Big_P(ExisitiongC_Big_P[Number(event.target.value) - 1]);
                setC_Reg_P(ExisitiongC_Reg_P[Number(event.target.value) - 1]);
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
          </div>

          {/* リプレ確率 */}
          <div>
            <label>Replay_P</label>
            <input
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
              type="number"
              name="CherryProbability"
              value={Cherry_P}
              onChange={(event) => {
                setCherry_P(event.target.value);
              }}
            ></input>
          </div>

          {/* 単独BIG確率 */}
          <div>
            <label>Alone_BIG_Probability</label>
            <input
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
              type="number"
              name="Alone_REG_Probability"
              value={A_Reg_P}
              onChange={(event) => {
                setA_Reg_P(event.target.value);
              }}
            ></input>
          </div>

          {/* チェリーBIG確率 */}
          <div>
            <label>Cherry_BIG_Probability</label>
            <input
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
              type="number"
              name="Alone_Cherry_BIG_Probability"
              value={A_C_Big_P}
              onChange={(event) => {
                setA_C_Big_P(event.target.value);
              }}
            ></input>
          </div>

          <div>
            {/* G数選択 */}
            <label>Count Game</label>
            <input
              ref={CountGameRef}
              type="number"
              name="Count Game"
              defaultValue="0"
              // onChangeCapture={(event) => {
              //   setCountGame(event.target.value);
              // }}
            ></input>
          </div>
        </div>

        {/* ぼたん */}
        <div>
          <button
            onClick={(event) => {
              const newFlag = [0];
              for (let i = 0; i < CountGameRef.current.value; i++) {
                newFlag.push(Math.random());
              }
              setFlags(newFlag);
              setCountGame(CountGameRef.current.value);
            }}
          >
            Push
          </button>
        </div>
      </div>
      {/* チャート */}
      <svg width={width} height={height}>
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
            if (index < CountGame) {
              return (
                <line
                  key={index}
                  x1={xScale(index)}
                  x2={xScale(index + 1)}
                  y1={yScale(value)}
                  y2={yScale(Diff_N[index + 1])}
                  stroke="black"
                />
              );
            }
          })}
        </g>
      </svg>
    </div>
  );
}
