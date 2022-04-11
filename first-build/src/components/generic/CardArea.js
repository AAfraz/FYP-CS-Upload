import "./CardArea.css";
import Card from "./Card.js";

function CardArea(props) {
  return (
    <ul className="cardArea">
      {props.data.map((item) => (
        <Card
          title={item["Title"]} // Instead of doing task.Title as the . notaion is limited with what can be done with it (no numbers or spaces to start)
          status={item["Status"]}
          due={new Date(item["DueDate"]).toLocaleDateString()} // Formatting the date in a way which is desired
          itemData={item} // Sends the data of the item to the card
          type={props.type}
          setItemId={props.setItemId}
        />
      ))}
    </ul>
  );
}

export default CardArea;
