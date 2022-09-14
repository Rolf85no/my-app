import React from "react";

export default function Sequencer(props) {

    const [seqArr, setSeqArr] = React.useState(() => newSequencer())
    const audio = document.getElementById(`audio${props.name}`)

    function newSequencer() {
        const seqArr = [];
        for (let i = 1; i < 8 + 1; i++) {
            seqArr.push({ number: i, selected: false, playing: false })
        }
        return seqArr
    }

    function selectedValues(id) {
        setSeqArr(prevSeqArr => prevSeqArr.map(item => {
            return item.number === id ? { ...item, selected: !item.selected } :
                item
        }
        ))
    }


    const seqArrElements = seqArr.map(item =>
        <div className="seqElements"
            style={{ backgroundColor: item.selected ? 'var(--playColor)' : 'var(--unselected)' }}
            onClick={() => selectedValues(item.number)}
            key={item.number}
        >
            <h3 className="seqElements--number">{item.number}</h3>
            <h3
                className="seqElements--playing"
                style={{ color: item.number === props.counter && props.running ? 'green' : 'var(--secondary)' }}
            > ●</h3>
        </div>
    )

    if (props.running && seqArr[props.counter - 1].selected) {
        audio.play()
    }

    return (
        <div className="sequencerContainer">
            <h3 className="sequencerName">{props.name}</h3>

            <div className="sequencerButtons">
                {seqArrElements}
            </div>
            <audio id={`audio${props.name}`} src={props.link}>
            </audio>
        </div >

    )
}