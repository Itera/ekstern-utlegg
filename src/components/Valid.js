import React from "react";
import Octicon from "react-octicon";

const Valid = valid => {
  const icon = valid ? "check" : "alert";

  return (
    <div className="col-sm-1">
      <Octicon name={icon} mega />
    </div>
  );
};

export default Valid;
