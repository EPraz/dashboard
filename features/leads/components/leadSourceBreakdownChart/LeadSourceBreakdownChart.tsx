import { View } from "react-native";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory-native";

const leadSourceData = [
  { x: "", y: 39 },
  { x: "Email Campaign", y: 18 },
  { x: "Referral", y: 70 },
  { x: "Organic Search", y: 55 },
  { x: "Paid Ads", y: 25 },
  { x: "Social Media", y: 95 },
];

const LeadSourceBreakdownChart = () => {
  const maxValue = 100;
  return (
    <View>
      <VictoryChart
        theme={VictoryTheme.grayscale}
        height={200}
        width={400}
        padding={{ top: 20, bottom: 40, left: 40, right: 40 }}
        domain={{ y: [0, maxValue] }}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) => `Value\n$${datum.y.toLocaleString()}K`}
            labelComponent={
              <VictoryTooltip
                cornerRadius={4}
                pointerLength={8}
                flyoutStyle={{
                  fill: "black",
                  stroke: "transparent",
                }}
                style={{ fill: "white", fontSize: 10 }}
              />
            }
          />
        }
      >
        {/* Eje Y con labels tipo $20K, $40K... */}
        <VictoryAxis
          dependentAxis
          tickFormat={(t) => `$${t}K`}
          style={{
            grid: { stroke: "#F0F0F0" },
            tickLabels: { fontSize: 10, padding: 5 },
          }}
        />

        {/* Eje X con nombres de canales */}
        <VictoryAxis
          style={{
            axis: { stroke: "#E5E5E5" },
            tickLabels: { fontSize: 10, padding: 10 },
          }}
        />

        {/* Línea principal */}
        <VictoryLine
          data={leadSourceData}
          interpolation="natural"
          style={{
            data: {
              stroke: "#F46425",
              strokeWidth: 2,
            },
          }}
        />

        {/* Puntos con círculo blanco (como en el diseño) */}
        <VictoryScatter
          data={leadSourceData}
          size={5}
          style={{
            data: {
              fill: "white",
              stroke: "#F46425",
              strokeWidth: 1,
            },
          }}
        />
      </VictoryChart>
    </View>
  );
};
export default LeadSourceBreakdownChart;
