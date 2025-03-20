import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <div className={cn("flex items-center", className)}>
            <a href="/">
                <img
                    src="/marin-logo.svg"
                    alt="Marin Logo"
                    className="w-42 h-42 mr-2"
                />
            </a>
        </div>
    );
};

export default Logo;
