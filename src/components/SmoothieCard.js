import { Link } from "react-router-dom";


const SmoothieCard = ({ smoothie }) => {
  return (
    <div className="smoothie-card">
      <h2>{smoothie.title}</h2>
      <p
      className="single-line-ellipsis"
      >{smoothie.method}</p>
      <p>Created at: {new Date(smoothie.created_at).toLocaleDateString()}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        <Link to={'/' + smoothie.id}>
          <i className="material-icons">edit</i>
        </Link>
      </div>
    </div>
  );
};

export default SmoothieCard;