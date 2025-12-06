import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";
const Robot = require("../../../assets/images/robot.png");

const PublicityBox = () => {
  return (
    <View className="relative overflow-hidden">
      <LinearGradient
        colors={["#F46425", "#F5B40B"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          borderRadius: 20,
          padding: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 312,
          minHeight: 170,
          height: 310,
        }}
        className=""
      >
        <View className="gap-2 p-5 flex-row flex ">
          <View className="w-[60%] gap-5 z-10">
            <Text className="text-white text-[40px] leading-[120%] font-semibold">
              SuperCharge Your Strategy with Campify AI
            </Text>

            <Pressable onPress={() => Keyboard.dismiss()} className="relative">
              <View className="hidden lg:flex flex-row items-center  h-[52px] gap-3 px-5 rounded-[100px] bg-[#F7F7F7]">
                <TextInput
                  placeholder="Can I help you today?"
                  placeholderTextColor="#F46425"
                  className="flex-1 text-[14px] outline-none focus:outline-none focus:ring-0"
                  returnKeyType="search"
                  submitBehavior="blurAndSubmit"
                />
                <MaterialCommunityIcons
                  name="star-plus"
                  color="#fff"
                  size={24}
                  className="rounded-full p-2 absolute right-2 bg-[#F46425] "
                />
              </View>
            </Pressable>

            <View className="flex-row gap-5">
              <Pressable className="relative border-white bg-transparent w-fit border rounded-full px-3 py-1 flex-row items-center justify-evenly">
                <Feather name="file-plus" color="#fff" size={17} />
                <Text className="text-white"> Analyze Your Data</Text>
              </Pressable>
              <Pressable className="relative border-white bg-transparent w-fit border rounded-full px-3 py-1 flex-row items-center justify-evenly">
                <MaterialCommunityIcons
                  name="star-plus"
                  color="#fff"
                  size={24}
                  className="rounded-full p-2"
                />
                <Text className="text-white">AI Insight</Text>
              </Pressable>
            </View>
          </View>
          <View className="w-[55%] h-[90%] flex absolute bottom-0 -right-10 -z-10">
            <Image
              source={Robot}
              style={{ width: "100%", height: "100%" }}
              contentFit="contain"
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default PublicityBox;
