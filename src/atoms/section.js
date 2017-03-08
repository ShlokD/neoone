import React, { PropTypes } from 'react';

const Section = (props) => {
  const { className, children } = props;
  return (
    <section className={className}>
      {children}
    </section>);
};

Section.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

Section.defaultProps = {
  className: '',
  children: null
};

export default Section;
