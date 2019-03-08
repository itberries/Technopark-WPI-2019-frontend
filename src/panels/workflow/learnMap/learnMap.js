import React from 'react';
import './learnMap.css';

import { Button, Div } from '@vkontakte/vkui';

import Rocket from '../../../common.blocks/rocket/Rocket';

class LearnMap extends React.Component {
  componentDidMount() {
    const learnMap = document.getElementsByClassName('learnMap')[0];
    learnMap.scrollTop = learnMap.scrollHeight;
  }

  render() {
    return (
      <div className="learnMap">
        <div className="learnMap_path" />
        <Div className="learnMap_url">
          <Button>Url</Button>
        </Div>
        <Div className="learnMap_file_system">
          <Button>Файловая система</Button>
        </Div>
        <Div className="learnMap_logic_algebra">
          <Button>Алгебра логики</Button>
        </Div>
        <Div className="learnMap_number_systems">
          <Button>Системы счисления</Button>
        </Div>
        <Rocket />
      </div>
    );
  }
}

export default LearnMap;
