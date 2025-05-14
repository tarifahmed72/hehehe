import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface Application {
  id: string;
  farmer_id: string;
  application_no: string;
  status: number;
  timestamp: string;
}

interface ApiResponse<T> {
  data: T[];
  total_count: number;

}

const FarmerApplication: React.FC = () => {
  const { id: farmerId } = useParams<{ id: string }>();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(10); // You can adjust this
  const [totalApplications, setTotalApplications] = useState(0);
  

  useEffect(() => {
    const fetchApplications = async () => {

      const token = localStorage.getItem("keycloak-token");

      if (!token) {
        setError("No auth token found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const offset = (currentPage - 1) * applicationsPerPage;
        
        const response = await axios.get<ApiResponse<Application>>(
          `https://dev-api.farmeasytechnologies.com/api/applications/?farmer_id=${farmerId}&limit=${applicationsPerPage}&offset=${offset}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setApplications(response.data.data || []);
        setTotalApplications(response.data.total_count || 0); // Assuming API returns total count
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError('Failed to fetch applications.');
        setApplications([]);
        setTotalApplications(0);
      } finally {
        setLoading(false);
      }
    };

    if (farmerId) {
      fetchApplications();
    }
  }, [farmerId, currentPage, applicationsPerPage]); // Add pagination state to dependencies

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(totalApplications / applicationsPerPage);


  const handleRowClick = (appId: string) => {
    navigate(`/farmers_details/farmerId/${farmerId}/applicationId/${appId}`);
  };

  const formatStatus = (status: number) => {
    switch (status) {
      case 1:
        return { label: 'completed', className: 'bg-green-100 text-green-700' };
      case 2:
        return { label: 'lead', className: 'bg-red-100 text-red-700' };
      default:
        return { label: 'not completed', className: 'bg-yellow-100 text-yellow-700' };
    }
  };

  if (loading) return <div className="p-4">Loading applications...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Applications by Farmer ID: <span className="text-indigo-600">{farmerId}</span>
      </h2>

      {applications.length === 0 ? (
        <p className="text-red-500">No applications found for this farmer.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                <th className="p-4 text-left">Application No</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app: Application) => {
                const { label, className } = formatStatus(app.status);
                return (
                  <tr
                    key={app.id}
                    onClick={() => handleRowClick(app.id)}
                    className="cursor-pointer hover:bg-gray-50 transition"
                  >
                    <td className="p-4 border-t">{app.application_no}</td>
                    <td className="p-4 border-t">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${className}`}>
                        {label}
                      </span>
                    </td>
                    <td className="p-4 border-t">
                      {new Date(app.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {totalApplications > applicationsPerPage && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 mx-1">Page {currentPage} of {totalPages}</span>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  );
};

export default FarmerApplication;
