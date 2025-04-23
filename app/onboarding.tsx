// import { Image, StyleSheet, Text, View } from "react-native";
// import React from "react";
// //@ts-ignore
// import WelcomImage from "@/assets/images/welcome.png";
// import { ThemedText } from "@/components/ThemedText";
// import CustomBtn from "@/components/CustomBtn";
// import { ThemedView } from "@/components/ThemedView";
// import { router } from "expo-router";
// const Welcome = () => {
//   return (
//     <ThemedView className="flex-1 flex-col justify-center items-center ">
//       <Image source={WelcomImage} className="max-w-96" />
//       <ThemedView className="shadow-slate-300  w-[90%] max-w-[450px] text-center h-1/3 p-4 rounded-xl shadow-xl justify-center flex items-center ">
//         <ThemedText type="title" className="text-center my-2">
//           Always Track Your Transactions!
//         </ThemedText>
//         <ThemedText type="default" className="my-4 text-center">
//           Your smart, simple, and secure way to manage money.
//         </ThemedText>
//         <CustomBtn
//           title="Get started"
//           className="mx-auto"
//           onPress={() => {
//             router.replace("/login");
//           }}
//         />
//       </ThemedView>
//     </ThemedView>
//   );
// };

// export default Welcome;

// const styles = StyleSheet.create({});
import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
// @ts-ignore
import WelcomImage from "@/assets/images/welcome.png";
import { ThemedText } from "@/components/ThemedText";
import CustomBtn from "@/components/CustomBtn";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";

const Welcome = () => {
  return (
    <ThemedView className="flex-1 bg-black justify-center items-center px-4">
      <Image
        source={WelcomImage}
        style={{ width: 300, height: 200, resizeMode: "contain" }}
        className="mb-6"
      />

      <ThemedView className="bg-lime-500 w-full max-w-[450px] p-6 rounded-2xl shadow-lg items-center space-y-4">
        <ThemedText
          type="title"
          className="text-black text-center text-xl font-bold"
        >
          Always Track Your Transactions!
        </ThemedText>
        <ThemedText type="default" className="text-black text-center text-base">
          Your smart, simple, and secure way to manage money.
        </ThemedText>
        <CustomBtn
          title="Get Started"
          className="bg-black rounded-full px-6 py-3"
          textClassName="text-lime-500 text-lg font-semibold"
          onPress={() => {
            router.replace("/login");
          }}
        />
      </ThemedView>
    </ThemedView>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
