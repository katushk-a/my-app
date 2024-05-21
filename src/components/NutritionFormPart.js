import React from 'react';

function NutritionFormPart({preferences, handleInnerStateChange, handleChange}){
    const handleSubmit = (event) => {
        event.preventDefault();
        handleInnerStateChange(1);
    }
    return(
        <div>
            <h2>At first we would like to know a little of your personal Information. It is needed to generate more Personalized Workout plans and Nutrition Plans.</h2>
            <h3>Please fill in the following information</h3>
            <form onSubmit={handleSubmit}>
            <div>
            <label>
                    Enter Your Gender:
                    <select className='input-field' name="gender" value={preferences.gender} onChange={handleChange}>
                        <option key='female' value='female'>Female</option>
                        <option key='male' value='male'>Male</option>
                    </select>
            </label>
            </div>
            <div>
                <label>
                    Enter Your Age:
                    <input className='input-field' type="number" name="age" value={preferences.age} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Enter Your Height:
                    <input className='input-field' type="number" name="height" value={preferences.height} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Enter Your Weight:
                    <input className='input-field' type="number" name="weight" value={preferences.weight} onChange={handleChange} />
                </label>
            </div>
            <button type="submit">Next</button>
            </form>
        </div>
    )
}

export default NutritionFormPart;