"use client";


import "react-quill/dist/quill.bubble.css";


export const Preview = ({ value }) => {
  return <div className="inline-block" dangerouslySetInnerHTML={{ __html: value }} />;
};
