"use client";
import { Html, useProgress } from "@react-three/drei";

export default function CanvasLoader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="px-3 py-2 rounded bg-black/70 border border-panel text-white text-sm">
                Loading {Math.floor(progress)}%
            </div>
        </Html>
    );
}
