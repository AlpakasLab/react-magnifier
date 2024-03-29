import { createZoomComponentFactory } from './types'

const createZoomComponent = (
    screen: HTMLCanvasElement,
    drawer: CanvasRenderingContext2D
): createZoomComponentFactory => {
    const state = {
        zoom: false,
        box: {
            x: 0,
            y: 0,
            w: screen.clientWidth / 2,
            h: screen.clientHeight / 2
        },
        imageSrc: ''
    }

    const renderObjects = () => {
        const { box, imageSrc, zoom } = state

        if (imageSrc !== '') {
            const image = new Image()
            image.src = imageSrc

            if (zoom) {
                var scale = Math.min(screen.clientWidth / image.naturalWidth, screen.clientHeight / image.naturalHeight);

                let x = box.x < box.w / 2 ? 0 : box.x - box.w / 2

                if (box.x > screen.clientWidth - box.w / 2) {
                    x = screen.clientWidth - box.w
                }

                let y = box.y < box.h / 2 ? 0 : box.y - box.h / 2

                if (box.y > screen.clientWidth - box.h / 2) {
                    y = screen.clientWidth - box.h
                }

                const canvasWidthPercent = Math.round((100 * x) / screen.clientWidth)

                const imageWidthPx =
                    (image.naturalWidth * canvasWidthPercent) / 100

                const canvasHeightPercent = Math.round(
                    (100 * y) / screen.clientHeight
                )

                const imageHeightPx =
                    (image.naturalHeight * canvasHeightPercent) / 100

                var dx = (screen.clientWidth / 2) - (image.naturalWidth / 2) * scale;
                var dy = (screen.clientHeight / 2) - (image.naturalHeight / 2) * scale;

                drawer.drawImage(
                    image,
                    imageWidthPx,
                    imageHeightPx,
                    image.naturalWidth / 2,
                    image.naturalHeight / 2,
                    dx,
                    dy,
                    image.naturalWidth * scale,
                    image.naturalHeight * scale
                )
            } else {
                var scale = Math.min(screen.clientWidth / image.naturalWidth, screen.clientHeight / image.naturalHeight);

                var x = (screen.clientWidth / 2) - (image.naturalWidth / 2) * scale;
                var y = (screen.clientHeight / 2) - (image.naturalHeight / 2) * scale;

                drawer.drawImage(image, x, y, image.naturalWidth * scale, image.naturalHeight * scale)
            }
        }
    }

    const renderScreen = () => {
        if (screen && drawer) {
            drawer.clearRect(0, 0, screen.clientWidth, screen.clientHeight)

            renderObjects()

            requestAnimationFrame(renderScreen)
        }
    }

    const startZoom = () => {
        drawer.clearRect(0, 0, screen.clientWidth, screen.clientHeight)

        renderScreen()
    }

    const moveBox = (x: number, y: number) => {
        state.box = { ...state.box, x: x, y: y }
    }

    const setImage = (src: string) => {
        state.imageSrc = src
    }

    const activeZoom = () => {
        state.zoom = true
    }

    const disableZoom = () => {
        state.zoom = false
    }

    return {
        startZoom,
        moveBox,
        setImage,
        activeZoom,
        disableZoom
    }
}

export default createZoomComponent