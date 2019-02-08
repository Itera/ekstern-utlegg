import React from 'react';
import Octicon from 'react-octicon';

import PropTypes from 'prop-types';

const Valid = ({ valid }) => {
  const icon = valid ? 'check' : 'alert';

  return (
    <div className="col-sm-1">
      <Octicon name={icon} mega />
    </div>
  );
};

Valid.propTypes = {
  valid: PropTypes.bool.isRequired
};

export default Valid;
