import { contrate, help, revision } from "../../assets/index";
import IconCodeTutor from "../../assets/IconCodeTutor.svg";
import dribbblef from "../../assets/dribbblef.svg";
import facebookf from "../../assets/facebookf.svg";
import githubf from "../../assets/githubf.svg";
import linkedinf from "../../assets/linkedinf.svg";
import twitterf from "../../assets/twitterf.svg";
import { Link } from "react-router-dom";


const LandingFooter = () => {
  return (
    <footer class="bg-[#101828] h-52 w-full flex p-10">
        <div className="flex flex-1 ">
            <div className="flex-col flex">
            <div className=" flex pt-2 ">
            <Link to='/'>
              <span className='inline-block h-10 w-52  '>
                <div className='flex'>
                  <div className='border-codecolor border-8 rounded-full w-8 h-8'></div>
                  <div className='border-gray-200 border-8 rounded-full w-8 h-8 -ml-5 mix-blend-soft-light'></div>
                  <h1 className='font-bold text-2xl ml-1 text-white'>Code-Tutor.</h1>
                </div>
              </span>
            </Link>
            </div>
            <h1 className="text-white pt-4">Soluciona tus problemas con la ayuda de expertos.</h1>
            <h1 className="text-[#98A2B3] text-left pt-6">© 2023 Code-Tutor. All rights reserved.</h1>
            
            </div>
        <div className="flex flex-1  justify-end">
        <div class="w-1/2">
          <form class="w-full">
            <label for="UserEmail" class="sr-only"></label>

            <div
              class="border  bg-white rounded-lg focus-within:ring sm:flex sm:items-center sm:gap-4"
            >
              <input
                type="email"
                id="UserEmail"
                placeholder="Email"
                class="w-full border-none outline-none text-lg pl-2"
              />

              <button
                class="mt-1 w-full bg-[#F9F5FF] rounded-lg px-6 py-3 text-sm font-bold  tracking-wide text-codecolor transition-none hover:bg-codecolor hover:text-white sm:mt-0 sm:w-auto sm:shrink-0"
              >
                Subscríbete
              </button>
            </div>
          </form>
          <ul
          class="col-span-2 pt-16 flex justify-start gap-6 lg:col-span-5 lg:justify-end"
        >
          <li>
            <a
              href="/"
              rel="noreferrer"
              target="_blank"
              class="text-gray-700 transition hover:opacity-75"
            >
              <span class="sr-only">Facebook</span>

              <img src={twitterf} alt="Twitter" />
            </a>
          </li>

          <li>
            <a
              href="/"
              rel="noreferrer"
              target="_blank"
              class="text-gray-700 transition hover:opacity-75"
            >
              <span class="sr-only">Instagram</span>

              <img src={linkedinf} alt="Linkedin" />
            </a>
          </li>

          <li>
            <a
              href="/"
              rel="noreferrer"
              target="_blank"
              class="text-gray-700 transition hover:opacity-75"
            >
              <span class="sr-only">Twitter</span>

              <img src={facebookf} alt="Facebook" />
            </a>
          </li>

          <li>
            <a
              href="/"
              rel="noreferrer"
              target="_blank"
              class="text-gray-700 transition hover:opacity-75"
            >
              <span class="sr-only">GitHub</span>

              <img src={githubf} alt="GitHub" />
            </a>
          </li>

          <li>
            <a
              href="/"
              rel="noreferrer"
              target="_blank"
              class="text-gray-700 transition hover:opacity-75"
            >
              <span class="sr-only">Dribbble</span>

              <img src={dribbblef} alt="Dribbble" />
            </a>
          </li>
        </ul>
        </div>
        </div>
        </div>
</footer>
  );
};

export default LandingFooter;