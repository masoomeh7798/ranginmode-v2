import React, { useEffect } from 'react'

export default function Callback() {
    const url=new URL(window.location.href)
    const authority=url.searchParams.get('Authority')

// verify
useEffect(()=>{
    (async()=>{
        try {
            const fetch()
            
        } catch (error) {
            console.log(error);
        }
    })()
})
  return (
    <div>Callback</div>
  )
}
