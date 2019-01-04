import React from 'react';
import propTypes from 'prop-types';

const classNames = {
  '01': '初段',
  '02': '二段',
  '03': '三段',
  '04': '四段',
  '05': '五段',
  '06': '六段',
  '07': '七段',
  '08': '八段',
  '09': '九段',
  10: '十段',
  11: '皆伝',
};

const classLevels = {
  '08': 'silver',
  '09': 'gold',
  10: 'gold-black',
  11: 'gold-red',
};

export default function Class({ rawClass }) {
  if (!rawClass) {
    return (<span />);
  }
  const classParts = rawClass.split('_');
  const className = classNames[classParts[0]];
  const classLevel = classLevels[classParts[1]];
  return (
    <svg className={`player-class class-${classLevel}`} width="60" height="28">
      <text paintOrder="stroke" x="10" y="20">
        {className}
      </text>
    </svg>);
}

Class.propTypes = {
  rawClass: propTypes.string.isRequired,
};
