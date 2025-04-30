import React, { useEffect, useState, useRef } from 'react';
import myImage from '../../public/send-icon.png';

interface ChatProps {
  isVisible: boolean;
  toggleChatbox: () => void;
}

const Chat: React.FC<ChatProps> = ({ isVisible, toggleChatbox }: ChatProps) => {
  const [input, setInput] = useState<string>('');
  const [allMessages, setAllMessages] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages]);

  const handleClick = async () => {
    if (input.trim() === '') return;

    const userMessage = input;
    setAllMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    try {
      const martianResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!martianResponse.ok) {
        throw new Error('Stop trying to make Fetch on Martian Message happen!');
      }

      const data = await martianResponse.json();

      setAllMessages((prevMessages) => [...prevMessages, data.response]);
    } catch (error) {
      console.error('Error talking to Martian', error);
      setAllMessages((prevMessages) => [
        ...prevMessages,
        '👽... no response...',
      ]);
    }
  };

  return (
    <div className={`chat ${isVisible ? 'visible' : ''}`}>
      <header>
        <div className='header'>
          Chat with Martians{' '}
          <span onClick={toggleChatbox} className='closeButton'>
            X
          </span>
        </div>
      </header>

      <main className="messages">
        {allMessages.map((msg, i) => (
          <div key={i} className={i % 2 === 0 ? 'message-earth' : 'message-mars'}>
            {msg}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <div className='input-and-send-button'>
        <input
          className='input'
          type='text'
          placeholder='Speak to Martian Axolotl'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleClick();
          }}
        />
        <img onClick={handleClick} className='send-icon' src={myImage} />
      </div>
    </div>
  );
};

export default Chat;