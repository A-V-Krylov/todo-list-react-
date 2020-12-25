import React from 'react';

function Note(props) {

    return (
        <div className="notes-container">
            <span >
                <input 
                    type="checkbox"
                    checked={props.check} onChange={() => props.onChange(props.id)}
                    id={`chk${props.x}`} name="chkdemo"></input>
                <label className="check" id={props.id} htmlFor={`chk${props.x}`}></label>
            </span>

            <label className="text">{props.text}</label>
            <i className="button delete-button fa fa-times" onClick={() => props.onClick(props.id)} ></i>
        </div>
    );
}

export default Note;