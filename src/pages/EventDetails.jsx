import React from "react";
import Layout from "../components/Layout";
import OthersLiked from "../components/singleEvent Components/OthersLiked";
import { events } from "../data/data";
import EventProperties from "../components/singleEvent Components/EventProperties";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/Loader"
const EventDetails = () => {
  const { ...all } = events[1];
  const url = "https://nb-event-server.onrender.com/api/v1/events";
  const {eventId} = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [event, setEvent] = useState(null)
  const [similarEvent, setSimilarEvents] = useState([])

  const getEvent = async () => {
    try {
      const {data} = await axios (`${url}/${eventId}`);
    console.log(data);
    setIsLoading(false)
    setEvent(data.event)
    setSimilarEvents(data.similarEvents)
    }catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEvent()
  }, []);

  if(isLoading){
    return <>
    <Layout>
      <Loader height="200px"/>
    </Layout>
    </>
  }
  return (
    <>
      <Layout>
        <div className="container">
          <h3 className="my-4 fs-5">
            Home {">"} Events {">"}{" "}
            <span className="main-color">Event Details</span>
          </h3>
        </div>
        <EventProperties {...event} />
       {similarEvent.length > 0 && <OthersLiked />}
      </Layout>
    </>
  );
  j;
};

export default EventDetails;
