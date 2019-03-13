import React from 'react';
import PropTypes from 'prop-types';

import LearningMapRow from './__Row/LearningMap__Row';
import LearningMapSeparator from './__Separator/LearningMap__Separator';
import LearningMapPoints from './__Points/LearningMap__Points';
import LearningMapSubsection from './__Subsection/LearningMap__Subsection';

import './LearningMap.scss';

/**
 * LearningMap block with sections and their subsections of learning workflow
 */
class LearningMap extends React.Component {
  componentDidMount() {
    if (window.worfkflowScrollY === undefined) {
      window.worfkflowScrollY = document.getElementsByClassName('learningMap')[0].scrollHeight;
    }
    window.scrollTo(0, window.worfkflowScrollY);
  }

  componentWillUnmount() {
    window.worfkflowScrollY = window.scrollY;
  }

  /**
   * render
   * @return {ReactElement} Sections rows with their subsection buttons and separators
   */
  render() {
    return (
      <div className="learningMap">
        <div className="learningMap__container">
          <LearningMapRow>
            <LearningMapSubsection
              id="4"
              name="Programming"
              start="1"
              end="2"
              onSelectSubsection={this.props.onSelectSubsection}
            />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapPoints position="2" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapSubsection
              id="3"
              name="Algebra of logic"
              start="2"
              end="3"
              onSelectSubsection={this.props.onSelectSubsection}
            />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapPoints position="3" />
          </LearningMapRow>
          <LearningMapSeparator name="Intermediate" />
          <LearningMapRow>
            <LearningMapPoints position="3" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapSubsection
              id="2"
              name="Internet and URLs"
              start="3"
              end="4"
              onSelectSubsection={this.props.onSelectSubsection}
            />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapPoints position="4" />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapSubsection
              id="1"
              name="File system"
              start="4"
              end="5"
              isActive
              isCurrent
              onSelectSubsection={this.props.onSelectSubsection}
            />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapPoints position="4" isActive />
          </LearningMapRow>
          <LearningMapRow>
            <LearningMapSubsection
              id="0"
              name="Numeric system"
              start="3"
              end="4"
              isActive
              isCompleted
              onSelectSubsection={this.props.onSelectSubsection}
            />
          </LearningMapRow>
          <LearningMapSeparator name="Basic" isActive />
        </div>
      </div>
    );
  }
}

LearningMap.propTypes = {
  /* Description of prop "onSelectSubsection". */
  onSelectSubsection: PropTypes.func,
};

LearningMap.defaultProps = {
  onSelectSubsection: () => null,
};

export default LearningMap;
