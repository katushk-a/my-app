import React from 'react';

function StartView({handleStateChange, settingName}){
    const handleSubmit = (event) => {
        event.preventDefault();
        if (event.target.name.value.trim()) { 
            handleStateChange(1);
        } else {
            alert('Please enter a valid name.'); // Alert if name is empty or only spaces
        }
    }
    return(
        <div class="centered-component">
            <h2>Hello, new visitor! How do you want us to call you?</h2>
            <form onSubmit={handleSubmit}>
                <input className='input-field' type="text" name="name" 
                placeholder='type your name...' onChange={(event) => settingName(event.target.value)} />
                <button type="submit">That is my name!</button>
            </form>
        </div>
    )
}

export default StartView;