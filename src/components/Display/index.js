import React from 'react';
import './style.scss';

export function Display({ expression, input }) {
  return (
    <div className="Display">
      <div className="Expression">{expression}</div>
      <div id="display" className="Input">
        {input}
      </div>
    </div>
  );
}
