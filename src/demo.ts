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

const app = document.getElementById('app');
if (!app) {
  throw new Error('App element not found');
}

const ratingElement = app.querySelector('star-rating') as HTMLElementTagNameMap['star-rating'];
if (!ratingElement) {
  throw new Error('Rating element not found');
}

ratingElement.setAttribute('debug-mode', 'true');
ratingElement.setAttribute('max-char', '600');

ratingElement.onSubmit = (data: RatingFormData) => {
  const formattedMessage =
    `Rating Submitted!\n\n` +
    `★ Rating: ${data.rating} out of 5 stars\n` +
    `✍️ Feedback: ${data.feedback || 'No feedback provided'}`;
  alert(formattedMessage);
};