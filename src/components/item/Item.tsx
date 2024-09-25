import { Component } from "react";
import "./Item.scss";
import { Pokemons } from "../../App";
import Modal from "../modal/Modal";

interface ItemProps {
  pokemon: Pokemons[];
  chosenPokemon: object[];
}

interface ItemState {
  isOpen: boolean;
  selectedPokemon: {
    url: string;
  };
}

class Item extends Component<ItemProps, ItemState> {
  constructor(props: ItemProps) {
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
    const { pokemon, chosenPokemon } = this.props;
    const { selectedPokemon, isOpen } = this.state;

    return (
      <section className={`pokemon${pokemon.length > 1 ? "-items" : "-item"}`}>
        {pokemon && pokemon.length > 0 ? (
          <div className="pokemon-list">
            {pokemon.map((poke) => (
              <div className="pokemon-list__items" key={poke.name}>
                <h4 className="items-name">
                  {this.capitalizeFirst(poke.name)}
                </h4>
                <button
                  className="items-button"
                  onClick={() => this.handleOpen(poke)}
                >
                  See details
                </button>
              </div>
            ))}

            {isOpen && (
              <Modal
                selectedPokemon={selectedPokemon ?? chosenPokemon}
                handleClose={this.handleClose}
              />
            )}
          </div>
        ) : null}
      </section>
    );
  }
}

export default Item;
