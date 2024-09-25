import { Component } from "react";
import { Pokemons } from "../../App";
import "./Main.scss";
import Search from "../search/Search";
import Item from "../item/Item";

interface MainProps {
  pokemons: Pokemons[];
  isLoading: boolean;
}

interface MainState {
  pokemon: Pokemons[];
}

class Main extends Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);

    this.state = {
      pokemon: [],
    };
  }

  handleSetPokemon = (value: string) => {
    const pokemon = this.props.pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value.toLowerCase().trim())
    );
    this.setState({
      pokemon: pokemon,
    });
  };

  getDisplayedPokemon = () => {
    return this.state.pokemon.length > 0
      ? this.state.pokemon
      : this.props.pokemons;
  };

  render() {
    const { pokemons, isLoading } = this.props;
    const displayedPokemon = this.getDisplayedPokemon();
    const { pokemon } = this.state;

    return (
      <main>
        <Search
          pokemons={pokemons}
          handleSetSearchedPokemon={this.handleSetPokemon}
          pokemon={pokemon}
        />

        <section className="pokemons">
          {isLoading ? (
            <div>Please wait. Data is loading...</div>
          ) : (
            <Item pokemon={displayedPokemon} chosenPokemon={pokemon} />
          )}
        </section>
      </main>
    );
  }
}

export default Main;
