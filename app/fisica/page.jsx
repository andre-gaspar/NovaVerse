'use client'
import FFF from './fTest.jsx'
import { Canvas} from '@react-three/fiber'
import { Suspense } from 'react'
export default function Page() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Canvas
            flat
            dpr={[1, 1]}
            camera={ {
                fov: 45,
                near: 0.1,
                far: 800,
                position: [ 1, 2, 6 ]
            } }>
                <FFF/>
        </Canvas>   
       </Suspense>  
    </>
  )
}
function Loading() {
  return <h2>🌀 Loading...</h2>;
}