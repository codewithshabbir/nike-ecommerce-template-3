import { FaStar } from 'react-icons/fa';
import { FaStarHalfStroke } from "react-icons/fa6";
import { CiStar } from 'react-icons/ci';
import { StarRatingProps } from '../@types/types';

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const totalStar = 5;
  const stars = [];

  for (let i = 0; i < totalStar; i++) {
    // Determine which type of star to render based on the rating
    if (rating >= i + 1) {
      stars.push(<FaStar key={i} className="fill-yellow-500" />); // Full star
    } else if (rating > i && rating < i + 1) {
      stars.push(<FaStarHalfStroke key={i} className="fill-yellow-500" />); // Half star
    } else {
      stars.push(<CiStar key={i} className="fill-yellow-500" />); // Empty star
    }
  }

  return <div className="flex">{stars}</div>;
};

export default StarRating;