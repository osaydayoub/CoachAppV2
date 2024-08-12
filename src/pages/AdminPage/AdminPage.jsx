import React, { useEffect, useState } from "react";
import "./AdminPage.css";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext.jsx";
import Client from "../../components/Client/Client";
import { FaSearch } from "react-icons/fa";

import MyClientTableWithLocalizationProvider from "../../components/MyClientTable/MyClientTable.jsx";
// import { useNavigate } from "react-router-dom";

function AdminPage() {
  const { clientsData, setClientsData, getClients } = useData();
  const [clientsToDisply, setClientsToDisply] = useState(null);
  useEffect(() => {
    if (clientsData === null) {
      getClients();
    }
  }, []);

  useEffect(() => {
    if (clientsData != null) {
      setClientsToDisply(clientsData);
      console.log(clientsData);
    }
  }, [clientsData]);
  const handelSearchChange = (e) => {
    const filteredClients = clientsData.filter((client) => {
      return client.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setClientsToDisply(filteredClients);
  };
  return (
    <div className="AdminPage page">
      {/* <div className="search-box"> */}
      <input
        className="search-box"
        type="text"
        placeholder="Search by Client Name ..."
        onChange={handelSearchChange}
      />
       {/* <FaSearch /> </div> */}
      {clientsToDisply && (
        <div className="clients-list">
          {clientsToDisply.map((client, index) => {
            // return <Client key={index} client={client} index={index} />;
            return <Client key={client.email} client={client} index={index} />;
          })}
        </div>
      )}

     {clientsToDisply&&( <MyClientTableWithLocalizationProvider data={clientsToDisply}/>)}
    </div>
  );
}

export default AdminPage;
