// src/components/Layout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserCircle, Heart, Clock, Settings, LogOut } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const CATEGORY_MAP = {
  Concerts: "CONCERT",
  Théâtres: "THEATRE",
  Expositions: "EXPOSITION",
  Festivals: "FESTIVAL",
  Conférences: "CONFERENCE",
  Ateliers: "ATELIER",
  Cinéma: "CINEMA",
};
const CATEGORIES = Object.keys(CATEGORY_MAP);

const Layout = () => {
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Effet scroll pour navbar
  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Charger user depuis localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-[#ffe3ee] text-gray-900">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-[999] flex justify-between items-center 
        px-5 md:px-10 py-4 transition-colors duration-300
        ${scroll ? "bg-white text-gray-900 shadow-md" : "bg-[#ffe3ee] text-gray-900"}`}
      >
        <h1
          className="text-3xl font-bold text-yellow-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          TuniVibe
        </h1>

        <ul className="flex space-x-10 font-semibold text-lg items-center">

          {/* Accueil */}
          <li
            className="cursor-pointer px-3 py-1 rounded-lg hover:bg-[#ffd658]"
            onClick={() => navigate("/")}
          >
            Accueil
          </li>

          {/* Catégories */}
          <li className="relative group cursor-pointer px-3 py-1 rounded-lg hover:bg-[#ffd658]">
            Catégories
            <div
              className="absolute top-full left-0 mt-1 w-48 bg-white text-gray-900 rounded-lg shadow-lg 
              overflow-y-auto max-h-48 opacity-0 group-hover:opacity-100 
              invisible group-hover:visible transition-opacity z-50"
            >
              {CATEGORIES.map((cat, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 hover:bg-[#ffd658]"
                  onClick={() =>
                    navigate(`/category/${encodeURIComponent(CATEGORY_MAP[cat])}`)
                  }
                >
                  {cat}
                </div>
              ))}
            </div>
          </li>

          {/* Créer événement */}
          <li
            className="cursor-pointer px-3 py-1 rounded-lg hover:bg-[#ffd658]"
            onClick={() => {
              if (!user) {
                navigate("/login"); // pas connecté
              } else if (user.role === "ORGANISATEUR") {
                navigate("/create-event"); // organisateur
              } else {
                navigate("/favoris"); // participant
              }
            }}
          >
            Créer un événement
          </li>

          {/* Contact */}
          <li
            className="cursor-pointer px-3 py-1 rounded-lg hover:bg-[#ffd658]"
            onClick={() => {
              const footer = document.querySelector("footer");
              if (footer) footer.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contact
          </li>

          {/* Menu utilisateur */}
          <li className="relative">
            {!user ? (
              <div
                className="cursor-pointer px-3 py-1 rounded-lg hover:bg-[#ffd658] flex items-center gap-2"
                onClick={() => navigate("/login")}
              >
                <UserCircle size={22} /> Connexion
              </div>
            ) : (
              <div onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className="cursor-pointer px-3 py-1 rounded-lg hover:bg-[#ffd658] flex items-center gap-2">
                  <UserCircle size={22} /> {user.prenom}
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg z-50 py-2">
                    {user.role === "PARTICIPANT" ? (
                      <>
                        <button
                          onClick={() => navigate("/reservations")}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#ffd658]"
                        >
                          <Clock size={18} /> Réservations
                        </button>

                        <button
                          onClick={() => navigate("/favoris")}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#ffd658]"
                        >
                          <Heart size={18} /> Favoris
                        </button>

                        <button
                          onClick={() => navigate("/compte")}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#ffd658]"
                        >
                          <Settings size={18} /> Paramètres
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => navigate("/mes-evenements")}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#ffd658]"
                        >
                          <Clock size={18} /> Mes événements
                        </button>

                        <button
                          onClick={() => navigate("/compte")}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#ffd658]"
                        >
                          <Settings size={18} /> Paramètres
                        </button>
                      </>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#ffd658] text-red-600"
                    >
                      <LogOut size={18} /> Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        </ul>
      </nav>

      {/* CONTENU PRINCIPAL */}
      <main className="pt-[30px]">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* À propos */}
          <div>
            <h3 className="font-bold text-lg mb-4">À propos</h3>
            <p className="text-gray-400 leading-relaxed">
              <span className="font-bold">TuniVibe</span> est une plateforme innovante dédiée à la 
              découverte, la gestion et la réservation d’événements en Tunisie. 
              Nous connectons les passionnés de culture, de musique, de théâtre 
              et d’art à des expériences uniques.
            </p>
            <div className="flex justify-center space-x-5 mt-5 text-2xl">
              <a href="#" className="hover:text-[#ffd658] transition"><FaFacebook /></a>
              <a href="#" className="hover:text-[#ffd658] transition"><FaTwitter /></a>
              <a href="#" className="hover:text-[#ffd658] transition"><FaInstagram /></a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-lg mb-4">Navigation</h3>
            <ul className="text-gray-400 space-y-2">
              <li className="cursor-pointer hover:text-white transition">Accueil</li>
              <li className="cursor-pointer hover:text-white transition">Événements</li>
              <li className="cursor-pointer hover:text-white transition">Services</li>
              <li className="cursor-pointer hover:text-white transition">Contact</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-gray-400">Email : contact@tunivibe.com</p>
            <p className="text-gray-400">Téléphone fixe : +216 71 234 567</p>
            <p className="text-gray-400">Mobile : +216 98 765 432</p>
          </div>
        </div>
      </footer>
      {/* Ligne du bas */}
        <div className="text-center text-gray-500 text-sm mt-3 px-5">
          © {new Date().getFullYear()} <span className="font-bold">TuniVibe</span> — Tous droits réservés.
          Plateforme dédiée à la promotion des événements en Tunisie.
        </div>
    </div>
  );
};

export default Layout;
