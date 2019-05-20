import React, { Component } from 'react';
import './FilterButton.scss';

class FilterButton extends Component {

    render() {
        const props = this.props;
        let className = "button-filter";
        if (props.active) className += ' active';
        return (
            <button className={className} onClick={props.handleButtonClick}>
                {props.title}
            </button>
        );
    }
}

export default FilterButton;