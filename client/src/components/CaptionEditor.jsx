// // CaptionEditor.jsx
// import React from "react";

// const CaptionEditor = ({ caption, setCaption }) => {
//   const handleChange = (field, value) => {
//     setCaption({ ...caption, [field]: value });
//   };

//   return (
//     <div className="caption_settings mt-6">
//       <label className="block mb-1 font-medium">Caption Text</label>
//       <input
//         type="text"
//         value={caption.text}
//         onChange={(e) => handleChange("text", e.target.value)}
//         className="w-full p-1 rounded border"
//       />

//       <label className="block mt-2 font-medium">Font Size</label>
//       <input
//         type="number"
//         value={caption.fontSize}
//         onChange={(e) =>
//           handleChange("fontSize", parseInt(e.target.value, 10) || 30)
//         }
//         className="w-full p-1 rounded border"
//       />

//       <label className="block mt-2 font-medium">Text Color</label>
//       <input
//         type="color"
//         value={caption.fill}
//         onChange={(e) => handleChange("fill", e.target.value)}
//         className="w-full p-1 rounded border"
//       />

//       <label className="block mt-2 font-medium">Font Family</label>
//       <select
//         value={caption.fontFamily}
//         onChange={(e) => handleChange("fontFamily", e.target.value)}
//         className="w-full p-1 rounded border"
//       >
//         <option value="Arial">Arial</option>
//         <option value="Helvetica">Helvetica</option>
//         <option value="Times New Roman">Times New Roman</option>
//         <option value="Courier New">Courier New</option>
//         <option value="Verdana">Verdana</option>
//       </select>
//     </div>
//   );
// };

// export default CaptionEditor;
