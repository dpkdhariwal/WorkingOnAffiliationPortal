import React, { useState } from 'react';

export default function FileViewer({ file }) {
    const viewFile = () => {
        
        if (!file) return;

        const fileURL = URL.createObjectURL(file);
        const childWindow = window.open("", "_blank", "width=800,height=600");

        if (childWindow) {
            // Image, PDF, etc. will be shown inline
            const isImage = file.type.startsWith("image/");
            const isPDF = file.type === "application/pdf";

            if (isImage || isPDF) {
                childWindow.document.write(`
            <html>
              <head><title>View File</title></head>
              <body style="margin:0;padding:0;">
                <embed src="${fileURL}" width="100%" height="100%" type="${file.type}" />
              </body>
            </html>
          `);
            } else {
                // For other types like .docx, .xlsx, show download link
                childWindow.document.write(`
            <html>
              <head><title>Download File</title></head>
              <body>
                <p>File cannot be displayed. <a href="${fileURL}" download="${file.name}">Click to download</a>.</p>
              </body>
            </html>
          `);
            }

            childWindow.document.close();
        } else {
            alert("Popup blocked. Please allow popups for this site.");
        }
    }
    return (
        <>
            <button onClick={viewFile}>View Uploaded File</button>
            <button onClick={viewFile}>Remove</button>
        </>
    );
}
