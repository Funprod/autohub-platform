import Counter from '@/features/counter/ui/Counter'
import Link from 'next/link'

export default function Page() {
    return (
        <div>
            <h1>Home</h1>
            <Link href="/about">About</Link>
            <Counter />
        </div>
    )
}
