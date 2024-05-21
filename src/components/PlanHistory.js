import React, { useState, useEffect } from 'react';
import WorkoutPlan from './WorkoutPlan';

function PlanHistory({ handleStateChange}) {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await fetch('/api/plans');
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                const data = await response.json();
                const sortedData = data.sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at);
                });
                setPlans(sortedData);
            } catch (err) {
                setError(`Failed to load plans: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const handleRowClick = (plan) => {
        setSelectedPlan(plan);
    };

    const handleCloseModal = () => {
        setSelectedPlan(null);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='centered-component-dark-up'>
            <h2>User Workout Plans</h2>
            {plans.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>User Name</th>
                            <th>Preferences</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.map(plan => (
                            <tr key={plan.id} onClick={() => handleRowClick(plan)}>
                                <td>{new Date(plan.created_at).toLocaleDateString()}</td>
                                <td>{plan.username}</td>
                                <td>{plan.preferences.purpose_of_the_workout || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : <p>No plans found.</p>}
            {selectedPlan && (
                <div className="modal-background" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button onClick={handleCloseModal} className="modal-close-button">Close</button>
                        <h2 className="modal-title">Plan Details</h2>
                        <div className="modal-section">
                            <h4>User Information:</h4>
                            <p><strong>User:</strong> {selectedPlan.username}</p>
                            <p><strong>Date:</strong> {new Date(selectedPlan.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="modal-section">
                            <h4>Preferences:</h4>
                            <table>
                                {Object.entries(selectedPlan.preferences).map(([key, value]) => (
                                    <tr key={key}>
                                        <td><strong>{key}:</strong></td>
                                        <td>{JSON.stringify(value)}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                        <div className="modal-section">
                            <h4>Workout Plan:</h4>
                            <WorkoutPlan workout={selectedPlan.workout_plan} />
                        </div>
                        <div className="modal-section">
                            <h4>Nutrition Plan:</h4>
                            <table>
                                {Object.entries(selectedPlan.nutrition_plan).map(([key, value]) => (
                                    <tr key={key}>
                                        <td><strong>{key}:</strong></td>
                                        <td>{JSON.stringify(value)}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            )}




        <div>
            <button className='white-button' onClick={() => handleStateChange(1)}>Back to main page!</button>
        </div>
        </div>
    );
}

export default PlanHistory;
