import React, { useState, useEffect } from 'react';

function WorkoutPlanModal({ plan }) {
    const renderExercisesForDay = (exercises) => {
        return exercises.map((exercise, index) => (
            <div key={index} className="exercise-detail">
                <h5>{exercise.title}</h5>
                <p><strong>Equipment:</strong> {exercise.equipment}</p>
                <p><strong>Description:</strong> {exercise.desc}</p>
            </div>
        ));
    };

    return (
        <div className="modal-content">
            <button onClick={plan.handleClose} className="modal-close-button">Close</button>
            <h2>Workout Plan for {plan.username}</h2>
            {plan.days.map((day, index) => (
                <div key={index} className="day-plan">
                    <h3>Day {index + 1}</h3>
                    {day.exercises ? renderExercisesForDay(day.exercises) : <p>No exercises listed.</p>}
                </div>
            ))}
        </div>
    );
}

export default WorkoutPlanModal;
