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
};

const PictureOfTheDay = ({
  podData: {
    date,
    explanation,
    hdurl,
    media_type,
    service_version,
    title,
    url,
  },
}: PictureOfTheDayProps) => {
  const [showBigImg, setShowBIgImg] = useState(false);
  const handleBigImg = () => {
    setShowBIgImg(!showBigImg);
  };
  console.log(date);
  return (
    <div className='pod-container'>
      <div className='pod-left'>
        <h1 className='content-text-title'>Picture of the day</h1>
        <p className='content-text-sub-title'>{title}</p>
        <p className='content-text'>{date}</p>
        <p className='content-text'>{explanation}</p>
      </div>
      <div className='pod-right'>
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
