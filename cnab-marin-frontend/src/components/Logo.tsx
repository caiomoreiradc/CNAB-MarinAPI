import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <div className={cn("flex items-center", className)}>
            <img
                src="/marin-logo.svg"
                alt="Marin Logo"
                className="w-30 h-30 mr-2"
            />
        </div>
    );
};

export default Logo;
