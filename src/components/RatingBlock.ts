import styles from './styles/rating-block.scss';
import template from './templates/rating-block.html?raw';

interface RatingBlockProps {
  headingText?: string;
  submitText?: string;
  totalStars?: number;
  maxChar?: number;
  onSubmit?: (data: any) => void;
  debugMode?: boolean;
}

class RatingBlock extends HTMLElement implements RatingBlockProps {
  public totalStars: number = 5;
  public headingText: string = 'Rate Your Experience';
  public submitText: string = 'Submit Rating';
  public maxChar: number = 4096;
  private _shadowRoot: ShadowRoot;
  private debugMode: boolean = false;
  private onSubmit?: (data: any) => void;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });

    // Check if debug-mode attribute is set
    this.debugMode = this.hasAttribute('debug-mode');

    this.render();
  }

  static get observedAttributes(): string[] {
    return ['heading-text', 'submit-text', 'total-stars', 'max-char', 'debug-mode'];
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue) {
      const propName = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      this[propName as keyof RatingBlock] = newValue ? Number(newValue) || newValue : newValue;
      this.render();
    }
  }

  private render(): void {
    this._shadowRoot.innerHTML =
      `<style>${styles}</style>${template}`;

    const heading = this._shadowRoot.querySelector('.rating-form__heading');
    if (heading) heading.textContent = this.headingText;

    const submitText = this._shadowRoot.querySelector('.rating-form__submit-text');
    if (submitText) submitText.textContent = this.submitText;

    const starContainer = this._shadowRoot.querySelector('.rating-form__stars');
    if (starContainer) starContainer.innerHTML = this.createStars();

    this.setupEventListeners();
  }

  private createStars(): string {
    return Array.from({ length: this.totalStars }, (_, i) => i + 1)
      .map(i =>
        `<label class="rating-form__star">
          <input 
            type="radio" 
            name="rating" 
            value="${i}" 
            aria-label="${i} star${i === 1 ? '' : 's'}" 
            role="radio" 
            aria-checked="false" 
            tabindex="0"
          >
          <span class="star-icon" aria-hidden="true" part="star-icon">★</span>
        </label>`
      ).join('');
  }

  private handleStarRatingChange = (e: Event): void => {
    const submitButton: HTMLButtonElement = this._shadowRoot.querySelector('.rating-form__submit')!;
    if (e.target instanceof HTMLInputElement) {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-disabled');
    }
  };

  private handleCharCountChange = (e: Event): void => {
    const feedbackInput = e.target as HTMLTextAreaElement;
    const charCountDisplay = this._shadowRoot.querySelector('.rating-form__char-count');
    if (feedbackInput && charCountDisplay) {
      const charCount = feedbackInput.value.length;
      charCountDisplay.textContent = `${charCount} / ${this.maxChar} characters`;
    }
  };

  private handleSubmit = (event: Event): void => {
    event.preventDefault(); // Prevent the form submission (page refresh)
    event.stopImmediatePropagation(); // Prevent bubbling to other listeners (if needed)

    const ratingInput = this._shadowRoot.querySelector('input[name="rating"]:checked');
    const feedbackInput = this._shadowRoot.querySelector('textarea#feedback');

    if (ratingInput && feedbackInput) {
      const data = {
        rating: Number(ratingInput.value),
        feedback: feedbackInput.value
      };

      if (this.debugMode) {
        console.log('Form submitted with data:', data); // Debug log
      }

      // Call the onSubmit callback if defined
      if (this.onSubmit) {
        this.onSubmit(data);
      }
    }
  };

  private setupEventListeners(): void {
    const form: HTMLFormElement = this._shadowRoot.querySelector('.rating-form');
    if (form) form.addEventListener('submit', this.handleSubmit);

    const starsContainer: HTMLDivElement = this._shadowRoot.querySelector('.rating-form__stars');
    if (starsContainer) starsContainer.addEventListener('change', this.handleStarRatingChange);

    const feedbackInput: HTMLTextAreaElement = this._shadowRoot.querySelector('textarea#feedback');
    if (!feedbackInput) {
      console.warn('Feedback input not found when setting up event listeners.');
    } else {
      feedbackInput.addEventListener('input', this.handleCharCountChange);
    }
  }

  disconnectedCallback(): void {
    const starsContainer: HTMLDivElement = this._shadowRoot.querySelector('.rating-form__stars');
    if (starsContainer) starsContainer.removeEventListener('change', this.handleStarRatingChange);

    const feedbackInput: HTMLTextAreaElement = this._shadowRoot.querySelector('textarea#feedback');
    if (feedbackInput) feedbackInput.removeEventListener('input', this.handleCharCountChange);
  }
}

customElements.define('star-rating', RatingBlock);
export default RatingBlock;
