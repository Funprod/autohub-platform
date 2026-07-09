'use client'

import { decrement, increment } from '@/entities/Counter/model/slice'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux-hooks'

export default function Counter() {
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
    )
}
