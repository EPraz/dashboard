import { Graphic, MiniGraphic, PageHeader, StatCard } from "@/components";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";

const Robot = require("../../../assets/images/robot.png");

const DashboardHomeContainer = () => {
  return (
    <View className="gap-6">
      <PageHeader
        title="Dashboard Overview"
        subTitle="Gain insights into your sales and marketing performance at a glance."
      />

      <View className="grid grid-cols-1 lg:grid-cols-2 gap-2 xl:gap-5 lg:grid-rows-2">
        <View className="row-span-2 gap-2 xl:gap-5 ">
          <View className="gap-2 xl:gap-5 flex flex-row flex-wrap items-center justify-start xl:justify-between">
            <StatCard
              iconName="monetization-on"
              iconLib="mi"
              title="Total Leads"
              value="1,250"
              suffix="leads"
              badgeValue="10.55%"
              badgeColor="#2CC974"
              badgeLabel="vs last month"
              special={true}
            />
            <StatCard
              iconName="person-outline"
              iconLib="ion"
              title="Active Leads"
              value="850"
              suffix="active leads"
              badgeValue="12.45%"
              badgeColor="#2CC974"
              badgeLabel="vs last month"
            />
            <StatCard
              iconName="chevron-triple-up"
              iconLib="mc"
              title="Lead Growth Rate"
              value="$25,000"
              suffix="increase"
              badgeValue="5.75%"
              badgeColor="#EF4444"
              badgeLabel="vs last month"
            />
            <StatCard
              iconName="person-add-outline"
              iconLib="ion"
              title="Number of New Leads"
              value="850"
              suffix="active leads"
              badgeValue="12.45%"
              badgeColor="#2CC974"
              badgeLabel="vs last month"
            />
          </View>
          <View className="">
            <Graphic />
          </View>
        </View>

        <View className="row-span-2 gap-2 xl:gap-5 ">
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

                  <Pressable
                    onPress={() => Keyboard.dismiss()}
                    className="relative"
                  >
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
          <View className="flex-row gap-2 xl:gap-5 flex-wrap">
            <MiniGraphic
              title="Top Lead Source"
              subTitle="Hot Leads from Referral"
              iconLib="ion"
              iconName="people"
              value="$45,000"
              suffix="total value"
              charData="chartData3"
            />
            <MiniGraphic
              title="Lead Engagement"
              subTitle="Email success"
              iconLib="zc"
              iconName="email"
              value="3,250"
              suffix="emails opened"
              charData="chartData"
            />
            <MiniGraphic
              title="Marketing Campaign Performance"
              subTitle="Spring Promo"
              iconLib="fa"
              iconName="product-hunt"
              value="$50,000"
              suffix="revenue generated"
              charData="chartData2"
            />
            <MiniGraphic
              title="Total Deals Closed"
              value="80"
              valueLabel="deals"
              suffix="in this month"
              charData="chartData"
              subTitle="Spring Sells"
              iconLib="mi"
              iconName="sell"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashboardHomeContainer;
