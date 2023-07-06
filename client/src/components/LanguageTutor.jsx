/* eslint-disable react/prop-types */
const LanguageTutor = props => {
  return (
    <h2 className='pl-1 font-semibold text-sm text-[#141414B2] dark:text-gray-400'>
      {props.languages.map(language => (
        <span key={language.language}>
          {language.language}
          {language !== props.languages[props.languages.length - 1] && ', '}
        </span>
      ))}
    </h2>
  )
}
export default LanguageTutor
