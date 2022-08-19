import React, { useCallback, useRef } from "react";
import './webcamCapture.css'
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useDispatch } from "react-redux"
import { setCameraImage } from "./features/cameraSlice";
import { useNavigate } from "react-router-dom";

const videoConstrains = {
  width: 250,
  height: 400,
  facingMode: "user",
};

function WebcamCapture() {
  const webcamRef = useRef(null);
  //const [ image, setImage ] = useState(null)
  // nevigate to specific location
  const navigate = useNavigate()
  // dispatch action
  const dispatch = useDispatch()

  // capture button
  const capture = useCallback(() => {
    // Capture once then save the output
    // run fx again only wheb ref is changes
    // when capture is executed again it will be faster
    const imageSrc = webcamRef.current.getScreenshot();

    // // // //
    // test capture button
    //console.log(imageSrc)
    //setImage(imageSrc)
    // // // //

    // dispatch capture action
    dispatch(setCameraImage(imageSrc))
    navigate('/preview')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef]);

  return (
    <div className="webcamCapture">
      <Webcam
        ref={webcamRef}
        audio={false}
        height={videoConstrains.height}
        width={videoConstrains.width}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstrains}
      />
      <RadioButtonUncheckedIcon
        className="webcamCapture__button"
        onClick={capture}
        fontSize="large"
      />
      {/* Test  image capture result*/}
      {/* <img src={image} alt=''/>*/}
    </div>
  );
}

export default WebcamCapture;
