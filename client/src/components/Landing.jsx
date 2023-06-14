const Landing = () => {
  return (
    <section>
      <div className='px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24'>
        <div className='flex flex-wrap items-center mx-auto max-w-7xl'>
          <div className='flex flex-col items-start mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0'>
            <span className='mb-8 text-xs font-bold tracking-widest text-blue-600 uppercase'>
              {' '}
              Your tagline{' '}
            </span>
            <h1 className='mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl'>
              Medium length display headline.
            </h1>
            <p className='mb-8 text-base leading-relaxed text-left text-gray-500'>
              Free and Premium themes, UI Kit's, templates and landing pages
              built with Tailwind CSS, HTML &amp; Next.js.
            </p>
            <div className='flex-col mt-0 lg:mt-6 max-w-7xl sm:flex'>
              <form
                action=''
                method='post'
                id='revue-form'
                name='revue-form'
                target='_blank'
                className='p-2 mt-8 transition duration-500 ease-in-out transform border2 bg-gray-50 rounded-xl sm:max-w-lg sm:flex'
              >
                <div className='flex-1 min-w-0 revue-form-group'>
                  <label htmlFor='member_email' className='sr-only'>
                    Email address
                  </label>
                  <input
                    id='cta-email'
                    type='email'
                    className='block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform bg-transparent border border-transparent rounded-md text-neutral-600 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300'
                    placeholder='Enter your email  '
                  />
                </div>
                <div className='mt-4 sm:mt-0 sm:ml-3 revue-form-actions'>
                  <button
                    type='submit'
                    value='Subscribe'
                    name='member[subscribe]'
                    id='member_submit'
                    className='block w-full px-5 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 sm:px-10'
                  >
                    Notify me
                  </button>
                </div>
              </form>
              <div className='sm:max-w-lg sm:flex'>
                <p className='mt-3 text-xs text-gray-500'>
                  By subscribing, you agree with Revues
                  <a target='_blank' href='https://www.getrevue.co/terms'>
                    Terms of Service
                  </a>
                  and
                  <a target='_blank' href='https://www.getrevue.co/privacy'>
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className='w-full lg:max-w-lg lg:w-1/2 rounded-xl'>
            <div>
              <div className='relative w-full max-w-lg'>
                <div className='absolute top-0 rounded-full bg-violet-300 -left-4 w-px500 h-px500 mix-blend-multiply '></div>

                <div className='absolute rounded-full bg-violet-300 -bottom-0 right-20 w-96 h-96 mix-blend-multiply '></div>
                <div className='relative'>
                  <img
                    className='object-cover object-center mx-auto rounded-lg shadow-2xl'
                    alt='hero'
                    src='src\assets\heroimg.png'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Landing
