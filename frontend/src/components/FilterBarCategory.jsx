import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FilterBar = ({
  cities = [],
  selectedCity,
  setSelectedCity,
  maxPrice,
  setMaxPrice,
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
      <div className="relative group">
        <button
          onClick={() => toggle("city")}
          className="px-4 py-2 border border-gray-300 rounded-full bg-white shadow-sm flex items-center gap-2
                     text-gray-700 hover:text-gray-900 hover:border-gray-900 transition-colors"
        >
          {selectedCity || "Ville"}
          <FiChevronDown />
        </button>

        {openDropdown === "city" && (
          <div className="absolute mt-2 w-48 bg-white rounded-xl shadow-lg p-3 z-20">
            {cities.map((city) => (
              <div
                key={city}
                onClick={() => {
                  setSelectedCity(city);
                  closeAll();
                }}
                className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ----------------------- DATE ----------------------- */}
      <div className="relative group">
        <button
          onClick={() => toggle("date")}
          className="px-4 py-2 border border-gray-300 rounded-full bg-white shadow-sm flex items-center gap-2
                     text-gray-700 hover:text-gray-900 hover:border-gray-900 transition-colors"
        >
          Date
          <FiChevronDown />
        </button>

        {openDropdown === "date" && (
          <div className="absolute mt-2 w-52 bg-white rounded-xl shadow-lg p-3 z-20">
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
      <div className="relative group">
        <button
          onClick={() => toggle("price")}
          className="px-4 py-2 border border-gray-300 rounded-full bg-white shadow-sm flex items-center gap-2
                     text-gray-700 hover:text-gray-900 hover:border-gray-900 transition-colors"
        >
          Prix max
          <FiChevronDown />
        </button>

        {openDropdown === "price" && (
          <div className="absolute mt-2 w-48 bg-white rounded-xl shadow-lg p-3 z-20">
            <div className="flex items-center justify-between px-2 py-2">
              <button
                onClick={() => setMaxPrice((p) => Math.max(0, p - 10))}
                className="px-3 py-1 bg-gray-200 rounded-lg"
              >
                -
              </button>

              <span className="font-semibold">{maxPrice} DT</span>

              <button
                onClick={() => setMaxPrice((p) => Math.min(500, p + 10))}
                className="px-3 py-1 bg-gray-200 rounded-lg"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default FilterBar;
