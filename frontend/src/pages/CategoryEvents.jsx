import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import eventService from "../services/eventService";
import FilterBar from "../components/FilterBarCategory";
import soldout from "../assets/SoldOut0.png";




import concertImg from "../assets/categories/concert.jpg";
import theatreImg from "../assets/categories/theatre.jpg";
import expoImg from "../assets/categories/exposition.jpg";
import festivalImg from "../assets/categories/festival.jpg";
import confImg from "../assets/categories/conference.jpg";
import workshopImg from "../assets/categories/workshop.jpg";
import cinemaImg from "../assets/categories/cinema.jpg";

const CategoryEvents = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
  const fetchEvents = async () => {
    try {
      // Récupérer tous les événements pour la catégorie
      const data = await eventService.getEventsByCategory(categoryName);

      // Récupérer les villes depuis le backend
      const citiesFromBackend = await eventService.getCitiesByCategory(categoryName);
      setCities(citiesFromBackend);

      // Date actuelle
      const today = new Date();
      today.setHours(0, 0, 0, 0); // ignore l'heure

      // Filtrage côté frontend
      const filtered = data.filter((e) => {
        const eventDate = new Date(e.date);
        eventDate.setHours(0, 0, 0, 0); // ignore l'heure pour comparer seulement la date

        return (
          e.prixTicket <= maxPrice &&
          (!selectedCity || e.ville.toLowerCase().includes(selectedCity.toLowerCase())) &&
          (!selectedDate || e.date === selectedDate) &&
          eventDate >= today // ✅ n'affiche que les événements futurs ou du jour même
        );
      });

      setEvents(filtered);
    } catch (err) {
      console.error("Erreur lors du chargement :", err);
    }
  };

  fetchEvents();
}, [categoryName, selectedCity, maxPrice, selectedDate]);


  const goToEvent = (id) => navigate(`/event/${id}`);

  const increasePrice = () => setMaxPrice((p) => Math.min(p + 10, 500));
  const decreasePrice = () => setMaxPrice((p) => Math.max(p - 10, 0));

  // Choix image
  const images = {
    CONCERT: concertImg,
    THEATRE: theatreImg,
    EXPOSITION: expoImg,
    FESTIVAL: festivalImg,
    CONFERENCE: confImg,
    ATELIER: workshopImg,
    CINEMA: cinemaImg,
  };

  // ✅ Phrases explicatives par catégorie
  const categoryDescriptions = {
    CONCERT: "Découvrez les meilleurs concerts et performances live.",
    THEATRE: "Spectacles, pièces modernes et classiques.",
    EXPOSITION: "Art, photos et expositions uniques.",
    FESTIVAL: "Festivals de musique, culture et plus.",
    CONFERENCE: "Participez à des conférences inspirantes.",
    ATELIER: "Ateliers pratiques pour développer vos compétences.",
    CINEMA: "Films, avant-premières et séances spéciales."
  };

  const formatTime = (timeString) => {
  if (!timeString) return "";
  return timeString.slice(0, 5); // garde seulement "hh:mm"
  };

  return (
    <div className="flex flex-col">
      {/* Bande du haut */}
      <div className="my-10 relative w-full h-64 flex items-center justify-center">
        <img
          src={images[categoryName] || concertImg}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt={categoryName}
        />
        <div className="relative text-center max-w-2xl px-4">
          <h1 className="text-4xl text-gray-900 font-bold mb-2">{categoryName}</h1>
          {/* ✅ Phrase explicative ajoutée */}
          <p className="text-lg text-gray-900 opacity-90">
            {categoryDescriptions[categoryName]}
          </p>
        </div>
      </div>

      

      <FilterBar
      cities={cities}
      categories={[categoryName]} // car on filtre déjà par catégorie
      selectedCity={selectedCity}
      setSelectedCity={setSelectedCity}
      maxPrice={maxPrice}
      setMaxPrice={setMaxPrice}
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
                className="relative bg-white rounded-xl shadow-md p-4 cursor-pointer hover:scale-105 transition-transform overflow-hidden"
              >
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
      </main>
    </div>
  );
};

export default CategoryEvents;
