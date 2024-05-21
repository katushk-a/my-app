import React from 'react';

function NutritionPlan({nutrition}){
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return(
        <div>
            <h3>Calories: {nutrition.calories} kcal</h3>
            <h3>Proteins: {nutrition.protein} g</h3>
            <h3>Fats: {nutrition.fats} g</h3>
            <h3>Carbohydrates: {nutrition.carbs} g</h3>
        </div>
    )
}

export default NutritionPlan;