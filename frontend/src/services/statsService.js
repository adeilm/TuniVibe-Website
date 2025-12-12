const BASE_URL = "http://localhost:8080/api/stats";

const statsService = {
    getTotalRevenue: async () => {
        try {
            const res = await fetch(`${BASE_URL}/revenue`);
            if (!res.ok) throw new Error("Failed to fetch revenue");
            return await res.json();
        } catch (error) {
            console.error("Error fetching revenue:", error);
            return { totalRevenue: 0 };
        }
    },

    getStatsByCategory: async () => {
        try {
            const res = await fetch(`${BASE_URL}/by-category`);
            if (!res.ok) throw new Error("Failed to fetch category stats");
            return await res.json();
        } catch (error) {
            console.error("Error fetching category stats:", error);
            return [];
        }
    },

    getTopEvents: async () => {
        try {
            const res = await fetch(`${BASE_URL}/top-events`);
            if (!res.ok) throw new Error("Failed to fetch top events");
            return await res.json();
        } catch (error) {
            console.error("Error fetching top events:", error);
            return [];
        }
    }
};

export default statsService;
