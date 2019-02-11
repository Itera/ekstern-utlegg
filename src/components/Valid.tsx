import React from 'react';
import Octicon from 'octicons-react-ts';

import '../styles/octicons.css';

const Valid = ({ valid }: { valid?: boolean }) => {
  const icon = valid ? 'check' : 'alert';
  const styleName = valid ? [] : ['warning'];

  return (
    <div className="col-sm-1">
      <Octicon class={styleName} name={icon} ratio={2} />
    </div>
  );
};

export default Valid;
