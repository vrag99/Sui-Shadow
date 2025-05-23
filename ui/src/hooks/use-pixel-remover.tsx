import { useRef, useState } from "react";

const usePixelRemover = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [outputSrc, setOutputSrc] = useState<string | null>(null);
  const [slicedBlocks, setSlicedBlocks] = useState<string[]>([]);

  const handleImageUpload = (file?: File) => {
    if (!file) return;

    const img = new Image();
    img.onload = () => processImage(img);
    img.src = URL.createObjectURL(file);
  };

  const processImage = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Maintain original aspect ratio
    const width = img.width;
    const height = img.height;
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Remove 4 blocks, one from each quadrant, each of size 1/10th of the area
    const blockArea = Math.floor((width * height) / 10);
    const blockSize = Math.floor(Math.sqrt(blockArea)); // block is square
    const sliced: string[] = [];
    const coords: {x: number, y: number}[] = [];
    const quadrants = [
      { xMin: 0, xMax: Math.floor(width / 2) - blockSize, yMin: 0, yMax: Math.floor(height / 2) - blockSize }, // Top-left
      { xMin: Math.ceil(width / 2), xMax: width - blockSize, yMin: 0, yMax: Math.floor(height / 2) - blockSize }, // Top-right
      { xMin: 0, xMax: Math.floor(width / 2) - blockSize, yMin: Math.ceil(height / 2), yMax: height - blockSize }, // Bottom-left
      { xMin: Math.ceil(width / 2), xMax: width - blockSize, yMin: Math.ceil(height / 2), yMax: height - blockSize }, // Bottom-right
    ];
    for (const q of quadrants) {
      const x0 = q.xMin + Math.floor(Math.random() * Math.max(1, q.xMax - q.xMin + 1));
      const y0 = q.yMin + Math.floor(Math.random() * Math.max(1, q.yMax - q.yMin + 1));
      coords.push({ x: x0, y: y0 });
      // Extract the block before making it transparent
      const blockCanvas = document.createElement("canvas");
      blockCanvas.width = blockSize;
      blockCanvas.height = blockSize;
      const blockCtx = blockCanvas.getContext("2d");
      if (blockCtx) {
        blockCtx.drawImage(
          img,
          x0,
          y0,
          blockSize,
          blockSize,
          0,
          0,
          blockSize,
          blockSize
        );
        sliced.push(blockCanvas.toDataURL("image/png"));
      }
      for (let y = y0; y < y0 + blockSize; y++) {
        for (let x = x0; x < x0 + blockSize; x++) {
          const index = (y * width + x) * 4;
          data[index + 3] = 0; // Set alpha to 0 (transparent)
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
    const newImageUrl = canvas.toDataURL("image/*");
    setOutputSrc(newImageUrl);
    setSlicedBlocks(sliced);
    sendToApi({ blocks: sliced, coords, obfuscated: newImageUrl });
  };

  const sendToApi = async (payload: { blocks: string[], coords: {x: number, y: number}[], obfuscated: string }) => {
    try {
        // TODO: Walrus endpt
      await fetch("https://your-api-endpoint.com/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      // Optionally handle error
      console.error("Failed to send to API", err);
    }
  };

  const handleDownload = () => {
    if (!outputSrc) return;
    const link = document.createElement("a");
    link.href = outputSrc;
    link.download = "modified-image.png";
    link.click();
  };

  return {
    canvasRef,
    outputSrc,
    slicedBlocks,
    handleImageUpload,
    handleDownload,
  };
};

// Sample implementation

// import React from 'react';
// import { usePixelRemover } from './path/to/pixel';

// const MyCustomComponent = () => {
//   const {
//     canvasRef,
//     outputSrc,
//     slicedBlocks,
//     handleImageUpload,
//     handleDownload,
//   } = usePixelRemover();

//   return (
//     <div>
//       <h1>My Custom Pixel Processor</h1>
      
//       {/* You need the canvas element with the ref */}
//       <canvas ref={canvasRef} style={{ display: "none" }} />
      
//       {/* Use the upload handler */}
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
      
//       {/* Display results however you want */}
//       {outputSrc && (
//         <div>
//           <img src={outputSrc} alt="Processed" />
//           <button onClick={handleDownload}>Download</button>
          
//           {/* Show sliced blocks in your own layout */}
//           {slicedBlocks.map((block, i) => (
//             <img key={i} src={block} alt={`Block ${i}`} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const PixelRemover: React.FC = () => {
//   const {
//     canvasRef,
//     outputSrc,
//     slicedBlocks,
//     handleImageUpload,
//     handleDownload,
//   } = usePixelRemover();

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h2>Random Pixel Remover</h2>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       <canvas ref={canvasRef} style={{ display: "none" }} />
//       {outputSrc && (
//         <div style={{ marginTop: "1rem" }}>
//           <img src={outputSrc} alt="Modified" />
//           <br />
//           <button onClick={handleDownload} style={{ marginTop: "0.5rem" }}>
//             Download Image
//           </button>
//           {slicedBlocks.length > 0 && (
//             <div style={{ marginTop: "1rem" }}>
//               <h4>Sliced Blocks</h4>
//               <div style={{ display: "flex", gap: "1rem" }}>
//                 {slicedBlocks.map((src, i) => (
//                   <img key={i} src={src} alt={`Block ${i + 1}`} style={{ border: "1px solid #ccc", width: 64, height: 64, objectFit: "contain" }} />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

export { usePixelRemover };
