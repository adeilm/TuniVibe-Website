// src/pages/CreateEvent.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import eventService from "../services/eventService";

const CATEGORIES = [
  "CONCERT",
  "THEATRE",
  "EXPOSITION",
  "FESTIVAL",
  "CONFERENCE",
  "ATELIER",
  "CINEMA"
];

const CreateEvent = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Organisateur connecté

  const [form, setForm] = useState({
    titre: "",
    description: "",
    ville: "",
    adresse: "",
    categorie: CATEGORIES[0],
    capaciteMax: 0,
    prixTicket: 0,
    date: "",
    startTime: "",
    endTime: "",
    imageBase64: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, imageBase64: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      if (!user || user.role !== "ORGANISATEUR") {
        setError("Seul un organisateur peut créer un événement.");
        return;
      }

      const eventData = {
        ...form,
        capaciteMax: parseInt(form.capaciteMax),
        prixTicket: parseFloat(form.prixTicket),
        organisateurId: user.id // important
      };

      setLoading(true);
      const result = await eventService.createEvent(eventData);
      setLoading(false);

      if (!result) {
        setError("Erreur lors de l'enregistrement de l'événement");
        return;
      }

      setSuccessMessage(
        "✅ Votre demande de création d'événement a bien été reçue. " +
        "Un administrateur confirmera sa publication."
      );

      // Réinitialiser le formulaire
      setForm({
        titre: "",
        description: "",
        ville: "",
        adresse: "",
        categorie: CATEGORIES[0],
        capaciteMax: 0,
        prixTicket: 0,
        date: "",
        startTime: "",
        endTime: "",
        imageBase64: ""
      });

    } catch (err) {
      setLoading(false);
      console.error(err);
      setError(err.response?.data?.message || err.message || "Erreur lors de la création de l'événement");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {successMessage ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded shadow-md">
          <p className="font-bold">Demande reçue</p>
          <p>{successMessage}</p>
          <button
            className="mt-4 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded font-bold text-gray-900"
            onClick={() => setSuccessMessage("")}
          >
            Créer un autre événement
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Créer un événement</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="titre" value={form.titre} onChange={handleChange} placeholder="Titre" className="w-full border p-2 rounded" required />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" rows={4} required />
            <input type="text" name="ville" value={form.ville} onChange={handleChange} placeholder="Ville" className="w-full border p-2 rounded" required />
            <input type="text" name="adresse" value={form.adresse} onChange={handleChange} placeholder="Adresse" className="w-full border p-2 rounded" />
            <select name="categorie" value={form.categorie} onChange={handleChange} className="w-full border p-2 rounded">
              {CATEGORIES.map((cat, idx) => (<option key={idx} value={cat}>{cat}</option>))}
            </select>
            <input type="number" name="capaciteMax" value={form.capaciteMax} onChange={handleChange} placeholder="Capacité maximale" className="w-full border p-2 rounded" required />
            <input type="number" name="prixTicket" value={form.prixTicket} onChange={handleChange} placeholder="Prix du ticket" className="w-full border p-2 rounded" required />
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border p-2 rounded" required />
            <div className="flex gap-4">
              <input type="time" name="startTime" value={form.startTime} onChange={handleChange} className="w-1/2 border p-2 rounded" required />
              <input type="time" name="endTime" value={form.endTime} onChange={handleChange} className="w-1/2 border p-2 rounded" required />
            </div>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border p-2 rounded" />
            <button type="submit" className="bg-yellow-500 px-5 py-2 rounded font-bold hover:bg-yellow-600 transition" disabled={loading}>
              {loading ? "Création..." : "Envoyer la demande"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateEvent;
