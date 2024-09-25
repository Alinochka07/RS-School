import { Component } from "react";
import "./Modal.scss";

interface ModalSpeciesProps {
  speciesUrl?: string;
  sprites?: {
    front_default?: string;
    front_shiny?: string;
  };
}

interface ModalSpeciesState {
  species: {
    shape: { name: string };
    flavor_text_entries?: Array<{
      flavor_text: string;
    }>;
  };
  isLoading: boolean;
}

class ModalSpecies extends Component<ModalSpeciesProps, ModalSpeciesState> {
  constructor(props: ModalSpeciesProps) {
    super(props);

    this.state = {
      species: {
        shape: { name: "" },
        flavor_text_entries: [],
      },
      isLoading: true,
    };
  }

  componentDidUpdate(prevProps: ModalSpeciesProps) {
    if (prevProps.speciesUrl !== this.props.speciesUrl) {
      this.fetchSpecies();
    }
  }
  fetchSpecies = async () => {
    if (this.props.speciesUrl) {
      await fetch(this.props.speciesUrl)
        .then((response) => response.json())
        .then((data) => this.setState({ species: data, isLoading: false }));
    }
  };

  render() {
    const flavorText = this.state.species.flavor_text_entries;
    const flavorTexts: string[] = [];

    if (flavorText && flavorText.length > 0) {
      flavorText.map((text) => flavorTexts.push(text.flavor_text));
    }
    const sprites = this.props.sprites;
    const isLoading = this.state.isLoading;

    return (
      <div className="modal-window__main">
        {isLoading ? (
          <p>Please wait. Loading...</p>
        ) : (
          <>
            <div className="modal-window__content">
              <img
                className="modal-window__image"
                alt="pokemon image"
                src={sprites?.front_default ?? sprites?.front_shiny}
              />
              <div>
                <span>
                  <b>Flavor texts:</b>
                </span>
                <p>{flavorTexts[1]}</p>
                <p>{flavorTexts[2]}</p>
                <p>{flavorTexts[3]}</p>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default ModalSpecies;
