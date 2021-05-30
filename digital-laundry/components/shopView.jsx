import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Value } from "react-native-reanimated";
import { ProductConsumer } from "../context";

export default function ShopView({ detail }, props) {
  return (
    <ProductConsumer>
      {(value) => {
        let found = value.services.some((el) => el.title === detail.title);
        return (
          <View style={styles.container}>
            <View style={styles.imageView}>
              <Image style={styles.images} source={detail.path} />
              <Text style={styles.title}>{detail.title}</Text>
              <Text style={styles.title}>{`Rs ${detail.price}`}</Text>
              <TouchableOpacity onPress={() => value.saveService(detail)}>
                <Image
                  style={styles.plus}
                  source={require("../assets/plus.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => value.removeService(detail)}>
                <Ionicons name="remove-circle" size={35} color="#B80F0A" />
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    </ProductConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  images: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  imageView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d4ebf2",
    width: "80%",
    borderRadius: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 5,
    alignSelf: "center",
    justifyContent: "space-around",
  },
  plus: {
    width: 30,
    height: 30,
  },
});
