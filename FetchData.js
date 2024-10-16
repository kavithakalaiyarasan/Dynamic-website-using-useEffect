import React, { useState, useEffect } from 'react';

function FetchData() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const tamilNames = [
    'Arun Kumar',
    'Suresh Kumar',
    'Priya Subramanian',
    'Anitha Ramachandran',
    'Balaji Venkatesan',
    'Kavitha Krishnan',
    'Vignesh Sivan',
    'Mohan Raj',
    'Lakshmi Narayanan',
    'Saravanan Gopinath'
  ];

  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => {

        const updatedData = json.map((user, index) => ({
          ...user,
          name: tamilNames[index % tamilNames.length] 
        }));
        setData(updatedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  
  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, data]);

  return (
    <div>
      <h2>Search Tamil Nadu Users</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
      />
      <ul>
        {filteredData.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FetchData;
