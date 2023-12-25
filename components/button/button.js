class Button extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
      return ['primary-color', 'size', 'bg-hover', 'text-hover'];
  }

  connectedCallback() {
      this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
          this.render();
      }
  }

  getPrimaryColor() {
      return this.getAttribute('primary-color') || '#3498db';
  }

  getSize() {
    const size = this.getAttribute('size');
    const validSizes = ['sm', 'md', 'xl'];
    return validSizes.includes(size) ? size : 'sm';
}

  isRounded() {
      return this.hasAttribute('rounded');
  }

  getBgHoverColor() {
      return this.getAttribute('bg-hover') || this.getPrimaryColor();
  }

  getTextHoverColor() {
      return this.getAttribute('text-hover') || '#fff';
  }

  render() {
      this.shadowRoot.innerHTML = `
        <style>
          button {
            font-weight: 700;
            margin: 0 10px;
            text-decoration: none;
            padding: ${
              this.getSize() === 'xl'
                ? '15px 30px'
                : this.getSize() === 'md'
                ? '12px 25px'
                : '10px 20px'
            };
            border: none;
            cursor: pointer;
            transition: background-color 0.3s, color 0.3s;
            ${this.isRounded() ? 'border-radius: 20px;' : ''}
            background-color: ${this.getPrimaryColor()};
          }
          button:hover {
            background-color: ${this.getBgHoverColor()};
            color: ${this.getTextHoverColor()};
          }
        </style>
        <button type="button"><slot>Click Me!</slot></button>
      `;
  }
}

customElements.define('button-ui', Button);
