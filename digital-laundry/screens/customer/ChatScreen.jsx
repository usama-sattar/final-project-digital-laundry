import React, { Component, useContext, useEffect, useState } from "react";
import { Pressable } from "react-native";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";
import Fire from "../../Fire";
export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  //   const user = () => {
  //     return {
  //       _id: Fire.uid,
  //     };
  //   };
  //   useEffect(() => {
  //     Fire.get((message) =>
  //       setMessages((previous) => GiftedChat.append(previous.messages, message))
  //     );
  //     return () => {
  //       Fire.off();
  //     };
  //   }, []);

  const chat = (
    <GiftedChat messages={messages} onSend={onSend(Fire.send)} user={user} />
  );
  return (
    <View style={styles.container}>
      {Platform === "android" ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={30}
          enabled
        >
          {chat}
        </KeyboardAvoidingView>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>{chat}</SafeAreaView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
