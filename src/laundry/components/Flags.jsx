import propTypes from 'prop-types';
import './Flags.css';

export default function Flags({ rawFlags }) {
  return (
    <div>
      {rawFlags.split('|').map((flag) => {
        switch (flag) {
          case 'fc_silver':
            return (<span className="flag flag-fc-silver">FC</span>);
          case 'fc_gold':
            return (<span className="flag flag-fc-gold">FC</span>);
          case 'ap':
            return (<span className="flag flag-ap">AP</span>);
          case '100':
            return (<span className="flag flag-100">100%</span>);
          default:
            return (<span>&nbsp;</span>);
        }
      })}
    </div>
  );
}

Flags.propTypes = {
  rawFlags: propTypes.string.isRequired,
};
