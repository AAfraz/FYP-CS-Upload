import { Switch, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import AllTasks from "./components/pages/AllTasks";
import LogOut from "./components/pages/LogOut";
import Projects from "./components/pages/Projects";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Projects />
        </Route>
        <Route path="/alltasks">
          <AllTasks />
        </Route>
        <Route path="/logout">
          <LogOut />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
