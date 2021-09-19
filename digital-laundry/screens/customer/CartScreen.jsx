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
import { Ionicons } from "@expo/vector-icons";
import { ListItem } from "react-native-elements";
import { cartContext } from "../../context/cart";

function Cart({ navigation, route }) {
  const { cart, increment, decrement, total, remove } = useContext(cartContext);

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.95 }}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={styles.header}>
            <Text>Welcome to Cart</Text>
          </View>
          <View>
            {cart.map((item, key) => (
              <ListItem key={key} bottomDivider>
                <ListItem.Content>
                  <ListItem.Subtitle>Service: {item.name}</ListItem.Subtitle>
                  <ListItem.Subtitle>Price: {item.price}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content>
                  <View>
                    <TouchableOpacity onPress={() => increment(item, key)}>
                      <Ionicons
                        name="add-circle"
                        size={25}
                        color={"#3397e8"}
                      ></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => decrement(item, key)}>
                      <Ionicons
                        name="remove-circle"
                        size={25}
                        color={"red"}
                      ></Ionicons>
                    </TouchableOpacity>
                  </View>
                </ListItem.Content>
                <ListItem.Content>
                  <ListItem.Subtitle>
                    Quantity: {item.quantity}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                    <TouchableOpacity onPress={() => remove(key)}>
                      <Ionicons name="trash" size={25} color={"red"}></Ionicons>
                    </TouchableOpacity>
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>Total Amount:{total}</Text>
        </View>
      </View>

      <View style={{ marginHorizontal: 20 }}>
        {/* {cart.length > 0 ? ( */}
        <Pressable
          style={styles.checkoutButton}
          onPress={() => navigation.navigate("CheckoutScreen")}
        >
          <Text style={{ marginHorizontal: 10, fontSize: 20, color: "white" }}>
            Proceed to Checkout
          </Text>
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
  checkoutButton: {
    backgroundColor: "#3397e8",
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
export default Cart;
