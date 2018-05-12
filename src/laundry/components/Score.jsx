import { PropTypes } from 'prop-types';
import Flags from './Flags';

export default function Score({ score }) {
  return (
    <span>
      { (score.score > 0) ? `${score.score.toFixed(2)}%` : '' } <Flags rawFlags={score.flag} />
    </span>
  );
}
Score.propTypes = {
  score: PropTypes.shape({
    flag: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};
