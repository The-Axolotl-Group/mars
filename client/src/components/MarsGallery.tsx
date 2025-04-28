type MarsGalleryProps = {
  scrollTop: number;
};

const galleryImages = [
  './1.webp',
  './2.webp',
  './3.webp',
  './4.webp',
  './5.webp',
  './6.webp',
];

const MarsGallery = ({ scrollTop }: MarsGalleryProps) => {
  return (
    <div id='gallery' className='mars-gallery-container'>
      <div className='mars-gallery-title'>
        <h1 className='section-title'>Gallery</h1>
      </div>
      <div className='mars-gallery-pictures-container'>
        <div className='mars-gallery-picture-row'>
          {galleryImages.slice(0, 3).map((src, index) => (
            <div
              key={index}
              className={`mars-gallery-picture-box ${
                scrollTop >= 3100 ? 'appear' : ''
              }`}
              style={{
                transitionDelay: scrollTop >= 3100 ? `${index * 0.3}s` : '0s',
              }}
            >
              <img src={src} alt='' />
            </div>
          ))}
        </div>
        <div className='mars-gallery-picture-row'>
          {galleryImages.slice(3, 6).map((src, index) => (
            <div
              key={index + 3}
              className={`mars-gallery-picture-box ${
                scrollTop >= 3100 ? 'appear' : ''
              }`}
              style={{
                transitionDelay:
                  scrollTop >= 3100 ? `${(index + 3) * 0.3}s` : '0s',
              }}
            >
              <img src={src} alt='' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarsGallery;
