
const JobDuration = () => {
    return (
        <>
            <div className='block w-full'>
                <p className='text-[#737791] font-inter text-base mb-[30px] font-medium leading-[27px] tracking-normal text-left'>
                    Desde *
                </p>
                <input
                    className='w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2]'
                    name=''
                />
                {/* <div className='pt-3'>
                    {errorsData.name && (
                        <p className='font-inter font-normal italic text-red-500 text-left -mt-5'>
                            {errorsData.name}
                        </p>
                    )}
                </div> */}
            </div>
            <div className='block w-full'>
                <p className='text-[#737791] font-inter text-base mb-[30px] font-medium leading-[27px] tracking-normal text-left'>
                    Hasta *
                </p>
                <input
                    className='w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2]'
                    name=''
                />
                {/* <div className='pt-3'>
                    {errorsData.name && (
                        <p className='font-inter font-normal italic text-red-500 text-left -mt-5'>
                            {errorsData.name}
                        </p>
                    )}
                </div> */}
            </div>
        </>
    )
}

export default JobDuration