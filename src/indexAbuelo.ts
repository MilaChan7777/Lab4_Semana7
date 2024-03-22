import * as components from "./components/indexPadre";
import Character, { AttributeChar } from "./components/character/character";
import styles from "./components/character/character.css"
import { getCharacters } from "./data/dataFetch";

class AppContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const characters = await getCharacters();
    this.render(characters);
  }

  render(characters: any[]) {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = "";

      const css = this.ownerDocument.createElement("style");
      css.innerHTML = styles;
      this.shadowRoot?.appendChild(css);

      this.shadowRoot!.innerHTML += `
      <h1>Rick and Morty Characters</h1>
      `;

      characters.forEach((character: any) => {
        const div = this.ownerDocument.createElement("div") as HTMLDivElement;
        const newCharacter = this.ownerDocument.createElement("character-container") as Character;
        newCharacter.setAttribute(AttributeChar.img, character.image);
        newCharacter.setAttribute(AttributeChar.name, character.name);
        newCharacter.setAttribute(AttributeChar.status, character.status);
        newCharacter.setAttribute(AttributeChar.species, character.species);
        newCharacter.setAttribute(AttributeChar.type, character.type);
        newCharacter.setAttribute(AttributeChar.origin, character.origin.name);
        div.appendChild(newCharacter);
        this.shadowRoot?.appendChild(div);
      });
    }
  }
}

customElements.define("app-container", AppContainer);