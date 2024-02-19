import React, { useState, useEffect } from "react";

//Functional component to edit the category of the selected "company""
const Editor = ({ selectedOption, onSubmit }) => {
const [category, setCategory] = useState("");

  useEffect(() => {
    setCategory(selectedOption ? selectedOption.category : "");
  }, [selectedOption]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newValue = { ...selectedOption, category: category };
    onSubmit(newValue);
  };

  return (
    <div className="info">
      {selectedOption && (
        <React.Fragment>
          <form onSubmit={handleSubmit} title="edit">
            <div className="name">{selectedOption.label}</div>
            <input
              className="category"
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              required
            />
            <button type="submit">Save</button>
          </form>
        </React.Fragment>
      )}
    </div>
  );
};

export default Editor;
