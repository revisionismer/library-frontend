import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from 'react-router-dom';

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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
