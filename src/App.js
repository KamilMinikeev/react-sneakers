import React from 'react';
//import React, { useState } from 'react';

import { Route, Routes } from "react-router-dom";

import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

import { AppContext } from './context';


function App() {

  //Массив карточек на страницы
  const [items, setItems] = React.useState([])

  //Массив карточек из корзины
  const [cartItems, setCartItems] = React.useState([])

  //Массив избранных карточек
  const [favorites, setFavorites] = React.useState([])

  //Открытие корзины
  const [cartOpened, setCartOpened] = React.useState(false)

  //Открытие страницы Избранное
  const [favoritesOpened, setFavoritesOpened] = React.useState(false)

  //Поиск товаров
  const [searchValue, setSearchValue] = React.useState('')

  //Загрузка страницы
  const [isLoading, setIsLoading] = React.useState(true)

  //Получаем данные с backend
  React.useEffect(() => {

    async function fetchData() {
      try {
        setIsLoading(true)

        const [cartResponse, favoritesResponse, itemResponse] = await Promise.all(
          [axios.get('https://639862c5044fa481d69b8319.mockapi.io/cart'),
          axios.get('https://6460eb1d185dd9877e333451.mockapi.io/favorites'),
          axios.get('https://639862c5044fa481d69b8319.mockapi.io/items')
          ]
        )

        // const cartResponse = await axios.get('https://639862c5044fa481d69b8319.mockapi.io/cart');
        // const favoritesResponse = await axios.get('https://6460eb1d185dd9877e333451.mockapi.io/favorites');
        // const itemResponse = await axios.get('https://639862c5044fa481d69b8319.mockapi.io/items');

        setIsLoading(false)

        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemResponse.data)
      }
      catch (error) {
        alert('Ошибка при запросе данных!')
        console.error(error)
      }
    }
    fetchData()

  }, [])


  //Добавление товара в корзину
  const onCart = async (cartObj) => {

    try {
      const findItem = (cartItems.find(obj => Number(obj.cardId) === cartObj.cardId));
      if (findItem) {
        setCartItems(prev => prev.filter(item => item.cardId !== cartObj.cardId));
        await axios.delete(`https://639862c5044fa481d69b8319.mockapi.io/cart/${findItem.id}`);
      }
      else {
        setCartItems(prev => [...prev, cartObj])
        const { data } = await axios.post('https://639862c5044fa481d69b8319.mockapi.io/cart', cartObj);

        setCartItems((prev) => prev.map(item => {
          if (item.cardId === data.cardId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item;
        }))
      }
    }

    catch (error) {
      alert('Не удалось добавить товар в корзину!');
      console.error(error)
    }

  }

  // Удаление товара из корзины
  const deleteItemOnCart = async (cartObj) => {
    try {
      setCartItems(prev => prev.filter(item => item.cardId !== cartObj.cardId))
      await axios.delete(`https://639862c5044fa481d69b8319.mockapi.io/cart/${cartObj.id}`);

    }
    catch (error) {
      alert('Не удалось удалить товар из корзины!')
      console.error(error)
    }

  }

  //Поиск товаров
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  //Добавление товаров в избранное
  const onAddToFavorite = async (favoriteObj) => {
    try {
      const findItem = (favorites.find(obj => Number(obj.cardId) === favoriteObj.cardId));
      if (findItem) {
        setFavorites(prev => prev.filter(item => item.cardId !== favoriteObj.cardId));
        await axios.delete(`https://6460eb1d185dd9877e333451.mockapi.io/favorites/${findItem.id}`);
      }
      else {
        setFavorites(prev => [...prev, favoriteObj])
        const { data } = await axios.post('https://6460eb1d185dd9877e333451.mockapi.io/favorites', favoriteObj);

        setFavorites((prev) => prev.map(item => {
          if (item.cardId === data.cardId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item;
        }))

        isItemFavorite(favoriteObj.cardId)

      }

      // if (favorites.find(obj => obj.cardId === favoriteObj.cardId)) {
      //   axios.delete(`https://6460eb1d185dd9877e333451.mockapi.io/favorites/${favoriteObj.id}`);
      //   setFavorites(prev => prev.filter(item => item.cardId !== favoriteObj.cardId));
      // }
      // else {
      //   const { data } = await axios.post('https://6460eb1d185dd9877e333451.mockapi.io/favorites', favoriteObj);
      //   setFavorites(prev => [...prev, data])
      // }
    }
    catch (error) {
      alert('Не удалось добавить в Избранное')
      console.error(error)
    }
  }

  //Смена иконки Плюса на Галочку
  const isItemAdded = (cardId) => {
    return cartItems.some(cartObj => Number(cartObj.cardId) === Number(cardId))
  }
  //Смена иконки Избранное
  const isItemFavorite = (cardId) => {
    return favorites.some(favoriteObj => Number(favoriteObj.cardId) === Number(cardId))
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, isItemFavorite, onAddToFavorite, onCart, setCartItems, setCartOpened }}>
      <div className="inner">


        {/* {cartOpened && <Drawer items={cartItems} onClickDelete={(cartObj) => deleteItemOnCart(cartObj)} />} */}
        <Drawer items={cartItems} onClickDelete={(cartObj) => deleteItemOnCart(cartObj)} opened={cartOpened} />
        <div className="wrapper">
          <Header onClickCart={() => setCartOpened(true)} onClickFavorite={() => setFavoritesOpened(true)} />
          <Routes>
            <Route path="/favorites"
              element={
                <Favorites />
              }
            />
            <Route path="/orders"
              element={
                <Orders />
              }
            />
            <Route path="/"
              element={
                <Home
                  items={items}
                  cartItems={cartItems}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  onChangeSearchInput={onChangeSearchInput}
                  onCart={onCart}
                  onAddToFavorite={onAddToFavorite}
                  isLoading={isLoading}
                />
              }
            />
          </Routes>

        </div>
      </div >
    </AppContext.Provider>


  );
}

export default App;
