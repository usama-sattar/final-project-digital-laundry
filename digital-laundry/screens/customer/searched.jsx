import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Avatar, AirbnbRating } from "react-native-elements";

function Searched({ route }) {
  return (
    <View style={styles.container}>
      {console.log(route.params.Shops)}
      {route.params.Shops.length > 0 ? (
        <View>
          <Text>Searched:</Text>
          {route.params.Shops.map((shop, index) => {
            return (
              <View style={styles.innercontainer} key={index}>
                {console.log(shop.name)}
                <Avatar
                  size="large"
                  overlayContainerStyle={{ backgroundColor: "lightblue" }}
                  title={"j"}
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
                />
                <Text>{shop.name}</Text>
                <AirbnbRating defaultRating={5} size={15} showRating={false} />
              </View>
            );
          })}

          <AirbnbRating defaultRating={5} size={15} showRating={false} />
        </View>
      ) : (
        <Text>Else </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innercontainer: {
    flex: 1,
    marginTop: 20,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    flexBasis: "33%",
  },
});
export default Searched;
