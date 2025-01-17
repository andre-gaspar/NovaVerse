

import { useRef, useEffect, forwardRef } from "react";
import { useTexture, useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';

const Model = forwardRef((props, ref) => {
  const { nodes, materials, animations } = useGLTF("/myman.glb");
  const { actions } = useAnimations(animations, ref);
  const { cameraDirection } = props;
  
  useEffect(() => {
    actions.walking.play();
  }, [actions.walking]);

  useFrame(() => {
    // Example: Make the model look at a specific point
    const lookAtPoint = new THREE.Vector3(0, 10, 0); // Change the coordinates as needed
    ref.current.lookAt(cameraDirection);
    //console.log("cameraaaaaaaa")
    //console.log(cameraDirection)
  });
  
  return (
    <group  ref={ref} {...props} dispose={null}>
        {/*<spotLight position={[90, 15, 0]} angle={0.5} penumbra={1} intensity={1} castShadow />*/}
        <ambientLight intensity={0.9} />
      <group  name="Scene">
        <group
          name="mixamorigMeshes"
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <skinnedMesh
            name="mixamorigArms_Geo"
            geometry={nodes.mixamorigArms_Geo.geometry}
            material={materials.Skin_MAT}
            skeleton={nodes.mixamorigArms_Geo.skeleton}
          />
          <skinnedMesh
            name="mixamorigCigar_Geo"
            geometry={nodes.mixamorigCigar_Geo.geometry}
            material={materials.Cigar_Mat}
            skeleton={nodes.mixamorigCigar_Geo.skeleton}
          />
          <skinnedMesh
            name="mixamorigHat_Geo"
            geometry={nodes.mixamorigHat_Geo.geometry}
            material={materials["Clothes_MAT.001"]}
            skeleton={nodes.mixamorigHat_Geo.skeleton}
          />
          <skinnedMesh
            name="mixamorigHead_Geo"
            geometry={nodes.mixamorigHead_Geo.geometry}
            material={materials.Skin_MAT}
            skeleton={nodes.mixamorigHead_Geo.skeleton}
          />
          <skinnedMesh
            name="mixamorigJacket_Geo"
            geometry={nodes.mixamorigJacket_Geo.geometry}
            material={materials.Clothes_MAT}
            skeleton={nodes.mixamorigJacket_Geo.skeleton}
          />
          <skinnedMesh
            name="mixamorigL_Eye_Geo"
            geometry={nodes.mixamorigL_Eye_Geo.geometry}
            material={materials["Eyes_MAT.001"]}
            skeleton={nodes.mixamorigL_Eye_Geo.skeleton}
          />
          <skinnedMesh
            name="mixamorigPants_Geo"
            geometry={nodes.mixamorigPants_Geo.geometry}
            material={materials["Clothes_MAT.001"]}
            skeleton={nodes.mixamorigPants_Geo.skeleton}
          />
          <skinnedMesh
            name="mixamorigR_Eye_Geo"
            geometry={nodes.mixamorigR_Eye_Geo.geometry}
            material={materials.Eyes_MAT}
            skeleton={nodes.mixamorigR_Eye_Geo.skeleton}
          />
          <skinnedMesh
            name="mixamorigShoes_Geo"
            geometry={nodes.mixamorigShoes_Geo.geometry}
            material={materials["Clothes_MAT.001"]}
            skeleton={nodes.mixamorigShoes_Geo.skeleton}
          />
          <skinnedMesh
            name="mixamorigTeeth_Down_Geo"
            geometry={nodes.mixamorigTeeth_Down_Geo.geometry}
            material={materials.Skin_MAT}
            skeleton={nodes.mixamorigTeeth_Down_Geo.skeleton}
          />
          <skinnedMesh
            name="mixamorigTeeth_Up_Geo"
            geometry={nodes.mixamorigTeeth_Up_Geo.geometry}
            material={materials.Skin_MAT}
            skeleton={nodes.mixamorigTeeth_Up_Geo.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
});

useGLTF.preload("/myman.glb");
Model.displayName = 'MyModel';
export default Model;