import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    // Connect to your backend server
    socket.current = io('http://localhost:3000', {
      withCredentials: true,
    });

    // Listen for messages from server
    socket.current.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Cleanup on unmount
    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.current.emit('chat message', message); // Send message to backend
      setMessage(''); // Clear input
    }
  };

  return (
    <div style={styles.chat}>
      <h2 style={{ textAlign: 'center' }}>Simple Chat App</h2>
      <ul style={styles.messages}>
        {messages.map((msg, i) => (
          <li key={i} style={styles.message}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button style={styles.button} type="submit">Send</button>
      </form>
    </div>
  );
}

const styles = {
  chat: {
    maxWidth: '500px',
    margin: '30px auto',
    padding: '20px',
    background: '#fff',
    borderRadius: '10px',
    fontFamily: 'sans-serif',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  },
  messages: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '10px',
    maxHeight: '300px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    borderRadius: '5px',
    paddingInline: '10px',
  },
  message: {
    padding: '8px',
    background: '#f1f1f1',
    marginBottom: '6px',
    borderRadius: '5px',
  },
  form: {
    display: 'flex',
    gap: '10px'
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
};

export default Chat;
