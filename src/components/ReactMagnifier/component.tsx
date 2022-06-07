import React, { FC, useCallback, useEffect, useRef, useState } from 'react'

import './style.css'
import { CANVAS_HEIGHT, CANVAS_WIDTH, createZoomComponentFactory, ReactMagnifierProps } from './types'
import createZoomComponent from './zoom'

const ReactMagnifier: FC<ReactMagnifierProps> = ({image}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [zoomFunctions, setZoomFunctions] = useState<createZoomComponentFactory | null>(null)

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
    
    return (
        <canvas
            id="magnifier"
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
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