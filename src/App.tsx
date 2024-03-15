import { FC, useMemo } from "react"
import { Tabs } from "antd"

import RandomFactForm from "./components/RandomFactForm/RandomFactForm"
import AgeByName from "./components/AgeByNameForm/AgeByNameForm"

const App: FC = () => {
  const TabItems = useMemo(() => {
    return [
      {
        key: 'random-fact',
        label: 'Get a random fact',
        children: <RandomFactForm />
      },
      {
        key: 'age-by-name',
        label: 'Get age by name',
        children: <AgeByName />
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
