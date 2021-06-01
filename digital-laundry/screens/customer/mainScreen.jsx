import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MainView from "../../components/mainView";
import { ProductConsumer } from "../../context";
import { SearchBar } from "react-native-elements";

function MainScreen({ navigation }) {
  const [shops, setShops] = useState([]);
  const [search, setSearch] = useState("");
  const [searchShops, setSearchShops] = useState([{}]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://192.168.0.114:5000/shop/")
      .then((res) => setShops(res.data), setLoading(false))
      .catch((err) => console.log(err));
  });

  const goSearch = () => {
    axios
      .get(`http://192.168.0.114:5000/shop/find/${search}`)
      .then((res) => setSearchShops(res.data))
      .catch((err) => console.log(err));
    navigation.navigate("SearchScreen", { Shops: searchShops, word: search });
  };

  return loading === false ? (
    <View style={styles.conatiner}>
      <View>
        <SearchBar
          inputContainerStyle={{
            backgroundColor: "#f3f8fe",
          }}
          containerStyle={{
            backgroundColor: "#f3f8fe",
            borderRadius: 5,
            padding: 0,
          }}
          inputStyle={{
            backgroundColor: "white",
            borderColor: "black",
            borderRadius: 5,
            padding: 2,
          }}
          placeholder="Search Vendor"
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholderTextColor={"gray"}
          onSubmitEditing={() => goSearch()}
          returnKeyType="search"
        />
      </View>
      <View style={styles.wrapper}>
        {shops.length > 0
          ? shops.map((item, index) => <MainView key={index} shop={item} />)
          : null}
      </View>
    </View>
  ) : (
    <Text>Loading</Text>
  );
}
const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    margin: 5,
  },
});
export default MainScreen;
