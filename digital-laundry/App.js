import "react-native-gesture-handler";
import React from "react";
import {NavigationActions, StackActions} from 'react-navigation'
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import { ProductProvider } from "./context";
import Splash from "./screens/auth/splash";
import Login from "./screens/auth/login";
import SignUp from "./screens/auth/signup";
import Shop from "./screens/vendor/shop";
import MainScreen from "./screens/customer/mainScreen";
import RiderMain from "./screens/rider/riderMain";
import VendorMain from "./screens/vendor/vendorMain";
import EditCustomer from "./screens/customer/editcustomer";

import { Ionicons } from "@expo/vector-icons";
import {Button} from 'react-native'
import { ProductConsumer } from "./context";
import Searched from "./screens/customer/searched";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function App({navigation}) {

  
  const VendorTabNavigator = ({ navigation }) => {
    return (
      <ProductConsumer>
        {(value) => {
          return (

            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === "VendorScreen") {
                    iconName = focused ? "home" : "home-outline";
                  } else if (route.name === "Shop") {
                    iconName = focused ? "shirt" : "shirt-outline";
                  } 
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="VendorScreen" component={VendorMain} />
              <Tab.Screen
                name="Shop"
                component={Shop}
                options={{ tabBarBadge: 1 }}
              />
            </Tab.Navigator>
          );
        }}
      </ProductConsumer>
    );
  };
  const CustomerTabNavigator = ({ navigation }) => {
    return (
      <ProductConsumer>
        {(value) => {
          return (
           
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === "MainScreen") {
                    iconName = focused ? "home" : "home-outline";
                  } 
                  if (route.name === "EditCustomer") {
                    iconName = focused ? "create" : "create-outline";
                  } 
                  
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
          tabBarOptions={{
            style:{
              backgroundColor: 'white'
            }
          }}
                  >
              <Tab.Screen name="MainScreen" component={MainScreen} options={{title:'Home'}}/>
              <Tab.Screen name="EditCustomer" component={EditCustomer} options={{title:'Edit'}}/>
            </Tab.Navigator>
          );
        }}
      </ProductConsumer>
    );
  };

  return (
    <ProductProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerLeft: () => null,headerStyle: {
              backgroundColor: '#6baed8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
          />
          <Stack.Screen name="Login" component={Login} options={{headerLeft: ()=> null,headerStyle: {
              backgroundColor: '#6baed8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }}} />
          <Stack.Screen
            name="MainScreen"
            component={CustomerTabNavigator}
            options={{ title: "Customer ", headerLeft: () => null, headerStyle: {
              backgroundColor: '#6baed8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },}}
          />
          <Stack.Screen
            name="VendorScreen"
            component={VendorTabNavigator}
            options={{ title: "Vendor", headerLeft: () => null,
            headerStyle: {
              backgroundColor: '#6baed8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
          
          />
          <Stack.Screen
            name="RiderScreen"
            component={RiderMain}
            options={{ title: "Rider", headerLeft: () => null,headerStyle: {
              backgroundColor: '#6baed8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
          />
           <Stack.Screen
            name="SearchScreen"
            component={Searched}
            options={{ title: "Searched Items",headerStyle: {
              backgroundColor: '#6baed8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductProvider>
  );
}
