import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
const LinkBehavior = forwardRef(function Link(props, ref) {
  return <RouterLink ref={ref} to={props.to} {...props} role={undefined} />;
});

LinkBehavior.propTypes = {
  to: PropTypes.string,
};

export default LinkBehavior;
