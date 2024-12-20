import styles from './styles/rating-block.scss';
import template from './templates/rating-block.html?raw';

interface RatingBlockProps {
  headingText?: string;
  submitText?: string;
  totalStars?: number;
}

class RatingBlock extends HTMLElement implements RatingBlockProps {
  public totalStars: number = 5;
  public headingText: string = 'Rate Your Experience';
  public submitText: string = 'Submit Rating';
  public selectedRating: number | null = null;
  private shadowRoot: ShadowRoot;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.render();
    this.setupEventListeners();
  }

  static get observedAttributes(): string[] {
    return ['heading-text', 'submit-text', 'total-stars'];
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue) {
      const propName = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      this[propName] = newValue;
      this.render();
    }
  }

  private render(): void {
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      ${template}
    `;

    const heading = this.shadowRoot.querySelector('.rating-form__heading')!;
    const submitText = this.shadowRoot.querySelector('.rating-form__submit-text')!;
    const starContainer = this.shadowRoot.querySelector('.rating-form__stars')!;

    heading.textContent = this.headingText;
    submitText.textContent = this.submitText;
    starContainer.innerHTML = this.createStars();
  }

  private createStars(): string {
    return Array.from({ length: this.totalStars }, (_, i) => i + 1)
      .map(i => `
        <label class="rating-form__star">
          <input 
            type="radio" 
            name="rating" 
            value="${i}"
            aria-label="${i} star${i === 1 ? '' : 's'}"
            role="radio"
            aria-checked="false"
            tabindex="0"
            ${this.selectedRating === i ? 'checked' : ''}
          >
          <span class="star-icon" 
                aria-hidden="true"
                part="star-icon">★</span>
        </label>
      `).join('');
  }

  private setupEventListeners(): void {
    const form: HTMLFormElement = this.shadowRoot.querySelector('form')!;
    const starsContainer: HTMLDivElement = this.shadowRoot.querySelector('.rating-form__stars')!;
    const submitButton: HTMLButtonElement = this.shadowRoot.querySelector('.rating-form__submit')!;
    const textarea: HTMLTextAreaElement | null = this.shadowRoot.querySelector('textarea');
    const liveRegion: HTMLElement = this.shadowRoot.querySelector('.rating-form__live-region')!;
    const charCount: HTMLElement | null = this.shadowRoot.querySelector('.rating-form__char-count');

    starsContainer.addEventListener('keydown', (e: KeyboardEvent) => {
      // ... (your existing keyboard navigation logic)
    });

    starsContainer.addEventListener('change', (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        this.handleRatingChange(e.target);
        submitButton.disabled = false;
        submitButton.removeAttribute('aria-disabled');
      }
    });

    // ... (other event listeners)
  }

  private handleRatingChange(input: HTMLInputElement): void {
    this.selectedRating = parseInt(input.value);
    liveRegion.textContent = `${this.selectedRating} star${this.selectedRating === 1 ? '' : 's'} selected`;

    this.shadowRoot.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.setAttribute('aria-checked', radio === input ? 'true' : 'false');
      radio.tabIndex = 0;
    });
  }
}

customElements.define('star-rating', RatingBlock);
export default RatingBlock;