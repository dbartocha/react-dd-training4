import React, {useState} from 'react';
import Card from '../UI/Card';
import classes from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

 const AddUser = (props) => {
    const [enteredUserName, setEnteredUserName] = useState('');
    const [enteredUserAge, setEnteredUserAge] = useState('');
    const [error, setError] = useState();
    const addUserHandler = (event) => {
        event.preventDefault();
        if(enteredUserName.trim().length === 0 || enteredUserAge.trim().length ===0){
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            }
            )
            return;
        }
        if (+enteredUserAge <= 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid age (> 0).'
            }
            )
            return;
        }
        props.onAddUser(enteredUserName, enteredUserAge);
        setEnteredUserName('');
        setEnteredUserAge('');
    }
    const userNameChangeHandler = (event) => {
        setEnteredUserName(event.target.value);
    }
    const userAgeChangeHandler = (event) => {
        setEnteredUserAge(event.target.value);
    }

    const errorHandler = () => {
        setError(null);
    }

    return (
        <div>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={enteredUserName} onChange={userNameChangeHandler}/>
                    <label htmlFor="age">Age</label>
                    <input id="age" type="text" value={enteredUserAge} onChange={userAgeChangeHandler}/>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </div>
    )

};

export default AddUser;