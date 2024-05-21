import React, { useState, useEffect } from 'react';
import './App.css';
import WorkoutForm from './components/WorkoutForm';
import StartView from './components/StartView';
import IntroView from './components/IntroView';
import PlanHistory from './components/PlanHistory';

function App() {
    const [appState, setAppState] = useState(0);
    const [name, setName] = useState('');
    const [activeClass, setActiveClass] = useState('fade-enter');

    useEffect(() => {
        // Apply the enter-active class shortly after component mounts or updates
        const timer = setTimeout(() => {
            setActiveClass('fade-enter-active');
        }, 10); // 10ms typically ensures the browser has time to acknowledge the initial state
        return () => clearTimeout(timer);
    }, [appState]); 
    
    const handleStateChange = (state) => {
        setActiveClass('fade-exit');
        setTimeout(() => {
            setActiveClass('fade-exit-active');
            setTimeout(() => {
                // After the exit transition, update the state and start the enter transition
                setAppState(state);
                setActiveClass('fade-enter');
            }, 300); // Match the duration of the exit transition
        }, 10);
    }

    const settingName = (name) => {
        setName(name);
    }

    const renderComponent = () => {
        switch (appState) {
            case 0:
                return <div className={activeClass}> 
                             <StartView handleStateChange={handleStateChange} settingName={settingName} />
                        </div>;
            case 1:
                return <div className={activeClass}>
                            <IntroView handleStateChange={handleStateChange} name={name} /> 
                        </div>;
            case 2:
                return <div className={activeClass}>
                            <WorkoutForm username={name} handleStateChange={handleStateChange} /> 
                        </div>;
            case 3:
                return <div className={activeClass}>
                            <PlanHistory handleStateChange={handleStateChange} /> 
                        </div>;
            default:
                return <div>Invalid state</div>;
        }
    };

    return (
        <div className="app">
            <header className="App-header">
                    {renderComponent()}
            </header>
        </div>
    );
}

export default App;
