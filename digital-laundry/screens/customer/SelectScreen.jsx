import React, { useState, useEffect, useContext } from "react";
import { Pressable } from "react-native";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Badge } from "react-native-elements";
import { cartContext } from "../../context/cart";

export default function SelectScreen({ route, navigation }) {
  const { cart, addToCart } = useContext(cartContext);
  const { data } = route.params;
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.95 }}>
        <View style={styles.header}>
          <Text>{data.title}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={true}>
          {data.services.map((item, index) => {
            return (
              <View style={{ marginHorizontal: 10 }} key={index}>
                <View style={styles.itemContainer}>
                  <View style={{ width: "40%" }}>
                    <Text>{item.name}</Text>
                  </View>
                  <View style={{ width: "20%" }}>
                    <Text>{item.price}</Text>
                  </View>
                  <View style={{ width: "40%" }}>
                    <TouchableOpacity
                      style={styles.cart}
                      onPress={() => addToCart(item.name, item.price)}
                    >
                      <Text>Push to Cart</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                );
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View>{console.log(cart)}</View>
      <View style={{ marginHorizontal: 20 }}>
        {/* {cart.length > 0 ? ( */}
        <Pressable
          style={styles.cartButton}
          onPress={() => navigation.navigate("CartScreen")}
        >
          <Text style={{ marginHorizontal: 10, fontSize: 20, color: "white" }}>
            Cart
          </Text>
          <Badge status="warning" value={cart.length} />
        </Pressable>
        {/* ) : null} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    backgroundColor: "lightgray",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  cart: {
    backgroundColor: "#3397e8",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  cartButton: {
    backgroundColor: "#3397e8",
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
