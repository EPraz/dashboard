// app/dashboard.tsx
import { Header } from "@/components";
import Sidebar from "@/components/Sidebar";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type StatCardProps = {
  title: string;
  value: string;
  delta?: string;
  deltaTone?: "up" | "down" | "flat";
};

function StatCard({ title, value, delta, deltaTone = "flat" }: StatCardProps) {
  const tone =
    deltaTone === "up"
      ? "text-green-600 bg-green-50"
      : deltaTone === "down"
        ? "text-red-600 bg-red-50"
        : "text-slate-600 bg-slate-50";

  return (
    <View className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
      <Text className="text-slate-500">{title}</Text>
      <Text className="text-3xl font-bold mt-1">{value}</Text>
      {delta ? (
        <View className={`self-start mt-2 rounded-full px-2 py-1 ${tone}`}>
          <Text className="text-xs font-medium">{delta}</Text>
        </View>
      ) : null}
    </View>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={`rounded-2xl bg-white p-5 shadow-sm border border-slate-100 ${className}`}
    >
      {children}
    </View>
  );
}

/** Simple bar chart made with Views (no deps) */
function TinyBars({
  data,
  labels,
  max = Math.max(...data, 1),
}: {
  data: number[];
  labels: string[];
  max?: number;
}) {
  return (
    <View>
      <View className="flex-row items-end justify-between h-36 gap-3">
        {data.map((v, i) => {
          const h = Math.max(6, Math.round((v / max) * 140)); // px height
          return (
            <View key={i} className="items-center flex-1">
              <View
                className="w-full rounded-t-lg bg-orange-300"
                style={{ height: h }}
              />
              <Text className="text-[11px] text-slate-500 mt-2">
                {labels[i]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

/** Simple line chart stub (view-based) */
function TinyLine({ points }: { points: number[] }) {
  // convert points to bars joined by thin lines (hacky but visual)
  const max = Math.max(...points, 1);
  return (
    <View className="h-32 w-full justify-end">
      <View className="absolute inset-x-0 bottom-0 h-[1px] bg-slate-100" />
      <View className="flex-row items-end h-full gap-2">
        {points.map((v, i) => {
          const h = Math.max(4, Math.round((v / max) * 120));
          return (
            <View key={i} className="justify-end">
              <View className="w-[2px] bg-orange-400" style={{ height: h }} />
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default function Dashboard() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header ARRIBA */}
      <Header />

      {/* Fila principal: SIDEBAR IZQ + CONTENT DER */}
      <View className="flex-1 flex-row bg-slate-50">
        {/* Sidebar (usa su propio ancho: w-16 colapsado, w-72 extendido) */}
        {/* Si quieres ocultarlo en móviles y mostrar en desktop: "hidden lg:flex" */}
        <Sidebar
          initialCollapsed={true}
          activeKey="dashboard"
          onChangeActive={(k) => console.log("go to:", k)}
          onToggleTheme={() => console.log("toggle theme")}
          onLogout={() => console.log("logout")}
        />

        {/* CONTENT ocupa todo el resto */}
        <ScrollView
          className="flex-1"
          contentContainerClassName="p-4 md:p-6 lg:p-8 gap-4"
        >
          {/* --- tu contenido tal cual --- */}
          <View className="gap-4 md:flex-row">
            <View className="flex-1">
              <Card>
                <Text className="text-slate-500">Total Sales</Text>
                <Text className="text-4xl font-extrabold mt-1">$85,200</Text>
                <View className="flex-row gap-2 mt-3">
                  <View className="bg-orange-100 px-2 py-1 rounded-full">
                    <Text className="text-orange-700 text-xs font-medium">
                      ▲ 4.8%
                    </Text>
                  </View>
                  <Text className="text-slate-500 text-xs self-center">
                    vs last month
                  </Text>
                </View>
              </Card>
            </View>

            <View className="flex-1">
              <StatCard
                title="Total Revenue"
                value="$842,450"
                delta="▲ 2.1% vs last month"
                deltaTone="up"
              />
            </View>

            <View className="flex-1">
              <StatCard
                title="Total Product Sales"
                value="1,254"
                delta="▼ 1.5% vs last month"
                deltaTone="down"
              />
            </View>

            <View className="flex-1">
              <StatCard
                title="Average Deal Value"
                value="$1,850"
                delta="▲ 1.7% vs last month"
                deltaTone="up"
              />
            </View>
          </View>

          <Card className="overflow-hidden">
            <View className="md:flex-row md:items-center">
              <View className="flex-1">
                <Text className="text-xl font-extrabold">
                  Supercharge Your Strategy with Campify AI
                </Text>
                <Text className="text-slate-600 mt-2">
                  Automate segmentation, predict conversions, and close more
                  deals.
                </Text>
                <View className="flex-row gap-2 mt-4">
                  <Pressable className="bg-orange-500 rounded-xl px-4 py-3">
                    <Text className="text-white font-semibold">
                      Can I help you today?
                    </Text>
                  </Pressable>
                  <Pressable className="bg-white rounded-xl px-4 py-3 border border-slate-200">
                    <Text className="text-slate-700">Analyze Deals</Text>
                  </Pressable>
                  <Pressable className="bg-white rounded-xl px-4 py-3 border border-slate-200">
                    <Text className="text-slate-700">AI Insights</Text>
                  </Pressable>
                </View>
              </View>
              <View className="mt-6 md:mt-0 md:ml-6 self-center">
                <View className="w-40 h-40 rounded-2xl bg-gradient-to-br from-orange-400 to-yellow-300 items-center justify-center">
                  <Text className="text-white text-5xl">🤖</Text>
                </View>
              </View>
            </View>
          </Card>

          <Card>
            <View className="flex-row items-center justify-between mb-3">
              <Text className="font-semibold">Sales Trends</Text>
              <Pressable className="rounded-full border px-3 py-1 border-slate-200">
                <Text className="text-slate-600 text-xs">⋯</Text>
              </Pressable>
            </View>
            <TinyBars
              data={[35, 52, 48, 60, 70, 80]}
              labels={["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"]}
            />
          </Card>

          <Card>
            <Text className="text-slate-500">Revenue Potential</Text>
            <Text className="text-3xl font-bold mt-1">$150,000</Text>
            <Text className="text-slate-500 text-xs mt-1">in this month</Text>
            <View className="mt-4">
              <TinyBars
                data={[20, 32, 40, 56]}
                labels={["Week 1", "Week 2", "Week 3", "Week 4"]}
              />
            </View>
          </Card>

          <Card>
            <Text className="text-slate-500">Lead Engagement</Text>
            <Text className="text-3xl font-bold mt-1">3,250</Text>
            <Text className="text-slate-500 text-xs mt-1">emails opened</Text>
            <View className="mt-4">
              <TinyBars
                data={[12, 20, 28, 36, 44]}
                labels={["Mon", "Tue", "Wed", "Thu", "Fri"]}
              />
            </View>
          </Card>

          <Card>
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-semibold">
                Marketing Campaign Performance
              </Text>
              <Pressable className="rounded-full border px-3 py-1 border-slate-200">
                <Text className="text-slate-600 text-xs">
                  Spring Promo 2024
                </Text>
              </Pressable>
            </View>
            <Text className="text-slate-500">Revenue generated</Text>
            <Text className="text-3xl font-bold mt-1">$50,000</Text>
            <View className="mt-4">
              <TinyLine points={[10, 20, 18, 42, 30, 45, 38, 60, 52, 58]} />
            </View>
          </Card>

          <View className="h-8" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
