class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['size', 'image'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    getSize() {
        const size = this.getAttribute('size');
        const validSizes = ['sm', 'md', 'xl'];
        return validSizes.includes(size) ? size : 'sm';
    }

    render() {
        const sizeMapping = {
            'sm': '6px',
            'md': '18px',
            'xl': '24px'
        };

        const widthMapping = {
            'sm': '200px',
            'md': '300px',
            'xl': '400px'
        };

        const paddingSize = sizeMapping[this.getSize()] || sizeMapping['sm'];
        const widthSize = widthMapping[this.getSize()] || widthMapping['sm'];
        const imageSrc = this.getAttribute('image');

        this.shadowRoot.innerHTML = `
          <style>
            .card {
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
              transition: 0.3s;
              padding: ${paddingSize};
              width: ${widthSize};
              display: flex;
              flex-direction: column;
              align-items: center;
            }

            .card:hover {
              box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
            }

            .container {
              padding: 2px 16px;
              text-align: center;
            }

            .image {
              max-width: 100%;
              margin-bottom: 10px;
            }

            ::slotted([slot="title"]) {
              font-weight: bold;
            }

            ::slotted([slot="content"]) {
              text-align: justify;
            }

            .card-links {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-end; /* Left alignment */
              margin-top: 10px;
            }

            .card-link {
              margin-bottom: 5px;
            }
          </style>
          <div class="card">
            ${imageSrc ? `<img src="${imageSrc}" alt="Card Image" class="image">` : ''}
            <div class="container">
              <slot name="title"></slot>
              <slot name="content"></slot>
              <div class="card-links">
                <slot name="links"></slot>
              </div>
            </div>
          </div>
        `;
    }
}

customElements.define('card-ui', Card);
