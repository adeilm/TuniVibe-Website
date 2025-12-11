// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from "react";
import bgImage from "../assets/party.jpg";
import eventService from "../services/eventService";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { User } from "lucide-react";
import concertImg from "../assets/categories/concert.jpg";
import theatreImg from "../assets/categories/theatre.jpg";
import expoImg from "../assets/categories/exposition.jpg";
import festivalImg from "../assets/categories/festival.jpg";
import confImg from "../assets/categories/conference.jpg";
import workshopImg from "../assets/categories/workshop.jpg";
import cinemaImg from "../assets/categories/cinema.jpg";
import { useNavigate } from "react-router-dom";
import EventsSection from "../components/EventsSection";

const CATEGORIES = [
  "Concerts",
  "Théâtres",
  "Expositions",
  "Festivals",
  "Conférences",
  "Ateliers",
  "Cinéma",
];

const Home = () => {

  const navigate = useNavigate();
  const goToHome = () => {
  navigate("/"); // redirige vers la page Home
};

 


  const [events, setEvents] = useState([]);
  const [scroll, setScroll] = useState(false);
  const scrollRef = useRef(null); // ref pour les catégories

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getUpcomingEvents();
        setEvents(data.slice(0, 6));
      } catch (err) {
        console.error("Erreur chargement événements:", err);
      }
    };
    fetchEvents();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -160, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 160, behavior: "smooth" });
  };

  return (


    <div className="w-full min-h-screen bg-[#ffe3ee] text-gray-900">


      {/* HERO SECTION (image + texte à droite) */}
      <section className="pt-[50px] w-full mb-10 bg-[#ffe3ee]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-10 px-10 bg-white rounded-3xl shadow-xl">
          
          {/* IMAGE HERO avec effet parallax */}
          <div className="relative overflow-hidden">
            <img
              src={bgImage}
              alt="concert"
              className="rounded-3xl w-auto max-w-full h-auto sticky top-[60px]"
            />
            <div className="absolute -bottom-6 -left-6 w-3/4 h-3/4 bg-pink-400/40 rounded-3xl blur-xl -z-10"></div>
          </div>

          {/* TEXTE À DROITE */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 animate-fade-up">
              Découvrez les meilleurs événements en Tunisie 🇹🇳
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Explorez, réservez et vivez des expériences uniques : concerts, festivals, théâtre, cinéma…
            </p>
            <button
            onClick={() => {
            navigate("/all-events");
            window.scrollTo({ top: 0, behavior: "smooth" }); // <-- force scroll en haut
          }}
            className="px-6 py-3 bg-[#ffd658] text-gray-900 font-bold rounded-xl text-lg shadow hover:scale-105 transition-transform">
              Explorer les événements →
            </button>
          </div>
        </div>
      </section>

       {/* SECTION CATÉGORIE – 3 CARTES VISIBLES SIMULTANÉMENT */}
      <section className="px-10 py-10 mb-10 bg-[#FAF9F6]">
        <h2 className="text-3xl font-bold mb-4 text-center animate-fade-up">Découvrez nos catégories</h2>
        <p className="text-gray-700 text-lg mb-6 text-center">
          Explorez les différents types d'événements disponibles
        </p>

        {/* Container scroll horizontal */}
        <div
          className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE/Edge
          }}
          onWheel={(e) => {
            e.preventDefault();
            e.currentTarget.scrollLeft += e.deltaY; // Scroll souris → horizontal
          }}
        >
          {/* Carte 1 */}
          <div
            className="flex-shrink-0 w-[calc((100%-48px)/3)] bg-white rounded-xl shadow-lg p-4
                      scroll-snap-align-start transition-transform transition-colors duration-300
                      hover:scale-105 hover:bg-[#ffe0ec] cursor-pointer"
            onClick={() => {
              navigate("/category/CONCERT");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }} // <-- ici tu rediriges vers la page catégorie
          >
            <img
              src={concertImg}
              alt="Concert"
              className="rounded-lg w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mt-3">Concerts</h3>
            <p className="text-gray-600 mt-1">
              Découvrez les meilleurs concerts et performances live.
            </p>
          </div>


          {/* Carte 2 */}
          <div className="flex-shrink-0 w-[calc((100%-48px)/3)] bg-white rounded-xl shadow-lg p-4 scroll-snap-align-start
                          transition-transform transition-colors duration-300
                          hover:scale-105 hover:bg-[#f3f0e2]"
                          onClick={() => {
                          navigate("/category/THEATRE");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          }} >
            <img
              src={theatreImg}
              alt="Théatre"
              className="rounded-lg w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mt-3">Théatres</h3>
            <p className="text-gray-600 mt-1">
              Spectacles, pièces modernes et classiques.
            </p>
          </div>

          {/* Carte 3 */}
          <div className="flex-shrink-0 w-[calc((100%-48px)/3)] bg-white rounded-xl shadow-lg p-4 scroll-snap-align-start
                          transition-transform transition-colors duration-300
                          hover:scale-105 hover:bg-[#d8e7fd]"
                          onClick={() => {
                            navigate("/category/EXPOSITION");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }} >
            <img
              src={expoImg}
              alt="Exposition"
              className="rounded-lg w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mt-3">Expositions</h3>
            <p className="text-gray-600 mt-1">
              Art, photos et expositions uniques.
            </p>
          </div>

          {/* Carte 4  */}
          <div className="flex-shrink-0 w-[calc((100%-48px)/3)] bg-white rounded-xl shadow-lg p-4 scroll-snap-align-start
                          transition-transform transition-colors duration-300
                          hover:scale-105 hover:bg-[#f4e0fd]"
                          onClick={() => {
                            navigate("/category/FESTIVAL");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }} >
            <img
              src={festivalImg}
              alt="Festival"
              className="rounded-lg w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mt-3">Festivals</h3>
            <p className="text-gray-600 mt-1">
              Festivals de musique, culture et plus.
            </p>
          </div>

          {/* Carte 5 */}
          <div className="flex-shrink-0 w-[calc((100%-48px)/3)] bg-white rounded-xl shadow-lg p-4 scroll-snap-align-start
                          transition-transform transition-colors duration-300
                          hover:scale-105 hover:bg-[#dddddd]"
                          onClick={() => {
                            navigate("/category/CONFERENCE");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}> 
            <img
              src={confImg}
              alt="Conférence"
              className="rounded-lg w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mt-3">Conférences</h3>
            <p className="text-gray-600 mt-1">
              Participez à des conférences inspirantes.
            </p>
          </div>

          {/* Carte 6 */}
          <div className="flex-shrink-0 w-[calc((100%-48px)/3)] bg-white rounded-xl shadow-lg p-4 scroll-snap-align-start
                          transition-transform transition-colors duration-300
                          hover:scale-105 hover:bg-[#daffe3]"
                          onClick={() => {
                           navigate("/category/ATELIER");
                           window.scrollTo({ top: 0, behavior: "smooth" });
                          }}> 
            <img
              src={workshopImg}
              alt="Atelier"
              className="rounded-lg w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mt-3">Ateliers</h3>
            <p className="text-gray-600 mt-1">
              Ateliers pratiques pour développer vos compétences.
            </p>
          </div>

          {/* Carte 7 */}
          <div className="flex-shrink-0 w-[calc((100%-48px)/3)] bg-white rounded-xl shadow-lg p-4 scroll-snap-align-start
                          transition-transform transition-colors duration-300
                          hover:scale-105 hover:bg-[#ffdfdf]"
                          onClick={() => {
                            navigate("/category/CINEMA");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }} >
            <img
              src={cinemaImg}
              alt="Cinéma"
              className="rounded-lg w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mt-3">Cinéma</h3>
            <p className="text-gray-600 mt-1">
              Films, avant-premières et séances spéciales.
            </p>
          </div>



          {/* Ajoute autant de cartes que tu veux, toutes avec la même largeur */}
        </div>

        {/* Cacher scrollbar (Chrome / Safari) */}
        <style>
          {`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
      </section>

      {/* Section Événements */}
      <EventsSection />
    </div>
  );
};

export default Home;
