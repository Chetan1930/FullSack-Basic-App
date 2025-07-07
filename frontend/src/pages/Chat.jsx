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
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <div style={styles.header}>💬 WhatsChat</div>
        <div style={styles.messages}>
          {messages.map((msg, i) => {
            const isMine = msg.username === username;
            return (
              <div
                key={i}
                style={{
                  ...styles.message,
                  alignSelf: isMine ? 'flex-end' : 'flex-start',
                  backgroundColor: isMine ? '#dcf8c6' : '#fff',
                  borderTopRightRadius: isMine ? 0 : '20px',
                  borderTopLeftRadius: isMine ? '20px' : 0,
                }}
              >
                <div style={styles.meta}>
                  <span style={styles.username}>{msg.username}</span>
                  <span style={styles.time}>{formatTime(msg.timestamp)}</span>
                </div>
                <div>{msg.text}</div>
              </div>
            );
          })}
        </div>
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
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#e5ddd5',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatBox: {
    width: '100%',
    maxWidth: '600px',
    height: '90vh',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    fontFamily: 'sans-serif',
  },
  header: {
    backgroundColor: '#075e54',
    color: '#fff',
    padding: '15px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  messages: {
    flex: 1,
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    overflowY: 'auto',
    backgroundColor: '#e5ddd5',
  },
  message: {
    maxWidth: '70%',
    padding: '10px 15px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    wordWrap: 'break-word',
    fontSize: '15px',
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#555',
    marginBottom: '5px',
  },
  username: {
    fontWeight: 'bold',
  },
  time: {
    fontStyle: 'italic',
  },
  form: {
    display: 'flex',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderTop: '1px solid #ccc',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '20px',
    outline: 'none',
    marginRight: '10px',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#25D366',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    fontSize: '16px',
    borderRadius: '20px',
    cursor: 'pointer',
  },
};

export default Chat;
