/* eslint-disable react/prop-types */
const LanguageTutor = props => {
  return (
    <h2 className='font-semibold text-sm text-gray-600'>
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
