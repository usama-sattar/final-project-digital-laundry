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
import {
  StripeProvider,
  CardField,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import axios from "axios";
import { cartContext } from "../../context/cart";
import { API } from "../../global/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const customer = await AsyncStorage.getItem("customerId");
const customerId = JSON.parse(customer);

function CardPayment() {
  return (
    <StripeProvider publishableKey="pk_test_51J56lVJIiMKnmPN2rwY9qFt8R5FTtdITJoIRU3wEASsmx31gCGK7yBuGThKyPJuZH3e2ASFwFgxWewU28AUDqpZa00BjkrySxV">
      <StripeHandler />
    </StripeProvider>
  );
}
function StripeHandler() {
  const [cardDetails, setCardDetails] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const { cart, total } = useContext(cartContext);

  const { confirmPayment, loading } = useConfirmPayment();

  const paymentHandle = async () => {
    if (!cardDetails?.complete) {
      Alert.alert("Error", "Enter Detail Please");
      return;
    }
    const billing = {
      email: email,
      cart: cart,
      price: total,
    };
    const response = await axios.post(
      `${API}/customers/create-payment`,
      billing
    );
    const result = await response.data;
    try {
      const { paymentIntent, error } = await confirmPayment(result, {
        type: "Card",
        billingDetails: { billing },
      });
      if (error) {
        Alert.alert("Error", "Unable to make payment");
      } else if (paymentIntent) {
        const response = await axios.post(`${API}/customers/order`, {
          customerId,
          name,
          email,
          address,
          contact,
          cart,
          total,
        });
        const result = await response.data;
        try {
          if (result) {
            Alert.alert("Successfully placed order: ", paymentIntent.id);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <TextInput
            placeholder="name"
            onChangeText={(text) => setName(text)}
            style={{ borderWidth: 1, padding: 5, borderRadius: 5 }}
          />
          <TextInput
            placeholder="email"
            onChangeText={(text) => setEmail(text)}
            style={{ borderWidth: 1, padding: 5, borderRadius: 5 }}
          />
          <TextInput
            placeholder="address"
            onChangeText={(text) => setAddress(text)}
            style={{ borderWidth: 1, padding: 5, borderRadius: 5 }}
          />
          <TextInput
            placeholder="contact number"
            onChangeText={(text) => setContact(text)}
            style={{ borderWidth: 1, padding: 5, borderRadius: 5 }}
            keyboardType="numeric"
          />
          <View>
            <CardField
              placeholder={{ number: "4242 4242 4242 4242" }}
              postalCodeEnabled={false}
              style={styles.cardField}
              cardStyle={{ backgroundColor: "white", borderRadius: 5 }}
              onCardChange={(cardDetail) => {
                setCardDetails(cardDetail);
              }}
            />
          </View>
        </View>
        <View>
          <Button title="Pay" onPress={paymentHandle} disabled={loading} />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  cardField: {
    width: "100%",
    marginVertical: 5,
    height: 50,
  },
});
export default CardPayment;
