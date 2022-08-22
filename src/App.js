import CartContainer from './components/CartContainer';
import Navbar from './components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { calculateTotals, getItems } from './features/cart/cartSlice';
import { useEffect } from 'react';
import Modal from './components/Modal';
import Loader from './components/Loader';

function App() {
    const { cartItems, isLoading } = useSelector((store) => store.cart);
    const { isOpen } = useSelector((store) => store.modal);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getItems('random'));
    }, []);
    useEffect(() => {
        dispatch(calculateTotals());
    }, [cartItems]);

    if (isLoading) {
        return (
            // <div className='loading'>
            //     <h1>Loading...</h1>
            // </div>
            <Loader />
        );
    }
    return (
        <main>
            {isOpen && <Modal />}
            <Navbar />
            <CartContainer />
        </main>
    );
}
export default App;
