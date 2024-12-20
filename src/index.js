// index.js
import './components/RatingBlock.ts';

const app = document.getElementById('app');
const ratingElement = document.createElement('star-rating');

// Enable debug mode and set max character limit
ratingElement.setAttribute('debug-mode', 'true');
ratingElement.setAttribute('max-char', '600');

app.appendChild(ratingElement);
