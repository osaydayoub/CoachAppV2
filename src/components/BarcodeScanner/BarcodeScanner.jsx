import React, { useRef, useState, useEffect } from 'react';
import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/library';
import Webcam from 'react-webcam';
import axios from "axios";
const BarcodeScanner = () => {
  const [data, setData] = useState('No barcode detected');
  const [nutritionData, setNutritionData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [useMainCamera, setUseMainCamera] = useState(true);
  const webcamRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const captureIntervalRef = useRef(null);
  const [counter, setCounter] = useState(0);

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

    console.log('Starting scan');
    setIsScanning(true);

    captureIntervalRef.current = setInterval(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          console.log('Captured image for scanning');
          scanBarcode(imageSrc);
        } else {
          console.log('No image captured');
        }
        setCounter((prevCounter) => prevCounter + 1);
      }
    }, 2000); // Scans every 1000ms (1 second)
  };

  const stopScanning = () => {
    console.log('Stopping scan');
    setIsScanning(false);
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
    }
  };

  const scanBarcode = (imageSrc) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      console.log('Scanning barcode');
      codeReader.current
        .decodeFromImageElement(image)
        .then((result) => {
          if (result) {
            console.log('Barcode detected:', result.text);
            setData(result.text); // Set the barcode text
            fetchNutritionData(result.text); // Fetch nutrition data
            stopScanning(); // Stop scanning once a barcode is detected
          } else {
            console.log('Barcode not detected');
            setData('Barcode not detected');
          }
        })
        .catch((err) => {
          console.error('Error decoding barcode:', err);
          setData('Error decoding barcode');
        });
    };

    image.onerror = (err) => {
      console.error('Error loading image:', err);
      setData('Error loading image');
    };
  };

  const fetchNutritionData = async (barcode) => {
    try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        );
        const newNutritionData=response.data.product.nutriments['energy-kcal_100g'];
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
      <h2>{`counter=${counter}`}</h2>
      {isScanning&&<Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        width={300}
        videoConstraints={{
            facingMode: useMainCamera ? 'environment' : 'user', // Toggle between rear and front camera
          }}
      />}
      <button onClick={() => setUseMainCamera(!useMainCamera)}>
        Switch to {useMainCamera ? 'Selfie' : 'Main'} Camera
      </button>
      <button onClick={startScanning} disabled={isScanning}>Start Scanning</button>
      <button onClick={stopScanning} disabled={!isScanning}>Stop Scanning</button>
      <p>Scanned Barcode: {data}</p>
      {nutritionData && (
        <div>
          <h2>Nutrition Information:</h2>
          {/* <p><strong>Product Name:</strong> {nutritionData.food_name}</p> */}
          <p><strong>Calories in 100 gr:</strong> {nutritionData}</p>
          {/* <p><strong>Serving Size:</strong> {nutritionData.serving_qty} {nutritionData.serving_unit}</p> */}
          {/* Add more nutritional details as needed */}
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
