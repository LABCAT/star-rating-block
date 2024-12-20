const o = `.rating-form{--rating-primary-color: #0056b3;--rating-text-color: #333;--rating-border-color: #ddd;--rating-focus-color: #4a90e2;--rating-error-color: #dc3545;--rating-success-color: #28a745;--rating-star-size: 2rem;--rating-star-color-empty: #ccc;--rating-textarea-min-height: 120px;--rating-textarea-padding: .75rem;--rating-textarea-border-width: 2px;--rating-textarea-radius: 4px;--rating-textarea-font-size: 1rem;--rating-textarea-line-height: 1.5;--rating-submit-min-width: 120px;--rating-submit-text-color: white;--rating-submit-radius: 4px;--rating-submit-padding: .75rem 1.5rem;--rating-submit-font-size: 1rem;--rating-submit-font-weight: 500;--rating-submit-transition: all .2s ease;--rating-submit-hover-color: color-mix(in srgb, var(--rating-primary-color) 85%, black);--rating-submit-focus-shadow: rgba(74, 144, 226, .4);--rating-submit-disabled-opacity: .6;max-width:600px;margin:0 auto;padding:2rem;border:1px solid var(--rating-border-color);border-radius:8px}.rating-form .visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.rating-form__heading{color:var(--rating-text-color);margin:0 0 1rem;font-size:1.5rem;font-weight:600}.rating-form__description{margin-bottom:1.5rem;color:var(--rating-text-color)}.rating-form__stars-wrapper{border:none;padding:0;margin:0 0 2rem}.rating-form__stars-legend{font-weight:500;margin-bottom:1rem;color:var(--rating-text-color)}.rating-form__stars{display:flex;gap:.5rem;justify-content:center;padding:.5rem}.rating-form__stars:focus-within{outline:2px solid var(--rating-focus-color);border-radius:4px}.rating-form__star{position:relative;cursor:pointer;padding:.25rem}.rating-form__star input{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.rating-form__star input:focus+.star-icon{outline:2px solid var(--rating-focus-color);outline-offset:2px;border-radius:4px}.rating-form__star .star-icon{font-size:var(--rating-star-size);color:var(--rating-star-color-empty);transition:color .2s ease,transform .1s ease;display:block;padding:.25rem}.rating-form__star .star-icon:hover{transform:scale(1.1)}.rating-form__star input:checked~.star-icon,.rating-form__star:hover .star-icon,.rating-form__star:focus-within .star-icon{color:var(--rating-primary-color)}.rating-form__feedback{margin-bottom:2rem}.rating-form__label{display:block;margin-bottom:.5rem;font-weight:500;color:var(--rating-text-color)}.rating-form__label-hint{font-weight:400;font-size:.875rem;color:#666;margin-left:.5rem}.rating-form__textarea-wrapper{position:relative;width:100%;max-width:100%;box-sizing:border-box}.rating-form__textarea{width:100%;max-width:100%;box-sizing:border-box;min-height:var(--rating-textarea-min-height, 120px);padding:var(--rating-textarea-padding, .75rem);border:var(--rating-textarea-border-width, 2px) solid var(--rating-border-color);border-radius:var(--rating-textarea-radius, 4px);resize:vertical;font-family:inherit;font-size:var(--rating-textarea-font-size, 1rem);line-height:var(--rating-textarea-line-height, 1.5)}.rating-form__textarea:focus{outline:none;border-color:var(--rating-focus-color);box-shadow:0 0 0 3px #4a90e233}.rating-form__textarea:disabled{background-color:#f5f5f5;cursor:not-allowed}.rating-form__hint{font-size:.875rem;color:#666;margin-top:.25rem}.rating-form__char-count{font-size:.875rem;color:#666;margin-top:.5rem;text-align:right}.rating-form__submit-wrapper{position:relative}.rating-form__submit{display:inline-flex;align-items:center;justify-content:center;min-width:var(--rating-submit-min-width);background:var(--rating-primary-color);color:var(--rating-submit-text-color);border:none;border-radius:var(--rating-submit-radius);padding:var(--rating-submit-padding);font-size:var(--rating-submit-font-size);font-weight:var(--rating-submit-font-weight);cursor:pointer;transition:var(--rating-submit-transition)}.rating-form__submit:hover:not(:disabled){background:var(--rating-submit-hover-color)}.rating-form__submit:focus-visible{outline:none;box-shadow:0 0 0 3px var(--rating-submit-focus-shadow)}.rating-form__submit:disabled,.rating-form__submit[aria-disabled=true],.rating-form__submit--disabled{opacity:.6;cursor:not-allowed;background-color:var(--rating-border-color);color:var(--rating-text-color, #333)}.rating-form__status{margin-top:1rem;padding:.75rem;border-radius:4px;font-weight:500}.rating-form__status[data-type=error]{color:var(--rating-error-color);background-color:color-mix(in srgb,var(--rating-error-color) 15%,white)}.rating-form__status[data-type=success]{color:var(--rating-success-color);background-color:color-mix(in srgb,var(--rating-success-color) 15%,white)}.rating-form__live-region{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}@media (prefers-contrast: more){.rating-form{--rating-primary-color: #000000;--rating-focus-color: #000000;--rating-border-color: #000000}.rating-form *:focus{outline:3px solid #000000;outline-offset:3px}}@media (prefers-reduced-motion: reduce){.rating-form *{transition:none!important;animation:none!important}}
`, n = `<form class="rating-form" role="form" aria-labelledby="rating-title rating-description">\r
    <h2 id="rating-title" class="rating-form__heading"></h2>\r
    <p id="rating-description" class="rating-form__description visually-hidden">\r
        This form allows you to rate your experience and provide feedback. Use arrow keys to navigate between stars,\r
        space to select a rating, and tab to move between form sections.\r
    </p>\r
\r
    <fieldset class="rating-form__stars-wrapper">\r
        <legend class="rating-form__stars-legend">Rating</legend>\r
        <!-- Remove tabindex from container, each radio should be focusable -->\r
        <div class="rating-form__stars" role="radiogroup" aria-label="Rate your experience from 1 to 5 stars"\r
            aria-live="polite">\r
            <!-- Stars will be dynamically inserted here -->\r
        </div>\r
        <div class="rating-form__live-region" aria-live="polite" aria-atomic="true"></div>\r
    </fieldset>\r
\r
    <div class="rating-form__feedback">\r
        <label for="feedback" class="rating-form__label">\r
            Additional Comments\r
            <span class="rating-form__label-hint">(optional)</span>\r
        </label>\r
        <div class="rating-form__textarea-wrapper">\r
            <textarea id="feedback" name="feedback" class="rating-form__textarea" maxlength="600"\r
                aria-describedby="feedback-hint char-count" placeholder=""></textarea>\r
            <div id="feedback-hint" class="rating-form__hint">\r
                Share any additional thoughts about your experience\r
            </div>\r
            <div id="char-count" class="rating-form__char-count" aria-live="polite">\r
                0 out of 600 characters used\r
            </div>\r
        </div>\r
    </div>\r
\r
    <div class="rating-form__submit-wrapper">\r
        <button type="submit" class="rating-form__submit" aria-disabled="true" aria-label="Submit your rating">\r
            <span class="rating-form__submit-text"></span>\r
            <span class="rating-form__loading-text visually-hidden">\r
                Submitting your feedback...\r
            </span>\r
        </button>\r
        <div class="rating-form__status" role="status" aria-live="polite"></div>\r
    </div>\r
</form>`;
class s extends HTMLElement {
  constructor() {
    super(), this.totalStars = 5, this.headingText = "Rate Your Experience", this.submitText = "Submit Rating", this.maxChar = 4096, this.debugMode = !1, this.handleStarRatingChange = (t) => {
      this.updateSubmitButtonState();
    }, this.handleCharCountChange = (t) => {
      const a = t.target, r = this._shadowRoot.querySelector(".rating-form__char-count");
      if (a && r) {
        const i = a.value.length;
        r.textContent = `${i} / ${this.maxChar} characters`;
      }
    }, this.handleSubmit = (t) => {
      t.preventDefault(), t.stopImmediatePropagation();
      const a = this._shadowRoot.querySelector('input[name="rating"]:checked'), r = this._shadowRoot.querySelector("textarea#feedback");
      if (a && r) {
        const i = {
          rating: Number(a.value),
          feedback: r.value
        };
        this.debugMode && console.log("Form submitted with data:", i), this.onSubmit && this.onSubmit(i);
      }
    }, this._shadowRoot = this.attachShadow({ mode: "open" }), this.debugMode = this.hasAttribute("debug-mode"), this.render();
  }
  static get observedAttributes() {
    return ["heading-text", "submit-text", "total-stars", "max-char", "debug-mode"];
  }
  attributeChangedCallback(t, a, r) {
    if (a !== r) {
      const i = t.replace(/-([a-z])/g, (e) => e[1].toUpperCase());
      if (this.isValidProp(i)) {
        let e;
        switch (i) {
          case "totalStars":
          case "maxChar":
            e = r ? Number(r) : void 0;
            break;
          case "debugMode":
            e = r !== null;
            break;
          default:
            e = r ?? void 0;
        }
        this[i] = e, this.render();
      }
    }
  }
  // Update type guard to use RatingBlockProps
  isValidProp(t) {
    return ["headingText", "submitText", "totalStars", "maxChar", "debugMode", "onSubmit"].includes(t);
  }
  render() {
    this._shadowRoot.innerHTML = `<style>${o}</style>${n}`;
    const t = this._shadowRoot.querySelector(".rating-form__heading");
    t && (t.textContent = this.headingText);
    const a = this._shadowRoot.querySelector(".rating-form__submit-text");
    a && (a.textContent = this.submitText);
    const r = this._shadowRoot.querySelector(".rating-form__stars");
    r && (r.innerHTML = this.createStars());
    const i = this._shadowRoot.querySelector(".rating-form__submit");
    i && (i.disabled = !0, i.setAttribute("aria-disabled", "true")), this.setupEventListeners();
  }
  createStars() {
    return Array.from({ length: this.totalStars }, (t, a) => a + 1).map(
      (t) => `<label class="rating-form__star">
          <input 
            type="radio" 
            name="rating" 
            value="${t}" 
            aria-label="${t} star${t === 1 ? "" : "s"}" 
            role="radio" 
            aria-checked="false" 
            tabindex="0"
          >
          <span class="star-icon" aria-hidden="true" part="star-icon">★</span>
        </label>`
    ).join("");
  }
  updateSubmitButtonState() {
    const t = this._shadowRoot.querySelector(".rating-form__submit"), a = this._shadowRoot.querySelector('input[name="rating"]:checked');
    if (t) {
      const r = !a;
      t.disabled = r, t.setAttribute("aria-disabled", r.toString()), r ? t.classList.add("rating-form__submit--disabled") : t.classList.remove("rating-form__submit--disabled");
    }
  }
  setupEventListeners() {
    const t = this._shadowRoot.querySelector(".rating-form");
    t && t.addEventListener("submit", this.handleSubmit);
    const a = this._shadowRoot.querySelector(".rating-form__stars");
    a && a.addEventListener("change", this.handleStarRatingChange);
    const r = this._shadowRoot.querySelector("textarea#feedback");
    r && r.addEventListener("input", this.handleCharCountChange), this.updateSubmitButtonState();
  }
  disconnectedCallback() {
    const t = this._shadowRoot.querySelector(".rating-form__stars");
    t && t.removeEventListener("change", this.handleStarRatingChange);
    const a = this._shadowRoot.querySelector("textarea#feedback");
    a && a.removeEventListener("input", this.handleCharCountChange);
  }
}
customElements.define("star-rating", s);
export {
  s as default
};
