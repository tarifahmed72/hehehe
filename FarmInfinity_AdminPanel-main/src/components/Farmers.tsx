import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface ApiFarmer {
  id: string;
  farmer_id: string;
  phone_no: string;
  referral_id: string | null;
  name: string | null;
  village: string | null;
  status: number | null;
  created_at: string;
  updated_at: string;
}
const Farmers = () => {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState<ApiFarmer[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFarmers = async () => {
      const token = localStorage.getItem("keycloak-token");

      if (!token) {
        setError("No auth token found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("https://dev-api.farmeasytechnologies.com/api/farmers/",
 {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Adjust the data mapping to match the API response structure
        const fetchedFarmers = response.data.data.map((farmer: ApiFarmer) => ({...farmer,
          name: farmer.name || "N/A",
          phone: farmer.phone_no || "N/A",
          village: farmer.village || "N/A",
        }));

        setFarmers(fetchedFarmers);

      } catch (err) {
        console.error("Error fetching farmers:", err);
        setError("Failed to fetch farmer data. Check token or permissions.");
      } finally {
        setLoading(false);
      }
    }; 
    fetchFarmers();  // This useEffect dependency array is missing
  }, []); // Empty dependency array to run once on mount
  const getStatusText = (status: number | null) => {
    switch (status) {
      case 1:
        return "Lead";
      case 2:
        return "Contacted";
      // Add more status mappings as needed based on your API documentation
      default:
        return "Unknown";
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filtered farmers based on search query
  const filteredFarmers = farmers.filter(
    (farmer) =>
      (farmer.name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      farmer.phone_no.includes(searchQuery)
  );
 return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Farmers</h1>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
        <input
          placeholder="🔍 Search farmers"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full md:w-1/2 border border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700">
          <option>All Statuses</option>
          <option>Lead</option>
          <option>Contacted</option>
          {/* Add more status options based on your getStatusText function */}
        </select>
      </div>

      {/* Error message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Loading */}
      {loading ? (
        <div className="text-gray-500">Loading farmers...</div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="w-full text-sm text-left bg-white">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Gender</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">City/Town</th>
                  <th className="px-4 py-3">Created On</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Approval</th>
                  <th className="px-4 py-3">Loan Amt.</th>
                  <th className="px-4 py-3 text-center">⋮</th>
                </tr>
              </thead>
              <tbody>
                {/* Render all filtered farmers */}
                {filteredFarmers.map((farmer: ApiFarmer) => (
                  <tr
                    key={farmer.phone_no}
                    onClick={() => navigate(`/farmer_details/${farmer.id}`)}
                    className="hover:bg-blue-50 cursor-pointer border-b"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">{farmer.name}</td>
                    <td className="px-4 py-3">{"N/A"}</td> {/* Assuming gender is not available in this API */}
                    <td className="px-4 py-3 text-blue-600 font-semibold">{farmer.phone_no}</td>
                    <td className="px-4 py-3">{farmer.village || "—"}</td>
                    <td className="px-4 py-3">{new Date(farmer.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-yellow-600">{getStatusText(farmer.status)}</td>
                    <td className="px-4 py-3">{"N/A"}</td>
                    <td className="px-4 py-3">{"N/A"}</td>
                    <td className="px-4 py-3 text-center text-xl text-gray-500">⋮</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </>
      )}
    </div>
  );
};

export default Farmers;