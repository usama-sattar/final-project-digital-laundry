//import "react-native-gesture-handler";
import React from "react";
import {Text, View} from 'react-native'
import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProductProvider, ProductConsumer} from "./context";
import { Ionicons } from "@expo/vector-icons";
 import Splash from "./screens/auth/splash";
import Login from "./screens/auth/login";
import SignUp from "./screens/auth/signup";
import Shop from "./screens/vendor/CreateShop";
import MainScreen from "./screens/customer/MainScreen";
import VendorMain from "./screens/vendor/VendorMain";
import EditCustomer from "./screens/customer/EditScreen";
import Searched from "./screens/customer/SearchScreen";
import SelectScreen from "./screens/customer/SelectScreen";
import CartContextProvider from "./context/cart";
import Cart from "./screens/customer/CartScreen";
import Checkout from "./screens/customer/CheckoutScreen";
import CardPayment from "./screens/customer/CardPayment";
import OrdersScreen from "./screens/customer/OrdersScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const VendorTabNavigator = () => {
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

  const CustomerTabNavigator = () => {
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
                  if (route.name === "OrdersScreen") {
                    iconName = focused ? "card" : "card-outline";
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
              <Tab.Screen name="OrdersScreen" component={OrdersScreen} options={{title:'My Orders'}}/>
            </Tab.Navigator>
          );
        }}
      </ProductConsumer>
    );
  };

  return (
    <NavigationContainer>
    <ProductProvider>
      <CartContextProvider>
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
              backgroundColor: '#3397e8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
          />
          <Stack.Screen name="Login" component={Login} options={{headerLeft: ()=> null,headerStyle: {
              backgroundColor: '#3397e8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }}} />
          <Stack.Screen
            name="MainScreen"
            component={CustomerTabNavigator}
            options={{ title: "Welcome", headerLeft: () => null, headerStyle: {
              backgroundColor: '#3397e8',
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
              backgroundColor: '#3397e8',
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
              backgroundColor: '#3397e8',
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
              backgroundColor: '#3397e8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
          />
          
          <Stack.Screen
            name="SelectedVendorScreen"
            component={SelectScreen}
            options={{ title: "Place Order",headerStyle: {
              backgroundColor: '#3397e8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
          />
           <Stack.Screen
            name="CartScreen"
            component={Cart}
            options={{ title: "Cart",headerStyle: {
              backgroundColor: '#3397e8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
          />
          <Stack.Screen
            name="CheckoutScreen"
            component={Checkout}
            options={{ title: "Checkout",headerStyle: {
              backgroundColor: '#3397e8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
          />
          <Stack.Screen
            name="CardScreen"
            component={CardPayment}
            options={{ title: "Payment",headerStyle: {
              backgroundColor: '#3397e8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
          />
        </Stack.Navigator>
      
      </CartContextProvider>
    </ProductProvider>
    </NavigationContainer>
  );
}
