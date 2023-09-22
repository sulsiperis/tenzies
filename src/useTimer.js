import React from 'react';

//autoreset will be when autoreset in seconds will be reached
export default function useTimer(initialState = 0, autoreset=3600) {
  const [timer, setTimer] = React.useState(initialState)
  const [isActive, setIsActive] = React.useState(false)
  const [isPaused, setIsPaused] = React.useState(false)
  const countRef = React.useRef(null)
  const [timeIsUp, setTimeIsUp] = React.useState(false)


  React.useEffect(() => {
    if (timer >= autoreset) {
      setTimeIsUp(true)
        handlePause()
    }
  }, [timer])

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(false)
    countRef.current = setInterval(() => {  
      setTimer((timer) => timer + 1) 
       
      
    }, 1000)
  }

  const handlePause = () => {
    clearInterval(countRef.current)
    setIsPaused(true)
  }

  const handleResume = () => {
    setIsPaused(false)
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
      
    }, 1000)
  }

  const handleReset = () => {
    clearInterval(countRef.current)
    setIsActive(false)
    setIsPaused(false)
    setTimer(0)
    setTimeIsUp(false)
  }

  return { timer, isActive, isPaused, timeIsUp, handleStart, handlePause, handleResume, handleReset }
}


