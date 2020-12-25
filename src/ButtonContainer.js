import React from 'react';

function ButtonContainer(props) {
    return (
        <div className={`button-container`}>
            <p className="button account-active"></p>
            <span>
                <button onClick={props.all} className={`button all-button ${props.activeButton === 'all' && 'current'}`}>All</button>
                <button onClick={props.active} className={`button active-button ${props.activeButton === 'active' && 'current'}`}>Active</button>
                <button onClick={props.completed} className={`button completed-button ${props.activeButton === 'completed' && 'current'}`}>Completed</button>
            </span>
            <button onClick={props.clearComplered} className='button clear-complered'>Clear complered</button>
        </div>
    );
}

export default ButtonContainer; 