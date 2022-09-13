import React from 'react'
import Navbar from './components/Navbar'
import Sequencer from './components/Sequencer'

export default function App() {

    const [bpm, setBpm] = React.useState(500);
    const [running, setRunning] = React.useState(false)

    function startStop() {
        setRunning(prevValues => !prevValues)
    }
    function changeBpm() {
        const bpmInput = document.querySelector('.bpmInput')
        setBpm((60000 / Number(bpmInput.value)).toFixed(2));

        document.querySelector('.bpmInput--value').textContent = `${bpmInput.value}`;
    }
    return (
        <main>
            <h1 className="title">DRUM MACHINE</h1>
            <Navbar
                handleChange={changeBpm}
            />
            <Sequencer
                name="kick"
                link="../audio/kick.wav"
                bpm={bpm}
                running={running}
            />
            <Sequencer
                name="snare"
                link="../audio/snare.wav"
                bpm={bpm}
                running={running}
            />
            <Sequencer
                name="hi-hat"
                link="../audio/hat.wav"
                bpm={bpm}
                running={running}
            />
            <button
                type="button"
                onClick={startStop}
                style={{ backgroundColor: running ? 'var(--primary)' : 'green' }
                }
                className="sequencerButtons--startButton"
            >
                {running ? '◻︎' : '▷'}
            </button>

        </main>
    )
}