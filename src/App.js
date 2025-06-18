import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from 'react-router-dom';
import AddBook from "./pages/book/AddBook";
import Cart from "./pages/cart/Cart";
import OrderList from "./pages/order/OrderList";
import BoardList from "./pages/board/BoardList";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import UpdateMember from "./pages/member/UpdateMember";
import BookList from "./pages/book/BookList";
import DetailBook from "./pages/book/DetailBook";
import OrderConfirmation from "./pages/order/OrderConfirmation";
import OrderCustomerInfo from "./pages/order/OrderCustomerInfo";
import OrderFinished from "./pages/order/OrderFinished";
import OrderEdit from "./pages/order/OrderEdit";
import OrderView from "./pages/order/OrderView";

function App() {

  const { pathname } = useLocation();

  if (pathname === '/signin') {
    return (
      <div id='app'>
        <Routes>
          <Route path='/signin/*' exact={true} element={<SignIn />}></Route>
        </Routes>
      </div>
    );
  }

  if (pathname === '/signup') {
    return (
      <div id='app'>
        <Routes>
          <Route path='/signup/*' exact={true} element={<SignUp />}></Route>
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
        <Route path='/BookMarket/books' exact={true} element={<BookList />}></Route>
        <Route path='/BookMarket/books/:id/detail' exact={true} element={<DetailBook />}></Route>

        <Route path='/BookMarket/cart' exact={true} element={<Cart />}></Route>

        <Route path='/BookMarket/order/list' exact={true} element={<OrderList />}></Route>
        <Route path='/BookMarket/order/:id/orderInfo' exact={true} element={<OrderConfirmation />}></Route>
        <Route path='/BookMarket/order/orderCustomerInfo' exact={true} element={<OrderCustomerInfo />}></Route>

        <Route path='/BookMarket/order/orderConfirmation' exact={true} element={<OrderConfirmation />}></Route>
        <Route path='/BookMarket/order/orderFinished' exact={true} element={<OrderFinished />}></Route>

        <Route path='/BookMarket/order/view' exact={true} element={<OrderView />}></Route>
        <Route path='/BookMarket/order/edit' exact={true} element={<OrderEdit />}></Route>

        <Route path='/BookMarket/board/list' exact={true} element={<BoardList />}></Route>

        <Route path='/BookMarket/members/update' exact={true} element={<UpdateMember />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
