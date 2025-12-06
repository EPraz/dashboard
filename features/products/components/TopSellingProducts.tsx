import { IconButton } from "@/components";
import { Image } from "expo-image";
import React from "react";
import { ImageSourcePropType, Pressable, Text, View } from "react-native";
import PlaceHolderSquare from "../../../assets/images/image-placeholder-square.png";

type TopProduct = {
  id: number;
  name: string;
  revenue: number; // 👈 numeric
  image: ImageSourcePropType;
};

const topSellingProducts: TopProduct[] = [
  {
    id: 1,
    name: "Xylo Nova Soundbar",
    revenue: 250_000,
    image: PlaceHolderSquare,
  },
  {
    id: 2,
    name: "Aurora Pro Headphones",
    revenue: 180_000,
    image: PlaceHolderSquare,
  },
  {
    id: 3,
    name: "Luma Studio Monitor",
    revenue: 150_000,
    image: PlaceHolderSquare,
  },
  {
    id: 4,
    name: "EchoPulse Wireless Mic",
    revenue: 120_000,
    image: PlaceHolderSquare,
  },
  {
    id: 5,
    name: "BassLine Studio Sub",
    revenue: 951_000,
    image: PlaceHolderSquare,
  },
];

const formatCurrency = (value: number) => `$${value.toLocaleString("en-US")}`;

const TopSellingProductsCard: React.FC = () => {
  const sortedProducts = [...topSellingProducts].sort(
    (a, b) => b.revenue - a.revenue
  );

  const [featured, ...others] = sortedProducts;

  return (
    <View className="min-w-[312px] relative bg-surface-whiteCard dark:bg-surface-whiteCardDark text-ink-bold dark:text-ink-boldDark p-5 gap-5 rounded-3xl overflow-hidden">
      <View className="gap-2">
        <View className="w-full flex-1 flex-row items-center justify-between gap-5">
          <Text className="text-[20px] leading-[130%] font-semibold text-inherit">
            Top Selling Products
          </Text>
        </View>

        <View className="flex-col gap-3 items-start">
          {/* Producto destacado (mayor revenue) */}
          {featured && (
            <View className="flex-row gap-4 items-center justify-between">
              <IconButton className="dark:bg-surface-primaryNormalConstant w-[32px] h-[32px] p-2 gap-2">
                <Text className="text-[12px] leading-[120%] font-bold text-inherit">
                  1
                </Text>
              </IconButton>

              <View>
                <Image
                  source={featured.image}
                  style={{ width: 92, height: 92 }}
                  contentFit="contain"
                />
              </View>

              <View className="flex-col gap-2">
                <Text className="text-[12px] leading-[140%] font-bold text-inherit">
                  {featured.name}
                </Text>
                <Text className="text-surface-primaryNormalConstant text-[20px] leading-[130%] font-semibold ">
                  {formatCurrency(featured.revenue)}
                </Text>
                <Text className="text-ink-sheen dark:text-ink-sheenDark text-[12px] leading-[140%]">
                  Total Revenues Sales
                </Text>
              </View>
            </View>
          )}

          {/*  Resto de productos en orden por revenue */}
          {others.map((product, index) => {
            const rank = index + 2; // 2,3,4,5...

            return (
              <View
                key={product.id}
                className="flex flex-row gap-2 items-center justify-start overflow-hidden w-full"
              >
                <IconButton className="bg-surface-primaryPale dark:bg-surface-primaryPaleDark w-[23px] h-[23px] p-2 gap-2">
                  <Text className="text-[12px] leading-[120%] font-bold text-surface-primaryNormalConstant">
                    {rank}
                  </Text>
                </IconButton>

                <View>
                  <Image
                    source={product.image}
                    style={{ width: 28, height: 28 }}
                    contentFit="contain"
                  />
                </View>

                <View className="flex-row items-center justify-between gap-2">
                  <Text className="text-[12px] leading-[140%] font-semibold text-inherit">
                    {product.name}
                  </Text>
                  <Text className="text-surface-primaryNormalConstant text-[12px] leading-[140%] font-semibold">
                    {formatCurrency(product.revenue)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <View>
        <Pressable className="flex items-center justify-center h-[40px] gap-2 px-3 py-2 bg-surface-primaryPale dark:bg-surface-primaryPaleDark rounded-full">
          <Text className="text-[#F46425] font-bold text-[16px] leading-[120%]">
            View More
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TopSellingProductsCard;
