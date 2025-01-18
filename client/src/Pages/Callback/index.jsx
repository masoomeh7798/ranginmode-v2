import React, { useEffect, useState } from 'react'

export default function Callback() {
    const url = new URL(window.location.href)
    const Authority = url.searchParams.get('Authority')
    const Status = url.searchParams.get('Status')
    const [afterPaymentData, setAfterPaymentData] = useState({});

    // verify
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(import.meta.env.VITE_BASE_API + 'order/verify', {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ Authority,Status })
                })
                const data = await res.json()
                console.log(data);
                if (data?.success) {
                    setAfterPaymentData(data?.data)
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, [Authority])
    return (
        <div>Callback</div>
    )
}
