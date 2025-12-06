import * as theme from "@/tailwind/colors";
import { useColorScheme } from "nativewind";
import { ScrollView, useWindowDimensions, View } from "react-native";
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
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme == "dark";

  const Content = () => (
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
          grid: {
            stroke: isDark ? theme.surface.whiteCardDark : theme.stroke.pale,
          },
          axis: {
            stroke: isDark ? theme.surface.whiteCardDark : theme.stroke.pale,
          },
          tickLabels: {
            fontSize: 10,
            padding: 5,
            fill: isDark ? theme.ink.boldDark : theme.ink.bold,
          },
        }}
      />

      {/* Eje X con nombres de canales */}
      <VictoryAxis
        style={{
          axis: {
            stroke: isDark ? theme.surface.whiteCardDark : theme.stroke.pale,
          },
          tickLabels: {
            fontSize: 10,
            padding: 10,
            fill: isDark ? theme.ink.boldDark : theme.ink.bold,
          },
        }}
      />

      {/* Línea principal */}
      <VictoryLine
        data={leadSourceData}
        interpolation="natural"
        style={{
          data: {
            stroke: theme.surface.primaryNormalConstant,
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
            stroke: theme.surface.primaryNormalConstant,
            strokeWidth: 1,
          },
        }}
      />
    </VictoryChart>
  );

  return (
    <View className="w-full flex-1 bg-surface-whiteCard dark:bg-surface-whiteCardDark">
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
export default LeadSourceBreakdownChart;
