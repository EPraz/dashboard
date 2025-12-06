import { IconButton } from "@/components";
import { iconLib, iconLibMap } from "@/constants";
import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import TestBarChart, {
  ChartSelector,
} from "../../../features/leads/components/testBarChar/TestBarChar";

type Props = {
  title: string;
  subTitle?: string;
  iconLib?: iconLib;
  iconName?: string;
  value: string;
  valueLabel?: string;
  suffix: string;
  charData: ChartSelector;
};
const MiniGraphic = ({
  title,
  subTitle,
  iconLib = "ion",
  iconName,
  value,
  valueLabel,
  suffix,
  charData,
}: Props) => {
  function getIconLib(iconLib: iconLib): any {
    return iconLibMap[iconLib];
  }
  const Icon = getIconLib(iconLib);

  return (
    <View
      className={` min-w-[312px] flex-1 relative bg-surface-whiteCard dark:bg-surface-whiteCardDark p-5 gap-5 rounded-3xl overflow-hidden`}
    >
      <View className="gap-2">
        <View className="w-full flex-1 flex-row items-center justify-between gap-2">
          <Text className="text-[20px] leading-[130%] font-semibold text-ink-bold dark:text-ink-boldDark">
            {title}
          </Text>
          <IconButton
            disabled
            className="bg-surface-main dark:bg-surface-mainDark"
          >
            <Feather
              name="arrow-up-right"
              className="text-icon-bold dark:text-icon-boldDark"
              size={24}
            />
          </IconButton>
        </View>

        {subTitle && (
          <View className="flex-row gap-2 flex items-center">
            {iconLib && (
              <Icon
                name={iconName as any}
                size={28}
                className="border border-stroke-primaryNormal dark:border-stroke-primaryPaleDark bg-surface-primaryNormal  dark:bg-surface-primaryNormalDark text-ink-main dark:text-ink-mainDark flex items-center justify-center rounded-full w-10 h-10"
              />
            )}
            <Text className="font-semibold leading-[130%] text-[16px] text-ink-bold dark:text-ink-boldDark">
              {subTitle}
            </Text>
          </View>
        )}

        <View className="gap-2 flex-row items-center w-fit">
          <Text className="font-semibold leading-[120%] text-[40px] text-ink-primaryBold dark:text-ink-primaryBoldDark ">
            {value}
          </Text>
          {valueLabel && (
            <Text className="text-[16px] leading-[130%] text-ink-bold dark:text-ink-boldDark">
              {valueLabel}
            </Text>
          )}
        </View>
        <Text className="text-[14px] leading-[120%] text-ink-sheen dark:text-ink-sheenDark ">
          {suffix}
        </Text>
      </View>
      <View className="absolute right-0 bottom-0 -z-10">
        <TestBarChart which={charData} />
      </View>
    </View>
  );
};

export default MiniGraphic;
