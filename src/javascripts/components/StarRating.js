import React from 'react';
import { FaStar } from 'react-icons/fa';

export default function StarRating(props) {
  const selectedStars = props.selectedStars;
  const totalStars = props.totalStars;
	return (
		<>
			{createArray(totalStars).map((n, i) => (
				<FaStar key={i} selected={selectedStars > i} />
			))}
		</>
	);
}

// This seems like it should be working, but it isn't. 