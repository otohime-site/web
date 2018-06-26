import propTypes from 'prop-types';
import './Flags.css';

export default function Flags({ rawFlags }) {
  return (
    <span className="flags">
      {rawFlags.split('|').map((flag) => {
        switch (flag) {
          case 'fc_silver':
            return (<span className="flag flag-fc-silver">FC</span>);
          case 'fc_gold':
            return (<span className="flag flag-fc-gold">FC</span>);
          case 'ap':
            return (<span className="flag flag-ap">AP</span>);
          case 'ap_plus':
            return (<span className="flag flag-ap-plus">AP+</span>);
          case '100':
            return (<span className="flag flag-100">100</span>);
          default:
            return (<span>&nbsp;</span>);
        }
      })}
    </span>
  );
}

Flags.propTypes = {
  rawFlags: propTypes.string.isRequired,
};
