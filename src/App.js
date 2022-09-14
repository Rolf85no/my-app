import React from 'react'
import Navbar from './components/Navbar'
import Sequencer from './components/Sequencer'

export default function App() {

    const [bpm, setBpm] = React.useState(500);
    const [running, setRunning] = React.useState(false)
    const [counter, setCounter] = React.useState(1)

    const playButtonStyle = {
        color: running ? 'var(--stopColor)' : 'var(--playColor)',
        outlineColor: running ? 'var(--stopColor)' : 'var(--playColor)'

    }
    function startStop() {
        setRunning(prevValues => !prevValues)
    }

    React.useEffect(() => {
        const playingEff = setInterval(() => {
            if (running && counter < 8) {
                setCounter(prevCounter => prevCounter + 1)
            }
            else setCounter(1)
        }, bpm)
        return () => clearInterval(playingEff);
    }, [counter, running, bpm])

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
                running={running}
                counter={counter}
            />
            <hr></hr>
            <Sequencer
                name="snare"
                link="../audio/snare.wav"
                running={running}
                counter={counter}
            />
            <hr></hr>
            <Sequencer
                name="hi-hat"
                link="../audio/hat.wav"
                running={running}
                counter={counter}
            />

            <hr></hr>
            <button
                type="button"
                onClick={startStop}
                style={playButtonStyle}
                className="sequencerButtons--startButton"
            >
                {running ? 'stop' : 'play'}
            </button>

        </main>
    )
}