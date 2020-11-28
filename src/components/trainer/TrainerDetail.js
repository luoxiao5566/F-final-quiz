import React, { Component } from 'react';

class TrainerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      visible: true,
      students: [],
    };
  }

  async componentDidMount() {
    this.getStudent();
  }

  async getStudent() {
    try {
      const data = await fetch('http://localhost:8080/trainers?grouped=false', {
        method: 'GET',
        mode: 'cors',
      });
      const result = await data.json();
      console.log(JSON.stringify(result));
      this.setState({ students: result });
    } catch (err) {
      console.log(err);
    }
  }

  handleChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleKeyDown = async (event) => {
    if (event.keyCode === 13) {
      await this.handleAddStudent();
      this.getStudent();
      this.setState({
        name: '',
        visible: true,
      });
    }
  };

  handleOnClick = () => {
    this.setState({
      visible: false,
    });
  };

  async handleAddStudent() {
    try {
      const data = await fetch('http://localhost:8080/trainers', {
        method: 'POST',
        body: JSON.stringify({name:this.state.name}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await data.json();
      console.log(JSON.stringify(result));
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="studentDetail">
        <h2>老师列表</h2>
        <div className="student">
          {this.state.students.map((item) => (
            <div key={item.id}>
              {item.id}.{item.name}
            </div>
          ))}
        </div>
        <button type="button" onClick={this.handleOnClick}>
          +添加老师
        </button>
        <input
          className="input"
          type="text"
          onChange={this.handleChange}
          value={this.state.name}
          placeholder="输入姓名按回车键添加"
          onKeyDown={this.handleKeyDown}
          hidden={this.state.visible}
        />
      </div>
    );
  }
}

export default TrainerDetail;
