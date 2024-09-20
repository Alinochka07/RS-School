import { Component } from "react";
import { Pokemons } from "../../App";
import Modal from "../modal/Modal";
import "./Main.scss";

interface MainProps {
  pokemons: Pokemons[];
  error: string;
  isLoading: boolean;
}

interface MainState {
  isOpen: boolean;
  selectedPokemon: {
    url: string;
  };
}

class Main extends Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);

    this.state = {
      isOpen: false,
      selectedPokemon: {
        url: "",
      },
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen = (pokemon: { url: string }) => {
    this.setState({
      isOpen: true,
      selectedPokemon: pokemon,
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  capitalizeFirst = (value: string) => {
    const newValue = value.toUpperCase().slice(0, 1) + value.slice(1);
    return newValue;
  };

  render() {
    const { pokemons, error, isLoading } = this.props;
    const { isOpen, selectedPokemon } = this.state;

    return (
      <main>
        {isLoading ? (
          <div>Please wait. Data is loading...</div>
        ) : (
          <div className="pokemon-list">
            {pokemons.map((pokemon) => {
              return (
                <>
                  <div className="pokemon-list__items" key={pokemon.name}>
                    <h4 className="items-name">
                      {this.capitalizeFirst(pokemon.name)}
                    </h4>
                    <button onClick={() => this.handleOpen(pokemon)}>
                      See details
                    </button>
                  </div>
                </>
              );
            })}
            {isOpen ? (
              <Modal
                selectedPokemon={selectedPokemon}
                error={error}
                isLoading={isLoading}
                handleClose={this.handleClose}
              />
            ) : null}
          </div>
        )}
      </main>
    );
  }
}

export default Main;
