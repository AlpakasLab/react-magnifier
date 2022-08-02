import React, { FC, useCallback, useEffect, useRef, useState } from 'react'

import './style.css'
import { createZoomComponentFactory, ReactMagnifierProps } from './types'
import createZoomComponent from './zoom'

const ReactMagnifier: FC<ReactMagnifierProps> = ({image, height, width, breakpoints}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [zoomFunctions, setZoomFunctions] = useState<createZoomComponentFactory | null>(null)
    const [canvasWidth, setCanvasWidth] = useState(width)
    const [canvasHeight, setCanvasHeight] = useState(height)

    const getMousePosition = useCallback((evt: any): {x: number, y: number} => {
        if (canvasRef !== null && canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect()

            return {
                x: Math.round(evt.clientX - rect.left),
                y: Math.round(evt.clientY - rect.top)
            }
        }

        return {
            x: 0,
            y: 0
        }
    }, [])

    useEffect(() => {
        if (canvasRef !== null && canvasRef.current) {
            const context2D = canvasRef.current.getContext('2d')

            if (context2D) {
                const zoom = createZoomComponent(canvasRef.current, context2D)

                zoom.setImage(image)

                zoom.startZoom()

                setZoomFunctions(zoom)
            }
        }
    }, [image])

    useEffect(()=>{
        if(breakpoints){
            const mediaQuerys: MediaQueryList[] = []

            for (const key in breakpoints) {
                mediaQuerys.push(window.matchMedia(`(max-width: ${key}px)`))
            }
    
            function handleOrientationChange(ev: MediaQueryListEvent | MediaQueryList) {
                if (ev.matches) {
                    for (const key in breakpoints) {
                        if(ev.media.includes(`${key}px`)){
                            const {height, width} = breakpoints[Number(key)]
                            
                            setCanvasWidth(width)
                            setCanvasHeight(height)
                        }
                    }

                } else {
                    setCanvasWidth(width)
                    setCanvasHeight(height)
                }
            }
    
            handleOrientationChange(mediaQuerys[0]);

            mediaQuerys.forEach(media => media.addEventListener('change', handleOrientationChange))

            return () => {
                mediaQuerys.forEach(media => media.removeEventListener("change", handleOrientationChange))
            }
        }
    },[])
    
    return (
        <canvas
            id="magnifier"
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            onMouseMove={e => {
                const { x, y } = getMousePosition(e)

                zoomFunctions?.moveBox(x, y)
            }}
            onMouseEnter={() => zoomFunctions?.activeZoom()}
            onMouseLeave={() => zoomFunctions?.disableZoom()}
        />
    )
}

export default ReactMagnifier