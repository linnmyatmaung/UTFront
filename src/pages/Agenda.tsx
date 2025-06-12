import { getAllAgendas, AgendaDataResponse } from "@/api/agendaApi";
import socket from "@/socket";
import Loader from "@/common/Loader";
import { useEffect, useState } from "react";
import "@/styles/Agenda.css";

function Agenda() {
  const [loading, setLoading] = useState<boolean>(true);
  const [agendaData, setAgendaData] = useState<AgendaDataResponse[]>([]);

  // Function to fetch agenda data
  const fetchAgenda = async () => {
    try {
      setLoading(true); // Show loader
      const data = await getAllAgendas(); // Fetch data using the service
      setAgendaData(data);
    } catch (error) {
      console.error("Failed to fetch agendas:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  useEffect(() => {
    fetchAgenda(); // Initial fetch

    socket.on("agendaUpdated", (updated) => {
      console.log("Received updated agenda:", updated);

      setAgendaData((prev) =>
        prev.map(
          (agenda) =>
            agenda.id === updated.id
              ? { ...agenda, ...updated } // Update the current agenda
              : { ...agenda, current: false } // Unset others as 'current'
        )
      );
    });

    return () => {
      socket.off("agendaUpdated");
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center sm:py-12">
      <header className="w-full py-4 text-center bg-blue-500 text-white mb-3">
        <h1 className="text-2xl font-bold">Welcome to the Agenda</h1>
      </header>
      <div className="main">
        {loading ? (
          // Show loader if data is still being fetched
          <Loader />
        ) : (
          // Render agenda data once loading is complete
          <>
            {agendaData.map((agenda, index) => (
              <div className="appointment" key={index}>
                <div className="time"> {agenda.time}</div>
                <div className="radio-button">
                  <div
                    className={`circle ${agenda.current ? "blue" : "white"}`}
                  ></div>
                  <div className="vertical-line"></div>
                </div>
                <div className="details">
                  <p className="title">{agenda.title}</p>
                  <p className="name">
                    {agenda.name} {agenda.info}
                  </p>
                </div>
              </div>
            ))}
            <div className="main1">
              <p className="name1">End</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Agenda;
