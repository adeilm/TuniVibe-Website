// src/pages/AllEvents.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import eventService from "../services/eventService";
import FilterBar from "../components/FilterBar";
import soldout from "../assets/SoldOut0.png";
import image from "../assets/hero-concert.jpg";

const AllEvents = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("TOUS");
  const [priceOrder, setPriceOrder] = useState(null); // null | "asc" | "desc"
  const [selectedDate, setSelectedDate] = useState("");

  const CATEGORIES = [
    "TOUS",
    "CONCERT",
    "THEATRE",
    "EXPOSITION",
    "FESTIVAL",
    "CONFERENCE",
    "ATELIER",
    "CINEMA",
  ];

  useEffect(() => {
  const fetchEvents = async () => {
    try {
      const data = await eventService.getAllEvents();

      // Date du jour (sans heures)
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Filtrer uniquement les événements confirmés et à venir ou aujourd'hui
      let filtered = data.filter((e) => {
        if (e.status !== "CONFIRME") return false;
        const eventDate = new Date(e.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today &&
               (!selectedCity || e.ville.toLowerCase().includes(selectedCity.toLowerCase())) &&
               (!selectedDate || e.date === selectedDate) &&
               (selectedCategory === "TOUS" || e.categorie === selectedCategory);
      });

      // Tri par prix si défini
      if (priceOrder === "asc") {
        filtered = filtered.sort((a, b) => a.prixTicket - b.prixTicket);
      } else if (priceOrder === "desc") {
        filtered = filtered.sort((a, b) => b.prixTicket - a.prixTicket);
      } else {
        // Tri par date puis startTime si pas de tri prix
        filtered = filtered.sort((a, b) => {
          if (a.date < b.date) return -1;
          if (a.date > b.date) return 1;
          if (a.startTime < b.startTime) return -1;
          if (a.startTime > b.startTime) return 1;
          return 0;
        });
      }

      setEvents(filtered);
    } catch (err) {
      console.error("Erreur lors du chargement :", err);
    }
  };

  fetchEvents();
}, [selectedCity, selectedCategory, selectedDate, priceOrder]);


  const goToEvent = (id) => navigate(`/event/${id}`);

  const formatTime = (timeString) => {
    if (!timeString) return "";
    return timeString.slice(0, 5);
  };

  return (
    <div className="flex flex-col">
      {/* Bande du haut */}
      <div className="my-10 relative w-full h-64 flex items-center justify-center">
        <img
          src={image}
          alt="Événements"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
              <div className="relative text-center max-w-2xl px-4">
          <h1 className="text-4xl text-gray-900 font-bold mb-2">Tous les événements</h1>
          <p className="text-lg text-gray-900 opacity-90">
            Plongez dans l'univers passionnant des événements et découvrez l’inoubliable.
          </p>
        </div>
      </div>

      {/* Filtre */}
      <FilterBar
        cities={cities}
        categories={CATEGORIES}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceOrder={priceOrder}
        setPriceOrder={setPriceOrder}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <hr className="border-gray-300 my-2" />

      {/* Liste événements */}
      <main className="p-6 mb-10">
        {events.length === 0 && <p>Aucun événement trouvé.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => {
                goToEvent(event.id);
               window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:scale-105 transition-transform relative"
            >
              {/* Étiquette catégorie */}
              <div className="absolute top-3 right-3 bg-[#ffd658] text-gray-900 font-bold text-xs px-3 py-1 rounded-l-lg shadow z-20">
                {event.categorie || "Autre"}
              </div>

              {/* Image de l'evenement */}
              <img
                src={event.imageBase64}
                alt={event.titre}
                className="rounded-lg w-full h-48 object-cover mb-3 "
              />
                              
              {/* Overlay "Sold Out" si tickets restants = 0 */}
                {event.nbTicketsRestants === 0 && (
                  <img
                    src={soldout} // <-- ton image "Sold Out" (PNG transparent)
                    alt="Sold Out"
                    className="absolute inset-0 top-0 left-0 w-full h-full object-contain pointer-events-none"
                    style={{ zIndex: 50 }}
                  />
                )}
              <h3 className="text-xl font-bold mb-2">{event.titre}</h3>

              <div className="flex items-center text-sm text-gray-600 mb-1">
                <FaCalendarAlt className="text-yellow-500 mr-2" />
                <span>{event.date}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-1">
                <FaClock className="text-yellow-500 mr-2" />
                <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-1">
                <FaMapMarkerAlt className="text-yellow-500 mr-2" />
                <span>{event.ville}</span>
              </div>

              <hr className="border-gray-300 my-2" />

              <div className="flex justify-between mt-2">
                <span className="text-[#6e91da] font-semibold">{event.nbTicketsRestants} places</span>
                <span className="text-yellow-500 font-semibold">{event.prixTicket} DT</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllEvents;
