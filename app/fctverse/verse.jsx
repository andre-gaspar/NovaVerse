'use client'
import { useGLTF, OrbitControls, useTexture} from '@react-three/drei'
import { InstancedRigidBodies, CylinderCollider, BallCollider, CuboidCollider, RigidBody, Physics, RapierRigidBody } from '@react-three/rapier'
import { useImperativeHandle, forwardRef, useMemo, useEffect, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import Model from './caracther.jsx'

import * as THREE from 'three'
const FFF = forwardRef((props, ref) => {
    const cube = useRef()
    const man = useRef()
    //const cube = useRef<RapierRigidBody>(null);
    const { nodes } = useGLTF('/departamental.glb')
    console.log(nodes)
    const bakedTexture = useTexture('/bakedFinalPaint.jpg')
    bakedTexture.flipY = false

    const controlsRef = useRef();
    useFrame((state) =>
    {
        const time = state.clock.getElapsedTime()

        // Update the controls on each frame
        const pos=cube.current.translation();
        const targetPosition = new THREE.Vector3(pos.x, 0, pos.z);
        controlsRef.current.target.lerp(targetPosition, 0.1); // Adjust the interpolation factor as needed
        //controlsRef.current.target.set(pos.x, 0, pos.z);
        
        if (man.current) {
            console.log("hehehhehehhee")
            man.current.position.lerp(pos, 0.1);
        }
        controlsRef.current.update();
        
    })


    const cubeJump = () =>
    {
        
        console.log("lets fucking gooooo")
        // Get the camera direction vector
        const cameraDirection = controlsRef.current.target.clone()
        .sub(controlsRef.current.object.position)
        .normalize();

        console.log('Camera Direction:', cameraDirection);
        // Apply impulse only in the x and z axis in the camera direction
        const impulseX = cameraDirection.x * 2;
        const impulseZ = cameraDirection.z * 2;

        const mass = cube.current.mass();
        console.log(mass);
        cube.current.applyImpulse({ x: impulseX, y: 0, z: impulseZ }, true);
        //cube.current.applyImpulse({ x: 0, y: 10, z: 0 }, true);
        
    }

    useImperativeHandle(ref, () => ({
        cubeJump,
    }));

    return (
    <>
            <OrbitControls ref={controlsRef} />
            
            <Physics gravity={ [ 0, - 9.08, 0 ] } debug>
                {/*position={[90, 0, 0]}*/}
                <Model ref={man}  />

                <RigidBody
                    ref={ cube }
                    position={ [ 0, 100, 0 ] }
                    gravityScale={ 1 }
                    restitution={ 0 }
                    friction={ 0.7 }
                    colliders={ false }
                    // onCollisionEnter={ collisionEnter }
                    // onCollisionExit={ () => { console.log('exit') } }
                    // onSleep={ () => { console.log('sleep') } }
                    // onWake={ () => { console.log('wake') } }
                >
                    <mesh onClick={cubeJump}>
                        <boxGeometry />
                        <meshStandardMaterial color="mediumpurple" />
                    </mesh>
                    <CuboidCollider mass={ 2 } args={ [ 0.5, 0.5, 0.5 ] } />
                </RigidBody>

                <RigidBody
                    type="fixed"
                    restitution={ 0 }
                    friction={ 0.7 }
                >
                    <mesh geometry={ nodes.Plane.geometry }>
                        <meshBasicMaterial map={ bakedTexture } />
                    </mesh>
                </RigidBody>

                <RigidBody
                    type="fixed"
                >             
                    <mesh geometry={ nodes.map_26osm_buildings.geometry }>
                        <meshBasicMaterial map={ bakedTexture } />
                    </mesh>
                    
                </RigidBody>

            </Physics>
    </>);
});
FFF.displayName = 'MyFFF';
export default FFF;