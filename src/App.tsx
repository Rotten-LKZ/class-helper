import { HashRouter as Router, Route } from 'react-router-dom'
import { Calendar } from './pages/Calendar'
import { Calendar2 } from './pages/Calendar2'
import { Index } from './pages/Index'
import { LotteryDraw } from './pages/LotteryDraw'
import { Random } from './pages/Random'

export function App() {
  return (
    <Router>
      <Route path="/" exact={true} component={Index} />
      <Route path="/index" exact={true} component={Index} />
      <Route path="/calendar" exact={true} component={Calendar} />
      <Route path="/calendar2" exact={true} component={Calendar2} />
      <Route path="/random" exact={true} component={Random} />
      <Route path="/lotteryDraw" exact={true} component={LotteryDraw} />
    </Router>
  )
}