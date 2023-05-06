import "./assets/style/App.css";
import GlobalStyle from "./pages/UI/GlobalStyle";
import QueryRender from "./queryComponent/QueryRender";

function App() {
  return (
    <>
      <QueryRender />
      <GlobalStyle />
    </>
  );
}

export default App;
