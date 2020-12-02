import React, { Component } from 'react';
// TODO GTB-工程实践: - 针对整个文件，console.log不应该被提交上来
// TODO GTB-工程实践: - GroupDetail这个组件的名字不合理，叫GroupList更合适一些
class GroupDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
  }

  async componentDidMount() {
    try {
      // TODO GTB-工程实践: - API请求应该被提取到一个独立的文件
      const data = await fetch('http://localhost:8080/groups', {
        method: 'GET',
        mode: 'cors',
      });
      const result = await data.json();
      console.log(JSON.stringify(result));
      this.setState({ groups: result });
    } catch (err) {
      console.log(err);
    }
  }

  async getGroups() {
    try {
      // TODO GTB-工程实践: - API请求应该被提取到一个独立的文件
      const data = await fetch('http://localhost:8080/groups/auto-grouping', {
        method: 'POST',
        mode: 'cors',
      });
      const result = await data.json();
      console.log(JSON.stringify(result));
      this.setState({ groups: result });
      // TODO GTB-知识点: - 语法错误，废弃的方法
      location.reload(true);
    } catch (err) {
      console.log(err);
    }
  }
// TODO GTB-知识点: - 组件划分不合理，应该在划分出一个Group组件
  render() {
    return (
        // TODO GTB-知识点: - 没有使用语义化的标签section
        <div className="Group">
        <h2>分组列表</h2>
        <button type="button" onClick={this.getGroups.bind(this)}>
          分组学员
        </button>
        <div hidden={this.state.groups.length === 0}>
          {/* // TODO feedback: 列表元素没有使用ul li */}
          {this.state.groups.map((obj) => (
            <div key={obj.id}>
              <div>
                <div>{obj.name}</div>
                <div>
                  {/* // TODO feedback: 列表元素没有使用ul li */}
                  {obj.trainers.map((item) => (
                    <div key={item.id}>
                      {item.id}.{item.name}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                {/* // TODO feedback: 列表元素没有使用ul li */}
                {obj.trainees && obj.trainees.map((item) => (
                  <div key={item.id}>
                    {item.id}.{item.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default GroupDetail;
