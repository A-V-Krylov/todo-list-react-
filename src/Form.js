import React, { useState, useEffect } from 'react';
import Note from './Note.js';
import ButtonContainer from './ButtonContainer.js'



function Form() {


    const [notes, setNotes] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        getTodos();
    }, []);

    useEffect(() => {
        filterNotes(filter);
    }, [filter]);

    const getTodos = () => {
        try {
            if (localStorage.getItem('todo')) {
                setNotes(JSON.parse(localStorage.getItem('todo')));
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }

    const addNote = (event) => {
        event.preventDefault();
        if (inputValue.trim().length > 0) {
            // let todoList;
            // notes ? todoList = [...notes] :  todoList = [];
            let todoList = (notes && [...notes]) || [];
            let allNotes = { text: inputValue, check: false, id: Math.ceil(Math.random() * 10000) };
            let i = todoList.length;
            todoList[i] = allNotes;
            localStorage.setItem('todo', JSON.stringify(todoList));
            setNotes(todoList);
            setInputValue('');
        } 
    }

    const onCheckChange = (id) => {
        let todoList = JSON.parse(localStorage.getItem('todo'));
        const index = todoList.findIndex(el => el.id === id);
        todoList[index].check = !todoList[index].check;
        localStorage.setItem('todo', JSON.stringify(todoList));
        setNotes(todoList);
        filterNotes(filter);
    }

    const onDelete = (id) => {
        let todoList = JSON.parse(localStorage.getItem('todo'));
        const index = todoList.findIndex(el => el.id === id);
        todoList.splice(index, 1);
        localStorage.setItem('todo', JSON.stringify(todoList));
        setNotes(todoList);
    }

    const onDeleteAll = () => {
        let todoList = JSON.parse(localStorage.getItem('todo'));
        todoList = todoList.filter((el) => {
            return el.check === false;
        });
        localStorage.setItem('todo', JSON.stringify(todoList));
        filterNotes(filter);
    }

    const crossOutAllNotes = () => {
        let todoList = JSON.parse(localStorage.getItem('todo'));
        todoList.map((obj) => {
            return obj.check = true;
        });
        localStorage.setItem('todo', JSON.stringify(todoList));
        setNotes(todoList);
    }

    const onAllNotes = () => {
        setFilter('all');
    }

    const onActiveNotes = () => {
        setFilter('active');
    }

    const onCompletedNotes = () => {
        setFilter('completed');
    }

    const filterNotes = (el) => {
        let todoList = JSON.parse(localStorage.getItem('todo'));

        if (el === 'all') {
            setNotes(todoList);
        }
        else if (el === 'active') {
            let activeNotes = todoList.filter((el) => {
                return el.check === false;
            });
            setNotes(activeNotes);
        }
        else if (el === 'completed') {
            let completedNotes = todoList.filter((el) => {
                return el.check === true;
            });
            setNotes(completedNotes);
        }
    }
    

    return (
        <>
            <form className="form-container">
                <div className="input-container">
                    <i className="fa fa-angle-down" onClick={crossOutAllNotes}></i>
                    <input className="input" placeholder="What needs to be done?" onChange={handleChange} value={inputValue} />
                    <button className="button add-button" onClick={addNote} type="submit">add</button>
                </div>
                <div className="list-notes all-notes">
                    {notes && notes.map((item, i) => (
                        <Note key={item.id} check={item.check} x={i} id={item.id} text={item.text} onChange={onCheckChange} onClick={onDelete} />
                    ))}
                </div>
            </form>
            <ButtonContainer activeButton={filter} all={onAllNotes} active={onActiveNotes} completed={onCompletedNotes} clearComplered={onDeleteAll}/>
        </>
    )
}
export default Form;


  
  