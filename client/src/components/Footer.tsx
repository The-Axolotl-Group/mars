import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-left'>
          <h2>Mars Explorer</h2>
          <p>Discover the beauty and mystery of the Red Planet.</p>
        </div>
        <div className='footer-right'>
          <Link to='hero' smooth={true} duration={500} offset={-50}>
            Back to top
          </Link>
          <Link to='gallery' smooth={true} duration={500} offset={-50}>
            Gallery
          </Link>
          <Link to='weather' smooth={true} duration={500} offset={-50}>
            Weather
          </Link>
          <Link to='pod' smooth={true} duration={500} offset={-50}>
            Picture of the Day
          </Link>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>© 2025 Mars Explorer Project. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
