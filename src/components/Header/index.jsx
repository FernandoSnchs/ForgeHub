
import Link from "next/link"

export default function Header(){

    return(
        <header className = "w-screen h-[15vh] bg-black/2 fixed  top-0 left-0 z-1000 flex p-6">
            <div>{/*logo*/}
                <p>logo</p>
            </div>
            <div>{/*ul com link*/}
                <ul className="flex gap-3.5">
                    <li>Products</li>
                    <li>Why us?</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div>{/*button login*/}
            <Link href="/login" className="px-4 py-2 bg-red-300 border-1 rounded-md">Login</Link>
            <Link href="/register" className="px-4 py-2 bg-red-300 border-1 rounded-md">New?</Link>
            </div>            
        </header>
    )
}