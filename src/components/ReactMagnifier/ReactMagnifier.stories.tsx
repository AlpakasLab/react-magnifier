import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ReactMagnifier from './component';

export default {
  title: 'React Magnifier',
  component: ReactMagnifier,
  argTypes: {
    image: { control: 'text', name: 'Image Source', defaultValue: 'https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg' },
  },
} as ComponentMeta<typeof ReactMagnifier>;

const Template: ComponentStory<typeof ReactMagnifier> = (args) => {
  return <ReactMagnifier 
    {...args} 
    width={400} 
    height={400} 
    breakpoints={{
      200: {
        width: 200,
        height: 200
      },
      300: {
        width: 280,
        height: 280
      },
      400: {
        width: 400,
        height: 400
      }
    }} 
  />
}

export const Main = Template.bind({});