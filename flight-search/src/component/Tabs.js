import React from 'react';
import PropTypes from "prop-types";
const Tabs = (props) => (
    <div id={props.id} className={`tabs ${props.isTabActive? 'active' : ""}`} onClick={props.onClick}>{props.text}</div>
);
Tabs.propTypes = {
    id: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string
};
export default Tabs;