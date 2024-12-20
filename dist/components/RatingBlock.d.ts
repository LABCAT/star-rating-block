interface RatingBlockProps {
    headingText?: string;
    submitText?: string;
    totalStars?: number;
    maxChar?: number;
    onSubmit?: (data: any) => void;
    debugMode?: boolean;
}
declare class RatingBlock extends HTMLElement implements RatingBlockProps {
    private _shadowRoot;
    totalStars: number;
    headingText: string;
    submitText: string;
    maxChar: number;
    debugMode: boolean;
    onSubmit?: (data: any) => void;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    private isValidProp;
    private render;
    private createStars;
    private updateSubmitButtonState;
    private handleStarRatingChange;
    private handleCharCountChange;
    private handleSubmit;
    private setupEventListeners;
    disconnectedCallback(): void;
}
export default RatingBlock;
