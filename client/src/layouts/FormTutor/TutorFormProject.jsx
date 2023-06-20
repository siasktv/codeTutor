import { FlechaFiltro } from "../../assets";
import {
  TutorFormWelcome,
  TutorFormProgressBar,
  TutorFormDataLeft,
  EnviarPerfilButton,
  CancelarPerfilButton,
} from "../../components";

import ProjectDescription from "../../components/FormTutor/TutorProject/ProjectDescription";
import ProjectLink from "../../components/FormTutor/TutorProject/ProjectLink";
import ProjectName from "../../components/FormTutor/TutorProject/ProjectName";
import ProjectTechnologies from "../../components/FormTutor/TutorProject/ProjectTechnologies";

const TutorFormProject = (props) => {
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
                <h2 className="font-inter   font-bold text-[25px] text-[#05004E] text-left">
                  Proyecto
                </h2>
              </div>

              <div>
                <ProjectName />
              </div>

              <div>
                <ProjectLink />
              </div>

              <div className="mt-[50px] mb-[30px]">
                <ProjectDescription />
              </div>

              <div className="mt-[50px] mb-[30px]">
                <ProjectTechnologies />
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

export default TutorFormProject;
