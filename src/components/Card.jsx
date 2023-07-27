function Card(props) {
  return (
    <div
      className="p-20 border border-black bg-white rounded-lg cursor-pointer"
      onClick={props.onClick}
    >
      <h1 className="text-xl font-bold text-center">{props.Q.questions}</h1>
    </div>
  );
}

export default Card;
