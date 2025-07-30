import { Link } from "react-router-dom";
// import supabase from "../config/supabaseClient";

const SmoothieCard = ({ smoothie, onDelete }) => {

  // const handleDelete = async () => {
  //     const { data, error} = await supabase
  //       .from('smoothies')
  //       .delete()
  //       .eq('id', smoothie.id);

  //     if (error) {
  //       console.error("Error deleting smoothie:", error);
  //     } else if (data) {
  //       console.log("Smoothie deleted successfully:", data);
  //       onDelete(smoothie.id); // Call the onDelete prop to update the state in Home.js
  //     }  
  //   }

  return (
    <div className="smoothie-card">
      <h2>{smoothie.title}</h2>
      <p
      className="single-line-ellipsis"
      >{smoothie.method}</p>
      <p>Created at: {new Date(smoothie.created_at).toLocaleDateString()}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        {/* Edit button */}
        <Link to={'/' + smoothie.id}>
          <i className="material-icons">edit</i>
        </Link>
        {/* Delete button */}
        <i className="material-icons" onClick={() => onDelete(smoothie.id)}>delete</i>
      </div>
    </div>
  );
};

export default SmoothieCard;