import React from "react";
import ReactDOM from "react-dom";
import { useState, useRef } from "react";
import * as d3 from "d3";

function Header() {
  return (
    <header className="hero is-dark is-blod">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">juggler simulate</h1>
        </div>
      </div>
    </header>
  );
}

function HistgramAxis(props) {
  const gref = useRef(null);
  const { bindata, diffdata, chartsize } = props;
  const { chartx, charty, chartw, charth } = chartsize;
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(bindata))
    .range([charth, charty])
    .nice();
  const yTicks = yScale.ticks();

  const Xextent = d3.extent(diffdata);
  const haba = (Xextent[1] - Xextent[0]) / 31;
  const xAxis = [];
  for (let i = 0; i < 31; i++) {
    xAxis.push(
      Math.trunc(Xextent[0] + i * haba) +
        " ~ " +
        Math.trunc(Xextent[0] + (i + 1) * haba)
    );
  }
  const xScale = d3
    .scaleBand()
    .domain(xAxis)
    .range([chartx, chartw])
    .paddingInner(0)
    .paddingOuter(0);

  if (gref == null) {
    return <g></g>;
  }
  d3.select(gref.current)
    .attr("transform", "translate(" + 0 + "," + charth + ")")
    .style("fill", "balck")
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .style("text-anchor", "end")
    .style("fill", "black")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  return (
    <g>
      {/* x軸 */}
      <g id="Xaxis" ref={gref}></g>
      {/* y軸 */}
      <g>
        <line x1={chartx} x2={chartx} y1={charty} y2={charth} stroke="black" />
        {/* y軸目盛 */}
        <g>
          <g>
            <line
              x1={chartx}
              x2={chartw}
              y1={yScale(0)}
              y2={yScale(0)}
              stroke="black"
            ></line>
          </g>
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
    </g>
  );
}

function DrawHistogram(props) {
  const { bindata, diffdata, chartsize } = props;
  const { chartx, charty, chartw, charth } = chartsize;
  const binWidth = (chartw - chartx) / bindata.length;
  const binmax = Math.max(...bindata);
  return (
    <g>
      <HistgramAxis
        bindata={bindata}
        diffdata={diffdata}
        chartsize={chartsize}
      />
      {bindata.map((value, index) => {
        const binHeight = ((charth - charty) * value) / binmax;
        return (
          <g key={index}>
            <title>{value}</title>
            <rect
              id="bin"
              x={chartx + binWidth * index}
              y={charth - binHeight}
              width={binWidth}
              height="0"
              fill="gray"
              stroke="black"
              strokeWidth="1"
            >
              <animate
                id={`${index}draw`}
                attributeName="y"
                begin="startButton2.click"
                dur="0.5s"
                from={charth}
                to={charth - binHeight}
              />
              <animate
                id={`${index}draw`}
                attributeName="height"
                begin="startButton2.click"
                dur="0.5s"
                fill="freeze"
                from={0}
                to={binHeight}
              />
            </rect>
          </g>
        );
      })}
    </g>
  );
}

