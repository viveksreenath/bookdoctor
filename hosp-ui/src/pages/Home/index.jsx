import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { usePDF } from "react-to-pdf";
import "./home.css";

import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const onBtnBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <Navbar />
      <Header text="This is main home page" />
      <Button text="Go Back" onClick={onBtnBack} />
      <Button onClick={() => toPDF()} text="Download PDF" />
      <div ref={targetRef}>Content to be generated to PDF</div>
    </div>
  );
};
export default Home;
