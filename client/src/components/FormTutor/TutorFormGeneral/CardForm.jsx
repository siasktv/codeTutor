import { AgregarButton } from '../../index';

const CardForm = ({ children, title }) => {
  return (
    <div className="bg-white w-full h-full border border-[#1414140D] rounded-[8px]">
      <div className="flex flex-col w-full gap-[62px] py-[36px] px-[52px]">
        <h2 className="font-inter text-xl font-semibold leading-[38px] tracking-normal text-left text-[#05004E]">
          {title}
        </h2>
        {children}
        <AgregarButton />
      </div>
    </div>
  );
};

export default CardForm;

