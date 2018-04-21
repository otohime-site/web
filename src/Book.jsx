import { Component } from 'react';
import parser from 'semiquaver-parser/laundry';
import './Book.css';

export default class Book extends Component {
  state = {
    progress: 0,
  };

  handleUpdate = async () => {
    try {
      const result = await parser(this.handleProgress); // eslint-disable-line no-unused-vars
    } catch (e) {
      alert('Error!'); // eslint-disable-line no-alert
    }
  };

  handleProgress = async (progress) => {
    this.setState({ progress });
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  render() {
    return (
      <div className="Book">
        <h3>Updater</h3>
        <p>
          <button onClick={this.handleUpdate}>Update</button>
          <progress value={this.state.progress} max="100" />
        </p>
      </div>
    );
  }
}
