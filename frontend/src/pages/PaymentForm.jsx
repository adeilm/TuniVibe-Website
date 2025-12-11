import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import eventService from "../services/eventService";
import reservationService from "../services/reservationService"; // ← import

const PaymentForm = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tickets = parseInt(searchParams.get("tickets") || "1");
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    nom: user?.nom || "",
    prenom: user?.prenom || "",
    email: user?.email || "",
    tel: user?.telephone || "",
    adresse: "",
    modePaiement: "carte",
  });

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const ev = await eventService.getEventById(id);
        setEvent(ev);
      } catch (err) {
        console.error("Erreur chargement événement :", err);
      }
    };
    loadEvent();
  }, [id]);

  const total = event ? event.prixTicket * tickets : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nom || !form.prenom || !form.email || !form.tel) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (!user) {
      alert("Vous devez être connecté pour réserver.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const reservation = {
        userId: user.id,
        eventId: event.id,
        nbTickets: tickets,
        total: total,
        nom: form.nom,
        prenom: form.prenom,
        email: form.email,
        tel: form.tel,
        adresse: form.adresse,
        modePaiement: form.modePaiement,
      };

      // ← utiliser le service ici
      const savedReservation = await reservationService.createReservation(reservation);

      // Rediriger vers le voucher
      navigate("/voucher", {
        state: {
          form,
          event,
          tickets,
          total,
          reservation: savedReservation,
        },
      });
    } catch (err) {
      console.error("Erreur réservation :", err);
      alert("Erreur lors de la réservation : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!event) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Paiement - {event.titre}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nom"
          value={form.nom}
          onChange={handleChange}
          placeholder="Nom"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="prenom"
          value={form.prenom}
          onChange={handleChange}
          placeholder="Prénom"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="tel"
          value={form.tel}
          onChange={handleChange}
          placeholder="Téléphone"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="adresse"
          value={form.adresse}
          onChange={handleChange}
          placeholder="Adresse"
          className="w-full border p-2 rounded"
        />
        <select
          name="modePaiement"
          value={form.modePaiement}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="carte">Carte bancaire</option>
          <option value="paypal">PayPal</option>
          <option value="cash">Paiement sur place</option>
        </select>

        <p className="text-lg font-bold mt-4">Total à payer : {total} DT</p>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-yellow-500 px-5 py-2 rounded font-bold hover:bg-yellow-600 transition"
            disabled={loading}
          >
            {loading ? "Réservation en cours..." : "Valider ma réservation"}
          </button>
          <button
            type="button"
            className="bg-gray-400 px-5 py-2 rounded hover:bg-gray-500 transition"
            onClick={() => navigate("/")}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
