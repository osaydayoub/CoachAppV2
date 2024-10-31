import React, { useRef, useState, useEffect } from "react";
import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/library";
import "./BarcodeScanner.css";
import Webcam from "react-webcam";
import axios from "axios";
import NutritionCard from "../NutritionCard/NutritionCard";
import { Button ,Box } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { useData } from "../../context/DataContext.jsx";
// Define the limit as a constant outside the component
const MAX_SCAN_ATTEMPTS = 15;

const BarcodeScanner = () => {
  const { getProductByBarcodeNumber } = useData();
  const [data, setData] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);
  //"idle", "loading", "success","no_data", or "error"
  const [nutritionDataFetchStatus, setNutritionDataFetchStatus] =
    useState("idle");
  const [isScanning, setIsScanning] = useState(false);
  const [useMainCamera, setUseMainCamera] = useState(true);
  const webcamRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const captureIntervalRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const [tryScanAgain, setTryScanAgain] = useState(false);

  const handleScanning = () => {
    setCounter(0);
    setTryScanAgain(false);
    setData(null);
    setNutritionData(null);
    setNutritionDataFetchStatus("idle");

    if (!isScanning) {
      startScanning();
    } else {
      stopScanning();
    }
    setIsScanning(!isScanning);
  };

  const handleManualInput = (barcode) => {
    setData(barcode);
    fetchNutritionData(barcode);
    setTryScanAgain(false); // Reset the try again state
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

          if (newCounter >= MAX_SCAN_ATTEMPTS) {
            // Check if the counter reaches 30
            console.log("Reached maximum scanning attempts");
            setTryScanAgain(true);
            stopScanning(); // Stop scanning when counter hits 30
          }
          return newCounter;
        });
      }
    }, 500); // Scans every 500ms (0.5 second)
  };

  const stopScanning = () => {
    console.log("Stopping scan");
    setIsScanning(false);
    // setCounter(0);
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
      if (response.data.status === 1) {
        const newNutritionData =
          response.data.product.nutriments["energy-kcal_100g"];
        console.log(newNutritionData);
        setNutritionData(newNutritionData);
        setNutritionDataFetchStatus("success");
      } else {
        if (response.data.status === 0)
          //TODO search in our app databace
          try {
            const productData = await getProductByBarcodeNumber(barcode);
            if (!productData ) {
              setNutritionDataFetchStatus("no_data");
              setNutritionData(null);
              return;
            }
            setNutritionData(productData.caloriesIn100g);
            setNutritionDataFetchStatus("success");
          } catch (error) {
            //console.log(error);
            setNutritionDataFetchStatus("no_data");
            setNutritionData(null);
          }
      }
    } catch (error) {
      console.log(error);
      setNutritionDataFetchStatus("error");
      // throw new Error(error.)
    }
  };

  return (
    <Box
    sx={{
      p: 2,
      maxWidth: 400,
      border: "2px solid #1976d2",
      borderRadius: "8px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
      display: "flex",
      flexDirection:"column",
      justifyContent: "center", /* Horizontally centers the content */
      alignItems: "center", 
    }}
  >
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
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        endIcon={isScanning ? <StopIcon /> : <PlayArrowIcon />}
        onClick={handleScanning}
      >
        {isScanning ? "Stop Scanning" : "Start Scanning"}
      </Button>
      {(nutritionData ||
        tryScanAgain ||
        nutritionDataFetchStatus === "no_data") && (
        <NutritionCard
          status={
            tryScanAgain || nutritionDataFetchStatus === "no_data"
              ? "failed"
              : "success"
          }
          scannedBarcode={data}
          nutritionData={nutritionData}
          nutritionDataFetchStatus={nutritionDataFetchStatus}
          handleManualInput={handleManualInput}
        />
      )}
    </Box>
  );
};

export default BarcodeScanner;
