import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";
import { API } from "../../global/constants";

const customer = await AsyncStorage.getItem("customerId");
const customerId = JSON.parse(customer);

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  useEffect(async () => {
    const result = await axios.get(`${API}/customers/orders/${customerId}`);
    const data = await result.data;
    setOrders(data);
  }, []);
  return (
    <View style={styles.container}>
      <Text>Order Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
});
