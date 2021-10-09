import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
export default function star (){
  const Star = ({ selected = false }) => (
		<FaStar color={selected ? 'red' : 'grey'} />
  );

}
