import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode";

const Voucher = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [qrDataUrl, setQrDataUrl] = useState("");
  const voucherRef = useRef(null); // Pour imprimer uniquement le voucher

  // Redirection si pas de state
  useEffect(() => {
    if (!state) navigate("/");
  }, [state, navigate]);

  if (!state) return null;

  const { form, event, tickets, total } = state;

  // Génération du QR code
  useEffect(() => {
    const generateQR = async () => {
      try {
        const qrValue = `TuniVibe-${form.email}-${event.id}`;
        const url = await QRCode.toDataURL(qrValue);
        setQrDataUrl(url);
      } catch (err) {
        console.error("Erreur génération QR code:", err);
      }
    };
    generateQR();
  }, [form, event]);

  // Fonction pour imprimer uniquement le voucher
  const handlePrint = () => {
    if (!voucherRef.current) return;
    const printContents = voucherRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Recharger pour restaurer les event listeners
  };

  return (
    <div ref={voucherRef} className="max-w-xl mx-auto bg-white p-8 mt-10 shadow-lg rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-6">🎟️ Voucher de réservation</h2>

      <div className="text-left space-y-1 mb-4">
        <p><strong>Nom :</strong> {form.nom} {form.prenom}</p>
        <p><strong>Email :</strong> {form.email}</p>
        <p><strong>Tél :</strong> {form.tel}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-bold text-xl">{event.titre}</h3>
        <p><strong>Tickets :</strong> {tickets}</p>
        <p><strong>Total :</strong> {total} DT</p>
      </div>

      {qrDataUrl && (
        <div className="mt-6 flex justify-center mb-6">
          <img src={qrDataUrl} alt="QR Code du voucher" className="rounded-lg" />
        </div>
      )}

      <button
        onClick={handlePrint}
        className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-5 py-2 rounded transition"
      >
        Télécharger / Imprimer le voucher
      </button>
    </div>
  );
};

export default Voucher;
