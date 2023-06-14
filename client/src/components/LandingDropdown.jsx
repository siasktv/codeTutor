import React, { useEffect } from 'react';
import marvin from '../assets/Marvin.svg';
import albert from '../assets/Albert.svg';
import courtney from '../assets/Courtney.svg';

function LandingDropdown() {
  useEffect(() => {
    const button = document.getElementById('menu-button');
    const dropdown = document.querySelector('.absolute[role="menu"]');

    const handleButtonClick = () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !expanded);
      dropdown.style.display = expanded ? 'none' : 'block';
    };

    button.addEventListener('click', handleButtonClick);

    return () => {
      button.removeEventListener('click', handleButtonClick);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-violet-100 px-3 py-2 text-md font-semibold text-codecolor shadow-sm hover:bg-violet-200"
          id="menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          Explora
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 10"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className="absolute left-1 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
        style={{ display: 'none' }}
      >
        <div className="py-1" role="none">
          <a
            href="#"
            className="text-codecolor flex items-center px-4 py-2 text-sm hover:bg-gray-200"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-0"
          >
            <img src={marvin} className='w-8' alt="Marvin" />
            <span className="ml-2">Marvin McKinney</span>
          </a>
          <a
            href="#"
            className="text-codecolor flex items-center px-4 py-2 text-sm hover:bg-gray-200"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-1"
          >
            <img src={albert} className='w-8' alt="Albert" />
            <span className="ml-2">Albert Flores</span>
          </a>
          <a
            href="#"
            className="text-codecolor flex items-center px-4 py-2 text-sm hover:bg-gray-200"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-2"
          >
            <img src={courtney} className='w-8' alt="Courtney" />
            <span className="ml-2">Courtney Henry</span>
          </a>
          
          <a
            href="#"
            className="text-codecolor flex items-center px-4 py-2 text-md border hover:bg-codecolor hover:text-white"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-2"
          >
            <span className="mx-8 font-bold">Explora a todos</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingDropdown;