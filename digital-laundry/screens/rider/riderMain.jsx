import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

function RiderMain({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Rider</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default RiderMain;
