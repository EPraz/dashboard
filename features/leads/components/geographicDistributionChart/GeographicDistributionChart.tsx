import { View } from "react-native";
import {
  VictoryArea,
  VictoryChart,
  VictoryPolarAxis,
  VictoryTheme,
} from "victory-native";

const geographicData = [
  { x: "United State", y: 60 },
  { x: "France", y: 80 },
  { x: "Japan", y: 65 },
  { x: "Australia", y: 90 },
  { x: "South Africa", y: 75 },
  { x: "Brazil", y: 55 },
];

const GeographicDistributionChart = () => {
  const maxValue = 100;

  return (
    <View>
      <VictoryChart
        polar
        height={233}
        width={275}
        theme={VictoryTheme.material}
        padding={{ top: 40, bottom: 40, left: 40, right: 40 }}
        domain={{ y: [0, maxValue] }}
      >
        {/* Ejes radiales (hexágono + círculos/grillas) */}
        <VictoryPolarAxis
          tickValues={geographicData.map((d) => d.x)}
          tickFormat={geographicData.map((d) => d.x)}
          style={{
            axis: { stroke: "#E5E5E5" },
            grid: { stroke: "#F3F3F3" },
            tickLabels: {
              fontSize: 10,
              padding: 10,
            },
          }}
        />
        {/* Anillos internos */}
        <VictoryPolarAxis
          dependentAxis
          //   tickValues={geographicData.map((d) => d.x)}
          //   tickValues={[20, 40, 60, 80, 100]}
          style={{
            axis: { stroke: "transparent" },
            grid: { stroke: "#F5F5F5" },
            tickLabels: { fill: "transparent" },
          }}
        />

        {/* Área/contorno naranja */}
        <VictoryArea
          data={geographicData}
          style={{
            data: {
              fill: "rgba(244, 100, 37, 0.08)",
              stroke: "#F46425",
              strokeWidth: 3,
            },
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default GeographicDistributionChart;
