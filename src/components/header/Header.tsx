import { Component } from "react";
import "./Header.scss";
import logo from "../../assets/simple-logo.webp";
import { Pokemons } from "../../App";

interface HeaderProps {
  pokemons: Pokemons[];
}

export default class Header extends Component<HeaderProps> {
  constructor(props: HeaderProps) {
    super(props);
  }

  render() {
    const pokemons = this.props.pokemons;

    return (
      <header>
        <div className="header">
          <img
            src={logo}
            alt="React learning project logo"
            className="header-logo"
          />
          <div className="header-menu">
            <div className="header-menu__items">
              <div className="header-menu__item">
                Pokemons
                <div className="header-menu__item-dropdown">
                  {pokemons.map((pokemon) => {
                    return (
                      <div key={pokemon.name} className="item-dropdown__list">
                        {pokemon.name}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="header-menu__item">About this project</div>
              <div className="header-menu__item">API documentation</div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
