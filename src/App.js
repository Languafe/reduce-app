import React from 'react';
import './App.css';

class App extends React.Component {

  state = {
    items: [],
    stats: {},
    name: ''
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: this.state.items.length + 1,
      name: this.state.name
    };
    const items = [...this.state.items, newItem];
    const stats = items.reduce((previousValue, currentValue, currentIndex, items) => {
      previousValue[currentValue.name] 
        ? previousValue[currentValue.name]++
        : previousValue[currentValue.name] = 1
      return previousValue;
    }, {});
    this.setState({ items, stats, name: '' });
  }

  render() {
    return (
      <div className="App">
        <h1>reduce-app</h1>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <input autoFocus type="text" name="name" value={this.state.name} placeholder="name something..." onChange={this.handleChange} />
          <button type="submit">Save</button>
        </form>
        <hr />
        <h2>Items</h2>
        <ul>
          {this.state.items.map(item => 
            <li key={item.id}>{item.name}</li>
          )}
        </ul>
        <hr />
        <h2>Stats</h2>
        <table>
          <thead>
            <tr>
              <th>Word</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.stats).map((name, i) =>
              <tr key={i}>
                <td>{name}</td>
                <td>{this.state.stats[name]}</td>
              </tr>  
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
