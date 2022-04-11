import React from "react";
import Icons from "../assets/Icons.svg";

const SvgComponent = ({ name, width, height, classes }) => {
  return (
    <svg className={classes} width={width} height={height}>
      <use xlinkHref={`${Icons}#${name}`} />
    </svg>
  );
};

export default SvgComponent;
