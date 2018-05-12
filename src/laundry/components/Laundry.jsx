import { Route } from 'react-router-dom';
import Player from './Player';
import Timeline from './Timeline';

export default function Laundry() {
  return (
    <div>
      <Route path="/mai/:nickname/timeline" component={Timeline} />
      <Route exact path="/mai/:nickname" component={Player} />
    </div>
  );
}
