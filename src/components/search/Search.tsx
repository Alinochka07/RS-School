import { ChangeEvent, Component } from "react";
import { Pokemons } from "../../App";
import "./Search.scss";

interface SearchProps {
  pokemons: Pokemons[];
  handleSetSearchedPokemon: (value: string) => void;
  pokemon: Pokemons[];
}

interface SearchState {
  isLoading: boolean;
  searchValue: string;
  storedValue: string;
  isOpen: boolean;
  isPokemonClicked: boolean;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);

    this.state = {
      isLoading: true,
      searchValue: "",
      storedValue: "",
      isOpen: false,
      isPokemonClicked: false,
    };
  }

  componentDidMount() {
    const searchedTerm = localStorage.getItem("searchValue");
    if (searchedTerm) {
      this.setState({ storedValue: searchedTerm });
    }
  }

  componentDidUpdate(prevProps: SearchProps, prevState: SearchState) {
    if (prevState.storedValue !== this.state.storedValue) {
      localStorage.setItem("searchValue", this.state.storedValue);
    }
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchValue: event.target.value,
    });
  };

  handleSearchClick = () => {
    const query = this.state.searchValue.toLowerCase().replace(/[,.\s]/g, "");
    this.props.handleSetSearchedPokemon(query);
    localStorage.setItem("searchValue", query);
  };

  handleClearSearched = () => {
    const searchedTerm = localStorage.getItem("searchValue");
    this.setState({
      searchValue: "",
      storedValue: searchedTerm || "",
    });
    this.props.handleSetSearchedPokemon("");
  };

  render() {
    const { searchValue, storedValue } = this.state;

    return (
      <section className="search-section">
        <search className="search">
          <input
            className="search-input"
            onChange={this.handleChange}
            placeholder={storedValue}
            value={searchValue}
          />
          {searchValue ? (
            <button onClick={this.handleClearSearched} className="clear-button">
              X
            </button>
          ) : null}
          <button onClick={this.handleSearchClick} className="search-button">
            Search
          </button>
        </search>
      </section>
    );
  }
}

export default Search;
