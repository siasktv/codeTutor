/* eslint-disable react/prop-types */
const LanguageTutor = (props) => {
    return (
      <h2 className="font-semibold text-sm text-gray-600">
        {props.languages.map(language => (
          language.language)
        )}
        </h2>
    );
}
export default LanguageTutor;