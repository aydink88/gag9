import { FC, useEffect, useState } from 'react';
import FeaturedTags from '../components/FeaturedTags';
import Navbar from '../components/Navbar';
import Tabbar from '../components/Tabbar';

const Header: FC = () => {
  const [showHeader, setShowHeader] = useState(true);

  const handleScroll = () => {
    const scrollPos = document.body.getBoundingClientRect().top;
    scrollPos < -150 ? setShowHeader(false) : setShowHeader(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={showHeader ? 'header' : 'header hide'}>
      <Navbar />
      <Tabbar />
      <FeaturedTags />
    </div>
  );
};

export default Header;
