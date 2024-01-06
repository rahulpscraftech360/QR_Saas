import React, { useEffect, useState } from "react";
import Event from "../components/Event";
import EventCreationForm from "./EventCreationForm";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { useSelector } from "react-redux";
import store from "../utils/store";
import Head from "../components/Head";
import { Button, Card, Col, Descriptions, Row } from "antd";
import Sidebar from "../components/Sidebar";

// Import the Event component

const EventsPage = () => {
  const Navigate = useNavigate();
  const organization = useSelector(
    (store) => store.organization.organizationData
  );
  const organizationId = organization._id;
  const [events, setEvents] = useState([]);
  // console.log(organization, "organization");
  const token = useSelector((store) => store.organization.tokens.access.token);
  console.log(token);
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    // Other custom headers if needed
  };

  console.log("token");
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/events/byorganization/", {
          params: { organizationId },
          header: headers, // Pass organizationId as a query parameter
        });
        // console.log("eve", response.data);
        // Handle the response data
        setEvents(response.data);
      } catch (error) {
        // console.error("Error fetching events:", error);
        // Handle errors
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Head />
      <div className=" flex bg-[#f5f5fe] ">
        <div className="  ">
          <Sidebar />
        </div>

        <div className="w-full">
          <div className="sm:col-span-11">
            <Card
              className="header-solid h-full "
              bordered={false}
              title={[<h6 className="font-semibold m-0">All Events</h6>]}
              bodyStyle={{ paddingTop: "", background: "#E0E5F2" }}
            >
              <Row
                gutter={[24, 24]}
                style={{ marginTop: "20px  " }}
                className="bg-[#E0E5F2] "
              >
                {events.map((event, index) => (
                  <Col xs={24} sm={12} md={12} lg={12} xl={12} key={index}>
                    <div key={index}>
                      <Event event={event} />
                    </div>
                  </Col>
                ))}
              </Row>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;
