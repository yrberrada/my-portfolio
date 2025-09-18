"use client";

import PieceTestCanvas from "@/components/canvas/PieceTestCanvas";

export default function PieceTestSection() {
    return (
        <section id="piece-test" className="relative py-10">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-6">Piece Render Test (King only)</h2>

                <div className="w-full max-w-sm mx-auto">
                    <PieceTestCanvas modelPath="/models/King_white.glb" />
                </div>

                <p className="mt-6 text-sm text-muted text-center">
                    Testing King export. If you see the King, the export pipeline works 🎉
                </p>
            </div>
        </section>
    );
}
