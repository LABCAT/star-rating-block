import './components/RatingBlock';  // Remove .js extension

// Add type assertion for app element
const app = document.getElementById('app');
if (!app) {
  throw new Error('App element not found');
}

// Create custom element with proper type
const ratingElement = document.createElement('star-rating') as HTMLElementTagNameMap['star-rating'];

// Enable debug mode and set max character limit
ratingElement.setAttribute('debug-mode', 'true');
ratingElement.setAttribute('max-char', '600');

// Define the type for the form data
interface RatingFormData {
  rating: number;
  feedback: string;
}

// Add submit callback with typed data parameter
ratingElement.onSubmit = (data: RatingFormData) => {
  const formattedMessage =
    `Rating Submitted!\n\n` +
    `★ Rating: ${data.rating} out of 5 stars\n` +
    `✍️ Feedback: ${data.feedback || 'No feedback provided'}`;
  alert(formattedMessage);
};

app.appendChild(ratingElement);