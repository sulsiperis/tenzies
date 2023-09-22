import React from "react"

export default function Die(props) {
    const dieStyle = props.held? `face${props.value} die-face held` : `face${props.value} die-face`
    switch (props.value) {
        case 1: return (  
            <div className={dieStyle} onClick={() => props.handleclick(props.id)}>
                <span className="dot">
                </span>
            </div>            
        )
        case 2: return (        
            <div className={dieStyle} onClick={() => props.handleclick(props.id)}>
                <span className="dot">
                </span>
                <span className="dot">
                </span>
            </div>
        )
        case 3: return (        
            <div className={dieStyle} onClick={() => props.handleclick(props.id)}>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        )
        case 4: return (        
            <div className={dieStyle} onClick={() => props.handleclick(props.id)}>
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        )
        case 5: return (        
            <div className={dieStyle} onClick={() => props.handleclick(props.id)}>
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                
                <div className="column">
                    <span className="dot"></span>
                </div>
                
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>

            </div>
        )
        case 6: return (        
            <div className={dieStyle} onClick={() => props.handleclick(props.id)}>
               <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                        <span className="dot"></span>
                </div>

            </div>
        )
        default: {
            return (
        
                <div className={dieStyle} onClick={() => props.handleclick(props.id)}>
                    <h2 className="die-num">{props.value}</h2>
                </div>
            )
        }
    } 
    
}