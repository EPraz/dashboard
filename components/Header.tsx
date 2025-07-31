import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

type Props = {
  title: string;
  handleSidebar: (value: boolean) => void;
};

const Header = ({ title, handleSidebar }: Props) => {
  return (
    <View className="bg-white/10 border border-white/30 shadow-lg rounded-xl backdrop-blur-md px-4 py-5 web:px-6 web:py-4">
      {/* Mobile Header */}
      <View className="web:hidden flex-row items-center justify-between relative">
        {/* Menú hamburguesa */}
        <Pressable onPress={() => handleSidebar(true)}>
          <Ionicons name="menu" size={24} color="#374151" />
        </Pressable>

        {/* Título centrado absolutamente */}
        <Text className="absolute left-1/2 -translate-x-1/2 text-2xl font-semibold text-gray-900">
          {title}
        </Text>

        {/* Iconos a la derecha */}
        <View className="flex-row items-center space-x-3">
          <Ionicons name="notifications-outline" size={24} color="#374151" />
          {/* <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            className="w-8 h-8 rounded-full"
          /> */}
        </View>
      </View>

      {/* Desktop Header */}
      <View className="hidden web:flex flex-row justify-between items-center">
        {/* Título */}
        <Text className="text-2xl font-bold text-gray-900">{title}</Text>

        <View className="flex-row items-center space-x-6">
          {/* Buscador */}
          <View className="flex-row items-center  px-3 py-1 rounded-md w-64">
            <Ionicons name="search-outline" size={16} color="#6B7280" />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#9CA3AF"
              className="ml-2 text-sm text-gray-800 flex-1"
            />
          </View>

          {/* Perfil */}
          <View className="flex-row items-center space-x-2">
            <View className="items-end">
              <Text className="text-sm font-semibold text-gray-900">
                Alex Alom
              </Text>
              <Text className="text-xs text-gray-500">Super Admin</Text>
            </View>
            <Image
              source={{ uri: "https://i.pravatar.cc/300" }}
              className="w-8 h-8 rounded-full"
            />
            <Ionicons name="chevron-down" size={18} color="#6B7280" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
