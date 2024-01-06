import React from "react";
import Dashboard from "./Dashboard";
import { useParams } from "react-router-dom";
import Head from "../components/Head";
import { Sidebar } from "lucide-react";

const AddParticipants = () => {
  const params = useParams();
  const eventId = params.eventId;
  console.log(eventId);
  return (
    <div>
      <Head />
      <div className=" flex bg-[#f5f5fe]">
        <div className=""></div>

        <Dashboard eventId={eventId} />
      </div>
    </div>
  );
};

export default AddParticipants;
