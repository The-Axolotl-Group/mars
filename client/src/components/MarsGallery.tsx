const MarsGallery = () => {
  return (
    <div className='mars-gallery-container'>
      <div className='mars-gallery-title'>
        <h1>Gallery</h1>
      </div>
      <div className='mars-gallery-pictures-container'>
        <div className='mars-gallery-picture-row'>
          <div className='mars-gallery-picture-box'>
            <img src='https://placehold.co/400x400' alt='' />
          </div>
          <div className='mars-gallery-picture-box'>
            <img src='https://placehold.co/400x400' alt='' />
          </div>
          <div className='mars-gallery-picture-box'>
            <img src='https://placehold.co/400x400' alt='' />
          </div>
        </div>
        <div className='mars-gallery-picture-row'>
          <div className='mars-gallery-picture-box'>
            <img src='https://placehold.co/400x400' alt='' />
          </div>
          <div className='mars-gallery-picture-box'>
            <img src='https://placehold.co/400x400' alt='' />
          </div>
          <div className='mars-gallery-picture-box'>
            <img src='https://placehold.co/400x400' alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarsGallery;
