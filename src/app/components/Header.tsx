import "@rainbow-me/rainbowkit/styles.css"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Button from '@mui/joy/Button';


export default function Header() {
    return (
        <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm border-b">
            {/* Left side - GitHub link */}
            <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
                GitHub
            </a>

            {/* Center - Title */}
            <center>
                <h1 className="text-2xl font-bold text-gray-900">
                    EdenProtocol
                </h1>
            </center>


            {/* Right side - Connect Button */}
            <div>
                <ConnectButton />
            </div>
        </header>
    );
}