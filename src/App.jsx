import "./App.css";
import { useEffect, useState } from "react";
import Characters from "./components/Characters/Characters";

function App() {
  const [CharacterList, setCharacterList] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`https://rickandmortyapi.com/api/character/?page=${pages}`)
      .then((response) => response.json())
      .then((response) => {
        setCharacterList((elem) => [...elem, ...response.results])
        setLoading(false)
      })
      .catch((err) => console.log(err));
  }, [pages]);

  const loadMoreData = () => {
    setPages(pages+1)
  }

  return (
    <div className="App">
      <header className="App-header">
          <Characters CharacterList={CharacterList} loadMoreData={loadMoreData} loading={loading}/>
      </header>
    </div>
  );
}

export default App;
