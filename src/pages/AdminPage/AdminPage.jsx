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

  return (
    <div className="AdminPage page">
     {clientsToDisply&&( <MyClientTableWithLocalizationProvider data={clientsToDisply}/>)}
    </div>
  );
}

export default AdminPage;
