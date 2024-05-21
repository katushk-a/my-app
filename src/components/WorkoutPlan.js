import React,  { useState, useEffect }  from 'react';


function Exercise({ exercise }) {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
      setIsExpanded(!isExpanded);
  };

    return <li className={`exercise-container ${isExpanded ? 'expanded' : ''}`} onClick={toggleDescription}>
        <div>
            <p><b>Title:</b> <i>{exercise['Title']}</i></p>
            <div className={`exercise-details ${isExpanded ? 'show' : 'hide'}`}>
                <p><b>Description:</b> <i>{exercise['Desc']}</i></p>
            </div>
            <p><b>Needed Equipment:</b> <i>{exercise['Equipment']}</i></p>
        </div>
    </li>;
  }

  function SetOfExercises({ set }) {
    return (
      <div className="set-container">
        <h3>{set.muscle_group} (Exercises: {set.number})</h3>
        <ul>
          {set.exercises.map((exercise) => (
            <Exercise exercise={exercise}/>
          ))}
        </ul>
      </div>
    );
  }

  function DayWorkout({ day, index }) {
    return (
      <div>
        <h2>Day {index + 1}</h2>
        <div className="day-container">
        {day.exercises.map((set, idx) => (
          <SetOfExercises key={idx} set={set} />
        ))}
      </div>
      </div>
    );
  }
  

function WorkoutPlan({workout}){
    console.log(workout)
    return(
        <div className="workout-plan-container">
            <h2>Workout Plan for {workout.num_days_per_week} days per week:</h2>
            <h6>*Click on the exercise to see the description of it*</h6>
            <div>
            {workout.days.map((day, index) => (
            <DayWorkout key={index} day={day} index={index} />
            ))}
            </div>
        </div>
    )
}

export default WorkoutPlan;