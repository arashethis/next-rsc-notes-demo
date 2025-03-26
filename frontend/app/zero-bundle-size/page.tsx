// 'use client'

import { format } from 'date-fns'

export default function ZeroBundleSize() {
    return <div>Current Time: {format(Date.now(), "yyyy/MM/dd 'at' h:mm bb")}</div>
}