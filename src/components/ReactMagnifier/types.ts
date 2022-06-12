export interface ReactMagnifierProps{
    image: string
    width: number
    height: number
}

export interface createZoomComponentFactory{
    startZoom(): void
    moveBox(x: number, y: number): void
    setImage(src: string): void
    activeZoom(): void
    disableZoom(): void
}