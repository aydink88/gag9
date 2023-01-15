import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

const Footer: FC = () => {
  const [appLink, setAppLink] = useState(true);

  return (
    <div className='footer'>
      {appLink && (
        <div className='footer__btn'>
          <img src='/images/logo.png' alt='logo' />
          <Link to='/'>
            <div>Open in 9gag app</div>
          </Link>
          <i className='fas fa-times fa-2x' onClick={() => setAppLink((prev) => !prev)}></i>
        </div>
      )}
    </div>
  );
};

export default Footer;
