import { Component } from "react";
import Header from "./components/header/Header";
import Main from "./components/main/Main";

export interface Pokemons {
  name: string;
  url: string;
}

interface PokemonsState {
  pokemons: Pokemons[];
  offset: number;
  limit: number;
  url: string;
  error: string;
  isLoading: boolean;
}

class App extends Component<object, PokemonsState> {
  constructor(props: object) {
    super(props);

    this.state = {
      pokemons: [],
      offset: 0,
      limit: 10,
      url: "https://pokeapi.co/api/v2/pokemon",
      error: "",
      isLoading: true,
    };
  }

  componentDidMount(): void {
    this.fetchPokemons();
  }

  fetchPokemons = () => {
    fetch(
      `${this.state.url}?limit=${this.state.limit}&offset=${this.state.offset}`,
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({ pokemons: data.results, isLoading: false }),
      )
      .catch((error) => this.setState({ error: error.message }));
  };

  render() {
    const { pokemons, error, isLoading } = this.state;

    if (error) {
      return <div>{error}</div>;
    }
    return (
      <>
        <Header pokemons={pokemons} />
        <Main pokemons={pokemons} error={error} isLoading={isLoading} />
      </>
    );
  }
}

export default App;
