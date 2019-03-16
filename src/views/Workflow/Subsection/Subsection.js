import React from 'react';
import PropTypes from 'prop-types';
import { Div } from '@vkontakte/vkui';
import SubsectionBlock from './__Block/Subsection__Block';
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
          isCompleted: true,
        },
        {
          type: 'theory',
          name: 'Theory part two',
          isCompleted: true,
        },
        {
          type: 'interactive',
          name: 'Interactive task 1',
          isCompleted: false,
        },
        {
          type: 'interactive',
          name: 'Interactive task 2',
          isCompleted: false,
        },
        {
          type: 'theory',
          name: 'Theory part three',
          isCompleted: false,
        },
        {
          type: 'training',
          name: 'Training task 1',
          isCompleted: false,
        },
        {
          type: 'training',
          name: 'Training task 2',
          isCompleted: false,
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
      <Div className="subsection">
        <Div className="subsection__container">
          {this.state.blocks.map((block, index) => (
            <SubsectionBlock
              key={block.name}
              withSeparator={index !== this.state.blocks.length - 1}
              type={block.type}
              isCompleted={block.isCompleted}
              onSelectStep={this.props.onSelectStep}
              id={index}
            >
              {block.name}
            </SubsectionBlock>
          ))}
        </Div>
      </Div>
    );
  }
}

Subsection.propTypes = {
  onSelectStep: PropTypes.func.isRequired,
};

export default Subsection;
