import { ChangeEvent, Component } from "react";
import { Pokemons } from "../../App";
import "./Search.scss";

interface SearchProps {
  pokemons: Pokemons[];
  handleSetSearchedPokemon: (
    value: {
      name: string;
      url: string;
    }[]
  ) => void;
  searchFieldEmpty: (isEmpty: boolean) => void;
  isSearchFieldEmpty: boolean;
}

interface SearchState {
  isLoading: boolean;
  searchValue: string;
  storedValue: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);

    this.state = {
      isLoading: true,
      searchValue: "",
      storedValue: "",
    };
  }

  componentDidMount() {
    const searchedTerm = localStorage.getItem("searchValue");
    if (searchedTerm) {
      this.setState({ storedValue: searchedTerm });
      this.props.searchFieldEmpty(false);
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

  handleClearSearched = () => {
    this.props.handleSetSearchedPokemon([]);
  };

  handleSearchClick = () => {
    if (this.state.searchValue === "") {
      this.props.handleSetSearchedPokemon(this.props.pokemons);
      this.props.searchFieldEmpty(true);
    } else {
      if (this.props.pokemons.length > 0) {
        const foundPokemon = this.props.pokemons.filter((pokemon) =>
          pokemon.name
            .toLowerCase()
            .includes(this.state.searchValue.toLowerCase())
        );
        this.props.handleSetSearchedPokemon(foundPokemon);
        this.props.searchFieldEmpty(foundPokemon.length === 0);
      }
    }
    localStorage.setItem("searchValue", this.state.searchValue);
    this.setState({ storedValue: this.state.searchValue });
  };

  handleClear = () => {
    this.setState({
      searchValue: "",
    });
    this.props.handleSetSearchedPokemon(this.props.pokemons);
    this.props.searchFieldEmpty(true);
  };

  render() {
    const { searchValue, storedValue } = this.state;

    return (
      <section className="search-section">
        <search className="search">
          <input
            className="search-input"
            onChange={this.handleChange}
            placeholder={storedValue ?? "Search pokemon"}
            value={searchValue}
          />
          {searchValue ? (
            <button onClick={this.handleClear} className="clear-button">
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
