import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CheckOutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { Error404Page } from './pages/Error404Page';
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </>
  )
}

export default App
