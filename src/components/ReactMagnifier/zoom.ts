import { CANVAS_HEIGHT, CANVAS_WIDTH, createZoomComponentFactory } from './types'

const createZoomComponent = (
    screen: HTMLCanvasElement,
    drawer: CanvasRenderingContext2D
): createZoomComponentFactory => {
    const state = {
        zoom: false,
        box: {
            x: 0,
            y: 0,
            w: CANVAS_WIDTH / 2,
            h: CANVAS_HEIGHT / 2
        },
        imageSrc: ''
    }

    const renderObjects = () => {
        const { box, imageSrc, zoom } = state

        if (imageSrc !== '') {
            const image = new Image()
            image.src = imageSrc

            if (zoom) {
                let x = box.x < box.w / 2 ? 0 : box.x - box.w / 2

                if (box.x > CANVAS_WIDTH - box.w / 2) {
                    x = CANVAS_WIDTH - box.w
                }

                let y = box.y < box.h / 2 ? 0 : box.y - box.h / 2

                if (box.y > CANVAS_WIDTH - box.h / 2) {
                    y = CANVAS_WIDTH - box.h
                }

                const canvasWidthPercent = Math.round((100 * x) / CANVAS_WIDTH)

                const imageWidthPx =
                    (image.naturalWidth * canvasWidthPercent) / 100

                const canvasHeightPercent = Math.round(
                    (100 * y) / CANVAS_HEIGHT
                )

                const imageHeightPx =
                    (image.naturalHeight * canvasHeightPercent) / 100

                drawer.drawImage(
                    image,
                    imageWidthPx,
                    imageHeightPx,
                    image.naturalWidth / 2,
                    image.naturalHeight / 2,
                    0,
                    0,
                    CANVAS_WIDTH,
                    CANVAS_HEIGHT
                )
            } else {
                drawer.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
            }
        }
    }

    const renderScreen = () => {
        if (screen && drawer) {
            drawer.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

            renderObjects()

            requestAnimationFrame(renderScreen)
        }
    }

    const startZoom = () => {
        drawer.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

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