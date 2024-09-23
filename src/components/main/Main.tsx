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
  isSearchFieldEmpty: boolean;
}

class Main extends Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);

    this.state = {
      pokemon: [],
      isSearchFieldEmpty: true,
    };
  }

  handleSetPokemon = (value: { name: string; url: string }[]) => {
    this.setState({
      pokemon: value,
    });
  };

  handleSetSearchField = (isEmpty: boolean) => {
    this.setState({
      isSearchFieldEmpty: isEmpty,
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
    const { isSearchFieldEmpty } = this.state;

    return (
      <main>
        <Search
          pokemons={pokemons}
          handleSetSearchedPokemon={this.handleSetPokemon}
          searchFieldEmpty={this.handleSetSearchField}
          isSearchFieldEmpty={isSearchFieldEmpty}
        />

        <section className="pokemons">
          {isLoading ? (
            <div>Please wait. Data is loading...</div>
          ) : (
            <Item
              pokemon={displayedPokemon}
              isSearchFieldEmpty={isSearchFieldEmpty}
            />
          )}
        </section>
      </main>
    );
  }
}

export default Main;
