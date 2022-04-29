import { DeleteIcon, PlusIcon, MinusIcon } from "../icons";
import { removeItem, toggle } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

export default function CartItem({ id, img, title, price, amount }) {
    const dispatch = useDispatch();
    return (
        <article className="cart-item">
            <img src={img} alt={title} />
            <div>
                <h4>{title}</h4>
                <h4 className="item-price">₹{price}</h4>

                <button
                    className="remove-btn"
                    onClick={() => dispatch(removeItem(id))}
                >
                    {/* remove */}
                    <DeleteIcon />
                </button>
            </div>
            <div
                style={{
                    display: "flex",
                    gap: 20,
                    alignItems: "center",
                }}
            >
                <button
                    className="amount-btn"
                    onClick={() => {
                        if (amount === 1) {
                            dispatch(removeItem(id));
                            return;
                        }
                        dispatch(toggle({ increase: false, id }));
                    }}
                >
                    <MinusIcon />
                </button>
                <p className="amount">{amount}</p>
                <button
                    className="amount-btn"
                    onClick={() => {
                        dispatch(toggle({ increase: true, id }));
                    }}
                >
                    <PlusIcon />
                </button>
            </div>
        </article>
    );
}
