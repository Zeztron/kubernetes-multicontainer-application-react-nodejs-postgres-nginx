import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const MainComponent = () => {
  const [values, setValues] = useState([]);
  const [value, setValue] = useState('');

  const getAllNumbers = useCallback(async () => {
    // We will use nginx to redirect it to the proper URL
    const data = await axios.get('/api/values/all');
    setValues(data.data.rows.map((row) => row.number));
  }, []);

  const saveNumber = useCallback(
    async (event) => {
      event.preventDefault();

      await axios.post('/api/values', { value });

      setValue('');
      await getAllNumbers();
    },
    [value, getAllNumbers]
  );

  useEffect(() => {
    getAllNumbers();
  }, [getAllNumbers]);

  return (
    <div>
      <button onClick={getAllNumbers}>Get all numbers</button>
      <span className="title">Values</span>
      <div className="values">
        {values.map((value) => (
          <div className="value" key={value}>
            {value}
          </div>
        ))}
      </div>
      <form className="form" onSubmit={saveNumber}>
        <label>Enter your value</label>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MainComponent;
