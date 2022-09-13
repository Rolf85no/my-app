import React from "react";

export default function Sequencer(props) {
    const [values, setValues] = React.useState({
        name: props.name,
        numberOfGrid: 8,
    })

    const [seqArr, setSeqArr] = React.useState(() => newSequencer())
    const [counter, setCounter] = React.useState(1)
    const audio = document.getElementById(`audio${props.name}`);
    React.useEffect(() => {
        const playing = setInterval(() => {
            if (props.running) {

                seqArr[counter - 1].selected && audio.play()
                if (counter === 8) setCounter(0);
                setCounter(prevCounter => prevCounter + 1)
                setSeqArr(prevSeqArr => prevSeqArr.map(item => {
                    return counter === item.number
                        ?
                        { ...item, playing: true }
                        :
                        { ...item, playing: false }
                }
                )
                )

            }
            else setCounter(1)
        }, props.bpm)
        return () => clearInterval(playing);
    }, [counter, props.running, props.bpm, seqArr, audio])


    function selectedValues(id) {
        setSeqArr(prevSeqArr => prevSeqArr.map(item => {
            return item.number === id ? { ...item, selected: !item.selected } :
                item
        }
        ))
    }

    function newSequencer() {
        const seqArr = [];
        for (let i = 1; i < values.numberOfGrid + 1; i++) {
            seqArr.push({ number: i, selected: false, playing: false })
        }
        return seqArr
    }

    const seqArrElements = seqArr.map(item =>
        <div className="seqElements"
            style={{ backgroundColor: item.selected ? 'green' : 'grey' }}
            onClick={() => selectedValues(item.number)}
            key={item.number}
        >
            <h3 className="seqElements--number">{item.number}</h3>
            <h3
                className="seqElements--playing"
                style={{ color: item.playing ? 'var(--primary)' : 'var(--secondary)' }}
            > ●</h3>
        </div>
    )

    return (
        <div className="sequencerContainer">
            <h3 className="sequencerName">{values.name}</h3>

            <div className="sequencerButtons">
                {seqArrElements}
            </div>
            <audio id={`audio${props.name}`} src={props.link}>
            </audio>
        </div >

    )
}