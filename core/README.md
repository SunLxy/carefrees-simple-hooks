# `simple-hooks`

## useSimpleReducer

```tsx mdx:preview

import React from "react";
import { useSimpleReducer } from "@carefrees/simple-hooks";

const Demo = ()=>{

  const [store,dispatch,instance] =  useSimpleReducer({ value:"" })
  
  console.log("useSimpleReducer===>",store,dispatch,instance)

  return (<div>
    <input 
      value={store.value} 
      onInput={(event)=>{
        const value = event.target.value;
        dispatch({ value })
      }} 
    />
  </div>)
}

export default Demo;

```

## Provider

```tsx mdx:preview

import React from "react";
import { createSimpleContext, createSimpleProvider, createSimpleHooksContext } from "@carefrees/simple-hooks";

const Context  = createSimpleContext({ value:"" })

const Provider = createSimpleProvider({ Context })

const useContext = createSimpleHooksContext(Context)

const Demo = ()=>{
  const [store,dispatch,instance] = useContext()
  console.log("Provider===>",store,dispatch,instance)
  return (<div>
    <input 
      value={store.value} 
      onInput={(event)=>{
        const value = event.target.value;
        dispatch({ value })
      }} 
    />
  </div>)
}

const Warp = ()=>{
  return (<Provider initalValue={{ value:"" }} ><Demo /></Provider>)
}

export default Warp;

```