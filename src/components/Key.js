import React from 'react'

export default function Key (props) {
  const { obj, onClick } = props

  return (
    <button
      className={'Key ' + obj.class}
      id={obj.id}
      onClick={onClick}
      type="button"
      value={obj.value}
    >
      {obj.value}
    </button>
  )
}
