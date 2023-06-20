import {
  TutorFormWelcome,
  TutorFormProgressBar,
  TutorFormDataLeft,
  EnviarPerfilButton,
  CancelarPerfilButton,
} from "../../components";

import JobPosition from "../../components/FormTutor/TutorExperience/JobPosition";
import JobName from "../../components/FormTutor/TutorExperience/JobName";
import JobLocation from "../../components/FormTutor/TutorExperience/JobLocation";
import JobDuration from "../../components/FormTutor/TutorExperience/JobDuration";
import JobCheckbox from "../../components/FormTutor/TutorExperience/JobCheckbox";
import JobDescription from "../../components/FormTutor/TutorExperience/JobDescription";
import JobTechnologies from "../../components/FormTutor/TutorExperience/JobTechnologies";

const TutorFormExperience = (props) => {
  return (
    <>
      {/* <NavUserNotifications /> */}
      <section className="bg-[#FAFBFC] h-full w-full">
        <div className="flex flex-col pt-[33px]">
          <TutorFormWelcome user="" />
          <TutorFormProgressBar />
        </div>

        <section className="flex justify-center mt-[33px] mx-28">
          <TutorFormDataLeft />
          <section className="flex flex-col bg-white rounded-[8px] border w-full border-[#1414140D] gap-[18px] ml-6">
            <div className="mx-[52px] my-[36px] ">
              <div className="flex flex-row items-center mb-[50px]">
                <h2 className="font-inter font-bold text-[25px] text-[#05004E] text-left">
                  Empleo
                </h2>
              </div>

              <div className="flex space-x-8">
                <div className="block w-full">
                  <JobPosition />
                </div>
                <div className="block w-full">
                  <JobName />
                </div>
              </div>

              <div>
                <JobLocation />
              </div>

              <div className="flex space-x-8 mt-[50px] mb-[50px]">
                <JobDuration />
              </div>

              <div className="flex space-x-6 items-center">
                <JobCheckbox />
              </div>

              <div className="mt-[50px] mb-[30px]">
                <JobDescription />
              </div>

              <div className="mt-[50px] mb-[30px]">
                <JobTechnologies />
              </div>
            </div>
          </section>
        </section>
        <section className="flex justify-end items-center space-x-4 mx-28 pt-6 pb-[64px]">
          <CancelarPerfilButton />
          <EnviarPerfilButton title="Guardar" />
        </section>
      </section>
    </>
  );
};

export default TutorFormExperience;
