import "./App.css";
import { NavBar } from "./components/NavBar";
import { TaskContainor } from "./components/TaskContainor";

function App() {
  return (
    <main className="container  m-auto">
      <div className="main">
        <div className="gradient"></div>
      </div>
      <div className="relative z-10 space-y-5 top-0 flex flex-col p-4 h-screen">
        <NavBar />
        <TaskContainor />
      </div>
    </main>
  );
}

export default App;
