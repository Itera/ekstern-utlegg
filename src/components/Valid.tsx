import React from 'react';
import Octicon from 'octicons-react-ts';

const Valid = ({ valid }: { valid?: boolean }) => {
  const icon = valid ? 'check' : 'alert';

  return (
    <div className="col-sm-1">
      <Octicon name={icon} ratio={2} />
    </div>
  );
};

export default Valid;
