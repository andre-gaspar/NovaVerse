'use client'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { InstancedRigidBodies, CylinderCollider, BallCollider, CuboidCollider, RigidBody, Physics, RapierRigidBody } from '@react-three/rapier'
import { useImperativeHandle, forwardRef, useMemo, useEffect, useState, useRef } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'

import * as THREE from 'three'
//extend({ OrbitControls });
const FFF = forwardRef((props, ref) => {
    //const [ hitSound ] = useState(() => new Audio('./hit.mp3'))
    const twister = useRef()
    const cube = useRef()
    //const cube = useRef<RapierRigidBody>(null);

    const controlsRef = useRef();
    useFrame((state) =>
    {
        const time = state.clock.getElapsedTime()
        
        const eulerRotation = new THREE.Euler(0, time * 3, 0)
        const quaternionRotation = new THREE.Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)
        twister.current.setNextKinematicRotation(quaternionRotation)

        const angle = time * 0.5
        const x = Math.cos(angle) * 2
        const z = Math.sin(angle) * 2
        twister.current.setNextKinematicTranslation({ x: x, y: - 0.8, z: z })

        // Update the controls on each frame
        const pos=cube.current.translation();
        const targetPosition = new THREE.Vector3(pos.x, 0, pos.z);
        controlsRef.current.target.lerp(targetPosition, 0.1); // Adjust the interpolation factor as needed
        //controlsRef.current.target.set(pos.x, 0, pos.z);
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

    // Function to handle arrow up key press
    const handleKeyPress = (event) => {
        if (event.key === 'ArrowUp') {
            cubeJump()
        }
    }
    // Function to stop cube movement when arrow key is released
    const handleKeyRelease = () => {
        //cube.current.setNextKinematicTranslation({ x: 0, y: 0, z: 0 });
    }

    useEffect(() => {
        // Add event listeners for arrow key press and release
        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('keyup', handleKeyRelease);
    
        // Remove event listeners on component unmount
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
          window.removeEventListener('keyup', handleKeyRelease);
        }
    }, [])

    useImperativeHandle(ref, () => ({
        cubeJump,
    }));

    return (
    <>

            <OrbitControls ref={controlsRef} />

            <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
            <ambientLight intensity={ 0.5 } />

            <Physics gravity={ [ 0, - 9.08, 0 ] } debug>

                <RigidBody
                    ref={ cube }
                    position={ [ 1.5, 2, 0 ] }
                    gravityScale={ 1 }
                    restitution={ 0 }
                    friction={ 0.7 }
                    colliders={ false }
                    // onCollisionEnter={ collisionEnter }
                    // onCollisionExit={ () => { console.log('exit') } }
                    // onSleep={ () => { console.log('sleep') } }
                    // onWake={ () => { console.log('wake') } }
                >
                    <mesh  castShadow onClick={cubeJump}>
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
                    <mesh receiveShadow position-y={ - 1.25 }>
                        <boxGeometry args={ [ 10, 0.5, 10 ] } />
                        <meshStandardMaterial color="greenyellow" />
                    </mesh>
                </RigidBody>

                <RigidBody
                    ref={ twister }
                    position={ [ 0, - 0.8, 0 ] }
                    friction={ 0 }
                    type="kinematicPosition"
                >
                    <mesh castShadow scale={ [ 0.4, 0.4, 3 ] }>
                        <boxGeometry />
                        <meshStandardMaterial color="red" />
                    </mesh>
                </RigidBody>

                <RigidBody type="fixed">
                    <CuboidCollider args={ [ 5, 2, 0.5 ] } position={ [ 0, 1, 5.25 ] } />
                    <CuboidCollider args={ [ 5, 2, 0.5 ] } position={ [ 0, 1, - 5.25 ] } />
                    <CuboidCollider args={ [ 0.5, 2, 5 ] } position={ [ 5.25, 1, 0 ] } />
                    <CuboidCollider args={ [ 0.5, 2, 5 ] } position={ [ - 5.25, 1, 0 ] } />
                </RigidBody>

            </Physics>
    </>);
});
FFF.displayName = 'MyFFF';
export default FFF;