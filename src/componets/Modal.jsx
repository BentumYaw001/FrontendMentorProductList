import { useStore } from "./FoodDisplay";
import FoodData from "./FoodData";
import { useTriggerStore } from "./TriggerMechanism";
function Modal() {
  const selectedFood = useStore((state) => state.customerChoices);
  const Triggered = useTriggerStore((state) => state.Triggered);
  const IsNotTriggered = useTriggerStore((state) => state.IsNotTriggered);

  let TotalBillDue = 0;

  return (
    <div className={`startNewOrder ${Triggered ? "" : "Hidden"}`}>
      <div className="orderConfirmed">
        <div className="description">
          <img
            src="assets/images/icon-order-confirmed.svg"
            alt="Order Confirmed"
          />
          <h2>Order Confirmed</h2>
          <p>We hope you enjoy your food!</p>
        </div>
        <div className="Items">
          <div className="ItemsPurchased">
            {selectedFood.map((item) => {
              TotalBillDue += item.price * item.quantity;

              // Find the image associated with the current item
              const foodItem = FoodData.find((data) => data.name === item.name);
              const imageSrc =
                foodItem?.image.thumbnail ||
                "assets/images/default-thumbnail.jpg";

              return (
                <>
                  <div className="confirmedSpecifics" key={item.name}>
                    <img src={imageSrc} alt={item.name} />
                    <div>
                      <h2>{item.name}</h2>
                      <div className="cpq">
                        <h4>{item.quantity}x</h4>
                        <h3>@${item.price.toFixed(2)}</h3>
                      </div>
                    </div>

                    <h2 className="PriceAdjacent">
                      ${(item.quantity * item.price).toFixed(2)}
                    </h2>
                  </div>
                </>
              );
            })}
          </div>
          <div>
            <p className="confirmedPrice">
              Order Total <span>${TotalBillDue.toFixed(2)}</span>
            </p>
          </div>
        </div>
        <button onClick={IsNotTriggered}>Start New Order</button>
      </div>
    </div>
  );
}

export default Modal;
