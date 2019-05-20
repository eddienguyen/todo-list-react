import React from 'react';
import './App.scss';
import TodoItem from './components/TodoItem/TodoItem';
import FilterButton from './components/FilterButton/FilterButton';

const FILTER_VALUE = {
  all: 'all',
  active: 'active',
  completed: 'completed',
}



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      currentFilter: FILTER_VALUE.all, // 'all', 'active' , 'completed'
      todoItems: [
        {
          "title": "filter all - active - completed on footer",
          isCompleted: true
        },
        {
          "title": "remove to do item when click on 'x' button",
          isCompleted: true
        },
        {
          "title": "clear all completed items",
          isCompleted: true
        },
      ]
    }

    this.onItemClick = this.onItemClick.bind(this); // context : https://www.youtube.com/watch?v=rYe1KJBG8-w&list=PLkY6Xj8Sg8-vV5kALCOT0LShKc6mVFBvW&index=14&pbjreload=10
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onNewTodoChange = this.onNewTodoChange.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.onFilterButtonClicked = this.onFilterButtonClicked.bind(this);
    this.handleClearAllCompletedItem = this.handleClearAllCompletedItem.bind(this);
    this.clearItem = this.clearItem.bind(this);
  };

  onKeyUp(event) {

    /// when press enter(keyCode == 13)
    if (event.keyCode === 13) {
      const text = event.target.value;
      if (!text || text.trim() === '') {
        return;
      }
      this.setState(({
        todoItems: [
          ...this.state.todoItems,
          {
            "title": text.trim(),
            isCompleted: false
          }
        ],
        newItem: ''
      }));
      // event.target.value = ""; ///khi dùng React thì hạn chế tối đa việc gọi DOM API trực tiếp.
    }
  }

  onNewTodoChange(event) {
    this.setState(({
      newItem: event.target.value
    }));
  }

  toggleAll() {
    this.setState(({
      todoItems: this.state.todoItems.filter((item) => item.isCompleted = true),
    }));
  }

  onFilterButtonClicked(newValue) {
    return (event) => {
      this.setState(({
        currentFilter: newValue
      }));
    }
  }

  handleClearAllCompletedItem() {
    const uncompletedItems = this.state.todoItems.filter((item) => item.isCompleted === false);
    this.setState(({
      todoItems: uncompletedItems
    }));
  }

  clearItem(item) {
    return (event) => {
      console.log(event);
      let newItems = [...this.state.todoItems];
      let index = newItems.indexOf(item);
      if (index !== -1) {
        newItems.splice(index, 1);
        this.setState(({
          todoItems: newItems
        }));
      }
    }
  }

  onItemClick(item) {
    return (event) => {
      // console.log(item);
      const isCompleted = item.isCompleted;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState(({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isCompleted: !isCompleted,
          },
          ...todoItems.slice(index + 1),
        ]
        //   todoItems: this.state.todoItems.filter((item, index) => {
        //     if (index === item) {
        //       item.isCompleted = !item.isCompleted;
        //       return item;
        //     } else {
        //       return item;
        //     }
        //   });
      }));
    };

  }
  render() {
    let { newItem, currentFilter } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">todos</h2>
          <input className="new-todo" placeholder="What needs to be done ?" onKeyUp={this.onKeyUp} value={newItem} onChange={this.onNewTodoChange} />
        </header>
        {
          // filter here
          this.state.todoItems.length > 0 &&
          <>
            <section className="main">
              <input id="toggle-all" className="toggle-all" onClick={this.toggleAll} />
              <label htmlFor="toggle-all">
              </label>
              <ul className="todo-list">
                {this.state.currentFilter === FILTER_VALUE.all
                  ?
                  this.state.todoItems.map((todoItem, index) =>
                    <TodoItem
                      key={index}
                      item={todoItem}
                      onItemClick={this.onItemClick(todoItem)}
                      onClearItem={this.clearItem(todoItem)}
                    />
                  )
                  : this.state.todoItems.filter(function (todoItem) {
                    let active = currentFilter === FILTER_VALUE.completed;
                    return todoItem.isCompleted === active;
                  }
                  ).map((todoItem, index) =>
                    <TodoItem
                      key={index}
                      item={todoItem}
                      onItemClick={this.onItemClick(todoItem)}
                      onClearItem={this.clearItem(todoItem)}
                    />
                  )
                }

              </ul>
            </section>
            <footer className="App-footer">
              <div>
                Todo: {this.state.todoItems.filter((item) => item.isCompleted === false).length} left
              </div>
              <div className="filter-wrap">
                <FilterButton title="All" active={this.state.currentFilter === FILTER_VALUE.all} handleButtonClick={this.onFilterButtonClicked(FILTER_VALUE.all)} />
                <FilterButton title="Active" active={this.state.currentFilter === FILTER_VALUE.active} handleButtonClick={this.onFilterButtonClicked(FILTER_VALUE.active)} />
                <FilterButton title="Completed" active={this.state.currentFilter === FILTER_VALUE.completed} handleButtonClick={this.onFilterButtonClicked(FILTER_VALUE.completed)} />
              </div>
              <div className="filter-wrap">
                <button onClick={this.handleClearAllCompletedItem} className="button-clear-uncompleted"> Clear completed</button>
              </div>
            </footer>
          </>
        }
      </div>
    );
  }
}

export default App;
