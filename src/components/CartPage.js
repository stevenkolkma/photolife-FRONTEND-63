import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CartPage.css";
import { selectCartItems, selectTotalPrice } from "../store/cart/selectors";
import CartItem from "./CartItem";
import { addToCart, removeFromCart, clearCart } from "../store/cart/slice";

export const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchase = () => {
    setPurchasing(true);
    const purchaseData = {
      items: cartItems,
      totalPrice,
    };
    // Dispatch the createPurchase action to create a new purchase in the backend
    // dispatch(createPurchase(purchaseData));
    // Dispatch an action to clear the cart after a successful purchase
    dispatch(clearCart());
  };

  return (
    <div className="cart-page-container">
      <h1>Shopping Cart</h1>
      <div className="cart-items-container">
        {cartItems.map((item) => (
          <CartItem
            key={item.photoId}
            photo={item.photo}
            onRemove={() => dispatch(removeFromCart(item.photoId))}
          />
        ))}
      </div>
      <div className="cart-total-price">Total: ${totalPrice}</div>
      {cartItems.length > 0 && (
        <button onClick={handlePurchase} disabled={purchasing}>
          {purchasing ? "Purchasing..." : "Purchase"}
        </button>
      )}
    </div>
  );
};
