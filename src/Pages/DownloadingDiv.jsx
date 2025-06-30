
import { PDFDownloadLink, Document, Page, PDFViewer } from '@react-pdf/renderer';
import { useState } from 'react';
import EngPDF from '../Components/pdfFiles/engPDF';


export default function DownloadingDiv() {
  const [name, setName] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');



  return (
    <>
      <div className="items-center text-center pt-10">
        <p className="text-3xl">Has regalado una experiencia?</p>
        <p className="text-3xl">Obten tu PDF personalizado para imprimir!!!</p>
        <input
          className="h-10 w-32 pl-2 rounded-md shadow-sm border border-emerald-700 hover:shadow-md"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="h-10 w-32 pl-1 rounded-md shadow-sm border border-emerald-700 hover:shadow-md"
          type="date"
          placeholder="Fecha de entrada"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />
        <input
          className="h-10 w-32 pl-1 rounded-md shadow-sm border border-emerald-700 hover:shadow-md"
          type="date"
          placeholder="Fecha de salida"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />
        <select>
          <option value="eng">English</option>
          <option value="es">Català</option>
          <option value="cat">Español</option>
        </select>
        {/* <button className='h-10 w-36 bg-[#556B2F] text-white font-bold rounded-md'>
            <PDFDownloadLink
                document={<EngPDF name={name} checkInDate={checkInDate} checkOutDate={checkOutDate} />}
                fileName="CalMassesFile.pdf"
            >
                {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Download now!'
                }
          </PDFDownloadLink>
        </button> */}
          {/* <EngPDF name={name} checkInDate={checkInDate} checkOutDate={checkOutDate} /> */}
      </div>
    </>
  );
}