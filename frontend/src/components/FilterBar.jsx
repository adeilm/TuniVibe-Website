import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FilterBar = ({
  cities = [],
  categories = [],
  selectedCity,
  setSelectedCity,
  selectedCategory,
  setSelectedCategory,
  priceOrder,
  setPriceOrder,
  selectedDate,
  setSelectedDate
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggle = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeAll = () => setOpenDropdown(null);

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const setWeekend = () => {
    const now = new Date();
    const day = now.getDay();
    const distance = day <= 5 ? 6 - day : 0;
    const weekendDate = new Date(Date.now() + distance * 86400000)
      .toISOString()
      .split("T")[0];
    setSelectedDate(weekendDate);
  };

  return (
    <div className="relative flex gap-4 flex-wrap">

     {/* ----------------------- VILLE ----------------------- */}
        <div className="relative z-[1000]">
        <button
            onClick={() => toggle("city")}
            className="px-4 py-2 border border-gray-300 rounded-full bg-white shadow-sm flex items-center gap-2 hover:bg-gray-50"
        >
            {selectedCity || "Ville"}
            <FiChevronDown />
        </button>

        {openDropdown === "city" && (
            <div className="absolute mt-2 w-48 bg-white rounded-xl shadow-lg p-1 overflow-y-auto max-h-39 z-[2000]">
            {cities.map((city) => (
                <div
                key={city}
                onClick={() => {
                    setSelectedCity(city);
                    closeAll();
                }}
                className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                >
                {city}
                </div>
            ))}
            </div>
        )}
        </div>


      {/* ----------------------- DATE ----------------------- */}
      <div className="relative z-[1000]">
        <button
          onClick={() => toggle("date")}
          className="px-4 py-2 border border-gray-900 rounded-full bg-white shadow-sm flex items-center gap-2 hover:bg-gray-50"
        >
          {selectedDate || "Date"}
          <FiChevronDown />
        </button>

        {openDropdown === "date" && (
          <div className="absolute mt-2 w-52 bg-white rounded-xl shadow-lg p-3 z-[2000]">
            <div
              className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => document.getElementById("calendarInput").showPicker()}
            >
              Calendrier
            </div>

            <input
              id="calendarInput"
              type="date"
              className="hidden"
              onChange={(e) => {
                setSelectedDate(e.target.value);
                closeAll();
              }}
            />

            <div
              className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => {
                setSelectedDate(today);
                closeAll();
              }}
            >
              Aujourd'hui
            </div>

            <div
              className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => {
                setSelectedDate(tomorrow);
                closeAll();
              }}
            >
              Demain
            </div>

            <div
              className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => {
                setWeekend();
                closeAll();
              }}
            >
              Ce week-end
            </div>
          </div>
        )}
      </div>

      {/* ----------------------- PRIX ----------------------- */}
      <div className="relative z-[1000]">
        <button
          onClick={() => toggle("price")}
          className="px-4 py-2 border border-gray-300 rounded-full bg-white shadow-sm flex items-center gap-2 hover:bg-gray-50"
        >
          Tri prix : {priceOrder === "asc" ? "Croissant" : priceOrder === "desc" ? "Décroissant" : "Aucun"}
          <FiChevronDown />
        </button>

        {openDropdown === "price" && (
          <div className="absolute mt-2 w-48 bg-white rounded-xl shadow-lg p-3 z-[2000]">
            <div
              onClick={() => {
                setPriceOrder("asc");
                closeAll();
              }}
              className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              Prix croissant
            </div>
            <div
              onClick={() => {
                setPriceOrder("desc");
                closeAll();
              }}
              className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              Prix décroissant
            </div>
          </div>
        )}
      </div>

      {/* ----------------------- CATEGORIE ----------------------- */}
      <div className="relative z-[1000]">
        <button
          onClick={() => toggle("category")}
          className="px-4 py-2 border border-gray-300 rounded-full bg-white shadow-sm flex items-center gap-2 hover:bg-gray-50"
        >
          {selectedCategory || "Catégorie"}
          <FiChevronDown />
        </button>

        {openDropdown === "category" && (
          <div className="absolute mt-2 w-48 bg-white rounded-xl shadow-lg p-1 overflow-y-auto max-h-39 z-[2000]">
            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  closeAll();
                }}
                className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                {cat}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default FilterBar;
