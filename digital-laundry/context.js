import React, { Component } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    shopName: "",
    services: [],
    vendorToken: "",
    isLogged: true,
    customerData: []
  };
  // checkShop = () => {
  //   axios
  //     .post("http://192.168.0.109:5000/shop/create", {
  //       name: this.state.shopName,
  //       vendorId: this.state.vendorToken,
  //       services: this.state.services,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };
  setShopName = (e) => {
    this.setState({
      shopName: e,
    });
  };

  getStorage = async () => {
    const item = await AsyncStorage.getItem("vendorId");
    this.setState({
      vendorToken: JSON.parse(item),
    });
    console.log(item);
  };

  saveService = (data) => {
    const service = {
      title: data.title,
      price: data.price,
    };
    this.setState({
      services: [...this.state.services, service],
    });
  };
  removeService = (data) => {
    console.log(data.title)
    let temp = [...this.state.services]
    let index = temp.findIndex(x => x.title === data.title)
    console.log(index)
    if (index !== -1) {
      temp.splice(index, 1);
      this.setState({services: temp});
    }
  
  };
  createShop = async () => {
    await this.getStorage();
    axios
      .post("http://192.168.0.114:5000/shop/create", {
        name: this.state.shopName,
        vendorId: this.state.vendorToken,
        services: this.state.services,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  Logout = () => {
    AsyncStorage.clear();
    this.setState({
      isLogged: false,
    });
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          setShopName: this.setShopName,
          saveService: this.saveService,
          getStorage: this.getStorage,
          createShop: this.createShop,
          isLogged: this.state.isLogged,
          Logout: this.Logout,
          removeService:this.removeService,
          services: this.state.services
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };
