import React, { useRef, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

export default function LiveCanvasCamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fullscreenRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [gps, setGps] = useState({ lat: null, lon: null });
  const [photoURL, setPhotoURL] = useState(null);
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const ITI_NAME =
    "K S PRIVATE ITI PRIVATE INDUSTRIAL TRAINING INSTITUTE, BIJNOR";
  const ADDRESS =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

  useEffect(() => {
    if (!show) return;
    if (!previewMode) startCamera();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGps({
          lat: position.coords.latitude.toFixed(6),
          lon: position.coords.longitude.toFixed(6),
        });
      },
      (err) => console.error("Geolocation error:", err)
    );

    return () => {
      stopCamera();
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [show]);

  useEffect(() => {
    if (!show || !cameraActive || previewMode) return;

    const drawFrame = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const video = videoRef.current;

      if (video && canvas && video.readyState === 4) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        context.fillStyle = "white";
        context.font = "10px Arial";
        context.shadowColor = "black";
        context.shadowBlur = 4;

        context.textAlign = "left";
        context.fillText("Affiliation Portal", 10, 20);

        context.textAlign = "right";
        context.direction = "rtl";
        context.fillText(ITI_NAME, canvas.width - 10, 20);
        context.direction = "ltr";

        const gpsY = canvas.height - 40;
        const addressY = canvas.height - 20;

        context.textAlign = "left";
        if (gps.lat && gps.lon) {
          context.fillText(`Lat: ${gps.lat}, Lon: ${gps.lon}`, 10, gpsY);
          context.fillText(`Address: ${ADDRESS}`, 10, addressY);
        }

        context.save();
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate((-45 * Math.PI) / 180);
        context.globalAlpha = 0.2;
        context.fillStyle = "white";
        context.font = "40px Arial";
        context.textAlign = "center";
        context.fillText("Nimi Affiliation Portal", 0, 0);
        context.restore();
      }

      animationFrameRef.current = requestAnimationFrame(drawFrame);
    };

    drawFrame();
  }, [gps, show, cameraActive, previewMode]);

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    setPhotoURL(image);
    setPhotoCaptured(true);
    stopCamera();
    setShow(false);
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream && stream.getTracks) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setCameraActive(false);
    cancelAnimationFrame(animationFrameRef.current);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Camera start error:", err);
    }
  };

  const handleReclick = () => {
    setPhotoCaptured(false);
    setPhotoURL(null);
    setPreviewMode(false);
    setShow(true);
  };

  const handleShow = (breakpoint = true) => {
    setFullscreen(breakpoint);
    setShow(true);
    setPreviewMode(false);

    // Trigger Fullscreen API
    setTimeout(() => {
      if (fullscreenRef.current?.requestFullscreen) {
        fullscreenRef.current.requestFullscreen().catch((err) => {
          console.error("Fullscreen request failed:", err);
        });
      }
    }, 0);
  };

  const handleClose = () => {
    setShow(false);
    // Removed: document.exitFullscreen() to prevent auto-exit
  };

  const handleView = () => {
    setPreviewMode(true);
    setShow(true);
  };

  const handleRemove = () => {
    setPhotoCaptured(false);
    setPhotoURL(null);
    setPreviewMode(false);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        console.log("Exited fullscreen mode");
        // You can run any custom logic here
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    console.log(fullscreen);
  }, []);

  return (
    <>
      {!photoCaptured && (
        <Button
          variant="primary"
          className="label-btn label-start"
          onClick={() => handleShow()}
        >
          <i className="ri-camera-fill label-btn-icon me-2"></i>
          Open Camera
        </Button>
      )}

      {photoCaptured && photoURL && (
        <div className="mt-3">
          <Button
            variant="outline-success"
            className="me-2"
            onClick={handleView}
          >
            View Image
          </Button>
          <Button variant="outline-danger" onClick={handleRemove}>
            Remove Image
          </Button>
        </div>
      )}

      {show && (
        <div className="d-flex justify-content-center mb-3">
          <div ref={fullscreenRef}>
            {previewMode && photoURL ? (
              <img
                src={photoURL}
                alt="Captured"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  style={{
                    display: "none",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <canvas
                  ref={canvasRef}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    // position: "absolute",
                    // top: 0,
                    // left: 0,
                  }}
                />
              </>
            )}
            <div
              className="d-flex align-items-start flex-column mb-3"
              style={{
                height: "100%",
                position: "absolute",
                top: "0",
                width: "100%",
              }}
            >
              <div
                className="mb-auto p-2"
                style={{ width: "100%", padding: "0px !important" }}
              >
                {" "}
                <div className="bg-primary" style={{ width: "100%" }}>
                  <div className="d-flex" style={{ "align-items": "center" }}>
                    <div className="p-2 flex-grow-1">
                      Upload Front View Photo of Building
                    </div>
                    <div className="p-2">
                      {" "}
                      <Button size="sm" variant="dark" className="btn-wave">
                        Change Camera
                      </Button>
                    </div>
                    <div className="p-2">
                      <Button
                        variant="info"
                        onClick={handleClose}
                        className="btn-icon btn-wave"
                      >
                        <i className="ri-close-line"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <>
                  <video
                    ref={videoRef}
                    style={{
                      display: "none",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <canvas
                    ref={canvasRef}
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "block",
                      // position: "absolute",
                      // top: 0,
                      // left: 0,
                    }}
                  />
                </>
              </div>
              <div
                className="p-2"
                style={{ width: "100%", padding: "0px !important" }}
              >
                <div
                  className="d-flex align-items-end flex-column"
                  style={{ width: "100%" }}
                >
                  <div className="d-flex mb-3">
                    <div className="p-2">
                      {" "}
                      <Button size="lg" variant="success" className="btn-wave">
                        Change Camera
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
