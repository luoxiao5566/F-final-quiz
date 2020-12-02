import React, { Component } from 'react';

// TODO GTB-工程实践: - 针对整个文件，console.log不应该被提交上来
// TODO GTB-工程实践: - TrainerDetail这个组件的名字不合理，叫Trainers更合适一些
class TrainerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      visible: true,
      // TODO GTB-工程实践: - 变量命名不合理，没有提现业务逻辑
      students: [],
    };
  }

  async componentDidMount() {
    this.getStudent();
  }

  async getStudent() {
    try {
      // TODO GTB-工程实践: - API相关的代码应该被提取到一个独立的文件
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
    // TODO GTB-完成度: - 针对于input的hidden： 需求上是时候要添加学员的button和input互斥地出现，不是input自己shown和hidden
    // TODO GTB-知识点: - 针对input的onKeyDown: 使用onKeyUp更合理
    return (
        // TODO GTB-知识点: - 没有使用语义化的标签section
        <div className="studentDetail">
        <h2>老师列表</h2>
        <div className="student">
          {/* // TODO feedback: 列表元素没有使用ul li */}
          {this.state.students.map((item) => (
            <div key={item.id}>
              {item.id}.{item.name}
            </div>
          ))}
        </div>
        {/*  // TODO GTB-知识点: - 添加的功能，和学生列表高度重复，应该抽取组件 */}
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
