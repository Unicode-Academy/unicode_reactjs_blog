/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

const LinkBehavior = forwardRef(function Link(props, ref) {
  return <RouterLink ref={ref} to={props.to} {...props} role={undefined} />;
});

export default LinkBehavior;
