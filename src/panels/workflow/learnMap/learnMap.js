import React from 'react';

import { Button } from '@vkontakte/vkui';

import './learnMap.css';

class LearnMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (window.worfkflowScrollY === undefined) {
      console.log('set max scroll');
      window.worfkflowScrollY = document.getElementsByClassName('learnMap')[0].scrollHeight;
    }
    console.log('set scroll 1');
    window.scrollTo(0, window.worfkflowScrollY);
  }

  componentWillUnmount() {
    console.log('set scroll 3');
    window.worfkflowScrollY = window.scrollY;
  }

  render() {
    return (
      <div className="learnMap">
        {/* <div className="learnMap_path" /> */}
        <div className="learnMap__container">
          <div className="learnMap__row">
            <div className="learnMap__col learnMap__points">
              <div className="learnMap__point" />
              <div className="learnMap__point" />
              <div className="learnMap__point" />
            </div>
          </div>
          <div className="learnMap__row">
            <div className="learnMap__col learnMap__col_start_1 learnMap__col_end_2">
              <Button className="learnMap__buttom">pos1</Button>
            </div>
          </div>
          <div className="learnMap__row">
            <div className="learnMap__col learnMap__col_pos_2 learnMap__points">
              <div className="learnMap__point" />
              <div className="learnMap__point" />
              <div className="learnMap__point" />
            </div>
          </div>
          <div className="learnMap__row">
            <div className="learnMap__col learnMap__col_start_2 learnMap__col_end_3">
              <Button className="learnMap__buttom">pos2</Button>
            </div>
          </div>
          <div className="learnMap__row">
            <div className="learnMap__col learnMap__col_pos_3 learnMap__points">
              <div className="learnMap__point" />
              <div className="learnMap__point" />
              <div className="learnMap__point" />
            </div>
          </div>
          <div className="learnMap__row">
            <div className="learnMap__col learnMap__col_start_3 learnMap__col_end_4">
              <Button className="learnMap__buttom">pos3</Button>
            </div>
          </div>
          <div className="learnMap__row">
            <div className="learnMap__col learnMap__col_pos_4 learnMap__points">
              <div className="learnMap__point" />
              <div className="learnMap__point" />
              <div className="learnMap__point" />
            </div>
          </div>
          <div className="learnMap__row">
            <div className="learnMap__col learnMap__col_start_4 learnMap__col_end_5">
              <Button className="learnMap__buttom">pos4</Button>
            </div>
          </div>
          <div className="learnMap__row">
            <div className="learnMap__col learnMap__col_pos_5 learnMap__points">
              <div className="learnMap__point" />
              <div className="learnMap__point" />
              <div className="learnMap__point" />
            </div>
          </div>
          <div className="learnMap__separator">
            <div className="separator__text">Basic</div>
            <div className="separator__line">
              <hr />
            </div>
          </div>
          {/*
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
          */}
        </div>
      </div>
    );
  }
}

export default LearnMap;
