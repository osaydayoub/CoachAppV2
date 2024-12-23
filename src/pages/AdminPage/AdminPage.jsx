import React, { useEffect, useState } from "react";
import "./AdminPage.css";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext.jsx";

import MyClientTableWithLocalizationProvider from "../../components/MyClientTable/MyClientTable.jsx";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";
// import { useNavigate } from "react-router-dom";

function AdminPage() {
  const { currentUser, isLoggedIn } = useAuth();
  const { clientsData, setClientsData, getClients } = useData();
  const [clientsToDisply, setClientsToDisply] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser.isAdmin) {
      navigate("/404");
      return;
    }
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
      
      {clientsToDisply? (
        <MyClientTableWithLocalizationProvider data={clientsToDisply} />
      ):<LoadingScreen/>}
    </div>
  );
}

export default AdminPage;
