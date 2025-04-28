import React, { useMemo, useState } from 'react';

type RandomPic = {
  nasa_id: number;
  sol: number;
  img_src: string;
  earth_date: string;
};

type MarsGalleryProps = {
  scrollTop: number;
  RandomPics: RandomPic[];
};

const MarsGallery: React.FC<MarsGalleryProps> = ({ scrollTop, RandomPics }) => {
  const [shuffleCount, setShuffleCount] = useState(0);

  const galleryImages = useMemo(() => {
    return [...RandomPics].sort(() => Math.random() - 0.5).slice(0, 6);
  }, [RandomPics, shuffleCount]);

  return (
    <div id='gallery' className='mars-gallery-container'>
      <div
        className={`mars-gallery-title ${
          scrollTop < 3500 || scrollTop > 4500 ? 'hide-top-100' : ''
        }`}
      >
        <h1 className='section-title'>Gallery</h1>
        <button
          onClick={() => setShuffleCount((prev) => prev + 1)}
          className='random-button'
        >
          Repick 6 Photos
        </button>
      </div>
      <div className='mars-gallery-pictures-container'>
        <div className='mars-gallery-picture-row'>
          {galleryImages.slice(0, 3).map((pic, index) => (
            <div
              key={pic.nasa_id}
              className={`mars-gallery-picture-box ${
                scrollTop >= 3600 ? 'appear' : ''
              }`}
              style={{
                transitionDelay: scrollTop >= 3600 ? `${index * 0.3}s` : '0s',
              }}
            >
              <img src={pic.img_src} alt={`Mars photo ${pic.nasa_id}`} />
              <div className='image-info-overlay'>
                <p>Nasa ID: {pic.nasa_id}</p>
                <p>Earth Date: {pic.earth_date}</p>
                <p>Sol: {pic.sol}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='mars-gallery-picture-row'>
          {galleryImages.slice(3, 6).map((pic, index) => (
            <div
              key={pic.nasa_id}
              className={`mars-gallery-picture-box ${
                scrollTop >= 3600 ? 'appear' : ''
              }`}
              style={{
                transitionDelay:
                  scrollTop >= 3600 ? `${(index + 3) * 0.3}s` : '0s',
              }}
            >
              <img src={pic.img_src} alt={`Mars photo ${pic.nasa_id}`} />
              <div className='image-info-overlay'>
                <p>Nasa ID: {pic.nasa_id}</p>
                <p>Earth Date: {pic.earth_date}</p>
                <p>Sol: {pic.sol}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(MarsGallery);
