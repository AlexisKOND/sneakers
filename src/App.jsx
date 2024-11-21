import Header from './components/Header/Header.jsx';
import Drawer from './components/Drawer/Drawer.jsx';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './pages/Home.jsx';
import Favorites from './pages/Favorites.jsx';
import AppContext from './context.js';

function App() {
    const [items, setItems] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const itemResponse = await axios.get(
                'https://671a4a49acf9aa94f6aa0aa5.mockapi.io/items'
            );

            const cartResponse = await axios.get(
                'https://671a4a49acf9aa94f6aa0aa5.mockapi.io/cart'
            );

            setIsLoading(false);
            setItems(itemResponse.data);
            setCartItems(cartResponse.data);
        }

        fetchData();
    }, []);

    const onAddToCart = obj => {
        if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
            axios.delete(`https://671a4a49acf9aa94f6aa0aa5.mockapi.io/cart/${obj.id}`);

            setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
        } else {
            axios.post('https://671a4a49acf9aa94f6aa0aa5.mockapi.io/cart', obj);
            setCartItems(prev => [...prev, obj]);
        }
    };

    const onAddToFavorite = obj => {
        axios.post('https://671a4a49acf9aa94f6aa0aa5.mockapi.io/favorites', obj);
        setFavorites(prev => [...prev, obj]);
    };

    const onRemoveFromCart = id => {
        axios.delete(`https://671a4a49acf9aa94f6aa0aa5.mockapi.io/cart/${id}`);
        setCartItems(prev => prev.filter(item => item.id !== id));
        console.log(id);
    };

    const onChangeSearchInput = event => {
        setSearchValue(event.target.value);
    };

    const isItemAdded = id => {
        return cartItems.some(obj => Number(obj.id) === Number(id));
    };

    return (
        <AppContext.Provider
            value={{
                items,
                cartItems,
                favorites,
                isItemAdded,
                setCartOpened,
                setCartItems,
            }}
        >
            <div className="wrapper">
                {cartOpened && (
                    <Drawer
                        items={cartItems}
                        onClose={() => setCartOpened(false)}
                        onRemove={onRemoveFromCart}
                    />
                )}

                <Header onClickCart={() => setCartOpened(true)} />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                items={items}
                                cartItems={cartItems}
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                favorites={favorites}
                                onAddToCart={onAddToCart}
                                onRemoveFromCart={onRemoveFromCart}
                                onAddToFavorite={onAddToFavorite}
                                onChangeSearchInput={onChangeSearchInput}
                                isLoading={isLoading}
                            />
                        }
                    />

                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
