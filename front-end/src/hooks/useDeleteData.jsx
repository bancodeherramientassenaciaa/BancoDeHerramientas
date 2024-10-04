import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from '../helpers/axiosConfig';

const useDeleteData = (url, ruta) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const deleteData = async () => {
        const confirmResult = await Swal.fire({
            title: '¿Estás seguro de eliminarlo?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            iconColor: '#007BFF',
            showCancelButton: true,
            confirmButtonColor: '#007BFF',
            cancelButtonColor: '#81d4fa',
            confirmButtonText: 'Sí, estoy seguro!',
            cancelButtonText: 'Cancelar',
            customClass: {
                container: 'swal2-container',
                popup: 'swal2-popup'
            }
        })

        if (confirmResult.isConfirmed) {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/${url}`);
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado Correctamente',
                    text: `La información ha sido eliminada correctamente.`,
                    iconColor: 'black',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    setTimeout(() => {
                        setData(response.data);
                        navigate(ruta, { replace: true });
                    }, 1500);           
                }).then(()=> {location.reload();})
            } catch (error) {
                setError(error.response ? error.response.data : 'Error de conexión');
                const mensaje = error.response?.data?.mensaje || "Error inesperado";
                // Mostrar una notificación de error
                Swal.fire(
                    'Error!',
                    mensaje,
                    'error'
                );
            } finally {
                setIsLoading(false);
            }
        }
    };

    return { deleteData, data, isLoading, error };
};

export default useDeleteData;
