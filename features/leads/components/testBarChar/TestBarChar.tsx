import { ScrollView, View } from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from "victory-native";

const chartData = [
  { month: "January", value: 70 },
  { month: "February", value: 80 },
  { month: "March", value: 50 },
  { month: "April", value: 80 },
  { month: "May", value: 65 },
  { month: "June", value: 100 },
];

const chartData2 = [
  { month: "January", value: 70 },
  { month: "February", value: 80 },
  { month: "March", value: 50 },
  { month: "April", value: 80 },
  { month: "May", value: 100 },
  { month: "June", value: 65 },
];
const chartData3 = [
  { month: "January", value: 70 },
  { month: "February", value: 80 },
  { month: "March", value: 50 },
  { month: "April", value: 80 },
  { month: "May", value: 100 },
  { month: "June", value: 120 },
];
export type ChartSelector = "chartData" | "chartData2" | "chartData3";
const TestBarChart = ({ which = "chartData" }: { which?: ChartSelector }) => {
  const chartDataMap: Record<ChartSelector, any> = {
    chartData,
    chartData2,
    chartData3,
  };

  function getChartData(which: ChartSelector): any {
    return chartDataMap[which];
  }
  const data = getChartData(which);

  const visibleData = data.slice(-4);

  return (
    <View className="">
      {/* Scroll horizontal solo si el chart es más ancho que la pantalla */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <VictoryChart
          width={162}
          height={130}
          domain={{ y: [0, 100] }}
          theme={VictoryTheme.grayscale}
          padding={{ top: 5, bottom: 0, left: 5, right: 0 }}
          domainPadding={{ x: [25, 15], y: [30, 30] }}
        >
          {/* Eje X oculto */}
          <VictoryAxis
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              tickLabels: { fill: "transparent" },
              grid: { stroke: "transparent" },
            }}
          />

          {/* Eje Y oculto */}
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              tickLabels: { fill: "transparent" },
              grid: { stroke: "transparent" },
            }}
          />
          <VictoryBar
            data={visibleData.slice(-4)}
            x="month"
            y="value"
            barWidth={36}
            cornerRadius={{ top: 18, bottom: 0 }}
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
export default TestBarChart;
