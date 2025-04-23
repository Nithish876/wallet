// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Dimensions,
//   TouchableNativeFeedbackComponent,
//   TouchableOpacity,
// } from "react-native";
// import { BlurView } from "expo-blur";
// import HeaderComponent from "@/components/Header";
// import { Ionicons } from "@expo/vector-icons";
// import ModalScreen from "@/components/ModalScreen";
// import TransactionForm from "@/components/TransactionForm";
// const { width } = Dimensions.get("window");

// const transactions = [
//   { id: "1", title: "Groceries", amount: -120, date: "Apr 15" },
//   { id: "2", title: "Salary", amount: 1500, date: "Apr 14" },
//   { id: "3", title: "Electricity Bill", amount: -60, date: "Apr 13" },
// ];

// const HomeScreen = () => {
//   const [TransactionModalVisible, setTransactionModalVisible] =
//     useState<boolean>(false);
//   const handleAddTransaction = () => {
//     // open a modal with inputs
//     setTransactionModalVisible(true);
//     // submit the inputs on db
//     // rerender with latest entries
//   };
//   return (
//     <View className="flex-1 bg-slate-100 px-5 pt-14 relative">
//       {/* <View>
//         <HeaderComponent containerClass='w-full h-24 bg-red-500  ' />
//       </View> */}
//       {/* 🎨 Tilted Background Rectangles */}
//       <View
//         className="absolute bg-indigo-600 rounded-3xl opacity-20"
//         style={{
//           width: width * 0.8,
//           height: width * 0.5,
//           top: -30,
//           left: -50,
//           transform: [{ rotate: "-10deg" }],
//         }}
//       />
//       <View
//         className="absolute bg-emerald-500 rounded-3xl opacity-20"
//         style={{
//           width: width * 0.8,
//           height: width * 0.5,
//           top: 80,
//           right: -30,
//           transform: [{ rotate: "-10deg" }],
//         }}
//       />

//       {/* 💳 Blurred Balance Card */}
//       <BlurView intensity={70} tint="light" className="rounded-2xl p-5 mb-6">
//         <Text className="text-lg text-slate-800 font-medium mb-1">
//           Your Balance
//         </Text>
//         <Text className="text-3xl font-bold text-slate-900 mb-4">$1,320</Text>
//         <View className="flex-row justify-between">
//           <View>
//             <Text className="text-sm text-gray-500">Income</Text>
//             <Text className="text-base font-semibold text-green-600">
//               $2,000
//             </Text>
//           </View>
//           <View>
//             <Text className="text-sm text-gray-500">Expense</Text>
//             <Text className="text-base font-semibold text-red-500">$680</Text>
//           </View>
//         </View>
//       </BlurView>

//       {/* 🧾 Recent Transactions */}
//       <Text className="text-lg font-semibold text-slate-900 mb-3">
//         Recent Transactions
//       </Text>
//       <FlatList
//         data={transactions}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingBottom: 100 }}
//         renderItem={({ item }) => (
//           <View className="bg-white p-4 rounded-xl mb-3 flex-row justify-between shadow-sm shadow-slate-300">
//             <Text className="text-base text-slate-800 font-medium">
//               {item.title}
//             </Text>
//             <Text
//               className={`text-base font-semibold ${
//                 item.amount >= 0 ? "text-green-600" : "text-red-500"
//               }`}
//             >
//               {item.amount >= 0 ? "+" : ""}${Math.abs(item.amount)}
//             </Text>
//           </View>
//         )}
//       />
//       <TouchableOpacity onPress={handleAddTransaction}>
//         <View className="p-5 bg-lime-400 rounded-xl fixed right-0 self-end bottom-24">
//           <Ionicons name="add" color={"black"} size={32} />
//         </View>
//       </TouchableOpacity>

//       <ModalScreen
//         setisVisible={setTransactionModalVisible}
//         isVisible={TransactionModalVisible}
//         containerClassNames="blur-xl"
//       >
//         {/* inputs comes here */}
//         <TransactionForm />
//       </ModalScreen>
//     </View>
//   );
// };

// export default HomeScreen;
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { BlurView } from "expo-blur";
import { Feather, Ionicons } from "@expo/vector-icons";
import ModalScreen from "@/components/ModalScreen";
import TransactionForm from "@/components/TransactionForm";
import { IconSizes } from "@/constants/Sizes";
import Avatar from "@/components/Avatar";
import { auth } from "@/firebase/config";

const { width } = Dimensions.get("window");

