import { useState, useEffect, useRef } from 'react';
import { MdLoop } from "react-icons/md";
import useGetData from '../../hooks/useGetData';
import usePostDataFile from '@/hooks/usePostDataImage';
import { TableCell, TableRow } from "@/components/ui/table";
import ModalArchivo from '@/components/listas/ModalArchivo';

const Traspasos = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado del término de búsqueda
  const [filteredtraspasos, setFilteredtraspasos] = useState([]); // Estado de préstamos filtrados
  const inputRef = useRef(null); // Referencia al input para enfocarlo
  const { data: traspasosData = [], error: traspasosError, loading: traspasosLoading } = useGetData(['bajas/traspasos']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState('');

  // Enfocar el input cuando el componente se monta
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Actualizar los préstamos filtrados cuando traspasosData o searchTerm cambien
  useEffect(() => {
    if (traspasosData &&traspasosData['bajas/traspasos']) {
      const traspasos =traspasosData['bajas/traspasos'];
      
      if (searchTerm === "") {
        setFilteredtraspasos(traspasos); // Si no hay término de búsqueda, mostrar todos
      } else {
        // Filtrar préstamos por el término de búsqueda
        const traspasosFiltrados = traspasos.filter(traspaso => 
          traspaso.Elemento.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
          traspaso.elementos_idelemento.toString().includes(searchTerm) ||
          traspaso.clientes_documento.toString().includes(searchTerm.toLowerCase()) ||
          traspaso.observaciones.toString().includes(searchTerm.toLowerCase()) ||
          traspaso.cantidad.toString().includes(searchTerm.toLowerCase())
        );
        setFilteredtraspasos(traspasosFiltrados);
      }
    }
  }, [traspasosData, searchTerm]); // Actualizar cuando cambien los datos o el término de búsqueda

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Actualizar el término de búsqueda
  };

  const openModal = (traspaso) => {
    setFileUrl(traspaso.archivo); // Aquí asumo que `archivo` es la URL del archivo
    setIsModalOpen(true);
  };

  if (traspasosLoading) return <p>Cargando...</p>;
  if (traspasosError) return <p>{traspasosError}</p>;

  return (
    <div style={{ textAlign: 'center' }}><br/>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '25px', fontWeight: 'bold', marginRight: '10px' }}>Lista Traspasos</h1>
        <input
          ref={inputRef}
          type="text"
          placeholder="Filtra por ID o descripción"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            width: '250px',
            padding: '7px',
            border: '2px solid black',
            borderRadius: '5px',
          }}
        />
      </div>
      <div className="max-h-[400px] max-w-[1000px] overflow-y-auto overflow-x-auto">
        <table style={{ margin: '0 auto' }}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Archivo</th>
              <th>Observaciones</th>
              <th>Fecha</th>
              <th>Cuentadante</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredtraspasos.length > 0 ? (filteredtraspasos.map((traspaso) => (
              <tr key={traspaso.idbaja}>
                <td>{traspaso.elementos_idelemento}</td>
                <td>{traspaso.Elemento.descripcion}</td>
                <td>{traspaso.cantidad}</td>
                <td>{traspaso.archivo}</td>
                <td>{traspaso.observaciones}</td>
                <td>{traspaso.fecha}</td>
                <td>{traspaso.clientes_documento}</td>
                <td>{traspaso.idadmin}</td>
                <td className="px-4 py-2">
                <button onClick={() => openModal(traspaso)} className="bg-black text-white px-3 py-1 rounded-md mb-1">
                    Ver
                </button>
                <button onClick={() => openModal(traspaso)} className="bg-black text-white px-4 py-2 rounded-md">
                  <MdLoop />
                </button>
            </td>
              </tr>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="8">No hay traspasos</TableCell>
            </TableRow>
          )}
          </tbody>
        </table>
      </div>
        <ModalArchivo 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
              fileUrl={fileUrl} 
        />
    </div>
  );
};

export default Traspasos;
