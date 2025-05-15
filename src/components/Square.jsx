export default function Square({ value = "", boxNumber, handleClick }) {
  return (
    <button
      className="square"
      onClick={() => handleClick(boxNumber)}
      data-value={value}
    >
      {value}
    </button>
  );
}
