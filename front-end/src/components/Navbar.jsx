import Link from 'next/link'

function Navbar() {
   return (
    <nav>
        <h1>Navbar</h1>

        <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/about">About</Link>
            </li>
            <li>
                <Link href="/posts">Posts</Link>
            </li>
        </ul>
    </nav>
   )
}

export default Navbar;