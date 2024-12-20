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
  private _shadowRoot: ShadowRoot;
  public totalStars: number = 5;
  public headingText: string = 'Rate Your Experience';
  public submitText: string = 'Submit Rating';
  public maxChar: number = 4096;
  public  debugMode: boolean = false;
  public  onSubmit?: (data: any) => void;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this.debugMode = this.hasAttribute('debug-mode');
    this.render();
  }

  static get observedAttributes(): string[] {
    return ['heading-text', 'submit-text', 'total-stars', 'max-char', 'debug-mode'];
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue) {
      const propName = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase()) as keyof RatingBlockProps;
      
      if (this.isValidProp(propName)) {
        let value: string | number | boolean | undefined;
        
        // Handle different property types
        switch(propName) {
          case 'totalStars':
          case 'maxChar':
            value = newValue ? Number(newValue) : undefined;
            break;
          case 'debugMode':
            value = newValue !== null;
            break;
          default:
            value = newValue ?? undefined;
        }
  
        // Now we can safely assign the value with the correct type
        (this[propName] as any) = value;
        this.render();
      }
    }
  }
  
  // Update type guard to use RatingBlockProps
  private isValidProp(prop: string): prop is keyof RatingBlockProps {
    return ['headingText', 'submitText', 'totalStars', 'maxChar', 'debugMode', 'onSubmit'].includes(prop);
  }

  private render(): void {
    this._shadowRoot.innerHTML = `<style>${styles}</style>${template}`;

    const heading = this._shadowRoot.querySelector('.rating-form__heading');
    if (heading) heading.textContent = this.headingText;

    const submitText = this._shadowRoot.querySelector('.rating-form__submit-text');
    if (submitText) submitText.textContent = this.submitText;

    const starContainer = this._shadowRoot.querySelector('.rating-form__stars');
    if (starContainer) starContainer.innerHTML = this.createStars();

    // Initialize submit button as disabled
    const submitButton = this._shadowRoot.querySelector('.rating-form__submit') as HTMLButtonElement;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.setAttribute('aria-disabled', 'true');
    }

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

  private updateSubmitButtonState(): void {
    const submitButton = this._shadowRoot.querySelector('.rating-form__submit') as HTMLButtonElement;
    const ratingSelected = this._shadowRoot.querySelector('input[name="rating"]:checked');

    if (submitButton) {
      const isDisabled = !ratingSelected;
      submitButton.disabled = isDisabled;
      submitButton.setAttribute('aria-disabled', isDisabled.toString());
      
      // Update button style based on state
      if (isDisabled) {
        submitButton.classList.add('rating-form__submit--disabled');
      } else {
        submitButton.classList.remove('rating-form__submit--disabled');
      }
    }
  }

  private handleStarRatingChange = (e: Event): void => {
    this.updateSubmitButtonState();
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
    event.preventDefault();
    event.stopImmediatePropagation();

    const ratingInput = this._shadowRoot.querySelector('input[name="rating"]:checked') as HTMLInputElement;
    const feedbackInput = this._shadowRoot.querySelector('textarea#feedback') as HTMLTextAreaElement;

    if (ratingInput && feedbackInput) {
      const data = {
        rating: Number(ratingInput.value),
        feedback: feedbackInput.value
      };

      if (this.debugMode) {
        console.log('Form submitted with data:', data);
      }

      if (this.onSubmit) {
        this.onSubmit(data);
      }
    }
  };

  private setupEventListeners(): void {
    const form = this._shadowRoot.querySelector('.rating-form') as HTMLFormElement;
    if (form) form.addEventListener('submit', this.handleSubmit);

    const starsContainer = this._shadowRoot.querySelector('.rating-form__stars') as HTMLDivElement;
    if (starsContainer) starsContainer.addEventListener('change', this.handleStarRatingChange);

    const feedbackInput = this._shadowRoot.querySelector('textarea#feedback') as HTMLTextAreaElement;
    if (feedbackInput) {
      feedbackInput.addEventListener('input', this.handleCharCountChange);
    }

    // Initialize submit button state
    this.updateSubmitButtonState();
  }

  disconnectedCallback(): void {
    const starsContainer = this._shadowRoot.querySelector('.rating-form__stars') as HTMLDivElement;
    if (starsContainer) starsContainer.removeEventListener('change', this.handleStarRatingChange);

    const feedbackInput = this._shadowRoot.querySelector('textarea#feedback') as HTMLTextAreaElement;
    if (feedbackInput) feedbackInput.removeEventListener('input', this.handleCharCountChange);
  }
}

customElements.define('star-rating', RatingBlock);
export default RatingBlock;