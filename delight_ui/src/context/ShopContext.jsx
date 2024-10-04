import axios from 'axios';
import React, { useState, createContext, useEffect } from 'react'

export const ShopContext = createContext(null)

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({})
    const [token, setToken] = useState(""); // Initialize token from localStorage
    const url = "http://localhost:4000"
    const [all_products, setAll_products] = useState([])

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: 1,
            }));
        } else {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: prev[itemId] + 1,
            }));
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_products.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchProductList = async (req, res) =>{
        const response = await axios.get(url + "/api/product/list")
        setAll_products(response.data.data)
    }

    useEffect(()=>{
        async function loadData(){
            await fetchProductList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
            }
        }
        loadData()
    },[])

    // Context values that will be provided to other components
    const contextValue = {
        all_products, 
        cartItems, 
        setCartItems, 
        addToCart, 
        removeFromCart, 
        getTotalCartAmount, 
        url, 
        token, 
        setToken 
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
