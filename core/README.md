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

📢：手动创建的状态管理和默认导出的状态管理不通用

**案例一(创建状态管理)**

```tsx mdx:preview

import React from "react";
import { createSimpleContext, createSimpleProvider, createSimpleHooksContext , createSimpleHooksSelector } from "@carefrees/simple-hooks";

const Context  = createSimpleContext()

const Provider = createSimpleProvider(Context)

const useContext = createSimpleHooksContext(Context)

const useSelector = createSimpleHooksSelector(useContext)

const Demo = ()=>{
  const [instance] = useContext()
  const store = useSelector((instance)=>({...instance.store}))

  console.log("value===案例一==>",store,instance)

  return (<div>
    <input 
      value={store.value} 
      placeholder="请输入value"
      onInput={(event)=>{
        const value = event.target.value;
        instance.update({ value })
      }} 
    />
  </div>)
}

const Demo2 = ()=>{
  const [instance] = useContext()
  const value2 = useSelector((instances)=>instances?.store?.value2)
  console.log("value2====案例一==>",value2,instance)

  return (<div>
    <input 
      value={value2} 
      placeholder="请输入value2"
      onInput={(event)=>{
        const value2 = event.target.value;
        instance.update({ value2 })
      }} 
    />
  </div>)
}

const Warp = ()=>{
  return (<Provider initalValue={{ value:"" ,value2:"" }} >
    <Demo />
    <Demo2/>
  </Provider>)
}

export default Warp;

```

<br/>

**案例二(使用默认导出状态管理)**

```tsx mdx:preview

import React from "react";
import { SimpleProvider , useSimpleContext, useSimpleSelector } from "@carefrees/simple-hooks";

const Demo = ()=>{
  const [instance] = useSimpleContext()
  const store = useSimpleSelector((instance)=>({...instance.store}))

  console.log("value===案例二==>",store,instance)

  return (<div>
    <input 
      value={store.value} 
      placeholder="请输入value"
      onInput={(event)=>{
        const value = event.target.value;
        instance.update({ value })
      }} 
    />
  </div>)
}

const Demo2 = ()=>{
  const [instance] = useSimpleContext()
  const value2 = useSimpleSelector((instances)=>instances?.store?.value2)
  console.log("value2====案例二=>",value2,instance)

  return (<div>
    <input 
      value={value2} 
      placeholder="请输入value2"
      onInput={(event)=>{
        const value2 = event.target.value;
        instance.update({ value2 })
      }} 
    />
  </div>)
}

const Warp = ()=>{
  return (<SimpleProvider initalValue={{ value:"" ,value2:"" }} >
    <Demo />
    <Demo2/>
  </SimpleProvider>)
}

export default Warp;

```