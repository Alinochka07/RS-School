import { Component } from "react";
import "./Modal.scss";
import ModalSpecies from "./ModalSpecies";

export interface Pokemon {
  name: string;
  order: number;
  species: {
    url?: string;
  };
  sprites: {
    front_default?: string;
    front_shiny?: string;
  };
  weight: number;
}

interface ModalProps {
  selectedPokemon: {
    url: string;
  };
  isLoading: boolean;
  error: string;
  handleClose: () => boolean | void;
}

interface Species {
  species: Array<{
    shape: string;
    flavor_text_entries?: Array<{
      flavor_text_entry: string;
    }>;
  }>;
}

interface ModalState {
  pokemon: Pokemon;
  error: string;
  species: Species[];
}

class Modal extends Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);

    this.state = {
      pokemon: {
        name: "",
        order: 0,
        species: {},
        sprites: {},
        weight: 0,
      },
      error: "",
      species: [],
    };
  }
  componentDidMount(): void {
    this.fetchPokemon();
  }

  fetchPokemon = () => {
    fetch(this.props.selectedPokemon.url)
      .then((response) => response.json())
      .then((pokemon) => {
        this.setState({ pokemon: pokemon });
      })
      .catch((err) => this.setState({ error: err.message }));
  };

  render() {
    const { pokemon } = this.state;
    const handleClose = this.props.handleClose;

    return (
      <div className="modal">
        <div className="modal-window">
          <div className="modal-window__header">
            <p>
              <b>Name: </b>
              {pokemon.name.toLocaleUpperCase().slice(0, 1) +
                pokemon.name.slice(1)}
            </p>
            <p>
              <b>Order number: </b>
              {pokemon.order}
            </p>
          </div>
          <ModalSpecies
            speciesUrl={pokemon.species.url}
            sprites={pokemon.sprites}
          />
          <div className="modal-window__footer">
            <button className="modal-window__button" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
