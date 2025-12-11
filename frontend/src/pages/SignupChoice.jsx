import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBuilding } from "react-icons/fa";

const SignupChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-10">Créer votre compte</h1>
      <div className="flex gap-6 flex-wrap justify-center">
        <div
          className="bg-white rounded-xl shadow-lg p-8 w-72 cursor-pointer hover:scale-105 transition"
          onClick={() => navigate("/signup/participant")}
        >
          <FaUser className="text-5xl mb-4 text-yellow-500" />
          <h2 className="text-xl font-bold mb-2 text-center">Participant</h2>
          <p className="text-gray-600 text-center">
            Je souhaite découvrir et réserver des événements
          </p>
        </div>

        <div
          className="bg-white rounded-xl shadow-lg p-8 w-72 cursor-pointer hover:scale-105 transition"
          onClick={() => navigate("/signup/organisateur")}
        >
          <FaBuilding className="text-5xl mb-4 text-yellow-500" />
          <h2 className="text-xl font-bold mb-2 text-center">Organisateur</h2>
          <p className="text-gray-600 text-center">
            Je souhaite créer et gérer mes propres événements
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupChoice;
