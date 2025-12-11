import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import eventService from "../services/eventService";
import soldout from "../assets/SoldOut0.png";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);

  // Récupération automatique de l'utilisateur connecté
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await eventService.getEventById(id);
        setEvent(data);
      } catch (error) {
        console.error("Erreur lors du chargement de l'événement :", error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleReserve = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    // Redirection vers le formulaire de paiement avec le nombre de tickets
    navigate(`/payment/${id}?tickets=${ticketCount}`);
  };

  if (!event) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="flex flex-col md:flex-row p-6 gap-6 max-w-7xl mx-auto my-10">

     {/* IMAGE & INFOS - STYLE CARTE MODERNE */}
      <div className="relative bg-white rounded-xl shadow-lg p-4 
             transition-transform hover:scale-105 hover:bg-pink-50 cursor-pointer overflow-hidden">

        {/* Catégorie */}
        <div className="bg-gray-900 text-white font-bold text-xs px-3 py-1 
                        rounded-lg shadow-md inline-block mb-3">
          {event.categorie}
        </div>

        {/* Image */}
        <img
          src={event.imageBase64 || event.image}
          alt={event.titre}
          className="rounded-xl w-full h-64 object-cover shadow-md"
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

        {/* Infos détaillées */}
        <div className="mt-5 text-gray-700 space-y-3">

          <p className="flex justify-between border-b pb-1">
            <span className="font-semibold">Date :</span> 
            <span>{event.date}</span>
          </p>

          <p className="flex justify-between border-b pb-1">
            <span className="font-semibold">Heure :</span> 
            <span>{event.startTime} - {event.endTime}</span>
          </p>

          <p className="flex justify-between border-b pb-1">
            <span className="font-semibold">Ville :</span> 
            <span>{event.ville}</span>
          </p>

          <p className="flex justify-between border-b pb-1">
            <span className="font-semibold">Adresse :</span> 
            <span>{event.adresse}</span>
          </p>

          <p className="flex justify-between pt-1 text-lg font-bold text-gray-900">
            <span>Prix :</span> 
            <span>{event.prixTicket} DT</span>
          </p>
        </div>
      </div>


      {/* CONTENU DROITE - STYLE CARTE JAUNE */}
      <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-6 flex flex-col">

        {/* Titre de l'événement */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{event.titre}</h2>

        {/* Description */}
        <p className="text-gray-700 mb-6 leading-relaxed">{event.description}</p>

        {/* Si plus de tickets restants */}
        {event.nbTicketsRestants === 0 ? (
          // 🔴 Bouton Sold Out dynamique
          <button
            className="w-48 mx-auto bg-gray-900 text-white font-bold text-lg px-6 py-4 rounded-xl shadow-lg
                      "
            disabled
          >
            SOLD OUT
          </button>
        ) : (
          // 🎟 Sélecteur + Bouton Réserver
          <>
            {/* Sélecteur de tickets avec label sur la même ligne */}
            <div className="mb-6 flex items-center justify-center gap-6">
              <span className="text-gray-800 font-semibold whitespace-nowrap">
                Réservez vos billets :
              </span>

              <div className="bg-white shadow-xl rounded-xl p-2 flex items-center gap-4 border-2 border-gray-300">
                <button
                  onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                  className="bg-gray-200 w-10 h-10 rounded-full border-2 border-gray-400 text-2xl font-bold 
                            hover:bg-gray-300 transition flex items-center justify-center"
                >
                  -
                </button>

                <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                  {ticketCount}
                </span>

                <button
                  onClick={() => setTicketCount(ticketCount + 1)}
                  className="bg-gray-200 w-10 h-10 rounded-full border-2 border-gray-400 text-2xl font-bold 
                            hover:bg-gray-300 transition flex items-center justify-center"
                  disabled={ticketCount >= event.nbTicketsRestants}
                >
                  +
                </button>
              </div>
            </div>

            {/* Bouton Réserver */}
            <button
              className="w-full bg-gray-800 text-white font-bold text-lg px-6 py-4 
                        rounded-xl shadow hover:scale-105 transition-all"
              onClick={handleReserve}
            >
              Réserver maintenant
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
