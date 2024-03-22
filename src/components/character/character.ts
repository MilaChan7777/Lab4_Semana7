import styles from "./character.css"

export enum AttributeChar {
  "img" = "img",
  "name" = "name",
  "status" = "status",
  "species" = "species",
  "type" = "type",
  "origin" = "origin"
}

class Character extends HTMLElement {
  img?: string;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  origin?: string;

  static get observedAttributes() {
    const attrs: Record<AttributeChar, null> = {
      img: null,
      name: null,
      status: null,
      species: null,
      type: null,
      origin: null,

    };
    return Object.keys(attrs);
  }

  attributeChangedCallback(
    propName: AttributeChar,
    oldValue: string | undefined,
    newValue: string | undefined
  ) {
    switch (propName) {
      default:
        this[propName] = newValue;
        break;
    }
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this.shadowRoot) {
        this.shadowRoot.innerHTML = ``

    const css = this.ownerDocument.createElement("style");
    css.innerHTML = styles;
    this.shadowRoot?.appendChild(css);

    this.shadowRoot!.innerHTML += `
<div class="chara-card">
    <img src="${this.img}">
    <p>${this.name}</p>
    <p>${this.status}</p>
    <p>${this.species}</p>
    <p>${this.type}</p>
    <p>${this.origin}</p>
</div>

            `;
    }
  }
}

customElements.define("character-container", Character);
export default Character;