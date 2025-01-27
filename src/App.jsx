import FoodDisplay from "./componets/FoodDisplay";
import FoodData from "./componets/FoodData";
import { Checklist } from "./componets/FoodDisplay";
import { useStore } from "./componets/FoodDisplay";
import { Checklist2 } from "./componets/FoodDisplay";
import Modal from "./componets/Modal";
import { useTriggerStore } from "./componets/TriggerMechanism";

function App() {
  const arr = useStore((state) => state.customerChoices);
  const IsTriggered = useTriggerStore((state) => state.IsTriggered);
  let CarbonNeutral = "assets/images/icon-carbon-neutral.svg";

  let totalPrice = 0;
  let totalquantity = 0;
  return (
    <>
      <main className="The">
        <div className="titles">Desserts</div>
        <div className="CartSelector">
          <div className="package">
            {FoodData.map((food, index) => (
              <FoodDisplay
                key={index}
                name={food.name}
                price={food.price}
                category={food.category}
                image={food.image.mobile}
                ind={index}
              />
            ))}
          </div>
          <div className={`emptyCart`}>
            {arr.map((quant) => {
              totalquantity = totalquantity + quant.quantity;
            })}
            <h2>Your Cart ({totalquantity})</h2>
            {totalquantity > 0 ? (
              <div>
                <Checklist />

                {arr.map((order) => {
                  totalPrice = totalPrice + order.quantity * order.price;
                })}
                <p className="totalOrders">
                  Order Total <span>${totalPrice.toFixed(2)}</span>
                </p>
                <p className="carbonNeutral">
                  <img src={CarbonNeutral} alt="carbon neutral" />
                  This is a <strong>carbon-neutral</strong> delivery
                </p>
                <button onClick={IsTriggered}>Confirm Order</button>
              </div>
            ) : (
              <Checklist2 />
            )}
          </div>
          <Modal />
        </div>
      </main>
    </>
  );
}

export default App;
