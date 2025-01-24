import { BeatLoader } from "react-spinners";

const Loader = (props) => {
    const {color, size} = props;
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      Loading  <BeatLoader color={color} size={size} />
    </div>
  );
};

export default Loader;