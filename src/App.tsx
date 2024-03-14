import { FC, useMemo } from "react"
import { Tabs } from "antd"

import RandomFactForm from "./components/RandomFactForm/RandomFactForm"

const App: FC = () => {
  const TabItems = useMemo(() => {
    return [
      {
        key: 'random-fact',
        label: 'Get a random fact',
        children: <RandomFactForm />
      }
    ]
  }, [])

  return (
    <Tabs
      type="card"
      centered
      size="large"
      items={TabItems}
    />
  )
}

export default App
