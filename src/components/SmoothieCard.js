const SmoothieCard = ({ smoothie }) => {
  return (
    <div className="smoothie-card">
      <h2>{smoothie.title}</h2>
      <p>{smoothie.ingredients}</p>
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <p>Created at: {new Date(smoothie.created_at).toLocaleDateString()}</p>
      <div className="rating">{smoothie.rating}</div>
    </div>
  );
};

export default SmoothieCard;