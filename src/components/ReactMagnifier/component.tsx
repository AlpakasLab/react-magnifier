import React, { FC } from 'react'

import 'style.css'
import { ReactMagnifierProps } from './types'

const ReactMagnifier: FC<ReactMagnifierProps> = ({}) => {
    return (
        <div className='magnifier'>
            <h1>Magnifier</h1>
        </div>
    )
}

export default ReactMagnifier