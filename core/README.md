# `simple-hooks`

## 参数

```ts

```

## 案例

```tsx mdx:preview

import React from "react";
import { useSimpleReducer } from "@carefrees/simple-hooks";

const Demo = ()=>{

  const [store,dispatch,instance] =  useSimpleReducer({ value:"" })
  
  console.log(store,dispatch,instance)

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
