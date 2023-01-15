import { FC } from 'react';

const Swipebar: FC = () => {
  return (
    <div className='swipe-bar'>
      <span className='arrow'>&larr;</span> Swipe to navigate <span className='arrow'>&rarr;</span>
      <span className='close'>X</span>
    </div>
  );
};

export default Swipebar;
