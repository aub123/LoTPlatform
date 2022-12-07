import { DotLoading, NavBar, Mask } from "antd-mobile";
import { Canvas, Chart, Line, Axis, Legend } from "@antv/f2";
import _ from "lodash";
import ProductBottom from "./ProductBottom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import OrganizationCard from "./OrganizationCard";
import { Button } from "antd";

const DataQuery = () => {
  const navigate = useNavigate();
  const [cord, setCord] = useState([]);
  const [f, setF] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toQuery = () => {
      const check = () => {
        return sessionStorage["coordinate"] ? true : false;
      };
      const flag = check();
      if (!flag) {
        navigate("/product/query", { replace: true });
        return;
      }
      const arr = JSON.parse(sessionStorage["coordinate"]);
      // console.log(arr);
      const final = [];
      arr.map((item) => {
        for (let left in item) {
          if (left !== "time") {
            final.push({
              value: item[left],
              type: left,
              date: item["time"]
            });
          }
        }
        setCord(final);
        setF(true);
      });
    };
    toQuery();
  }, []);

  // console.log(window);
  if (f) {
    // console.log(f);
    const context = document
      .getElementById("canvas-container")
      .getContext("2d");
    const { props } = (
      <Canvas
        // landscape={true}
        context={context}
        width={window.innerHeight * 5}
        height={window.innerWidth * 0.8}
        pixelRatio={window.devicePixelRatio}
      >
        <Chart data={cord}>
          <Axis
            field="date"
            tickCount={20}
            formatter={(val) => {
              console.log(val.slice(0, 4));

              if (val.slice(0, 4) === "2022") {
                return val
                  .replace("2022-", "")
                  .replace("T", "")
                  .replace(".000Z", "");
              } else {
                return val.replace("T", "").replace(".000Z", "");
              }
            }}
            style={{
              label: { align: "between" }
            }}
          />
          <Axis field="value" />
          <Line x="date" y="value" color="type" />
          <Legend
            position="top"
            style={{
              justifyContent: "space-around"
            }}
            triggerMap={{
              press: (items, records, legend) => {
                const map = {};
                items.forEach((item) => (map[item.name] = _.clone(item)));
                records.forEach((record) => {
                  map[record.type].value = record.value;
                });
                legend.setItems(_.values(map));
              },
              pressend: (items, records, legend) => {
                legend.setItems(items);
              }
            }}
          />
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();
    // console.log(cord[0]);
  }

  return (
    <>
      <NavBar onBack={() => navigate(-1)}>
        <div onClick={() => setVisible(true)}>{sessionStorage["orgname"]}</div>
      </NavBar>
      <Mask visible={visible} onMaskClick={() => setVisible(false)}>
        <OrganizationCard show={visible} />
      </Mask>
      <ProductBottom />
      <Button onClick={() => navigate("/product/query")}>重新查询</Button>
      <div
        style={{
          marginTop: "2vh",
          transform: "rotate(90deg)"
        }}
      >
        <canvas id="canvas-container">{f ? null : <DotLoading />}</canvas>
      </div>
    </>
  );
};

export default DataQuery;
