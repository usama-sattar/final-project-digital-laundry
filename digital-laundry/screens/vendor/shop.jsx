import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import ShopView from "../../components/shopView";
import { TextInput, StyleSheet } from "react-native";
import { ProductConsumer } from "../../context";
function Shop() {
  const shopDetails = [
    {
      title: "shirt",
      path: require("../../assets/T-shirt.svg"),
      price: 15,
    },
    {
      title: "pant",
      path: require("../../assets/pant.svg"),
      price: 20,
    },
    {
      title: "jacket",
      path: require("../../assets/Jacket.svg"),
      price: 50,
    },
    {
      title: "coat",
      path: require("../../assets/jumper.svg"),
      price: 100,
    },
    {
      title: "trouser",
      path: require("../../assets/trouser.svg"),
      price: 25,
    },
    {
      title: "shoes",
      path: require("../../assets/shoe.png"),
      price: 100,
    },
    {
      title: "jumper",
      path: require("../../assets/jumper.png"),
      price: 60,
    },
    {
      title: "ironing",
      path: require("../../assets/iron.png"),
      price: 20,
    },
  ];
  return (
    <ProductConsumer>
      {(value) => {
        return (
          <View style={{ flex: 1, paddingTop: 5, backgroundColor: "white" }}>
            <View style={{ backgroundColor: "white" }}>
              <TextInput
                style={styles.input}
                placeholder="Shop Name"
                onChangeText={(text) => {
                  value.setShopName(text);
                }}
              />
            </View>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              style={{ flexGrow: 1 }}
            >
              {shopDetails.map((item, index) => (
                <ShopView key={index} detail={item} />
              ))}
              <View style={{ width: "80%", alignSelf: "center", marginTop: 5 }}>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  Selected Services
                </Text>
                {value.services.length > 0
                  ? value.services.map((item, index) => {
                      return (
                        <View style={{ fontSize: 18 }}>
                          <Text key={index}>{item.title}</Text>
                        </View>
                      );
                    })
                  : null}
              </View>
              <TouchableOpacity
                style={styles.submit}
                onPress={() => value.createShop()}
              >
                <Text style={{ color: "white", fontSize: 20 }}>
                  Submit Details
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        );
      }}
    </ProductConsumer>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 30,
    margin: 10,
    width: "100%",
    borderBottomWidth: 1,
    padding: 5,
    color: "black",
  },
  submit: {
    marginTop: 5,
    width: "60%",
    padding: 8,
    backgroundColor: "#207CBB",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
export default Shop;
