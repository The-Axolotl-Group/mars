import React, { useEffect, useState /* useChat */ } from 'react';
// import './Chat.css';
import myImage from '../../public/send-icon.png';

interface ChatProps {
  isVisible: boolean;
  toggleChatbox: () => void;
}

const Chat: React.FC<ChatProps> = ({ isVisible, toggleChatbox }: ChatProps) => {
  // create a useState to get input, save messages

  const [input, setInput] = useState<string>('');
  const [allMessages, setAllMessages] = useState<string[]>([]);
  // const [prompt, setPrompt] = useState('');

  // const  { marsMessage, marsMessageError } = useChat(prompt)

  // useEffect(() => {
  //   if (marsMessage) setAllMessages((prev) => [...prev, marsMessage]);
  // }, [marsMessage]);

  const handleClick = () => {
    if (input.trim() === '') return;

    setAllMessages((prevMessages) => [...prevMessages, input]);
    // setPrompt(input);
    setInput('');
  };

  return (
    <div className={`chat ${isVisible ? 'visible' : ''}`}>
      <header>
        {/* <button onClick={toggleChatbox} className="closeButton">
                    X
                </button>   */}
        <div className='header'>
          Chat with Martians{' '}
          <span onClick={toggleChatbox} className='closeButton'>
            X
          </span>
        </div>
      </header>

      <main className='messages'>
        {allMessages.map((message, i) => (
          <div
            key={i}
            className={i % 2 === 0 ? 'message-earth' : 'message-mars'}
          >
            {message}
          </div>
        ))}
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
