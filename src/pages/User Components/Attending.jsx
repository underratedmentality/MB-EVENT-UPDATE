import React from "react";
import EventCard from "../../components/EventCard";
import { events } from "../../data/data";
import Pagination from "../../components/Pagination";
import Empty from "../../components/Empty";
import Loader from "../../components/Loader";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Attending = () => {
  const token = localStorage.getItem('mb-token')
  const url = "https://nb-event-server.onrender.com/api/v1/events/attending"
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
 const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getEvents = async () => {
    try {
      const result = await axios(`${url}?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(result);
      setIsLoading(false);
      setEvents(result.data.events);
      setPage(result.data.currentPage);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      // console.log(error);
      if (error & (error?.status === 401)) {
        toast.error("Session Expired, Login");
        localStorage.removeItem("mb-token");
        localStorage.removeItem("user");
        redirect("/login");
      }
    }
  };

  useEffect(() => {
    getEvents();
  }, [page]);

  if (isLoading) {
    return <Loader height="150px" />;
  }

  if (!isLoading & (events.length === 0)) {
    return <Empty height="200px" content="You are Not Attending Any Events" />;
  }
  return (
    <div className="container">
      <h2 className="my-3">Events Attending</h2>
      <div className="d-flex justify-content-between flex-wrap">
        {events.map((event) => {
          return <EventCard key={event._id} {...event} />;
        })}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          setCurrentPage={setPage}
          numOfPages={totalPages}
        />
      )}
    </div>
  );
};

export default Attending;
