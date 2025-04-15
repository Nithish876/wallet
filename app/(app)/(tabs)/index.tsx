import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const transactions = [
  { id: '1', title: 'Groceries', amount: -120, date: 'Apr 15' },
  { id: '2', title: 'Salary', amount: 1500, date: 'Apr 14' },
  { id: '3', title: 'Electricity Bill', amount: -60, date: 'Apr 13' },
];

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-slate-100 px-5 pt-14 relative">
      {/* 🎨 Tilted Background Rectangles */}
      <View
        className="absolute bg-indigo-600 rounded-3xl opacity-20"
        style={{
          width: width * 0.8,
          height: width * 0.5,
          top: -30,
          left: -50,
          transform: [{ rotate: '-10deg' }],
        }}
      />
      <View
        className="absolute bg-emerald-500 rounded-3xl opacity-20"
        style={{
          width: width * 0.8,
          height: width * 0.5,
          top: 80,
          right: -30,
          transform: [{ rotate: '-10deg' }],
        }}
      />

      {/* 💳 Blurred Balance Card */}
      <BlurView intensity={70} tint="light" className="rounded-2xl p-5 mb-6">
        <Text className="text-lg text-slate-800 font-medium mb-1">Your Balance</Text>
        <Text className="text-3xl font-bold text-slate-900 mb-4">$1,320</Text>
        <View className="flex-row justify-between">
          <View>
            <Text className="text-sm text-gray-500">Income</Text>
            <Text className="text-base font-semibold text-green-600">$2,000</Text>
          </View>
          <View>
            <Text className="text-sm text-gray-500">Expense</Text>
            <Text className="text-base font-semibold text-red-500">$680</Text>
          </View>
        </View>
      </BlurView>

      {/* 🧾 Recent Transactions */}
      <Text className="text-lg font-semibold text-slate-900 mb-3">Recent Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-xl mb-3 flex-row justify-between shadow-sm shadow-slate-300">
            <Text className="text-base text-slate-800 font-medium">{item.title}</Text>
            <Text
              className={`text-base font-semibold ${
                item.amount >= 0 ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {item.amount >= 0 ? '+' : ''}
              ${Math.abs(item.amount)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
