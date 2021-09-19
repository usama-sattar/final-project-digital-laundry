import React, { Component, useContext, useState } from "react";
import { Pressable } from "react-native";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Swiper from "react-native-swiper";
import { Image } from "react-native-elements";
import { cartContext } from "../../context/cart";

export default function Checkout({ navigation }) {
  const { total } = useContext(cartContext);
  const [visibleSwiper, setVisibleSwiper] = useState(true);
  let swiper = null;
  if (visibleSwiper) {
    swiper = (
      <View
        style={{
          height: 200,
        }}
      >
        <Swiper
          dotColor={"white"}
          activeDotColor={"#FF0A0A"}
          horizontal={true}
          loop={true}
          bounces={true}
          removeClippedSubviews={false}
        >
          <View style={styles.slideContainer}>
            <Image
              source={require("../../assets/credit-card.png")}
              style={{ width: 100, height: 100 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={styles.slideContainer}>
            <Image
              source={require("../../assets/jazz.jpg")}
              style={{ width: 100, height: 100 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={styles.slideContainer}>
            <Image
              source={require("../../assets/easypaisa.jpg")}
              style={{ width: 100, height: 100 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
        </Swiper>
      </View>
    );
  } else {
    swiper = <View></View>;
  }
  return (
    <View style={styles.container}>
      {swiper}
      <View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>Total Amount: {total} Rs</Text>
        </View>
        <View style={{ marginHorizontal: 15 }}>
          <View>
            <Pressable
              style={styles.paymentCard}
              onPress={() => navigation.navigate("CardScreen")}
            >
              <Text style={styles.textStyle}>Credit Cart</Text>
            </Pressable>
          </View>
          <View style={styles.paymentCard}>
            <Pressable>
              <Text style={styles.textStyle}>Jazzcash</Text>
            </Pressable>
          </View>
          <View style={styles.paymentCard}>
            <Pressable>
              <Text style={styles.textStyle}>Easypaisa</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paymentCard: {
    width: "100%",
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "lightgray",
    height: 100,
    display: "flex",
    justifyContent: "center",
  },
  slideContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 20,
    marginLeft: 10,
  },
});
