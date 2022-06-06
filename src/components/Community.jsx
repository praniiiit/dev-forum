import React from "react";
import Thread from "./Thread";
import List from "@mui/material/List";
import { useState, useEffect } from "react";
import ThreadForm from "./ThreadForm";
import axios from "axios";

export default function Community(props) {
  const [threads, setThreads] = useState([]);

  const updateThreads = () => {
    axios.get("http://localhost:8000/threads").then((response) => {
      // console.log(response);
      setThreads(response.data);
    });
  };
  useEffect(() => {
    updateThreads();
  }, []);

  const deleteThread = (deleteId) => {
    axios.delete("http://localhost:8000/threads/" + deleteId).then(() => {
      updateThreads();
    });
  };

  const addThread = (newThreadTitle) => {
    if (newThreadTitle === "") {
      alert("Thread Title Cannot Be Empty!");
      return;
    }
    var today = new Date();
    axios
      .post("http://localhost:8000/threads", {
        title: newThreadTitle,
        author: "This User",
        timeStamp:
          " at " +
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds() +
          " on " +
          today.getDate() +
          "/" +
          (today.getMonth() + 1) +
          "/" +
          today.getFullYear(),
        comments: [],
        fav: false,
      })
      .then(() => {
        updateThreads();
      });
  };

  const editThread = (editId) => {
    axios.get("http://localhost:8000/threads/" + editId).then((response) => {
      const newThreadTitle = prompt("Edit Thread Title", response.data.title);
      if (newThreadTitle === "") {
        alert("Thread Title Cannot Be Empty!");
        return;
      }
      var today = new Date();
      axios
        .patch("http://localhost:8000/threads/" + editId, {
          title: newThreadTitle,
          author: "This User",
          timeStamp:
            " at " +
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds() +
            " on " +
            today.getDate() +
            "/" +
            (today.getMonth() + 1) +
            "/" +
            today.getFullYear(),
        })
        .then(() => {
          updateThreads();
        });
    });
  };

  return (
    <>
      <List>
        {threads.map((thread) => (
          <Thread
            key={thread.id}
            threadTitle={thread.title}
            threadAuthor={thread.author}
            threadTimeStamp={thread.timeStamp}
            threadFav={thread.fav}
            threadId={thread.id}
            deleteThread={deleteThread}
            editThread={editThread}
          />
        ))}
      </List>

      <ThreadForm addThread={addThread} />
    </>
  );
}
