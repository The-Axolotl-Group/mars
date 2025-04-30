import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PictureOfTheDay from '../../components/PictureOfTheDay';
import '@testing-library/jest-dom';

const mockPodData = {
  date: '2024-04-29',
  explanation: 'Pic explanation.',
  hdurl: 'https://example.com/full-image.jpg',
  media_type: 'image',
  service_version: 'v1',
  title: 'Mars',
  url: 'https://example.com/thumbnail.jpg',
};
// describe('PictureOfTheDay', () => {
//   test('Renders POD, title, date, and explanation', () => {
//     render(<PictureOfTheDay podData={mockPodData} scrollTop={6000} />);

//     expect(screen.getByText('Picture of the day')).toBeInTheDocument();
//     expect(screen.getByText('Mars Landscape')).toBeInTheDocument();
//     expect(screen.getByText('2024-04-27')).toBeInTheDocument();
//     expect(screen.getByText('Pic explanation.')).toBeInTheDocument();
//   });
//   test('hides animation classes when scrollTop is outside range', () => {
//     const { container } = render(
//       <PictureOfTheDay podData={mockPodData} scrollTop={7000} />
//     );

//     expect(container.querySelector('.pod-left')).toHaveClass('hide-left-100');
//     expect(container.querySelector('.pod-right')).toHaveClass('hide-right-100');
//   });

//   test('shows full-screen image when image is clicked', () => {
//     render(<PictureOfTheDay podData={mockPodData} scrollTop={6000} />);

//     const thumbImage = screen.getByRole('img');
//     fireEvent.click(thumbImage);

//     const fullImage = screen.getByRole('img', { name: '' }); // no alt text
//     expect(fullImage).toHaveAttribute('src', mockPodData.hdurl);
//   });

//   test('hides full-screen image when close button is clicked', () => {
//     render(<PictureOfTheDay podData={mockPodData} scrollTop={6000} />);

//     const thumbImage = screen.getByRole('img');
//     fireEvent.click(thumbImage);

//     const closeButton = screen.getByText('X');
//     fireEvent.click(closeButton);

//     const fullScreenContainer = document.querySelector('.pod-fullscreen-img');
//     expect(fullScreenContainer).toHaveClass('display-none');
//   });
// });
