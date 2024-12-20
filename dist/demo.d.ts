import './components/RatingBlock';
interface RatingFormData {
    rating: number;
    feedback: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'star-rating': StarRatingBlockElement;
    }
    interface StarRatingBlockElement extends HTMLElement {
        onSubmit: (data: RatingFormData) => void;
    }
}
export {};
