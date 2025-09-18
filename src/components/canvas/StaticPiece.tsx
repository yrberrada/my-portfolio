"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

type Orientation = "upright" | "horizontal";
type FitMode = "width" | "height";

/** Fit an object to the viewport (width or height) with a safety margin. */
function scaleToViewport(
    root: THREE.Object3D,
    camera: THREE.PerspectiveCamera,
    viewportPx: { width: number; height: number },
    fit: FitMode,
    margin = 0.92
) {
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // center at origin
    root.position.sub(center);

    const d = camera.position.length();
    const fovRad = THREE.MathUtils.degToRad(camera.fov);
    const halfH = Math.tan(fovRad / 2) * d;
    const aspect = viewportPx.width / Math.max(1, viewportPx.height);
    const halfW = halfH * aspect;

    const targetHalfW = halfW * margin;
    const targetHalfH = halfH * margin;

    const sForWidth = targetHalfW / Math.max(1e-5, size.x / 2);
    const sForHeight = targetHalfH / Math.max(1e-5, size.y / 2);

    const s = fit === "width" ? Math.min(sForWidth, sForHeight) : Math.min(sForHeight, sForWidth);
    root.scale.setScalar(s);

    // re-center after scaling
    const after = new THREE.Box3().setFromObject(root);
    const afterCenter = new THREE.Vector3();
    after.getCenter(afterCenter);
    root.position.sub(afterCenter);

    root.traverse((o) => (o.frustumCulled = false));
}

/** Memoizes a cloned, oriented, and fitted model. */
function useFittedModel({
                            scene,
                            camera,
                            viewport,
                            orientation,
                            fit,
                        }: {
    scene: THREE.Group;
    camera: THREE.PerspectiveCamera;
    viewport: { width: number; height: number };
    orientation: Orientation;
    fit: FitMode;
}) {
    return useMemo(() => {
        const g = scene.clone(true);

        // Orientation
        if (orientation === "horizontal") {
            // lay it perfectly flat
            g.rotation.set(0, 0, -Math.PI / 2);
        } else {
            g.rotation.set(0, 0, 0);
        }

        scaleToViewport(g, camera, viewport, fit, 0.92);
        return g;
    }, [scene, camera, viewport.width, viewport.height, orientation, fit]);
}

function FittingModel({
                          path,
                          orientation,
                          fit,
                          autoRotateLocal,        // our own rotation when controls are OFF
                          autoRotateAxis = "y",
                          autoRotateSpeed = 0.25,
                      }: {
    path: string;
    orientation: Orientation;
    fit: FitMode;
    autoRotateLocal: boolean;
    autoRotateAxis?: "x" | "y" | "z";
    autoRotateSpeed?: number;
}) {
    const { scene } = useGLTF(path) as unknown as { scene: THREE.Group };
    const { size, camera } = useThree();

    const model = useFittedModel({
        scene,
        camera: camera as THREE.PerspectiveCamera,
        viewport: { width: size.width, height: size.height },
        orientation,
        fit,
    });

    const groupRef = useRef<THREE.Group>(null);

    // If controls are OFF, gently rotate with useFrame
    useFrame((_, delta) => {
        if (!autoRotateLocal || !groupRef.current) return;
        const g = groupRef.current;
        const inc = autoRotateSpeed * delta;
        if (autoRotateAxis === "x") g.rotation.x += inc;
        else if (autoRotateAxis === "z") g.rotation.z += inc;
        else g.rotation.y += inc;
    });

    return (
        <group ref={groupRef}>
            <primitive object={model} />
        </group>
    );
}

export default function StaticPiece({
                                        modelPath,
                                        className = "w-full h-[300px]",
                                        camera = [0.7, 0.0, 1.3] as [number, number, number],
                                        orientation = "horizontal",
                                        fit = "width",

                                        // movement & controls
                                        controls = true,            // default ON for manual control
                                        controlsZoom = true,
                                        controlsPan = true,
                                        autoRotate = false,         // OrbitControls' autoRotate (optional)
                                        autoRotateSpeed = 0.6,
                                        localAutoRotateSpeed = 0.25 // our own speed if controls=false
                                    }: {
    modelPath: string;
    className?: string;
    camera?: [number, number, number];
    orientation?: Orientation;
    fit?: FitMode;

    controls?: boolean;
    controlsZoom?: boolean;
    controlsPan?: boolean;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    localAutoRotateSpeed?: number;
}) {
    const localAxis: "x" | "y" | "z" = "y";

    return (
        <div className={className} aria-label="interactive chess piece">
            <Canvas
                camera={{ position: camera, fov: 35 }}
                onCreated={({ gl, camera }) => {
                    // Renderer tweaks (set safely here if desired)
                    gl.outputColorSpace = THREE.SRGBColorSpace;
                    gl.toneMapping = THREE.ACESFilmicToneMapping;
                    (camera as THREE.PerspectiveCamera).lookAt(0, 0, 0);
                }}
            >
                {/* 🎬 Very dark, candle-like mood */}
                <ambientLight intensity={0.03} color="#1a0f0a" />

                {/* Warm key light */}
                <spotLight
                    position={[1.6, 2.2, 1.4]}
                    angle={0.6}
                    penumbra={0.9}
                    intensity={0.35}
                    color="#ffb169"
                    distance={10}
                    decay={2}
                    castShadow
                />

                {/* Tiny cool fill to lift deep blacks slightly */}
                <directionalLight position={[-2.5, 1.2, -1.8]} intensity={0.06} color="#88a" />

                <Suspense fallback={null}>
                    <FittingModel
                        path={modelPath}
                        orientation={orientation}
                        fit={fit}
                        autoRotateLocal={!controls && autoRotate}
                        autoRotateAxis={localAxis}
                        autoRotateSpeed={localAutoRotateSpeed}
                    />

                    {/* Environment: no intensity prop — keep it subtle */}
                    <Environment preset="night" />

                    {controls && (
                        <OrbitControls
                            // Full freedom:
                            enablePan={controlsPan}
                            enableZoom={controlsZoom}
                            enableRotate
                            minPolarAngle={0}
                            maxPolarAngle={Math.PI}
                            // Feel
                            enableDamping
                            dampingFactor={0.05}
                            rotateSpeed={0.9}
                            zoomSpeed={0.7}
                            panSpeed={0.7}
                            autoRotate={autoRotate}
                            autoRotateSpeed={autoRotateSpeed}
                        />
                    )}
                </Suspense>
            </Canvas>
        </div>
    );
}

// Preload models for snappier UX
useGLTF.preload("/models/Queen_white.glb");
useGLTF.preload("/models/King_white.glb");
useGLTF.preload("/models/Rook_white.glb");
useGLTF.preload("/models/Bishop_white.glb");
useGLTF.preload("/models/Knight_white.glb");
useGLTF.preload("/models/Pawn_white.glb");
