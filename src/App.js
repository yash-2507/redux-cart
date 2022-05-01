import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotals } from "./features/cart/cartSlice";
import { useEffect } from "react";
import Modal from "./components/Modal";
import { Routes, Route } from "react-router-dom";

function App() {
    const { cartItems } = useSelector((store) => store.cart);
    const { isOpen } = useSelector((store) => store.modal);
    const dispatch = useDispatch();
    <Routes>
        <Route path="/cart" component={<App.js />} />
    </Routes>;
    useEffect(() => {
        dispatch(calculateTotals());
    }, [cartItems]);
    return (
        <main>
            {isOpen && <Modal />}
            <Navbar />
            <CartContainer />
        </main>
    );
}
export default App;
