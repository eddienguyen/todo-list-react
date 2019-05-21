import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TodoItem.scss';

class TodoItem extends Component {

    onEdit() {
        console.log(this);
    }

    render() {
        const { item, onItemClick } = this.props; // javascript destructuring
        let className = "todo-item";
        if (item.isCompleted) {
            className += " todo-item--complete"
        }
        return (
            <li className={className}>
                <div>
                    <input className="toggle" type="checkbox" checked={item.isCompleted} onChange={onItemClick} />
                    <label>{item.title}</label>
                    <button className="destroy" onClick={this.props.onClearItem}></button>
                </div>
                <input className="edit" value={item.title} onChange={this.onEdit} />
            </li>
        );
    }
}

TodoItem.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
    }),
    onItemClick: PropTypes.func
}

export default TodoItem;