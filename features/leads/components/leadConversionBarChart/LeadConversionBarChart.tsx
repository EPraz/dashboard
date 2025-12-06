import * as theme from "@/tailwind/colors";
import { useColorScheme } from "nativewind";
import { ScrollView, useWindowDimensions, View } from "react-native";
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
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme == "dark";
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const Content = () => (
    <VictoryChart
      width={chartWidth}
      height={260}
      domain={{ y: [0, 100] }}
      theme={VictoryTheme.material}
      padding={{ top: 5, bottom: 50, left: 50, right: 20 }}
      domainPadding={{ x: [50, 50], y: [0, 0] }}
    >
      {/* EJE Y */}
      <VictoryAxis
        dependentAxis
        tickFormat={(t) => `${t}%rece`}
        style={{
          axis: { stroke: "transparent" },
          grid: {
            stroke: "transparent",
            strokeWidth: 0,
          },
          tickLabels: {
            fontSize: 12,
            fill: isDark ? theme.ink.boldDark : theme.ink.bold,
          },
        }}
      />

      {/* EJE X */}
      <VictoryAxis
        tickValues={chartData.map((d) => d.month)}
        style={{
          axis: { stroke: "transparent" }, // sin línea de eje
          tickLabels: {
            fontSize: 12,
            fill: isDark ? theme.ink.boldDark : theme.ink.bold,
          },
          grid: {
            stroke: "transparent",
            strokeWidth: 0,
          },
        }}
      />

      <VictoryBar
        data={chartData}
        x="month"
        y="value"
        barWidth={56}
        cornerRadius={{ top: 28, bottom: 0 }}
        style={{
          data: {
            fill: ({ datum }) => {
              const isMay = datum.month === "May";

              if (isMay) {
                // special bar
                return isDark
                  ? theme.surface.primaryNormalDark
                  : theme.surface.primaryNormal;
              }

              // default bars
              return isDark
                ? theme.surface.buttonPrimaryDark
                : theme.surface.primarySheen;
            },
          },
        }}
      />
    </VictoryChart>
  );

  return (
    <View className="w-full flex-1">
      {isMobile ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          style={{ flex: 1 }}
        >
          <View style={{ minWidth: 600 }}>
            <Content />
          </View>
        </ScrollView>
      ) : (
        <Content />
      )}
    </View>
  );
};
export default LeadConversionBarChart;
