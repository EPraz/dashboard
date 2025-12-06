import * as theme from "@/tailwind/colors";
import { useColorScheme } from "nativewind";
import { ScrollView, useWindowDimensions, View } from "react-native";
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
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme == "dark";
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const Content = () => (
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
        labelPlacement="vertical"
        style={{
          axis: { stroke: isDark ? "transparent" : "#E5E5E5" },
          grid: { stroke: isDark ? "transparent" : "#F3F3F3" },
          tickLabels: {
            fontSize: 10,
            padding: 10,
            fill: isDark ? theme.ink.boldDark : theme.ink.bold,
          },
        }}
      />
      {/* Anillos internos */}
      <VictoryPolarAxis
        dependentAxis
        style={{
          axis: { stroke: "transparent" },
          grid: { stroke: isDark ? "transparent" : "#F5F5F5" },
          tickLabels: { fill: "transparent" },
        }}
      />

      {/* Área/contorno naranja */}
      <VictoryArea
        data={geographicData}
        style={{
          data: {
            fill: isDark ? "transparent" : "rgba(244, 100, 37, 0.08)",
            stroke: theme.surface.primaryNormalConstant,
            strokeWidth: 3,
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

export default GeographicDistributionChart;
