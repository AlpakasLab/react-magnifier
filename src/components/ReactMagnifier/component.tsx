import React, { FC } from 'react'

import './style.css'
import { ReactMagnifierProps } from './types'

const ReactMagnifier: FC<ReactMagnifierProps> = ({name}) => {
    return (
        <div className='magnifier'>
            <h1>Magnifier {name}</h1>
        </div>
    )
}

export default ReactMagnifier