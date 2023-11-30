'use client'
import FFF from './verse.jsx'
import { Canvas} from '@react-three/fiber'
import { useState, useRef, Suspense } from 'react'
import { Model } from "./caracther";
export default function Page() {
  const fffRef = useRef();
  const timerRef = useRef(null);
  const [isIntervalRunning, setIsIntervalRunning] = useState(false);
  /*
  const startCubeJumpTimer = () => {
    // Trigger cubeJump every 100 milliseconds (adjust the interval as needed)
    buttonPressTimerRef.current = setInterval(cubeJump, 100);
  };

  const stopCubeJumpTimer = () => {
    // Clear the interval when the button is released
    clearInterval(buttonPressTimerRef.current);
  };
  */
  const startInterval = () => {
    if (!isIntervalRunning) {
      // Start the interval every 100 milliseconds (adjust the interval as needed)
      timerRef.current = setInterval(cubeJump, 100);
      setIsIntervalRunning(true);
    }
  };

  const stopInterval = () => {
    // Clear the interval when the button is clicked again
    clearInterval(timerRef.current);
    setIsIntervalRunning(false);
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
          backgroundColor: isIntervalRunning ? 'red' : 'blue',
          color: 'white',
          cursor: 'pointer',
          userSelect: 'none',
          touchAction: 'manipulation',
          userSelect: 'none',
        }}
        //onTouchStart={startCubeJumpTimer}
        //onTouchEnd={stopCubeJumpTimer}
        //onMouseDown={startCubeJumpTimer} // For non-touch devices
        //onMouseUp={stopCubeJumpTimer} // For non-touch devices
        onClick={isIntervalRunning ? stopInterval : startInterval}
      >
        {isIntervalRunning ? 'Stop Interval' : 'Start Interval'}
      </button> 
    </>
  )
}
function Loading() {
  return <h2>🌀 Loading...</h2>;
}