import { Pressable, Text, View } from "react-native";

type Props = {
  collapsed: boolean;
  handleSetCollapse: (value: boolean) => void;
};

const Logo = ({ collapsed, handleSetCollapse }: Props) => {
  return (
    <View className={`flex-row items-center justify-start gap-6`}>
      <Pressable
        className={`rounded-full  border-r-2 border border-orange-500 h-[52px] w-[52px]`}
        onPress={() => handleSetCollapse(!collapsed)}
      />
      {!collapsed && (
        <Text className="color-[#121212] w-full font-bold size-8">
          Navigate
        </Text>
      )}
    </View>
  );
};

export default Logo;
