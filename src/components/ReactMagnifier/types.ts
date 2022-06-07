export interface ReactMagnifierProps{
    image: string
}

export interface createZoomComponentFactory{
    startZoom(): void
    moveBox(x: number, y: number): void
    setImage(src: string): void
    activeZoom(): void
    disableZoom(): void
}

export const CANVAS_WIDTH = 534

export const CANVAS_HEIGHT = 560