import { SpriteAnimator, MeshDistortMaterial, shaderMaterial, Sparkles, Clouds, Cloud, Center, useTexture, useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'

export default function Experience()
{
    //const { nodes } = useGLTF('/all.glb')
    const { nodes } = useGLTF('/fctverse.glb')
    //console.log(nodes2)
    console.log("nodes")
    console.log("nodes")
    console.log("nodes")
    console.log("nodes")
    console.log("nodes")
    console.log("nodes")
    console.log(nodes)
    const plane = useTexture('/plane2.jpeg')
    const dep = useTexture('/departamental.jpeg')
    const veg = useTexture('/vegetation.jpeg')
    const yup1 = useTexture('/auditorio.jpeg')
    const yup2 = useTexture('/biblioteca.jpeg')
    const yup3 = useTexture('/ed2.jpeg')
    const yup4 = useTexture('/ed7.jpeg')
    const yup5 = useTexture('/lidl.jpeg')
    const yup6 = useTexture('/novaId.jpeg')
    const yup7 = useTexture('/tantofaz.jpeg')
    plane.flipY = false
    dep.flipY = false
    veg.flipY = false
    yup1.flipY = false
    yup2.flipY = false
    yup3.flipY = false
    yup4.flipY = false
    yup5.flipY = false
    yup6.flipY = false
    yup7.flipY = false
    console.log(nodes)

    return <>
        <OrbitControls  makeDefault />

        <Center>
            
            <mesh geometry={ nodes.Plane.geometry }>
                <meshBasicMaterial map={ plane } />
            </mesh>
            
            <mesh geometry={ nodes.vegetation.geometry }>
                <meshBasicMaterial map={ veg } />
            </mesh>
            
            <mesh geometry={ nodes.departamental.geometry }>
                <meshBasicMaterial map={ dep } />
            </mesh>
            <mesh geometry={ nodes.auditorio.geometry }>
                <meshBasicMaterial map={ yup1 } />
            </mesh>
            <mesh geometry={ nodes.biblioteca.geometry }>
                <meshBasicMaterial map={ yup2 } />
            </mesh>
            <mesh geometry={ nodes.ed2.geometry }>
                <meshBasicMaterial map={ yup3 } />
            </mesh>
            <mesh geometry={ nodes.ed7.geometry }>
                <meshBasicMaterial map={ yup4 } />
            </mesh>
            <mesh geometry={ nodes.lidl.geometry }>
                <meshBasicMaterial map={ yup5 } />
            </mesh>
            <mesh geometry={ nodes.novaId.geometry }>
                <meshBasicMaterial map={ yup6 } />
            </mesh>
            <mesh geometry={ nodes.tantofaz.geometry }>
                <meshBasicMaterial map={ yup7 } />
            </mesh>
            <Clouds material={THREE.MeshBasicMaterial}>
                <Cloud scale={5} position={[-100, 100, 100]} segments={40} bounds={[10, 2, 2]} volume={10} color="orange" />
                <Cloud position={[-100, 100, 100]} seed={1} scale={10} volume={5} color="hotpink" fade={100} />
            </Clouds>

            <Sparkles
		        size={ 100 }
                scale={ [ 500, 90, 500 ] }
                position-y={ 15 }
                speed={ 5 }
                count={ 2000 }
            />
        </Center>

    </>
}