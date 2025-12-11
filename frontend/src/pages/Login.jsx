import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Réinitialise les erreurs à chaque tentative

    try {
      const allUsers = await authService.getAllUsers();

      // Vérifier si email existe
      const userByEmail = allUsers.find((u) => u.email === email);

      if (!userByEmail) {
        setError(
          <>
            Aucun compte trouvé avec cet email.<br />
            Veuillez vérifier vos données ou créer un compte.
          </>
        );
        return;
      }

      // Vérifier si mot de passe correspond
      if (userByEmail.motDePasse !== password) {
        setError("Mot de passe incorrect. Veuillez réessayer.");
        return;
      }

      // Si tout est correct → connexion + stockage user
      localStorage.setItem("user", JSON.stringify(userByEmail));

       // 4️⃣ Redirection selon le rôle
      const role = userByEmail.role?.toUpperCase();

      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } 
      else {
        navigate("/");
      }
  

    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setError("Erreur serveur. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8">TuniVibe</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border rounded px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="border rounded px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-500 text-sm leading-5">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="bg-yellow-500 text-gray-900 font-bold py-2 rounded hover:bg-yellow-600 transition"
          >
            Se connecter
          </button>
        </form>

        <p className="text-gray-600 text-center mt-6">
          Nouveau sur TuniVibe ?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Créez votre compte
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

