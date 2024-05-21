import React from 'react';
import NutritionPlan from './NutritionPlan';
import WorkoutPlan from './WorkoutPlan';

function ResultDisplay({workout, nutrition}){
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return(
        <div>
            <h2>Here is the generated workout and nutrition plan for your preferences</h2>
            <div>
                <NutritionPlan nutrition={nutrition}/>
            </div>
            <div>
                <WorkoutPlan workout={workout}/>
            </div>
        </div>
    )
}

export default ResultDisplay;