function App() {
  const [CountGame, setCountGame] = useState(100);
  const CountGameRef = useRef(100); //G数
  const [Flags, setFlags] = useState([...Array(CountGame)]); //フラグ
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

  //1ゲームの差枚を計算する関数
  const onegame = (value, counts) => {
    if (1 / Replay_P > value) {
    } else if (1 / Replay_P + 1 / Grapes_P > value) {
      counts.gp++;
      return (number += 5);
    } else if (1 / Replay_P + 1 / Grapes_P + 1 / Cherry_P > value) {
      counts.cr++;
      return (number -= 1);
    } else if (
      1 / Replay_P + 1 / Grapes_P + 1 / Cherry_P + 1 / A_Big_P >
      value
    ) {
      counts.BB++;
      return (number += 236);
    } else if (
      1 / Replay_P + 1 / Grapes_P + 1 / Cherry_P + 1 / A_Big_P + 1 / A_Reg_P >
      value
    ) {
      counts.RB++;
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
      counts.BB++;
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
      counts.RB++;
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
      counts.BB++;
      number += 237;
    } else {
      number -= 3;
    }
    return number;
  };

  //ゲーム数分の乱数配列を作成
  const creatFlag = () => {
    const newFlag = [0];
    for (let i = 0; i < CountGameRef.current.value; i++) {
      newFlag.push(Math.random());
    }
    return newFlag;
  };

  const [Diff_N, setDiff_N] = useState({
    data: [0],
    counts: {
      BB: 0,
      RB: 0,
      gp: 0,
      cr: 0,
    },
  });

  const creatDiff_N = () => {
    number = 0;
    const counts = { BB: 0, RB: 0, gp: 0, cr: 0 };
    const data = creatFlag().map((value) => onegame(value, counts));

    return { data, counts };
  };

  const [CountTry, setCountTry] = useState([...Array(100)]); //試行回数＝CoumtTryの要素数

  const difference_calc = () => {
    return creatDiff_N().data[CountGameRef.current.value];
  };

  const [difference, setdifference] = useState([1]);

  const width = 700,
    height = 600;
  const chartx = width / 8,
    charty = height / 6,
    chartw = width - 30,
    charth = height - 100;

  const chartsize = { chartx, charty, chartw, charth };

  const xScale = d3
    .scaleLinear()
    .domain([0, CountGame])
    .range([chartx, chartw])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(Diff_N.data))
    .range([charth, charty])
    .nice();

  const xTicks = xScale.ticks();
  const yTicks = yScale.ticks();

  const AllTime = 2;
  const OneTime = AllTime / CountGame;

  const P_text = (x) => {
    if (x !== 0) {
      return "1/" + parseInt(CountGame / x);
    } else {
      return " ";
    }
  };

  const creatBins = (data) => {
    const datamax = Math.max(...data);
    const datamin = Math.min(...data);
    const numbins = 30;
    let bins = new Array(numbins + 1);
    bins.fill(0);
    for (let i = 0; i < data.length; i++) {
      let j = ((data[i] - datamin) * numbins) / (datamax - datamin);
      bins[Math.trunc(j)] += 1;
    }
    return bins;
  };

  const [bins, setbins] = useState([1]);

  return (
    <div>
      <Header />
      <main>
        <section className="section">
          <div>
            {/* 初期設定 */}
            <form>
              <div className="field has-addons">
                {/* リプレ確率 */}
                <div>
                  <label>リプレイ確率</label>
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
                  <label>ブドウ確率</label>
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
                  <label>チェリー確率</label>
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
                  <label>単独BIG確率</label>
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
                  <label>単独REG確率</label>
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
                  <label>チェリー重複BIG確率</label>
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
                  <label>チェリー重複REG確率</label>
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
                  <label>単独チェリーBIG確率</label>
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
                <label className="label">設定</label>
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
                    <label className="label">ゲーム数</label>
                    <input
                      className="input is-large"
                      ref={CountGameRef}
                      type="number"
                      name="Count Game"
                      defaultValue="100"
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
                onClick={() => {
                  setCountGame(CountGameRef.current.value);
                  setDiff_N(creatDiff_N());
                  console.log(creatDiff_N());
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
                <g>
                  <line
                    x1={chartx}
                    x2={chartw}
                    y1={yScale(0)}
                    y2={yScale(0)}
                    stroke="black"
                  ></line>
                </g>
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
              {Diff_N.data.map((value, index) => {
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
                ${yScale(Diff_N.data[index + 1])}`}
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
                ${yScale(Diff_N.data[index + 1])}`}
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
                  <td>ボーナス</td>
                  <td>ビック</td>
                  <td>レギュラー</td>
                  <td>ブドウ</td>
                  <td>チェリー</td>
                </tr>
                <tr>
                  <td> {`${Diff_N.counts.BB + Diff_N.counts.RB}`}</td>
                  <td>{`${Diff_N.counts.BB}`}</td>
                  <td>{`${Diff_N.counts.RB}`}</td>
                  <td>{`${Diff_N.counts.gp}`}</td>
                  <td>{`${Diff_N.counts.cr}`}</td>
                </tr>
                <tr>
                  <td> {`${P_text(Diff_N.counts.BB + Diff_N.counts.RB)}`}</td>
                  <td>{`${P_text(Diff_N.counts.BB)}`}</td>
                  <td>{`${P_text(Diff_N.counts.RB)}`}</td>
                  <td>{`${P_text(Diff_N.counts.gp)}`}</td>
                  <td>{`${P_text(Diff_N.counts.cr)}`}</td>
                </tr>
              </thead>
            </table>
          </div>
          {/* ヒストグラム */}
          <div className="field has-addons">
            {/* 試行回数 */}
            <div>
              <label className="label">試行回数</label>
              <input
                className="input is-large"
                type="number"
                name="Count Try"
                defaultValue="100"
                onChange={(event) => {
                  setCountTry([...Array(Number(event.target.value))]);
                }}
              ></input>
            </div>
          </div>
          {/* チャート */}
          <svg width={width} height={height}>
            {/* スタートボタン */}
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
                id="startButton2"
                x="100"
                y="30"
                rx="5"
                height="25"
                width="80"
                fill="black"
                fillOpacity="0.2"
                stroke="black"
                strokeWidth="1"
                onClick={() => {
                  const result = CountTry.map(() => {
                    return difference_calc();
                  });
                  setdifference(result);
                  setbins(creatBins(result));
                }}
              />
            </g>
            <g>
              <DrawHistogram
                bindata={bins}
                diffdata={difference}
                chartsize={chartsize}
              />
            </g>
          </svg>
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

export default App;
