import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePostDataNoalert from "../../hooks/usePostDataNoalert.jsx";

const InputPrestamo = () => {
    const [documento, setDocumento] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setDocumento(event.target.value);
    };

    const validations = {
        documento: [
            {
                validate: value => value.trim() !== "",
                message: "El documento de usuario es obligatorio."
            }
        ]
    };

    const onSubmit = (data) => {
        const idprestamo = data.idprestamo;
        if (idprestamo) {
            console.log("Préstamo creado exitosamente con ID:", idprestamo);
            // Redirige a la ruta construida dinámicamente
            navigate(`/prestamos/elementos/${idprestamo}`, { replace: true });
        } else {
            console.error("No se pudo crear el préstamo.");
        }
    };

    const handleSubmit = usePostDataNoalert(
        "prestamos",
        onSubmit,     
        { documento }, 
        validations  
    );

    return (
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                    type="text"
                    name="documento"
                    value={documento}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded mb-4"
                    required
                    style={{border:'2px solid black', width: '400px', height: '60px', fontSize: '42px', textAlign: 'center', caretColor: "transparent"}}
                />
            </form>
    );
};

export default InputPrestamo;