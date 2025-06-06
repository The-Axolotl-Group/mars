import React from 'react';
import { useState } from 'react';

type PodData = {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};
type PictureOfTheDayProps = {
  podData: PodData;
  scrollTop: number;
};

const PictureOfTheDay = ({
  podData: { date, explanation, hdurl, title, url },
  scrollTop,
}: PictureOfTheDayProps) => {
  const [showBigImg, setShowBIgImg] = useState(false);
  const handleBigImg = () => {
    setShowBIgImg(!showBigImg);
  };
  return (
    <div id='pod' className='pod-container'>
      <div
        className={`pod-left  ${
          scrollTop < 5300 || scrollTop > 6300 ? 'hide-left-100' : ''
        }`}
      >
        <h1 className='content-text-title'>Picture of the day</h1>
        <p className='content-text-sub-title'>{title}</p>
        <p className='content-text'>{date}</p>
        <p className='content-text'>{explanation}</p>
      </div>
      <div
        className={`pod-right ${
          scrollTop < 5300 || scrollTop > 6300 ? 'hide-right-100' : ''
        }`}
      >
        {/* <img className='pod-img' src={hdurl} alt='' /> */}
        <img
          onClick={() => handleBigImg()}
          className='pod-img'
          src={url}
          alt=''
        />
      </div>
      <div className={`pod-fullscreen-img ${showBigImg ? '' : 'display-none'}`}>
        <img src={hdurl} alt='' />
        <button className='big-img-btn' onClick={() => handleBigImg()}>
          X
        </button>
      </div>
    </div>
  );
};

// Memoize PictureOfTheDay to prevent unnecessary re-renders unless podData changes
export default React.memo(PictureOfTheDay);
