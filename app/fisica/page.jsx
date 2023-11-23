'use client'
import FFF from './fTest.jsx'
import { Canvas} from '@react-three/fiber'
import { useRef, Suspense } from 'react'
export default function Page() {
  const fffRef = useRef();
  const buttonPressTimerRef = useRef(null);

  const startCubeJumpTimer = () => {
    // Trigger cubeJump every 100 milliseconds (adjust the interval as needed)
    buttonPressTimerRef.current = setInterval(cubeJump, 100);
  };

  const stopCubeJumpTimer = () => {
    // Clear the interval when the button is released
    clearInterval(buttonPressTimerRef.current);
  };

  const cubeJump = () => {
    // Your cube movement logic
    console.log("Cube jumping!");
    // Access the FFF component's cubeJump function using the ref
    fffRef.current.cubeJump();
  };
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
                <FFF ref={fffRef}/>
        </Canvas>   
       </Suspense> 
       <button
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '10px',
          backgroundColor: 'blue',
          color: 'white',
          cursor: 'pointer',
          userSelect: 'none',
          touchAction: 'manipulation',
          userSelect: 'none',
        }}
        onTouchStart={startCubeJumpTimer}
        onTouchEnd={stopCubeJumpTimer}
        onMouseDown={startCubeJumpTimer} // For non-touch devices
        onMouseUp={stopCubeJumpTimer} // For non-touch devices
      >
        Move Cube
      </button> 
    </>
  )
}
function Loading() {
  return <h2>🌀 Loading...</h2>;
}