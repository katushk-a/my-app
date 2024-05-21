import React from 'react';

function IntroView({handleStateChange, name}){
    const handleSubmit = (event) => {
        event.preventDefault();
        handleStateChange(parseInt(event.target.value));
    }
    return(
        <div className="centered-component-dark">
            <h2>Hello, {name}! Now, it's time to make a perfect workout plan for you!</h2>
            <form>
               <button className='white-button' onClick={handleSubmit} value='2' >
                    Create Personalized Plan
                </button>
               <button  className='white-button' onClick={handleSubmit} value='3' >
                    Look at History of Generated Plans
                </button>
            </form>
        </div>
    )
}

export default IntroView;