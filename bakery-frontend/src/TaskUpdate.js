import React, { useEffect, useState } from 'react';

function TaskUpdate() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/task-updates/');

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessage(data.message);  // Update state with new task update
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();  // Cleanup on component unmount
    };
  }, []);

  return (
    <div>
      <h2>Task Update:</h2>
      <p>{message}</p>
    </div>
  );
}

export default TaskUpdate;
