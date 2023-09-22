export const formatTime = (tim) => {
    const getSeconds = `0${(tim % 60)}`.slice(-2)
    const minutes = `${Math.floor(tim / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(tim / 3600)}`.slice(-2)
  
    const ret = [] 
    ret["seconds"] = getSeconds
    ret["minutes"] = getMinutes
    ret["hours"] = getHours
    
    return ret
  }
  