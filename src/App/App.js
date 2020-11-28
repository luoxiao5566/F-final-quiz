import React, { Component } from 'react';
import GroupDetail from '../components/GroupDetail/GroupDetail';
import StudentsDetail from '../components/StudentsDetail/StudentsDetail';
import Trainer from '../components/trainer/TrainerDetail';
class App extends Component {
  render() {
    return (
      <div data-testid="app" className="App">
        <GroupDetail />
        <Trainer />
        <StudentsDetail />
      </div>
    );
  }
}

export default App;
