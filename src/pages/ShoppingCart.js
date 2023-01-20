import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { selectCartItems } from "../store/cart/selectors";
import { selectUser } from "../store/user/selectors";
import { useRef } from "react";
import { apiUrl } from "../config/constants";
import {
  clearCart,
  updateQuantity,
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
} from "../store/cart/slice";
import { makeNewOrder } from "../store/user/thunks";
import "./ShoppingCart.css";

export const ShoppingCart = () => {
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  // Calculate total price of all items in the cart
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const handleOrder = async () => {
    try {
      const { id } = user;
      dispatch(
        makeNewOrder({
          id,
          address: user.address,
          totalPrice,
          cartItems,
        })
      );
      // Clear the cart after successful order
      dispatch(clearCart());
    } catch (error) {
      console.log(error);
      // Show error message
      alert("Error placing order");
    }
  };

  const removeFromCartHandler = (photoId) => {
    console.log("removefromcarthandler", photoId);
    dispatch(removeFromCart(photoId));
  };

  const handleBlur = (e, photoId) => {
    // handleQuantityChange(e, photoId);
    const qty = e.target.value;
    if (isNaN(qty)) {
      alert("Please enter a valid number");
      inputRef.current.value = "";
      return;
    }
    const quantity = parseInt(qty);
    dispatch(updateQuantity({ photoId, quantity }));
    inputRef.current.value = "";
  };

  return (
    <div className="shopping-cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-item-container">
        {cartItems.map((item) => (
          <div key={item.photoId} className="cart-item">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="cart-item-image"
            />
            <p className="cart-item-name">{item.name}</p>
            <div className="cart-item-quantity-container">
              <button
                className="cart-item-button"
                onClick={() => dispatch(decrementQuantity(item.photoId))}
              >
                -
              </button>
              <p className="cart-item-quantity">{item.quantity}</p>
              <input
                type="text"
                ref={inputRef}
                onBlur={(e) => handleBlur(e, item.photoId)}
                className="cart-item-input"
              />
              <button
                className="cart-item-button"
                onClick={() => dispatch(incrementQuantity(item.photoId))}
              >
                +
              </button>
              <button
                className="cart-item-button"
                onClick={() => removeFromCartHandler(item.photoId)}
              >
                Remove
              </button>
            </div>
            <p className="cart-item-price">Price: ${item.price}</p>
            <p className="cart-item-total-price">
              Total price: ${item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>
      <div className="cart-total-container">
        <p className="cart-total-price">Total cart price: ${totalPrice}</p>
        <button className="cart-button" onClick={() => dispatch(clearCart())}>
          Clear cart
        </button>
        <button className="cart-button" onClick={handleOrder}>
          Order
        </button>
      </div>
    </div>
  );
};
