import { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import TodayJournal from '../components/TodayJournal';
import PersonalHistory from '../components/PersonalHistory';
import Friend from '../components/Friend';
import FriendJournal from '../components/FriendJournal';

function MainApp() {
  const [key, setKey] = useState('today');

  return (
    <div className="container mt-3">
      <h1 className="mb-4">Gratitude Journal</h1>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="today" title="Today's Journal">
          <TodayJournal />
        </Tab>
        <Tab eventKey="history" title="History">
          <PersonalHistory />
        </Tab>
        <Tab eventKey="friend" title="Friend">
          <Friend />
        </Tab>
        <Tab eventKey="friendJournal" title="Friend's Journal">
          <FriendJournal />
        </Tab>
      </Tabs>
    </div>
  );
}

export default MainApp;