import React, { useRef, useState, useEffect } from "react";
import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/library";
import "./BarcodeScanner.css";
import Webcam from "react-webcam";
import axios from "axios";
import Controls from "../Controls/Controls";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import NutritionCard from "../NutritionCard/NutritionCard";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&::before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&::after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const BarcodeScanner = () => {
  const [data, setData] = useState("No barcode detected");
  const [nutritionData, setNutritionData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [useMainCamera, setUseMainCamera] = useState(true);
  const webcamRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const captureIntervalRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  // Handler for Android12Switch
  const handleAndroidSwitchChange = (event) => {
    const checked = event.target.checked;

    if (checked) {
      startScanning(); // Start scanning when switched on
    } else {
      stopScanning(); // Stop scanning when switched off
    }

    setIsChecked(checked); // Update the state based on the switch position
    console.log("Android 12 Switch is " + (checked ? "On" : "Off"));
  };

  // Cleanup function to stop scanning when the component unmounts
  useEffect(() => {
    return () => {
      if (captureIntervalRef.current) {
        clearInterval(captureIntervalRef.current);
      }
    };
  }, []);

  const startScanning = () => {
    if (isScanning) return; // Prevent starting multiple scanning processes

    console.log("Starting scan");
    setIsScanning(true);

    captureIntervalRef.current = setInterval(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          console.log("Captured image for scanning");
          scanBarcode(imageSrc);
        } else {
          console.log("No image captured");
        }
        setCounter((prevCounter) => {
          const newCounter = prevCounter + 1;
          console.log(`counter=${newCounter}`);
          return newCounter;
        });
      }
    }, 400); // Scans every 500ms (0.5 second)
  };

  const stopScanning = () => {
    console.log("Stopping scan");
    setIsScanning(false);
    setIsChecked(false);
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
    }
  };

  const scanBarcode = (imageSrc) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      console.log("Scanning barcode");
      codeReader.current
        .decodeFromImageElement(image)
        .then((result) => {
          if (result) {
            console.log("Barcode detected:", result.text);
            setData(result.text); // Set the barcode text
            fetchNutritionData(result.text); // Fetch nutrition data
            stopScanning(); // Stop scanning once a barcode is detected
          } else {
            console.log("Barcode not detected");
            setData("Barcode not detected");
          }
        })
        .catch((err) => {
          // console.error("Error decoding barcode:", err);
          setData("Error decoding barcode");
        });
    };

    image.onerror = (err) => {
      console.error("Error loading image:", err);
      setData("Error loading image");
    };
  };

  const fetchNutritionData = async (barcode) => {
    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const newNutritionData =
        response.data.product.nutriments["energy-kcal_100g"];
      console.log(newNutritionData);
      setNutritionData(newNutritionData);
      // return response.data;
    } catch (error) {
      console.log(error);
      // throw new Error(error.)
    }
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <div className="scanner-container">
        {isScanning && (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            style={{ width: 270, height: 400 }}
            videoConstraints={{
              facingMode: useMainCamera ? "environment" : "user", // Toggle between rear and front camera
            }}
          />
        )}
      </div>

      <FormGroup>
        <FormControlLabel
          control={<Android12Switch checked={isChecked} />}
          label={isScanning ? "Stop Scanning" : "Start Scanning"}
          onChange={handleAndroidSwitchChange}
        />
        {/* <button onClick={() => setUseMainCamera(!useMainCamera)}>
          Switch to {useMainCamera ? "Selfie" : "Main"} Camera
        </button> */}
      </FormGroup>

      {/* <p>Scanned Barcode: {data}</p> */}
      {nutritionData && <NutritionCard scannedBarcode={data} nutritionData={nutritionData}/>
      // &&(
      //   <div>
      //     <h2>Nutrition Information:</h2>
      //     {/* <p><strong>Product Name:</strong> {nutritionData.food_name}</p> */}
      //     <p>
      //       <strong>Calories in 100 gr:</strong> {nutritionData}
      //     </p>
      //     {/* <p><strong>Serving Size:</strong> {nutritionData.serving_qty} {nutritionData.serving_unit}</p> */}
      //     {/* Add more nutritional details as needed */}
      //   </div>
      // )
      }
    </div>
  );
};

export default BarcodeScanner;
