import { FC } from 'react';
import { Link } from 'react-router-dom';

const FeaturedTags: FC = () => {
  return (
    <div className='featured-tags'>
      <Link to='/'>Champions League</Link>
      <Link to='/'>FC Barcelona</Link>
      <Link to='/'>FC Bayern München</Link>
      <Link to='/'>Champions League</Link>
      <Link to='/'>FC Barcelona</Link>
      <Link to='/'>FC Bayern München</Link>
    </div>
  );
};

export default FeaturedTags;
