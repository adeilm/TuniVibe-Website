import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const SignupForm = () => {
  const { role } = useParams(); // participant ou organisateur
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    telephone: "",
    organisation: "",
    role: role.toUpperCase()
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(formData);
      navigate("/login"); // après création, redirection login
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          {role === "participant" ? "Créer un compte Participant" : "Créer un compte Organisateur"}
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required className="border rounded px-4 py-2" />
          <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required className="border rounded px-4 py-2" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="border rounded px-4 py-2" />
          <input type="password" name="motDePasse" placeholder="Mot de passe" value={formData.motDePasse} onChange={handleChange} required className="border rounded px-4 py-2" />
          <input type="tel" name="telephone" placeholder="Téléphone" value={formData.telephone} onChange={handleChange} required className="border rounded px-4 py-2" />
          {role === "organisateur" && (
            <input type="text" name="organisation" placeholder="Organisation" value={formData.organisation} onChange={handleChange} required className="border rounded px-4 py-2" />
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="bg-yellow-500 text-gray-900 font-bold py-2 rounded hover:bg-yellow-600 transition">
            Créer mon compte
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
