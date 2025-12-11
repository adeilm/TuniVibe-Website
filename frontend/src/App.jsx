import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./components/Layout";
import CategoryEvents from "./pages/CategoryEvents"; // page pour afficher événements par catégorie
import AllEvents from "./pages/AllEvents"; // page pour afficher tous les événements
import EventDetail from "./pages/EventDetail"; // page pour les détails d'un événement
import Login from "./pages/Login"; // page de login
import SignupChoice from "./pages/SignupChoice"; // choix du rôle
import SignupForm from "./pages/SignupForm"; // formulaire signup
import PaymentForm from "./pages/PaymentForm";
import Voucher from "./pages/Voucher";
import CreateEvent from "./pages/CreateEvent";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout route pour toutes les pages avec Navbar */}
        <Route path="/" element={<Layout />}>
          {/* Page d'accueil */}
          <Route index element={<Home />} />

          {/* Page des événements par catégorie */}
          <Route path="category/:categoryName" element={<CategoryEvents />} />

          {/* Page pour tous les événements */}
          <Route path="/all-events" element={<AllEvents />} />

          {/* Page de détails d'un événement */}
          <Route path="/event/:id" element={<EventDetail />} />

          {/* Paiement */}
          <Route path="payment/:id" element={<PaymentForm />} />

          {/* Voucher */}
          <Route path="voucher" element={<Voucher />} />
          
          {/* Création d'événement */}
          <Route path="/create-event" element={<CreateEvent />} />

           {/* Nouvelle route pour ton dashboard admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />


      

          
        </Route>

        {/* Routes sans Layout (Login / Signup) */}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupChoice />} />
        <Route path="/signup/:role" element={<SignupForm />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
