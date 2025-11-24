import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { Route } from "./components/Route.jsx";

import { HomePage } from "./pages/Home.jsx";
import { SearchPage } from "./pages/Search.jsx";

function App() {
  return (
    <>
      <Header />
      <Route path="/" component={HomePage}></Route>
      <Route path="/search" component={SearchPage}></Route>
      <Footer />
    </>
  );
}

export default App;
