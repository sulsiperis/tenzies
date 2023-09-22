import React from "react"
import Die from "./Die"
import Hiscores from "./Hiscores"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti' 
import useTimer from "./useTimer.js"
import { formatTime } from "./formatTime"
export default function App() {
/**
* 1. add count +
* 2. add timer +
* 3. add dots +
* 4. add best score in local storage +
* 5. show "new hi-score"
* 6. show tool tip date when hovered on hi score
*/
    const { timer, isActive, isPaused, timeIsUp, handleStart, handlePause, handleResume, handleReset } = useTimer(0)
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [hiscore, setHiscore] = React.useState(false)
    const [hitime, setHitime] = React.useState(false)
    const [resetHi, setResetHi] = React.useState(false)
    const timeArr = formatTime(timer)
    const [localData, setLocalData] = React.useState(JSON.parse(localStorage.getItem("scores")))
    
    React.useEffect (() => {
        setResetHi(false)
    }, [resetHi])

    React.useEffect(() => {
        if (tenzies) {
            if (localData) {
                findBest("time")[0].time > timer && setHitime(true)
                findBest("count")[0].count > count && setHiscore(true)                
            } else {
                setHiscore(true)
                setHitime(true)
            }
            localWrite(count, timer)
        }   
    }, [tenzies])
        
    React.useEffect(() => {
        //coursera method:
        const allHeld = dice.every(die => die.isHeld) 
        //array.every() returns true if condition is met with all array elements
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            handlePause()
            setTenzies(true)           
        }

    },[dice])

    function allNewDice () {
        let diceArr = []        
        for (let i=0;i<10;i++) {
            const randNumb = Math.floor(Math.random() * 6) + 1
            diceArr[i] =  {"value": randNumb, "isHeld": false, "id": nanoid() }
        }       
        return diceArr
    }
    
    function rollDice() {
        if (tenzies) { //new game condition
            setHitime(false)
            setHiscore(false)
            setDice(allNewDice)
            setTenzies(false)
            setCount(0)
            handleReset()
            
        } else {    
            setDice(oldDices => oldDices.map(dice => {
                return dice.isHeld?dice:{...dice, "value": Math.floor(Math.random() * 6) + 1 }
            }))
            setCount(oldCount => oldCount + 1)            
            !isActive && handleStart()
            if (isPaused) {
                setDice(allNewDice)
                setTenzies(false)
                setCount(0)
                handleReset()                
            }
        }
    }

    function holdDice(id) {        
        //coursera method:
        setDice(oldDice => oldDice.map(die => {
            return die.id === id? {...die, isHeld: !die.isHeld}: die
        }))
    }

    const diceElements = dice.map( die => 
        <Die value={die.value} held={die.isHeld} key={die.id} id={die.id} handleclick={holdDice} />
    )

    function localRead() {        
        console.log(JSON.parse(localStorage.getItem("scores")))  
    }
    function localWrite(score=0, time=0) { //save score in localStorage       
            const records = []  
            const oldRec = JSON.parse(localStorage.getItem("scores"))
            const newRec = {
                "date": Date.now(),                
                "count": score,                
                "time": time, 
                "id": nanoid(),              
            }
            if (oldRec) {
                records.push(...oldRec, newRec)
            } else {
                records.push(newRec)
            } 
        localStorage.setItem("scores", JSON.stringify(records))
        setLocalData(JSON.parse(localStorage.getItem("scores")))
    }

    function localClear() {        
        localStorage.clear() 
        setLocalData(null)
        setResetHi(true)                  
    }

    
    function findBest(parame) {
        const oldRec = JSON.parse(localStorage.getItem("scores"))        
        const bestArr = [] 
        bestArr.push(oldRec[0])

        let oldCOndition
        let newCondition   

        for (let i = 0; i < oldRec.length; i++) {
            if (parame === "count") {
                oldCOndition = oldRec[i].count
                newCondition = bestArr[0].count
            } else if (parame === "time") {
                oldCOndition = oldRec[i].time
                newCondition = bestArr[0].time
            } else {
                oldCOndition = oldRec[i].count
                newCondition = bestArr[0].count
            }
            
            //console.log(oldCOndition)
            if (oldCOndition < newCondition) {
                bestArr.length = 0
                bestArr.push(oldRec[i]);
            }
        }
        return bestArr
    }
    return (
            <div>
                
                { tenzies && <Confetti numberOfPieces="234" /> }
                <main>
                    
                    { localData && 
                        <Hiscores 
                            bestCount={findBest("count")[0]} 
                            hitime={hitime} 
                            hiscore={hiscore} 
                            localData={localData}
                            bestTime={findBest("time")[0]}
                            localClear={localClear}
                            
                        /> 
                    }
                    <h1 className="title" onDoubleClick={localRead}>Tenzies</h1>
                    <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                    <div className="dice-container">
                        {diceElements}
                    </div>
                    <div className="button-wrap">
                        { count>0 && <div className={timeIsUp?"timer red":tenzies?"timer won":"timer"}>{timeArr["minutes"]} : {timeArr["seconds"]}</div> }                
                        <button className="roll-dice" onClick={rollDice}>{tenzies || isPaused?"New game":"Roll"}</button>
                        { count>0 && <div className={tenzies?"count won":"count"}>{count}</div> }
                        
                    </div>
                    
                    
                    {/* <button onClick={localRead}>read</button>
                    <button onClick={() => localWrite(Math.floor(Math.random() * 44)+12 , Math.floor(Math.random() * 200)+22 )}>write</button>
                    <button onClick={localClear}>clear</button> */}           
                </main>
            </div>
            

        
    )
}