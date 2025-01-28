import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from 'react-router-dom';
import AddBook from "./pages/book/AddBook";
import Cart from "./pages/cart/Cart";

function App() {

  const { pathname } = useLocation();

  if (pathname === '/signin') {
    return (
      <div id='app'>
        <Routes>
          <Route path='/signin/*' exact={true} element={<Home />}></Route>
        </Routes>
      </div>
    );
  }

  if (pathname === '/signup') {
    return (
      <div id='app'>
        <Routes>
          <Route path='/signup/*' exact={true} element={<Home />}></Route>
        </Routes>
      </div>

    );
  }

  return (
    <div id='wrap'>
      <Header />
      <Routes>
        <Route path='/*' exact={true} element={<Home />}></Route>
        <Route path='/BookMarket/books/add' exact={true} element={<AddBook />}></Route>
        <Route path='/BookMarket/cart' exact={true} element={<Cart />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
