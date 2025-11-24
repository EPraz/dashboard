import { ScrollView, View } from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from "victory-native";

const WINDOW_WIDTH = 645;
const MIN_WIDTH = 400;

// ancho real que usará el chart
const chartWidth = Math.max(WINDOW_WIDTH - 32, MIN_WIDTH);

const chartData = [
  { month: "January", value: 70 },
  { month: "February", value: 100 },
  { month: "March", value: 50 },
  { month: "April", value: 90 },
  { month: "May", value: 75 },
  { month: "June", value: 45 },
];

const LeadConversionBarChart = () => {
  return (
    <View className="">
      {/* Scroll horizontal solo si el chart es más ancho que la pantalla */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <VictoryChart
          width={chartWidth}
          height={260}
          domain={{ y: [0, 100] }}
          theme={VictoryTheme.material}
          padding={{ top: 5, bottom: 50, left: 50, right: 20 }}
          domainPadding={{ x: [50, 50], y: [0, 0] }}
        >
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: "transparent" },
              grid: { stroke: "#E5E7EB", strokeWidth: 1 },
              tickLabels: { fontSize: 14, fill: "#9CA3AF" },
            }}
          />

          <VictoryAxis
            tickValues={chartData.map((d) => d.month)}
            style={{
              axis: { stroke: "#E5E7EB" },
              tickLabels: { fontSize: 14, fill: "#111827" },
            }}
          />

          <VictoryBar
            data={chartData}
            x="month"
            y="value"
            barWidth={55}
            cornerRadius={{ top: 28, bottom: 0 }}
            style={{
              data: {
                fill: ({ datum }) =>
                  datum.month === "May" ? "#F46425" : "#FCCFAC",
              },
            }}
          />
        </VictoryChart>
      </ScrollView>
    </View>
  );
};
export default LeadConversionBarChart;
