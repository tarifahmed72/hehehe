import { useState, useEffect } from 'react';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import KeycloakService from '../keycloak';

interface AgentData {
  id: string;
  agent_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  registered_phone: string;
  profession: string;
  qualification: string;
  address: string;
  pan: string;
  poa_image: string;
  bank_account_no: string;
  bank_name: string;
  ifsc_code: string;
  alternate_phone: string;
  fpo_reference_no: string;
  is_mapped: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

const Agent= () => {
  const [agent, setAgent] = useState<AgentData | null>(null); // For single agent details
  const [allAgents, setAllAgents] = useState<AgentData[]>([]); // For list of all agents
  const [loading, setLoading] = useState(true);
  const agentId = "your_agent_id_here"; // Replace with how you get the agent ID (e.g., from URL params or props)
  const [error, setError] = useState<string | null>(null);

  // Function to fetch a single agent by ID
  const fetchAgentById = async (id: string) => {
    setLoading(true);
    if ((KeycloakService as any).isLoggedIn) {
        const token = (KeycloakService as any).token;
        try {
          const response: AxiosResponse<AgentData> = await axios.get(
            `https://dev-api.farmeasytechnologies.com/api/field_agent/${agentId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }            
          );
          setAgent(response.data);
        } catch (err: any) {
          setError(`Error fetching agents: ${err.message}`);
        } finally {
          setLoading(false);
        }
      }
  };

  // Function to fetch all agents
  const fetchAllAgents = async () => {
    setLoading(true);
    if ((KeycloakService as any).isLoggedIn) {
        const token = (KeycloakService as any).token;
        try {
          const response: AxiosResponse<AgentData[]> = await axios.get(
            'https://dev-api.farmeasytechnologies.com/api/field_agents/?skip=0&limit=10', // Adjust skip and limit as needed
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAllAgents(response.data);
        } catch (err: any) {
          setError(`Error fetching all agents: ${err.message}`);
        } finally {
          setLoading(false);
        }
      }
  };

  useEffect(() => {
    // Decide whether to fetch a single agent or all agents based on your logic
    // For now, let's fetch all agents when the component mounts
    fetchAllAgents();
  }, []);

  if (loading) {
    return <div className="p-4">Loading agents...</div>;
  }
  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agent Details (All Agents)</h1>
      {allAgents.length === 0 ? (
        <div className="text-gray-500">No agents to display.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allAgents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-lg shadow-md p-4 space-y-2">
              <div><strong>Agent ID:</strong> {agent.agent_id}</div>
              <div><strong>First Name:</strong> {agent.first_name}</div>
              <div><strong>Middle Name:</strong> {agent.middle_name}</div>
              <div><strong>Last Name:</strong> {agent.last_name}</div>
              <div><strong>Registered Phone:</strong> {agent.registered_phone}</div>
              <div><strong>Profession:</strong> {agent.profession}</div>
              <div><strong>Qualification:</strong> {agent.qualification}</div>
              <div><strong>Address:</strong> {agent.address}</div>
              <div><strong>PAN:</strong> {agent.pan}</div>
              {agent.poa_image && <img src={agent.poa_image} alt="Proof of Address" className="w-64 rounded shadow" />}
              <div><strong>Bank Account No:</strong> {agent.bank_account_no}</div>
              <div><strong>Bank Name:</strong> {agent.bank_name}</div>
              <div><strong>IFSC Code:</strong> {agent.ifsc_code}</div>
              <div><strong>Alternate Phone:</strong> {agent.alternate_phone}</div>
              <div><strong>FPO Reference No:</strong> {agent.fpo_reference_no}</div>
              <div><strong>Is Mapped:</strong> {agent.is_mapped ? 'Yes' : 'No'}</div>
              <div><strong>Active:</strong> {agent.active ? 'Yes' : 'No'}</div>
              <div><strong>Created At:</strong> {agent.created_at}</div>
              <div><strong>Updated At:</strong> {agent.updated_at}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500">No agent data available.</div>
      )}
    </div>
  );
};

export default Agent;

