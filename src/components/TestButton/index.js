import React from 'react';
import './index.css';

export default function Button(props) {
    return (
        <button style={{ color: 'red' }} className="btn-style">{props.name}</button>
    )
}