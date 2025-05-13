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
  title: 'Mars Exploration',
  url: 'https://example.com/thumbnail.jpg',
};

describe('PictureOfTheDay', () => {
  test('Renders POD, title, date, and explanation', () => {
    render(<PictureOfTheDay podData={mockPodData} scrollTop={6000} />);

    expect(screen.getByText('Picture of the day')).toBeInTheDocument();
    expect(screen.getByText('Mars Exploration')).toBeInTheDocument();
    expect(screen.getByText('2024-04-29')).toBeInTheDocument();
    expect(screen.getByText('Pic explanation.')).toBeInTheDocument();
  });

  test('hides animation classes when scrollTop is outside range', () => {
    const { container } = render(
      <PictureOfTheDay podData={mockPodData} scrollTop={7000} />
    );

    expect(container.querySelector('.pod-left')).toHaveClass('hide-left-100');
    expect(container.querySelector('.pod-right')).toHaveClass('hide-right-100');
  });

  test('shows full-screen image when image is clicked', async () => {
    render(<PictureOfTheDay podData={mockPodData} scrollTop={6000} />);

    const thumbImage = screen.getByAltText('1st test image');
    fireEvent.click(thumbImage);

    // const fullImage = screen.getByRole('img', { name: '2nd test image' });
    const fullImage = screen.getByAltText('2nd test image');
    expect(fullImage).toHaveAttribute('src', mockPodData.hdurl);
  });

  test('hides full-screen image when close button is clicked', () => {
    /* Note to self:
    - Container is a DOM node, a DIV.
    - this gives access to the component's DOM structure
    - its helpful for checking CSS classes (that's why we use it here)
    */
    const { container } = render(
      <PictureOfTheDay podData={mockPodData} scrollTop={6000} />
    );

    // Simulate opening and closing the image
    const thumbImage = screen.getByAltText('1st test image');
    fireEvent.click(thumbImage);

    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);

    // Find by class and check classes
    const fullScreenContainer = container.querySelector('.pod-fullscreen-img');
    expect(fullScreenContainer).toHaveClass('display-none');
  });
});
