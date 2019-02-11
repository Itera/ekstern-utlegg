import React from 'react';

import '../styles/octicons.css';

const Check = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="32"
      viewBox="0 0 12 16"
    >
      <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z" />
    </svg>
  );
};

const Alert = () => {
  return (
    <svg
      className="warning"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"
      />
    </svg>
  );
};
const Valid = ({ valid }: { valid?: boolean }) => {
  const icon = valid ? <Check /> : <Alert />;

  return <div className="col-sm-1">{icon}</div>;
};

export default Valid;
