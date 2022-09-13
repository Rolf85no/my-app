import React from "react";

export default function Navbar(props) {
    return (
        <nav className="navbar">
            <label htmlFor="bpmInput"><h3>bpm:</h3></label>
            <input
                type="range"
                min="50"
                max="250"
                defaultValue="120"
                className="bpmInput"
                name="bpmInput"
                onChange={props.handleChange}
            ></input>
            <h3 className="bpmInput--value"> 120</h3>
        </nav>
    )
}