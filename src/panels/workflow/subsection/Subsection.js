import React from 'react';

import { Div } from '@vkontakte/vkui';
import SubsectionBlock from './__block/SubsectionBlock';

import './Subsection.scss';

class Subsection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [
        {
          type: 'theory',
          name: 'Theory part one',
        },
        {
          type: 'theory',
          name: 'Theory part two',
        },
        {
          type: 'interactive',
          name: 'Interactive task 1',
        },
        {
          type: 'interactive',
          name: 'Interactive task 2',
        },
        {
          type: 'theory',
          name: 'Theory part three',
        },
        {
          type: 'training',
          name: 'Training task 1',
        },
        {
          type: 'training',
          name: 'Training task 2',
        },
      ],
    };
    console.log('constructor Subsection');
  }

  render() {
    return (
      <Div className="subsection__container">
        {this.state.blocks.map(block => (
          <SubsectionBlock type={block.type}>{block.name}</SubsectionBlock>
        ))}
      </Div>
    );
  }
}

export default Subsection;
