//index.js
import './components/RatingBlock.ts';

const app = document.getElementById('app');
const ratingElement = document.createElement('star-rating');
app.appendChild(ratingElement);