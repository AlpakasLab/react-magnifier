![React Magnifier](public/thumb.png)

## ⭐️ About
React Magnifier is an simple library to make zoom in images using html canvas and typescript

## 🚀 Getting Started
Install using an package manager
```bash
yarn add @alpakaslab/react-magnifier
# or
npm install @alpakaslab/react-magnifier
```
## 🧩 Using Component
```tsx
import { ReactMagnifier } from '@alpakaslab/react-magnifier'

const Page = () => {
    return <ReactMagnifier 
                image="image url"
                height={560}
                width={534}
           />
}

export default Page;
```