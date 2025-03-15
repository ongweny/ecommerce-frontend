import React, { useState, useEffect } from "react";

const SavedItems = () => {
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
    setSavedItems(storedItems);
  }, []);

  const removeSavedItem = (id) => {
    const updatedItems = savedItems.filter((item) => item.id !== id);
    setSavedItems(updatedItems);
    localStorage.setItem("savedItems", JSON.stringify(updatedItems));
  };

  return (
    <div className="content">
      <h1>Saved Items</h1>
      {savedItems.length === 0 ? <p>No saved items.</p> : (
        savedItems.map((item) => (
          <div key={item.id} className="saved-item">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <button onClick={() => removeSavedItem(item.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedItems;
