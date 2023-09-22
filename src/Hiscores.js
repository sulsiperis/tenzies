import React from "react";
import { Tooltip } from "react-tooltip"
import { formatTime } from "./formatTime"

export default function Hiscores(props) {
    let bestScoreTime
    if (props.localData && props.localData.length > 0) {
        bestScoreTime = formatTime(props.bestTime.time)
    } else {
        bestScoreTime = []
    }
    
    const dateCounter = new Date(props.bestCount.date)
    const dateTimer = new Date(props.bestTime.date)
   // console.log(dateTimer.toLocaleString())
    return (
        <>
            <div className="scores">
                <p data-tooltip-id="time-tooltip" className={ props.hitime?"hiscore":"" }>
                    best time: { bestScoreTime["minutes"] }:{ bestScoreTime["seconds"] }</p>
                <p data-tooltip-id="count-tooltip" className={ props.hiscore?"hiscore":"" }>
                    least rolls: { props.localData && props.bestCount.count }</p>
                <button onClick={props.localClear} className="scores-clear">clear</button>                
            </div>
            <span className="tooltip">
                    <Tooltip
                        id="time-tooltip"
                        place="bottom-end"
                        variant="dark"
                        content={dateTimer.toLocaleString()}
                    />
                    <Tooltip
                        id="count-tooltip"
                        place="bottom-end"
                        variant="dark"
                        content={dateCounter.toLocaleString()}               
                    />
                </span>
        </>
    )
}