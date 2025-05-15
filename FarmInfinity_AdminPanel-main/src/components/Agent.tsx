import { useState, useEffect } from 'react';
import axios from 'axios';
import { AxiosResponse } from 'axios';

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

const Agent = () => {
  const [agentIdInput, setAgentIdInput] = useState('');
  const [singleAgent, setSingleAgent] = useState<AgentData | null>(null);
  const [allAgents, setAllAgents] = useState<AgentData[]>([]); // For list of all agents
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllAgents = async () => {
    setLoading(true);
    const token = localStorage.getItem('default-auth-token');
    if (!token) {
      setError("No auth token found. Please login again.");
      setLoading(false);
      return;
    }
    try {
      const response: AxiosResponse<AgentData[]> = await axios.get(
        'https://dev-api.farmeasytechnologies.com/api/field_agents/',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllAgents(response.data);
      setSingleAgent(null); // Clear single agent data when fetching all agents
    } catch (err: any) {
      setError(`Error fetching all agents: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleAgent = async (agentId: string) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('default-auth-token');
    if (!token) {
      setError("No auth token found. Please login again.");
      setLoading(false);
      return;
    }
    try {
      const response: AxiosResponse<AgentData> = await axios.get(
        `https://dev-api.farmeasytechnologies.com/api/field_agents/${agentId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSingleAgent(response.data);
      setAllAgents([]); // Clear all agents data when fetching a single agent
    } catch (err: any) {
      setError(`Error fetching agent ${agentId}: ${err.message}`);
      setSingleAgent(null); // Clear single agent data on error
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const checkLoginAndFetch = async () => {
      fetchAllAgents();
    };
    checkLoginAndFetch();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agent Details</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Agent ID"
          value={agentIdInput}
          onChange={(e) => setAgentIdInput(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={() => fetchSingleAgent(agentIdInput)}
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          Fetch Single Agent
        </button>
        <button
           onClick={fetchAllAgents}
           className="bg-gray-500 text-white p-2 rounded"
        >
          Fetch All Agents
        </button>
      </div>


      {singleAgent ? (
        <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
          <div><strong>Agent ID:</strong> {singleAgent.agent_id}</div>
          <div><strong>First Name:</strong> {singleAgent.first_name}</div>
          <div><strong>Middle Name:</strong> {singleAgent.middle_name}</div>
          <div><strong>Last Name:</strong> {singleAgent.last_name}</div>
          <div><strong>Registered Phone:</strong> {singleAgent.registered_phone}</div>
          <div><strong>Profession:</strong> {singleAgent.profession}</div>
          <div><strong>Qualification:</strong> {singleAgent.qualification}</div>
          <div><strong>Address:</strong> {singleAgent.address}</div>
          <div><strong>PAN:</strong> {singleAgent.pan}</div>
          {singleAgent.poa_image && <img src={singleAgent.poa_image} alt="Proof of Address" className="w-64 rounded shadow" />}
          <div><strong>Bank Account No:</strong> {singleAgent.bank_account_no}</div>
          <div><strong>Bank Name:</strong> {singleAgent.bank_name}</div>
          <div><strong>IFSC Code:</strong> {singleAgent.ifsc_code}</div>
          <div><strong>Alternate Phone:</strong> {singleAgent.alternate_phone}</div>
          <div><strong>FPO Reference No:</strong> {singleAgent.fpo_reference_no}</div>
          <div><strong>Is Mapped:</strong> {singleAgent.is_mapped ? 'Yes' : 'No'}</div>
          <div><strong>Active:</strong> {singleAgent.active ? 'Yes' : 'No'}</div>
          <div><strong>Created At:</strong> {singleAgent.created_at}</div>
          <div><strong>Updated At:</strong> {singleAgent.updated_at}</div>
        </div>
      ) : allAgents.length === 0 ? (
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
              {agent.poa_image && <img src={agent.poa_image} alt="Proof of Address" className="w-64 rounded shadow" />}\n
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
      )}
    </div>
  );
};

export default Agent;
