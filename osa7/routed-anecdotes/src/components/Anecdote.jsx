import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((a) => a.id === parseInt(id));
  return (
    <div>
      <h2>{anecdote.content}</h2>
    </div>
  );
};

export default Anecdote;
