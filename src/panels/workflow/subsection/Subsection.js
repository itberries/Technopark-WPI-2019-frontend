import React from 'react';
import { Div } from '@vkontakte/vkui';
import SubsectionBlock from './__block/SubsectionBlock';
import './Subsection.scss';

/**
 * Subsection component for learning workflow
 */
class Subsection extends React.Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    /**
     * @type {object}
     * @property {array[object]} blocks Array of subsection's blocks
     */
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
  }

  /**
   * render
   * @return {ReactElement} markup with list of blocks in subsection container
   */
  render() {
    return (
      <Div className="subsection__container">
        {this.state.blocks.map((block, index) => (
          <SubsectionBlock
            key={block.name}
            withSeparator={index !== this.state.blocks.length - 1}
            type={block.type}
          >
            {block.name}
          </SubsectionBlock>
        ))}
      </Div>
    );
  }
}

export default Subsection;
