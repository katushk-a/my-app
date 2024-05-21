import React from 'react';

function PreferencesFormPart({getPreferences, preferences, options, handleInnerStateChange, handleChange, handleCheckboxChange}){
    const handleSubmit = async (event) => {
        event.preventDefault();
        await getPreferences(event);
        handleInnerStateChange(2);
    }
    return(
        <div>
            <h2>Now we would like to know more about your preferences, so that Our Personalized workouts help You to meet them.</h2>
            <h3>Please fill in the following information</h3>
            <form onSubmit={handleSubmit}>
            <div>
                    <label>
                        Days per week:
                        <input className='input-field' type="number" name="days_per_week" value={preferences.days_per_week} onChange={handleChange} />
                    </label>
            </div>
            <div>
                    <label>
                        Level:
                        <select className='input-field' name="level" value={preferences.level} onChange={handleChange}>
                            {options.levels.map(level => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                    </label>
            </div>
            <div>
                    <label>
                        Purpose of the workout:
                        <select className='input-field' name="purpose_of_the_workout" value={preferences.purpose_of_the_workout} onChange={handleChange}>
                            {options.purposes.map(purpose => (
                                <option key={purpose} value={purpose}>{purpose}</option>
                            ))}
                        </select>
                    </label>          
            </div>    
            <div>
                    <fieldset>
                        <legend>Equipment</legend>
                        {options.equipmentOptions.map(item => (
                            <label key={item}>
                                <input className='input-field'
                                    type="checkbox"
                                    name="equipment"
                                    value={item}
                                    checked={preferences.equipment.includes(item)}
                                    onChange={handleCheckboxChange}
                                /> {item}
                            </label>
                        ))}
                    </fieldset>
            </div>      
            <button type="submit">Generate Personalized Workout and Nutrition Plan</button>
            <button onClick={() => handleInnerStateChange(0)}>Go Back</button>
            </form>
        </div>
    )
}

export default PreferencesFormPart;