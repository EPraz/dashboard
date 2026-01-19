import { Text, View } from "react-native";

const GeneralProfile = () => {
  return (
    <View className="flex p-5 gap-10 rounded-2xl ">
      <View className="flex flex-row items-center   h-16">
        <View className=" flex flex-1 gap-2">
          <Text className="leading-[120%] text-ink-bold dark:text-ink-boldDark font-semibold text-[28px]">
            General & Profile Settings
          </Text>
          <Text className="text-ink-sheen dark:text-ink-sheenDark text-[18px] leanding-[130%]">
            Customize the basics to make the dashboard work just the way you
            like.
          </Text>
        </View>

        {/* <View className="gap-5 border border-black w-fit flex-row items-center justify-center">
          <IconButton
            disabled
            className="justify-evenly gap-1 h-[51px] w-[140px] p-4 bg-surface-primaryPale dark:bg-surface-primaryPaleDark"
          >
            <Text className="text-[12px] leading-[120%] font-bold text-ink-primaryBold dark:text-ink-primaryBoldDark">
              Cancel
            </Text>
          </IconButton>

          <IconButton
            disabled
            className="justify-evenly gap-2 h-[51px] w-[140px] p-4 bg-surface-primaryNormal dark:bg-surface-primaryNormalDark"
          >
            <Text className="text-[12px] leading-[120%] font-bold text-ink-main dark:text-ink-mainDark">
              Save Changes
            </Text>
          </IconButton>
        </View> */}
      </View>
    </View>
  );
};

export default GeneralProfile;
