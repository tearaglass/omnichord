import React from 'react';
import './Sequencer.css';

function Sequencer({ steps, currentStep, onStepToggle, currentKey }) {
  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  return (
    <div className="sequencer">
      <div className="sequencer-grid">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`sequencer-step ${currentStep === index ? 'current' : ''} ${step ? 'active' : ''}`}
            onClick={() => onStepToggle(index)}
          >
            {step && notes[(notes.indexOf(currentKey) + step - 1) % 7]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sequencer;