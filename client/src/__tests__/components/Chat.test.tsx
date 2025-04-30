import '@testing-library/jest-dom';
import * as React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import Chat from '../../components/Chat';
// import App from '../../App.tsx';

/*
#3 Test cases to consider (ex: Chat)

- What components do we want to render?
- User interaction:
  \_ Does the component render when visible/invisible?
  \_ What happens when user types in the input?
  \_ What happens when a user clicks send?
  \_ Does pressing Enter work?
- Does the component receive/respond to props?
- Are messages added correctly?

#4 Testing technique

- render (render component)
- screen (queries to find elements)
- userEvent (simulate user interaction)
- fireEvent (basic events)
- expect (assertion)
*/

describe('Chat component', () => {
  let chat: any;
  const mockProps = {
    isVisible: false,
    toggleChatbox: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    chat = render(<Chat {...mockProps} />);
  });

  // 1. Render chat visible
  test('Renders component visible based on isVisible prop', () => {
    // chat class is what's changing based on the props
    const chatContainer = chat.container.querySelector('.chat');
    expect(chatContainer).not.toHaveClass('visible');

    // rerender with isVisible = true
    chat.rerender(<Chat {...mockProps} isVisible={true} />);

    // check if the class has been applied
    expect(chatContainer).toHaveClass('visible');

    // check if header is present present
    expect(screen.getByText('Chat with Martians')).toBeInTheDocument();
  });

  // 2. Type in a message
  test('Allow user to type a message', () => {
    // make sure our component is visible
    chat.rerender(<Chat {...mockProps} isVisible={true} />);

    const inputField = screen.getByPlaceholderText('Speak to Martian Axolotl');

    // we're changing the placeholder input to a mock message
    fireEvent.change(inputField, { target: { value: 'Hey to Mars' } });

    const sendButton = screen.getByRole('img');
    fireEvent.click(sendButton);

    expect(screen.getByText('Hey to Mars')).toBeInTheDocument();

    // Fix: Check the input value property, not the element itself
    expect(inputField).toHaveValue('');
  });

  // 3. Click send button
  test('Sends message when send button is clicked', () => {
    chat.rerender(<Chat {...mockProps} isVisible={true} />);

    const inputField = screen.getByPlaceholderText('Speak to Martian Axolotl');
    fireEvent.change(inputField, { target: { value: 'Testing send button' } });

    const sendButton = screen.getByRole('img');
    fireEvent.click(sendButton);

    expect(screen.getByText('Testing send button')).toBeInTheDocument();
    expect(inputField).toHaveValue('');
  });

  // 4. Press enter - does it work?

  // 5. Do props work?

  // 6. Messages being added?
  // - Add second message
  // - Per component logic, first message should have earth class, second should have mars class
  // - Try to send empty message
});
