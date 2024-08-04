import dynamic from 'next/dynamic';
import { useMemo, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const quillModules = {
  toolbar: {
    container: [
      ['undo', 'redo'],
      [{ 'header': [] }],
      ['bold', 'italic'],
      [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
      [
        { 'list': 'ordered' },
        { 'list': 'bullet' },
        { 'indent': '-1' },
        { 'indent': '+1' },
      ],
    ],
    handlers: {
      undo: function(this: any) {
        this.quill.history.undo();
      },
      redo: function(this: any) {
        this.quill.history.redo();
      }
    }
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  },
  clipboard: {
    matchVisual: false
  }
};

const quillFormats = ['header', 'bold', 'italic', 'blockquote', 'list', 'bullet', 'indent', 'align'];

interface HtmlEditorProps {
  value: string;
  onChange: (content: string) => void;
}

function HtmlEditor({ value, onChange }: HtmlEditorProps) {
  const modules = useMemo(() => quillModules, []);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="html-editor-container">
      <div className="custom-buttons">
        <div className="custom-undo">
          <svg viewBox="0 0 18 18">
            <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
            <path className="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
          </svg>
        </div>
        <div className="custom-redo">
          <svg viewBox="0 0 18 18">
            <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
            <path className="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
          </svg>
        </div>
      </div>
      <ReactQuill 
        modules={modules}
        formats={quillFormats}
        value={value}
        onChange={onChange}
        theme="snow"
        style={{
          height: '400px',
        }}
      />
      <style jsx global>{`
        .ql-container {
          font-family: Arial, sans-serif !important;
        }
        .ql-editor {
          font-family: Arial, sans-serif !important;
        }
        .ql-toolbar.ql-snow {
          padding-left: 20px;
        }
        .custom-buttons {
          position: absolute;
          top: 16px;
          left: 20px;
          z-index: 10;
          display: flex;
          gap: 10px;
          pointer-events: none;
        }
        .custom-buttons div {
          width: 22px;
          height: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .custom-buttons svg {
          width: 24px;
          height: 24px;
        }
        .custom-buttons .ql-stroke {
          fill: none;
          stroke: #444;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 1.5;
        }
        .custom-buttons .ql-fill {
          fill: #444;
        }
      `}</style>
      <style jsx>{`
        .html-editor-container {
          margin-bottom: 15px;
          position: relative;
        }
        @media (max-width: 768px) {
          .html-editor-container {
            margin-bottom: 50px;
          }
        }
      `}</style>
      <br />
    </div>
  );
}

export default HtmlEditor;