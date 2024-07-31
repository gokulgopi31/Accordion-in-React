import { useState } from "react";
import data from "./data";
import "./style.css";
export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [multiSelection, setMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);
  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }
  function handleMultiSelection(getCurrentId) {
    let multiarray = [...multiple];
    const findIndexOfCurrentId = multiarray.indexOf(getCurrentId);
    if (findIndexOfCurrentId === -1) {
      multiarray.push(getCurrentId);
    } else {
      multiarray.splice(findIndexOfCurrentId, 1);
    }
    setMultiple(multiarray);
  }

  return (
    <div className="wrapper">
      <button onClick={() => setMultiSelection(!multiSelection)}>
        Enable MultiSelection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                onClick={
                  multiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {/* {selected === dataItem.id ? (
                <div className="content">{dataItem.answer}</div>
              ) : null} */}
              {multiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="content">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="content">{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No data found !</div>
        )}
      </div>
    </div>
  );
}
