import { useEffect, useState } from "react";
import { create } from "zustand";
import { useTriggerStore } from "./TriggerMechanism";

// Zustand store
export const useStore = create((set) => ({
  customerChoices: [],
  setCustomerChoice: (newChoice) =>
    set((state) => {
      const existingItem = state.customerChoices.find(
        (item) => item.name === newChoice.name
      );

      if (!existingItem) {
        return {
          customerChoices: [...state.customerChoices, newChoice],
        };
      }
      return {
        customerChoices: state.customerChoices.map((item) =>
          item.name === newChoice.name
            ? { ...item, quantity: item.quantity + newChoice.quantity }
            : item
        ),
      };
    }),
  updateQuantity: (name, newQuantity) =>
    set((state) => ({
      customerChoices: state.customerChoices.map((item) =>
        item.name === name ? { ...item, quantity: newQuantity } : item
      ),
    })),
  removeChoice: (name) =>
    set((state) => ({
      customerChoices: state.customerChoices.filter(
        (item) => item.name !== name
      ),
    })),
  clearAllChoices: () => set({ customerChoices: [] }),
}));

function FoodDisplay(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [increment, setCountIncrement] = useState(1);
  const clearTabs = useTriggerStore((state) => state.clearTabs);
  const { setCustomerChoice, updateQuantity, removeChoice } = useStore();

  function handleClick() {
    setIsClicked(true);
    setCustomerChoice({
      name: props.name,
      price: props.price,
      quantity: increment,
    });
  }

  function selectIncrement() {
    setCountIncrement((prevCount) => {
      const newCount = prevCount + 1;
      updateQuantity(props.name, newCount);
      return newCount;
    });
  }

  function selectDecrement() {
    setCountIncrement((prevCount) => {
      if (prevCount > 1) {
        const newCount = prevCount - 1;
        updateQuantity(props.name, newCount);
        return newCount;
      } else {
        setIsClicked(false);
        removeChoice(props.name);
        return 1;
      }
    });
  }
  useEffect(() => {
    if (clearTabs) {
      setIsClicked(false);
      setCountIncrement(1);
    }
  }, [clearTabs]);
  return (
    <>
      <div className="foodItem">
        <div className="foodImage">
          <img
            src={props.image}
            alt=""
            className={`${isClicked ? "Borders" : ""}`}
          />
        </div>
        <button className="cart selectIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="5"
            fill="none"
            viewBox="0 0 10 2"
            className="minus"
            onClick={selectDecrement}
          >
            <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
          </svg>
          <p className="forHover">{increment}</p>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="green"
              viewBox="0 0 10 10"
              className="plus"
              onClick={selectIncrement}
            >
              <path
                fill="#fff"
                d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
              />
            </svg>
          </div>
        </button>
        <button
          className={`cart ${isClicked ? "Hidden" : ""}`}
          onClick={handleClick}
          id="addToCart"
        >
          <img src=".\assets\images\icon-add-to-cart.svg" alt="" />
          <h4>Add to Cart</h4>
        </button>
        <div className="foodDescription">
          <h5 className="foodName">{props.category}</h5>
          <h4 className="foodAccompaniment">{props.name}</h4>
          <h4 className="price">${props.price.toFixed(2)}</h4>
        </div>
      </div>
    </>
  );
}

export default FoodDisplay;

export function Checklist() {
  const { customerChoices, removeChoice } = useStore();

  return (
    <>
      <div>
        <ol>
          {customerChoices.map((item, index) => (
            <li key={index}>
              {item.name}
              <div className="priceIdicator">
                <div className="priceDisplayed">
                  <div className="quantityStyle">{item.quantity}x</div>
                  <div className="amountTotal">
                    <div>@{item.price.toFixed(2)}</div>
                    <div>${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="none"
                  viewBox="0 0 10 10"
                  className="removeItem"
                >
                  <path
                    fill="#CAAFA7"
                    d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                  />
                </svg> */}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export function Checklist2() {
  return (
    <>
      <div>
        <img src="assets/images/illustration-empty-cart.svg" alt="" />
        <p>Your added items will appear here</p>
      </div>
    </>
  );
}
