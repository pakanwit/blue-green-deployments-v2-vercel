import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ children, onClose, onOK }) => {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="h-[80vh] flex items-center justify-center">
        <div className="relative p-8 bg-white rounded-xl shadow-lg w-4/5 max-w-md overflow-auto mt-[18vh] md:mt-[8vh]">
          <AiOutlineClose
            className="absolute top-4 right-4 text-xl cursor-pointer"
            onClick={onClose}
          />
          <div className="flex gap-4 flex-col">
            <div>{children}</div>
            <div className="flex gap-2 justify-end">
              <button className="transparent-button" onClick={onClose}>
                Cancel
              </button>
              <button className="button" onClick={onOK}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
