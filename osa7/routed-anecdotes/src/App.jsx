import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AnecdoteList from "./components/AnecdoteList";
import Menu from "./components/Menu";
import About from "./components/About";
import CreateNew from "./components/CreateNew";
import Footer from "./components/Footer";
import Anecdote from "./components/Anecdote";
import Notification from "./components/Notification";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);
  const [notification, setNotification] = useState({
    text: "",
    type: "",
    visible: false,
  });

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const showNotification = (message, type) => {
    setNotification({
      text: message,
      type: type,
      visible: true,
    });

    setTimeout(() => {
      setNotification((prevState) => ({ ...prevState, visible: false }));
    }, 5000);
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification notification={notification} />

      <Menu />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdotes={anecdotes} />}
        />
        <Route
          path="/create"
          element={
            <CreateNew showNotification={showNotification} addNew={addNew} />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
