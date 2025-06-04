import React, { useRef, useState, useEffect } from "react";
import { isMobile } from "react-device-detect";

import { Button, Modal } from "react-bootstrap";
import ReactDOM from "react-dom/client";
import Swal from "sweetalert2";

export default function LiveCanvasCamera({ label }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [gps, setGps] = useState({ lat: null, lon: null });
  const [photoURL, setPhotoURL] = useState(null);
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const [geoTaggedTitle, setGeoTaggedTitle] = useState(
    label ?? label ?? "No Name"
  );

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

        // Watermark styling
        context.fillStyle = "white";
        context.font = "10px Arial";
        context.shadowColor = "black";
        context.shadowBlur = 4;

        // Top-left
        context.textAlign = "left";
        context.fillText("Affiliation Portal", 10, 20);

        // Top-right RTL ITI name
        context.textAlign = "right";
        context.direction = "rtl";
        context.fillText(ITI_NAME, canvas.width - 10, 20);
        context.direction = "ltr";

        // Bottom-left: GPS + address
        context.textAlign = "left";
        const gpsY = canvas.height - 40;
        const addressY = canvas.height - 20;

        if (gps.lat && gps.lon) {
          context.fillText(`Lat: ${gps.lat}, Lon: ${gps.lon}`, 10, gpsY);
          context.fillText(`Address: ${ADDRESS}`, 10, addressY);
        }

        // Diagonal watermark
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
    // setShow(false);
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream && stream.getTracks) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setCameraActive(false);
    cancelAnimationFrame(animationFrameRef.current);
  };

  const [camView, setCamView] = useState("environment"); // "user" = front, "environment" = back

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: camView },
      });
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
    startCamera();
  };

  const fullscreenRef = useRef(null);
  const handleShow = (breakpoint = true) => {
    console.log(orientationType);

    if (
      orientationType != "landscape-primary" &&
      orientationType != "landscape-secondary"
    ) {
      Swal.fire({
        title: "Info",
        text: "Please use landscape mode to capture photo.",
        icon: "error",
      });
      return;
    }

    // if (!isMobile) {
    //   Swal.fire({
    //     title: "Info",
    //     text: "Please use mobile device to capture photo.",
    //     icon: "error",
    //   });
    //   return;
    // }
    // Trigger Fullscreen API

    if (fullscreenRef.current?.requestFullscreen) {
      fullscreenRef.current.requestFullscreen().catch((err) => {
        console.error("Fullscreen request failed:", err);
      });
    }

    setFullscreen(breakpoint);
    setShow(true);
    setPreviewMode(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleView = () => {
    // setPreviewMode(true);
    // setShow(true);
    viewPhoto();
  };

  const handleRemove = () => {
    setPhotoCaptured(false);
    setPhotoURL(null);
    setPreviewMode(false);
  };

  const saveGeoTaggedPhoto = () => {
    console.log("dfadf");
    setShow(false);
  };

  const childWindowRef = useRef(null);

  const viewPhoto = () => {
    if (childWindowRef.current && !childWindowRef.current.closed) {
      childWindowRef.current.focus();
      return;
    }

    const newWindow = window.open("", "", "width=400,height=400");
    if (!newWindow) {
      alert("Popup blocked.");
      return;
    }

    newWindow.document.title = label ?? label ?? "No Name";

    const container = newWindow.document.createElement("div");
    newWindow.document.body.appendChild(container);

    const root = ReactDOM.createRoot(container);

    root.render(
      <img
        src={photoURL}
        alt="Captured"
        style={{ width: "100%", maxWidth: "100%" }}
      />
    );

    // Optional: Cleanup when the window is closed
    newWindow.addEventListener("beforeunload", () => {
      root.unmount();
    });

    childWindowRef.current = newWindow;
  };

  const [orientationType, setOrientationType] = useState("");
  const [orientationAngle, setOrientationAngle] = useState(0);

  useEffect(() => {
    const getOrientation = () => {
      const orientation =
        screen.orientation || screen.msOrientation || screen.mozOrientation;

      if (orientation) {
        setOrientationType(orientation.type);
        setOrientationAngle(orientation.angle);
      } else {
        console.warn("Screen Orientation API not supported.");
      }
    };

    const handleOrientationChange = () => {
      getOrientation();
    };

    // Initial check
    getOrientation();

    // Listen for orientation changes
    if (screen.orientation && screen.orientation.addEventListener) {
      screen.orientation.addEventListener("change", handleOrientationChange);
    } else {
      // Fallback
      window.addEventListener("orientationchange", handleOrientationChange);
    }

    return () => {
      if (screen.orientation && screen.orientation.removeEventListener) {
        screen.orientation.removeEventListener(
          "change",
          handleOrientationChange
        );
      } else {
        window.removeEventListener(
          "orientationchange",
          handleOrientationChange
        );
      }
    };
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center mb-3">
        <div className="p-2">
          <div style={{ padding: "10px" }}>
            {/* <label className="fw-bold mb-2 d-block">
            Upload Front View Photo of Building
            <span style={{ color: "red" }}>*</span>
          </label> */}

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
          </div>
        </div>
      </div>

      {/* ref={fullscreenRef} */}
      <div style={{padding: "3px"}}>
        <Modal
          style={{ "z-index": "99999999" }}
          ref={fullscreenRef}
          show={show}
          fullscreen={fullscreen}
          onHide={handleClose}
        >
          <Modal.Header
            closeButton
            className="bg-primary text-white"
            style={{ padding: "2px" }}
          >
            <Modal.Title as="h6">{geoTaggedTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: "0px" }}>
            {previewMode && photoURL ? (
              <img
                src={photoURL}
                alt="Captured"
                style={{ width: "100%", maxWidth: "100%" }}
              />
            ) : (
              <>
                <video ref={videoRef} style={{ display: "none" }} />
                <canvas
                  ref={canvasRef}
                  style={{ height: "100%", width: "100%" }}
                />
              </>
            )}
          </Modal.Body>
          {!previewMode && (
            <Modal.Footer style={{ padding: "2px" }}>
              {!photoCaptured ? (
                <Button size="sm" variant="warning" onClick={capturePhoto}>
                  Capture
                </Button>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="me-auto"
                    onClick={handleReclick}
                  >
                    Re-Capture
                  </Button>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={saveGeoTaggedPhoto}
                  >
                    Submit
                  </Button>
                </>
              )}
            </Modal.Footer>
          )}
        </Modal>
      </div>
    </>
  );
}

const ChildComponent = () => (
  <div style={{ padding: 20 }}>
    <h2>Hello from React Component!</h2>
    <button onClick={() => alert("Clicked!")}>Click Me</button>
  </div>
);
