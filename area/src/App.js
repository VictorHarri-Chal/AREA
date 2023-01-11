import React, { useState } from 'react';
import './App.css';

function App() {

    const [count, setCount] = useState(8);

    const handleCLick = () => {
        setCount(count + 1);
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={handleCLick}>Add</button>
        </div>
    );
}

export default App;