import Image from "next/image";
import LogoSvg from "@/icons/magnifying-glass-solid.svg";
import LangChanger from "../language/LangChanger";

const LayoutHeader = () => {
  return (
    <header className="text-center flex justify-between items-center w-full border">
      <a id="logo" href="/">
        <div id="logo--icon-wrapper">
          <Image src={LogoSvg} alt="" id="logo--icon"></Image>
        </div>
        <h1 id="logo--text">
          Instagram
          <br />
          Followback
          <br />
          Scanner
        </h1>
      </a>
      <LangChanger />
    </header>
  );
};

export default LayoutHeader;
