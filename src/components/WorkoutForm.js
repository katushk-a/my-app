import React, { useState, useEffect } from 'react';
import NutritionFormPart from './NutritionFormPart';
import PreferencesFormPart from './PreferencesFormPart';
import ResultDisplay from './ResultDisplay';

function WorkoutForm({username, handleStateChange}) {
    const [preferences, setPreferences] = useState({
        days_per_week: 3,
        purpose_of_the_workout: '',
        level: '',
        equipment: [],
        age: 18,
        height: 170,
        weight: 60,
        gender: 'female'
    });
    const [options, setOptions] = useState({
        levels: [],
        purposes: [],
        equipmentOptions: []
    });
    const [workoutPlan, setWorkoutPlan] = useState({});

    const [nutritionPlan, setNutritionPlan] = useState({});

    const [innerState, setInnerState] = useState(0);

    const [workoutPlanUpdated, setWorkoutPlanUpdated] = useState(false);
    const [nutritionPlanUpdated, setNutritionPlanUpdated] = useState(false);


    const handleInnerStateChange = (state) => {
        setInnerState(state);
        console.log("inner:");
        console.log(state);
    }

    const fetchOptions = async () => {
        try {
            const response = await fetch('/api/workout/info');  
            const data = await response.json();
            console.log(data);
            setOptions({
                levels: data.levels,
                purposes: data.purposes,
                equipmentOptions: data.equipments
            });
            console.log(options)
            setPreferences({
                level: data.levels[0],
                purpose_of_the_workout: data.purposes[0],
                equipment: [],
                days_per_week: 3,
                age: 18,
                height: 170,
                weight: 60,
                gender: 'female'
            });
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    };

    useEffect(() => {
        fetchOptions();
    }, []); 


    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setPreferences(preferences => {
            const equipment = preferences.equipment;
            if (checked && !equipment.includes(value)) {
                equipment.push(value);
            } else if (!checked) {
                const index = equipment.indexOf(value);
                if (index > -1) {
                    equipment.splice(index, 1);
                }
            }
            return { ...preferences, equipment };
        });
    };

    const handleChange = (event) => {
        if (event.target.name === 'days_per_week' || event.target.name === 'age' || event.target.name === 'height' || event.target.name === 'weight') {
            setPreferences({ ...preferences, [event.target.name]: parseInt(event.target.value) });
        }else{
            setPreferences({...preferences, [event.target.name]: event.target.value});
        }
    };

    const getWorkOut = async() => {
        try {
            console.log(preferences);
            const response = await fetch('/api/workout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(preferences)
            });
            const data = await response.json();
            setWorkoutPlan(data);
            setWorkoutPlanUpdated(true);
            console.log('WORKOUT PLAN');
            console.log(workoutPlan);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getNutrition = async() => {
        try {
            const response = await fetch('/api/nutrition', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(preferences)
            });
            const data = await response.json();
            setNutritionPlan(data);
            setNutritionPlanUpdated(true);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        if (workoutPlanUpdated && nutritionPlanUpdated) {
            savePlanToHistory();
            setWorkoutPlanUpdated(false);
            setNutritionPlanUpdated(false);
        }
    }, [workoutPlanUpdated, nutritionPlanUpdated]);

    const savePlanToHistory = async() => {
        try {
            const dataToSave = {
                user_name: username,
                preferences: preferences,
                workout_plan: workoutPlan,
                nutrition_plan: nutritionPlan
            }
            console.log("data to save");
            console.log(dataToSave);
            const response = await fetch('/api/plans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSave)
            });
    
            if (!response.ok) {
                throw new Error(response.message);
            }
    
            const data = await response.json();
            return data; 
        } catch (error) {
            console.error("Error saving plan history:", error.message);
            throw error; 
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await getWorkOut();
            await getNutrition();
        }catch (error) {
            console.error('Error:', error);
        }
    };

    if(innerState == 0 ){
        return(
            <div className='centered-component'>
                <NutritionFormPart handleInnerStateChange={handleInnerStateChange} 
                                   preferences={preferences} 
                                   handleChange={handleChange}/>
                <div>
                    <button onClick={() => handleStateChange(1)}>Back to main page!</button>
                </div>
            </div>
            
        );
    }
    else if (innerState == 1){
        return(
            <div className='centered-component'>
                <PreferencesFormPart handleInnerStateChange={handleInnerStateChange} 
                                     preferences={preferences} 
                                     handleChange={handleChange}
                                     handleCheckboxChange={handleCheckboxChange}
                                     options={options}
                                     getPreferences = {handleSubmit}/>
                <div>
                    <button onClick={() => handleStateChange(1)}>Back to main page!</button>
                </div>
            </div>
        )
    }else if(innerState == 2){
        return(
            <div className='centered-component-dark-up'>
                <ResultDisplay workout={workoutPlan} nutrition={nutritionPlan}/>
                <div>
                    <button className='white-button' onClick={() => handleStateChange(1)}>Back to main page!</button>
                </div>
            </div>
        )
    }
    else{
        handleStateChange(3);
    }
    
}
export default WorkoutForm;
