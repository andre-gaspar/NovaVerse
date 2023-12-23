import { SpriteAnimator, MeshDistortMaterial, shaderMaterial, Sparkles, Clouds, Cloud, Center, useTexture, useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'

export default function Experience()
{
    const { nodes } = useGLTF('/all.glb')
    console.log(nodes)
    const plane = useTexture('/plane.jpeg')
    const dep = useTexture('/redDepartamental.jpeg')
    plane.flipY = false
    dep.flipY = false
    console.log(nodes)

    return <>
        <OrbitControls  makeDefault />

        <Center>
            
            <mesh geometry={ nodes.Plane.geometry }>
                <meshBasicMaterial map={ plane } />
            </mesh>
            
            <mesh geometry={ nodes.departamental.geometry }>
                <meshBasicMaterial map={ dep } />
            </mesh>
            <Clouds material={THREE.MeshBasicMaterial}>
                <Cloud scale={5} position={[-100, 100, 100]} segments={40} bounds={[10, 2, 2]} volume={10} color="orange" />
                <Cloud position={[-100, 100, 100]} seed={1} scale={10} volume={5} color="hotpink" fade={100} />
            </Clouds>

            <Sparkles
		        size={ 100 }
                scale={ [ 250, 70, 250 ] }
                position-y={ 15 }
                speed={ 5 }
                count={ 1000 }
            />
        </Center>

    </>
}