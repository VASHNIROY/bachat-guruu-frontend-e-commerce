import { DNA } from "react-loader-spinner";
import "./Loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
}

export default Loader;