const transactions = [
  { id: "1", title: "Groceries", amount: -120, date: "Apr 15" },
  { id: "2", title: "Salary", amount: 1500, date: "Apr 14" },
  { id: "3", title: "Electricity Bill", amount: -60, date: "Apr 13" },
];

const HomeScreen = () => {
  const [TransactionModalVisible, setTransactionModalVisible] = useState(false);

  const handleAddTransaction = () => {
    setTransactionModalVisible(true);
  };
  const UserImg = auth.currentUser?.photoURL;
  console.log(UserImg);
  console.log(auth.currentUser?.displayName);

  return (
    <View className="flex-1 bg-black px-5 pt-14 relative">
      <View className="Container flex flex-row items-center justify-between p-4">
        <View>
          <Image
            source={{ uri: UserImg || "" }}
            className="w-10 h-10  rounded-full "
          />
        </View>
      </View>
      {/* 🌟 Background Glow Rectangles */}
      <View
        className="absolute bg-lime-500 rounded-full opacity-10 blur-md"
        style={{
          width: width * 1.2,
          height: width * 0.7,
          top: -50,
          left: -80,
          transform: [{ rotate: "-15deg" }],
        }}
      />
      <View
        className="absolute bg-lime-500 rounded-full opacity-10 blur-md"
        style={{
          width: width * 1.1,
          height: width * 0.6,
          top: 100,
          right: -60,
          transform: [{ rotate: "-5deg" }],
        }}
      />

      {/* 💳 Balance Card */}
      <View className="rounded-2xl p-5 mb-4 border border-lime-500 bg-black shadow-lg shadow-lime-500/10">
        <Text className="text-base text-lime-400 font-semibold mb-1">
          Your Balance
        </Text>
        <Text className="text-3xl font-bold text-white mb-4">$1,320</Text>
        <View className="flex-row justify-between">
          <BalCardLabel
            amount={2000}
            Label={"Income"}
            icon={"arrow-down-left"}
          />
          <BalCardLabel
            amount={2000}
            isExpense={true}
            Label={"Expense"}
            icon={"arrow-up-right"}
          />
        </View>
      </View>

      {/* 🚀 CTA Buttons Row */}
      <CtaBtn
        icon={"add-circle"}
        onPress={handleAddTransaction}
        title={"Add Transaction"}
      />
      {/* 🧾 Recent Transactions */}
      <Text className="text-lg font-bold text-white mb-3">
        Recent Transactions
      </Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View className="bg-[#111] border border-lime-500/30 p-4 rounded-xl mb-3 flex-row justify-between shadow shadow-lime-500/5">
            <Text className="text-base text-white font-medium">
              {item.title}
            </Text>
            <Text
              className={`text-base font-semibold ${
                item.amount >= 0 ? "text-lime-400" : "text-red-400"
              }`}
            >
              {item.amount >= 0 ? "+" : ""}${Math.abs(item.amount)}
            </Text>
          </View>
        )}
      />

      {/* ➕ Floating Add Button */}
      {/* <TouchableOpacity
        onPress={handleAddTransaction}
        className="absolute bottom-8 right-5 bg-lime-500 w-16 h-16 rounded-full items-center justify-center shadow-lg shadow-lime-300"
      >
        <Ionicons name="add" color="black" size={32} />
      </TouchableOpacity> */}

      {/* 🪟 Transaction Modal */}
      <ModalScreen
        setisVisible={setTransactionModalVisible}
        isVisible={TransactionModalVisible}
        containerClassNames="flex-1"
      >
        <TransactionForm />
      </ModalScreen>
    </View>
  );
};

const BalCardLabel = ({ amount, icon, Label, isExpense }: any) => {
  return (
    <View>
      <Text className="text-sm text-gray-400">{Label}</Text>
      <View
        className={`bg-lime-500 flex flex-row justify-center items-center p-2 mt-2 rounded-xl ${isExpense ? "bg-red-500" : "bg-lime-500"}`}
      >
        <Feather name={icon} size={IconSizes.md} />
        <Text className="text-base font-semibold ">${amount}</Text>
      </View>
    </View>
  );
};

export const CtaBtn = ({ onPress, icon, title }: any) => {
  return (
    <View className="flex-row space-x-3 mb-5">
      <TouchableOpacity
        onPress={onPress}
        className={`flex-row items-center space-x-2 bg-lime-500 px-4 py-2 rounded-full `}
      >
        <Ionicons name={icon} size={20} color="black" />
        <Text className="text-black font-semibold">{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
