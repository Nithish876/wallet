import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { LineChart } from "react-native-gifted-charts";


const StatsScreen = () => {
  const [selectedTab, setSelectedTab] = useState<"daily" | "weekly" | "monthly">("daily");

  const chartData = {
    daily: [
      { value: 120, label: "Mon" },
      { value: 80, label: "Tue" },
      { value: 100, label: "Wed" },
      { value: 60, label: "Thu" },
      { value: 150, label: "Fri" },
      { value: 90, label: "Sat" },
      { value: 130, label: "Sun" },
    ],
    weekly: [
      { value: 600, label: "W1" },
      { value: 750, label: "W2" },
      { value: 680, label: "W3" },
      { value: 800, label: "W4" },
    ],
    monthly: [
      { value: 2200, label: "Jan" },
      { value: 1800, label: "Feb" },
      { value: 2500, label: "Mar" },
      { value: 2100, label: "Apr" },
    ],
  };

  const tabs = ["daily", "weekly", "monthly"];

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <ThemedText
        type="title"
        // className="mt-1"
        style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}
      >
        Statistics
      </ThemedText>

      {/* Custom Top Tabs */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 16,
        }}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab as any)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 20,
              backgroundColor:
                selectedTab === tab ? "#84cc16" : "rgba(132,204,22,0.2)",
            }}
          >
            <Text
              style={{
                color: selectedTab === tab ? "#000" : "#84cc16",
                fontWeight: "600",
                textTransform: "capitalize",
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chart */}
      <ThemedView
        style={{
          padding: 16,
          borderRadius: 16,
          backgroundColor: "#1f2937",
        }}
      >
        <LineChart
          data={chartData[selectedTab]}
          thickness={3}
          color="#84cc16"
          hideDataPoints
          isAnimated
          animateOnDataChange
          xAxisLabelTextStyle={{ color: "#9ca3af" }}
          yAxisTextStyle={{ color: "#9ca3af" }}
          noOfSections={5}
          yAxisColor="#374151"
          xAxisColor="#374151"
          areaChart
          startFillColor="#84cc16"
          endFillColor="#84cc16"
          startOpacity={0.3}
          endOpacity={0}
        />
      </ThemedView>
    </ScrollView>
  );
};

export default StatsScreen;
