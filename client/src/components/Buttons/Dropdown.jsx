/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortedByLocation } from '../../redux/features/tutors/tutorsSlice';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const locations = useSelector((state) => state.tutors.locations);
  const dispatch = useDispatch();

  const handleFilterByLocation = (location) => {
    dispatch(sortedByLocation(location));
  };


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleDropdown}>Toggle Dropdown</button>
      {isOpen && (
        <div
          
        >
          <div className="py-1" role="none">
            {locations.map((location) => (
              <button
                key={location}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-codecolor"
              >
                {/* Dropdown Content */}
                {location}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;
