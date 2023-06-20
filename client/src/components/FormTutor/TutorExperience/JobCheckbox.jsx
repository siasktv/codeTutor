import { useState } from 'react';

const JobCheckbox = () => {
    
    const [isChecked, setIsChecked] = useState(false);

    return (
        <>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className={"h-5 w-5"}
            />
            <label 
                className='text-[#737791] font-inter text-base font-medium leading-[27px] tracking-normal'
                htmlFor="checkbox"
            >
                Actualmente trabajo aquí
            </label>
        </>
    )
}

export default JobCheckbox