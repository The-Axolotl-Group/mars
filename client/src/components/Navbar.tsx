import { Link } from 'react-scroll';
type NavbarType = {
  scrollTop: number;
};

const Navbar = ({ scrollTop }: NavbarType) => {
  console.log(scrollTop);
  return (
    <nav className={`navbar ${scrollTop < 800 ? 'hide-top-60' : ''}`}>
      <div className='navbar-content'>
        <div className='navbar-left'>
          <h1>Mars Explorer</h1>
        </div>

        <div className='navbar-right'>
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
    </nav>
  );
};

export default Navbar;
