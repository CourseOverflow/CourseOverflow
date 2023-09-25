import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <Header />
      <div className="sidebar-content">
        <Sidebar />
      </div>
    </>
  );
}

export default App;
