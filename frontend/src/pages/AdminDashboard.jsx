import React, { useEffect, useState } from "react";
import adminService from "../services/adminService";
import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("organisateurs");
  const [organisateurs, setOrganisateurs] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [confirmedEvents, setConfirmedEvents] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const orgs = await adminService.getOrganisateurs();
    const pending = await adminService.getPendingEvents();
    const confirmed = await adminService.getConfirmedEvents();

    setOrganisateurs(orgs);
    setPendingEvents(pending);
    setConfirmedEvents(confirmed);
  };

  const handleDeleteOrganizer = async (id) => {
    await adminService.deleteOrganisateur(id);
    loadData();
  };

  const handleEventAction = async (id, action) => {
    if (action === "approve") await adminService.acceptEvent(id);
    else await adminService.refuseEvent(id);
    loadData();
  };

  const totalEvents = pendingEvents.length + confirmedEvents.length;

  return (
    <div className="p-8">
      {/* --- Statistiques --- */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-yellow-100 p-4 rounded-xl text-center">
          <h3 className="text-gray-700 font-semibold">Organisateurs</h3>
          <p className="text-2xl font-bold">{organisateurs.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl text-center">
          <h3 className="text-gray-700 font-semibold">Événements confirmés</h3>
          <p className="text-2xl font-bold">{confirmedEvents.length}</p>
        </div>
        <div className="bg-yellow-200 p-4 rounded-xl text-center">
          <h3 className="text-gray-700 font-semibold">Événements en attente</h3>
          <p className="text-2xl font-bold">{pendingEvents.length}</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-xl text-center">
          <h3 className="text-gray-700 font-semibold">Total événements</h3>
          <p className="text-2xl font-bold">{totalEvents}</p>
        </div>
      </div>

      {/* --- Onglets --- */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-xl font-semibold transition-colors duration-200
            ${activeTab === "organisateurs" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-yellow-400 hover:text-white"}`}
          onClick={() => setActiveTab("organisateurs")}
        >
          Organisateurs
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold transition-colors duration-200
            ${activeTab === "evenements" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-yellow-400 hover:text-white"}`}
          onClick={() => setActiveTab("evenements")}
        >
          Événements
        </button>
      </div>

      {/* --- Table Organisateurs --- */}
      {activeTab === "organisateurs" && (
        <div className="overflow-x-auto w-full w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-6 lg:px-12">
          <table className="w-full min-w-[700px] border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-center">Nom & Prénom</th>
                <th className="p-2 text-center">Nb d'événements créés</th>
                <th className="p-2 text-center">Nom Organisation</th>
                <th className="p-2 text-center">Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {organisateurs.map((org) => (
                <tr key={org.id} className="border-b">
                  <td className="p-2 text-center">{org.nom} {org.prenom}</td>
                  <td className="p-2 text-center">{org.nbEvenements || 0}</td>
                  <td className="p-2 text-center">{org.organisation || "-"}</td>
                  <td className="p-2 text-center">
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded-xl hover:bg-red-600"
                      onClick={() => handleDeleteOrganizer(org.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      {/* === ÉVÉNEMENTS === */}
      {activeTab === "evenements" && (
        <div className="overflow-x-auto w-full w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-6 lg:px-12">
          <table className="w-full min-w-[700px] border">
            <thead className="bg-gray-100 ">
              <tr>
                <th className="p-2 text-left">Événement</th>
                <th className="p-2 text-left">Organisateur</th>
                <th className="p-2 text-left">Catégorie</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Statut</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingEvents.concat(confirmedEvents).map((ev) => (
                <tr key={ev.id} className="border-b">
                  <td className="p-2 flex items-center gap-2">
                    {ev.imageBase64 && (
                    <img
                    src={ev.imageBase64} // Utiliser directement imageBase64 du backend
                    alt={ev.titre}
                    className="w-12 h-12 object-cover rounded"
                    />
                )}
                    {ev.titre}
                  </td>
                  <td className="p-2">{ev.organisateur}</td>
                  <td className="p-2">{ev.categorie}</td>
                  <td className="p-2">{new Date(ev.date).toLocaleDateString("fr-FR")}</td>
                  <td className="p-2">
                    {ev.status === "EN_ATTENTE" ? "En attente" : ev.status === "CONFIRME" ? "Confirmé" : "Annulé"}
                  </td>
                  <td className="p-2 text-center">
  {ev.status === "EN_ATTENTE" && (
    <div className="flex items-center justify-center gap-2">
      <button
        className="bg-green-500 text-white w-10 h-10 flex items-center justify-center rounded-xl hover:bg-green-600"
        onClick={() => handleAcceptEvent(ev.id)}
      >
        <FaCheck />
      </button>
      <button
        className="bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-xl hover:bg-red-600"
        onClick={() => handleRefuseEvent(ev.id)}
      >
        <FaTimes />
      </button>
    </div>
  )}
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
