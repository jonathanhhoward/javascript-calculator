import React from 'react';

export default function Key(props) {
  return (
    <button
      className={'Key ' + props.keyData.class}
      id={props.keyData.id}
      onClick={props.onClick}
      type="button"
      value={props.keyData.value}
    >
      {props.keyData.value}
    </button>
  );
}
