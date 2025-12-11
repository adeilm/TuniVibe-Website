import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import eventService from "../services/eventService";
import soldout from "../assets/SoldOut0.png"; 
const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchEvents = async () => {
    const data = await eventService.getAllEvents();

    // Tri : par date, puis par heure de début si date identique
    const sortedEvents = data.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;

      // même date -> trier selon l'heure de début
      const startA = a.startTime.split(":").map(Number);
      const startB = b.startTime.split(":").map(Number);
      const minutesA = startA[0] * 60 + startA[1];
      const minutesB = startB[0] * 60 + startB[1];
      return minutesA - minutesB;
    });

    // Garder uniquement les 6 événements les plus proches
    setEvents(sortedEvents.slice(0, 6));
  };

  fetchEvents();
}, []);


  if (!events.length)
    return <p className="text-center mt-10">Aucun événement disponible.</p>;

  const goToEvent = (id) => {
    navigate(`/event/${id}`);
  };

  const formatTime = (timeString) => {
  if (!timeString) return "";
  return timeString.slice(0, 5); // garde seulement "hh:mm"
  };

  return (
    <section className="pt-[60px] py-16 px-8 mb-10 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto text-center mb-8 ">
        <h2 className="text-3xl font-bold mb-4 ">Plongez dans l’expérience des événements les plus excitants de Tunisie !</h2>
        <p className="text-gray-800 text-lg">
        <span className="bg-[#ffe390] px-1 rounded-xl">
          Explorez les concerts, spectacles, ateliers et festivals près de chez vous et réservez vos places dès maintenant
        </span>
      </p>
      </div>

      {/* Grille fixe 3 colonnes × 2 lignes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {events.map((event) => (
            <div
              key={event.id}
              onClick={() => {
                goToEvent(event.id);
               window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="relative bg-white rounded-xl shadow-lg p-4 
             transition-transform hover:scale-105 hover:bg-pink-50 cursor-pointer overflow-hidden"
            >
            {/* Étiquette catégorie */}
            <div className="absolute top-3 right-3 bg-[#ffd658] text-gray-900 font-bold text-xs px-3 py-1 rounded-l-lg shadow-lg tag z-20">
              {event.categorie}
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
            <h3 className="text-xl font-bold text-left mb-2">{event.titre}</h3>

            <div className="flex items-center text-sm text-gray-600 mb-1">
              <FaCalendarAlt className="text-yellow-500 mr-2" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <FaClock className="text-yellow-500 mr-2" />
              <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <FaMapMarkerAlt className="text-yellow-500 mr-2" />
              <span>{event.ville} - {event.adresse}</span>
            </div>

            <hr className="border-gray-300 my-2" />

            <div className="flex items-center justify-between mt-1">
                {event.nbTicketsRestants > 0 ? (
                  <>
                    <span className="text-[#6e91da] font-semibold">
                      {event.nbTicketsRestants} places restantes
                    </span>
                    <span className="text-yellow-500 font-semibold">{event.prixTicket} DT</span>
                  </>
                ) : (
                  <span className="text-red-500 text-center font-semibold">
                    Complet – Restez connectés aux nouveautés !
                  </span>
                )}
              </div>
          </div>
        ))}
      </div>

      {/* Bouton Voir tous les événements */}
      <div className="text-center mt-10">
        <button
          onClick={() => {
          navigate("/all-events");
          window.scrollTo({ top: 0, behavior: "smooth" }); // <-- force scroll en haut
        }}
          className="bg-[#ffd658] text-gray-900 font-bold px-6 py-3 rounded-xl shadow
                     hover:bg-[#6e91da] hover:text-white hover:scale-105
                     transition-colors transition-transform duration-300"
        >
          Voir tous les événements
        </button>
      </div>
    </section>
  );
};

export default EventsSection;
