import React, { useEffect, useState } from 'react';
import ReviewTile from './ReviewTile';
import { useRAndRContext } from '../../../../context/RAndRContext';

export default function ReviewsList() {
  const {
    reviews,
    reviewsFilter,
    count,
    reviewSearch,
    setShowAdd,
    setShowCollapse,
  } = useRAndRContext();
  const [shownReviews, setShownReviews] = useState(() => [<div />]);

  function searchFilter(review) {
    return (
      reviewSearch === ''
      || review.summary.toLowerCase().includes(reviewSearch.toLowerCase())
      || review.body.toLowerCase().includes(reviewSearch.toLowerCase())
      || review.reviewer_name.toLowerCase().includes(reviewSearch.toLowerCase())
      || review.response.toLowerCase().includes(reviewSearch.toLowerCase())
    );
  }

  useEffect(() => {
    setShownReviews(
      reviews.filter((review) => (Object.values(reviewsFilter).every((item) => item === false)
        || reviewsFilter[review.rating]) && searchFilter(review))
        .map((review) => <ReviewTile key={review.review_id} review={review} search={reviewSearch === '' ? null : reviewSearch} />),
    );
  }, [reviews, count, reviewsFilter, reviewSearch]);

  useEffect(() => {
    setShowAdd(shownReviews.length > count);
    console.log(shownReviews.slice(0, count).length);
    setShowCollapse(shownReviews.slice(0, count).length > 2);
  }, [shownReviews]);

  return (
    <div className="reviews-list">
      {shownReviews.slice(0, count)}
    </div>
  );
}
