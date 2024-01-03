'use client'
import { get, ref, set, onValue } from "firebase/database";
import { useGLTF, OrbitControls, useTexture} from '@react-three/drei'
import { InstancedRigidBodies, CylinderCollider, BallCollider, CuboidCollider, RigidBody, Physics, RapierRigidBody } from '@react-three/rapier'
import { useImperativeHandle, forwardRef, useMemo, useEffect, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import Model from './caracther.jsx'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//import { get, ref } from "firebase/database";
import {database} from "./firebaseConfig.js"

import * as THREE from 'three'
const FFF = forwardRef((props, referencia) => {
    const [cameraDirection, setCameraDirection] = useState(new THREE.Vector3());
    const cube = useRef()
    const man = useRef()
    //const cube = useRef<RapierRigidBody>(null);
    const { nodes } = useGLTF('/departamental.glb')
    //console.log(nodes)
    const bakedTexture = useTexture('/bakedFinal.jpg')
    bakedTexture.flipY = false
    const controlsRef = useRef();

    const [users, setUsers] = useState([]);
    /*
    useEffect(() => {
        const dbRef = ref(database, 'users');
        console.log("dbRef");
        console.log(dbRef);
        // Set initial positions
        set(dbRef, {
            rrrrrr: { x: 0, y: 200, z: 0 },
            ttttttt: { x: 0, y: 300, z: 0 },
            // Add more players as needed
        });

        // Listen for changes to player positions
        const usersListener = onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            //setUsers(data);
            console.log("data444444");
            console.log(data);
        }
        });

        return () => {
        // Clean up the listener when the component unmounts
        usersListener();
        };
    }, [])*/
    useFrame((state) =>
    {
        const time = state.clock.getElapsedTime()

        // Update the controls on each frame
        const pos=cube.current.translation();
        if(cube.current){
            const targetPosition = new THREE.Vector3(pos.x, pos.y, pos.z);
            controlsRef.current.target.lerp(targetPosition, 0.1);
            // Update the camera direction state
            const newCameraDirection = targetPosition;
            setCameraDirection(newCameraDirection);
            // Update player position in the database
            //set(ref(database, `users/ttttttt`), { x: pos.x, y: pos.y, z: pos.z });
        }
        //controlsRef.current.target.set(pos.x, 0, pos.z);
        
        if (man.current) {
            //console.log("hehehhehehhee")
            man.current.position.lerp(pos, 0.1);
        }
        controlsRef.current.update();
        
    })


    const cubeJump = () =>
    {
        
        //console.log("lets fucking gooooo")
        // Get the camera direction vector
        const cameraDirection = controlsRef.current.target.clone()
        .sub(controlsRef.current.object.position)
        .normalize();

        //console.log('Camera Direction:', cameraDirection);
        // Apply impulse only in the x and z axis in the camera direction
        const impulseX = cameraDirection.x * 2;
        const impulseZ = cameraDirection.z * 2;

        const mass = cube.current.mass();
        //console.log(mass);
        cube.current.applyImpulse({ x: impulseX, y: 0, z: impulseZ }, true);
        //cube.current.applyImpulse({ x: 0, y: 10, z: 0 }, true);
        
    }

    useImperativeHandle(referencia, () => ({
        cubeJump,
    }));

    return (
    <>
            <OrbitControls ref={controlsRef} />
            
            <Physics gravity={ [ 0, - 9.08, 0 ] } debug>
                {/*position={[90, 0, 0]}*/}
                <Model ref={man} cameraDirection={cameraDirection} />

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