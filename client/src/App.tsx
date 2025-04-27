import MarsGlobe from './components/Mars.tsx';
import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import Hero from './components/Hero.tsx';
import FirstTextSection from './components/FirstTextSection.tsx';
import Weather from './components/Weather.tsx';
import MarsGallery from './components/MarsGallery.tsx';
import PictureOfTheDay from './components/PictureOfTheDay.tsx';
import SecondTextSection from './components/SecondTextSection.tsx';
import Footer from './components/Footer.tsx';

function App() {
  const [scrollTop, setScrollTop] = useState(0);

  // this useEffect make scroll down smooth
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <h1 className='test-scrollTop'>{scrollTop}</h1>
      <Hero />
      <div className={`mars-canvas-container ${scrollTop > 800 ? 'hide' : ''}`}>
        <MarsGlobe scrollTop={scrollTop} />
        {/* <h1> Canvas here</h1> */}
      </div>
      <FirstTextSection />
      <Weather scrollTop={scrollTop} />
      <MarsGallery />
      <SecondTextSection />
      <PictureOfTheDay />
      <Footer />
    </>
  );
}

export default App;
