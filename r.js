import React, {useState, useEffect} from 'react';
import Notes from './Notes.js'


/*
localStorage.setItem(key, value) – сохранить пару ключ/значение.
localStorage.getItem(key) – получить данные по ключу key.
localStorage.removeItem(key) – удалить данные с ключом key.
localStorage.clear() – удалить всё.
localStorage.key(index) – получить ключ на заданной позиции.
localStorage.length – количество элементов в хранилище.
JSON.parse(localStorage.getItem('todo')); - получить 
localStorage.setItem('todo', JSON.stringify(todoList)); - сохранить
*/

function Form() {

    const [notes, setNotes] = useState([]);
    const [inputValue, setInputValue] = useState('');
    
    function getTodos() {
        try {
            setNotes(JSON.parse(localStorage.getItem('todo')));
        } catch(err) {
            console.log(err);
        }
    }
   
    useEffect(() => {
        getTodos();
    }, []);

    function handleChange(event) {
        setInputValue(event.target.value);
      }

    function addNote(event) {
        event.preventDefault();
        if (inputValue.trim().length > 0) {
        let todoList = [...notes];  /// why this way?

        let allNotes = {};
             allNotes.text = inputValue;
             allNotes.check = false;
             allNotes.id = Math.ceil(Math.random() * 10000);
             let i = todoList.length;
             todoList[i] = allNotes;

        localStorage.setItem('todo', JSON.stringify(todoList));
        setNotes(todoList);
    }
        /* const input = document.querySelector('.input');
         if (input.value.trim().length > 0) {
             let allNotes = {};
             allNotes.text = input.value;
             allNotes.check = false;
             allNotes.id = Math.ceil(Math.random() * 10000);
             let todoList;
             !localStorage.length ? todoList = [] : todoList = JSON.parse(localStorage.getItem('todo'));
             let i = todoList.length;
             todoList[i] = allNotes;
             localStorage.setItem('todo', JSON.stringify(todoList));
            
             input.value = '';
         } */
    }

    return (
        <form className="form-container">
            <div className="input-container">
                <input className="input" placeholder="What needs to be done?" onChange={handleChange}/>
                <button className="button add-button" onClick={addNote} type="submit">add</button>
            </div>
            <div className="list-notes all-notes">
                {notes && notes.map((item, i) => (
                    <Notes key={item.id} check={item.check} x={i} id={item.id} text={item.text} />
                ))}
            </div>

            <div className="button-container">
                <p className="button account-active"></p>
                <span>
                    <button className='button all-button current'>All</button>
                    <button className='button active-button'>Active</button>
                    <button className='button completed-button'>Completed</button>
                </span>
                <button className='button clear-complered'>Clear complered</button>
            </div>
        </form>
    )
}

export default Form;




/*-----------------------------------------------------------------------------------------------*/

import React from 'react';  
 
function Notes(props) {

    function crossOut(event) {
        let todoList = JSON.parse(localStorage.getItem('todo'));
        const index = todoList.findIndex(el => el.id == event.target.id);
        todoList[index].check = !todoList[index].check;  
        localStorage.setItem('todo', JSON.stringify(todoList));
    }

    function classCrossOut(event) {
        event.target.classList.toggle('checked');
    }

    

    return (
        <div className="notes-container">
            <input onClick={classCrossOut} type="checkbox"  className={`checkbox ${props.check ? 'checked' : ''}`} id={`chk${props.x}`} name="chkdemo"></input>
            <label onClick={crossOut} className="check" id={props.id} htmlFor={`chk${props.x}`}></label>
            <label className="text">{props.text}</label>
            <i className="button delete-button fa fa-times" aria-hidden="true" ></i>
        </div>
    );
}

export default Notes;