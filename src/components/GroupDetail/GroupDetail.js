import React, { Component } from 'react';

class GroupDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
  }

  async componentDidMount() {
    try {
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
      const data = await fetch('http://localhost:8080/groups/auto-grouping', {
        method: 'POST',
        mode: 'cors',
      });
      const result = await data.json();
      console.log(JSON.stringify(result));
      this.setState({ groups: result });
      location.reload(true);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="Group">
        <h2>分组列表</h2>
        <button type="button" onClick={this.getGroups.bind(this)}>
          分组学员
        </button>
        <div hidden={this.state.groups.length === 0}>
          {this.state.groups.map((obj) => (
            <div key={obj.id}>
              <div>
                <div>{obj.name}</div>
                <div>
                  {obj.trainers.map((item) => (
                    <div key={item.id}>
                      {item.id}.{item.name}
                    </div>
                  ))}
                </div>
              </div>
              <div>
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
