import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Rating, AirbnbRating, SearchBar, Avatar } from "react-native-elements";

function MainView(props) {
  return (
    <View style={styles.container}>
      <Avatar
        size="large"
        overlayContainerStyle={{
          backgroundColor: "#3873af",
          borderRadius: 50,
        }}
        title={props.shop.name[0]}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
      />
      <Text style={{ color: "black", fontSize: 18 }}>{props.shop.name}</Text>
      <AirbnbRating defaultRating={5} size={15} showRating={false} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    flexBasis: "33%",
    padding: 5,
    borderRadius: 5,
  },
});
export default MainView;
