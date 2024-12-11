import React, { useState } from "react";
import "./App.css";
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";
import Tablet from './Tablet'; // Import the Tablet component


// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: "setVisible",
    data: true,
  },
]);


const App: React.FC = () => {
  return (
    <div className="App">
    {/* Other components or content can go here */}
    <Tablet /> {/* Render the Tablet component */}
</div>
  );
};

export default App;
