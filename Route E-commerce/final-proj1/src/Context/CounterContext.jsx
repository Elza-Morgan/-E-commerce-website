import { createContext, useState } from "react";

export let CounterContext = createContext()

export default function CounterContextProvider(props){
    const[counter,Setcounter]=useState(22);

    return <CounterContext.Provider value={{counter, Setcounter}}>
               {props.children}
    </CounterContext.Provider>
}
