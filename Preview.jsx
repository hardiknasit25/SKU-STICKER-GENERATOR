// import { FaDownload } from "react-icons/fa";
// import './Preview.css'
// import { useRef } from "react";

// const Preview = ({ onClickHide, qrImage, qrCode, productName, skuName, mrp }) => {

//   return (
//     <div className='preview'>
//       <h2>Preview</h2>
//       <div className='p-data'>
//         {qrImage && <img src={URL.createObjectURL(qrImage)} className="qr" alt="Preview Image" />}
//         <div className='qr-num1'>{qrCode}</div>
//         <div className='qr-num2'>{productName}</div>
//         <div className='qr-name1'>{skuName}</div>
//         <div className='qr-name2' >MRP Rs. {mrp}.00 Price (Incl. All Taxes)</div>
//       </div>

//       <a href="" download className="download-btn">
//         <FaDownload /> Download PDF
//       </a>
//     </div>
//   )
// }

// export default Preview;

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "./Preview.css";

const Preview = ({ onClickHide, qrImage, qrCode, productName, skuName, mrp }) => {
  const previewRef = useRef(null);

  const capturePreview = () => {
    const element = previewRef.current;

    // Specify the desired scale factor
    const scaleFactor = 2.5; // Adjust as needed

    // Get the dimensions of the content
    const contentWidth = element.offsetWidth;
    const contentHeight = element.offsetHeight;

    // Create a canvas with adjusted dimensions based on the scale factor
    const canvas = document.createElement('canvas');
    canvas.width = contentWidth * scaleFactor;
    canvas.height = contentHeight * scaleFactor;
    canvas.style.width = contentWidth + 'px'; // Set the display size of the canvas
    canvas.style.height = contentHeight + 'px';

    const canvasContext = canvas.getContext('2d');

    html2canvas(element, { canvas: canvas, scale: scaleFactor }).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg');

      const pdf = new jsPDF(contentWidth > contentHeight ? 'l' : 'p', 'px', [contentWidth + 100, contentHeight + 50]);

      pdf.addImage(imgData, 'JPEG', 0, 0, contentWidth, contentHeight);

      pdf.save(`${skuName}.pdf`);
    });
  };

  return (
    <div className='preview'>
      <h2>Preview</h2>
      <div ref={previewRef} className='p-data'>
        <img src={URL.createObjectURL(qrImage)} className="qr" alt="Preview Image" />
        <div className='qr-num1'>{qrCode}</div>
        <div className='qr-num2'>{productName}</div>
        <div className='qr-name1'>{skuName}</div>
        <div className='qr-name2'>MRP Rs. {mrp}.00 Price (Incl. All Taxes)</div>
      </div>
      <p style={{ fontWeight: "500" }}>Size: 2 x 3</p>
      <button className="download-btn" onClick={capturePreview}>Download PDF</button>
    </div>
  );
}

export default Preview;
