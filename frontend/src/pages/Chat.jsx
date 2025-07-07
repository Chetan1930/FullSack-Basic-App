import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

function Chat() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    const name = prompt('Enter your username:') || 'Anonymous';
    setUsername(name);

    socket.current = io('http://localhost:3000', {
      withCredentials: true,
    });

    socket.current.on('chat message', (msgObj) => {
      setMessages((prev) => [...prev, msgObj]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const msgObj = {
        username,
        text: message,
        timestamp: new Date().toISOString(),
      };
      socket.current.emit('chat message', msgObj);
      setMessage('');
    }
  };

  const formatTime = (iso) => {
    const date = new Date(iso);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={styles.chat}>
      <h2 style={{ textAlign: 'center' }}>Chat Room</h2>
      <ul style={styles.messages}>
        {messages.map((msg, i) => (
          <li key={i} style={styles.message}>
            <strong>{msg.username}</strong> <span style={styles.time}>({formatTime(msg.timestamp)}):</span> {msg.text}
          </li>
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
  time: {
    color: '#888',
    fontSize: '12px',
    marginLeft: '4px',
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
