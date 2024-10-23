import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { HomeIcon, BookIcon, PenToolIcon, ClipboardIcon, CircleAlertIcon, TriangleAlertIcon, UserIcon, FileTextIcon, SettingsIcon, LogOutIcon, XIcon, ChevronDownIcon, ClipboardList, List, HandCoins } from "lucide-react";
import { MdOutlineConstruction } from "react-icons/md";
import { Divider } from '@mui/material';
import LogoutButton from '../forms/elements/cerrarSesionButton';
import { LuArrowDownLeftFromCircle } from "react-icons/lu";
import { GiReturnArrow } from "react-icons/gi";
import { AiOutlineAlert } from "react-icons/ai";
import { MdManageHistory } from "react-icons/md";
import { PiImageBroken } from "react-icons/pi";
import { CgReorder } from "react-icons/cg";
import { FaRegHandPointUp } from "react-icons/fa6";
import { PiMapPinAreaFill } from "react-icons/pi";
import { MdHistoryToggleOff } from "react-icons/md";
import { HiSortDescending } from "react-icons/hi";
import { RiUserReceived2Fill } from "react-icons/ri";

export const Menu = ({ children }) => {
    const [selectedMenu, setSelectedMenu] = useState("Inicio");
    const [darkMode, setDarkMode] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const navigate = useNavigate();

    // Obtener el rol del usuario del token para poder filtrar los items del menú segun los permisos que tenga el rol
    const token = localStorage.getItem('authToken');
    let userRole = null;

    // Decodificar el token solo si existe
    if (token) {
        try {
            userRole = jwtDecode(token).role; 
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            navigate('/login');
            return null; 
        }
    }
    if (!userRole) {
        navigate('/login');
        return null; 
    }

    const menuItems = [
        { name: "Inicio", to: "/inicio", roles: ["admin"]},
        { 
            name: "Prestamos", 
            to: "/prestamos", 
            roles: ["admin", "contratista", "practicante"],
            subMenu: [
                { name: "Elementos Prestados", to: "/prestamos/lista", roles: ["admin", "contratista", "practicante"]},
                { name: "Historial Prestamos", to: "/prestamos/historial", roles: ["admin", "contratista", "practicante"]} 
            ]
        },
        { 
            name: "Prestamos_Esp", 
            to: "/prestamos_esp", 
            roles: ["admin", "contratista", "practicante"],
            subMenu: [
                { name: "Formulario", to: "/prestamos_esp", roles: ["admin", "contratista", "practicante"]}, 
            ]
        },
        { 
            name: "Consumos", 
            to: "/consumos", 
            roles: ["admin", "contratista", "practicante"],
            subMenu: [
                { name: "Registrar Consumo", to: "/consumos", roles: ["admin", "contratista", "practicante"]}, 
                { name: "Lista Consumos", to: "/consumos/historial", roles: ["admin", "contratista", "practicante"]}
            ]
        },
        { 
            name: "Encargos", 
            to: "/Encargos",
            roles: ["instructor"],
            subMenu: [
                { name: "Encargar", to: "/encargos/elegirarea", roles: ["instructor"]},
                { name: "Lista", to: "/encargos/lista", roles: ["instructor"]}
            ]
        },
        { 
            name: "Encargos", 
            to: "/Encargos",
            roles: ["admin", "contratista", "practicante"],
            subMenu: [
                { name: "Lista", to: "/encargos", roles: ["admin", "contratista", "practicante"]},
                { name: "Historial Encargos", to: "/encargos/historial", roles: ["admin", "contratista", "practicante"]},
            ]
        },
        { 
            name: "Moras", 
            to: "/moras", 
            roles: ["admin", "contratista", "practicante"],
            subMenu: [
                { name: "Moras Activas", to: "/moras", roles: ["admin", "contratista", "practicante"]}, 
                { name: "Historial Moras", to: "/moras/historial", roles: ["admin", "contratista", "practicante"]}
            ]
        },
        { 
            name: "Daños", 
            to: "/danos", 
            roles: ["admin", "contratista", "practicante"],
            subMenu: [
                { name: "Daños Pendientes", to: "/danos", roles: ["admin", "contratista", "practicante"]}, 
                { name: "Historial Daños", to: "/danos/historial", roles: ["admin", "contratista", "practicante"]}
            ]
        },
        { 
            name: "Clientes", 
            to: "/clientes", 
            roles: ["admin", "contratista", "practicante"],
            subMenu: [
                { name: "Registrar Cliente", to: "/usuarios/formulario", roles: ["admin", "contratista", "practicante"]}, 
                { name: "Lista", to: "/usuarios/lista", roles: ["admin", "contratista", "practicante"]}
            ]
        },
        { 
            name: "Grupos", 
            to: "/roles", 
            roles: ["admin", "contratista", "practicante"],
            subMenu: [
                { name: "Registrar Grupo", to: "/roles/formulario", roles: ["admin", "contratista", "practicante"]}, 
                { name: "Lista", to: "/roles/lista" }
            ]
        },
        { 
            name: "Elementos", 
            to: "/elementos", 
            roles: ["admin", "contratista", "practicante"],
            subMenu: [
                { name: "Registrar Elemento", to: "/elementos/formulario", roles: ["admin", "contratista"]}, 
                { name: "Lista", to: "/elementos/lista", roles: ["admin", "contratista", "practicante"]}
            ]
        },
        { 
            name: "Areas", 
            to: "/areas", 
            roles: ["admin"],
            subMenu: [
                { name: "Registrar Área", to: "/areas/formulario", roles: ["admin"]}, 
                { name: "Lista", to: "/areas/lista", roles: ["admin"]}
            ]
        },
        { 
            name: "Administrador", 
            to: "/admin", 
            roles: ["admin"],
            subMenu: [
                { name: "Registrar Admin", to: "/administrador/formulario", roles: ["admin"]}, 
                { name: "Lista", to: "/administrador/lista", roles: ["admin"]}
            ]
        },
        { 
            name: "Reintegros", 
            to: "/reintegros", 
            roles: ["admin", "contratista", "practicante"],
            subMenu: [
                { name: "Registrar Reintegro", to: "/reintegros", roles: ["admin", "contratista", "practicante"]}, 
                { name: "Lista", to: "/reintegros/lista", roles: ["admin", "contratista", "practicante"]},
                { name: "Historial Reintegros", to: "/reintegros/historial", roles: ["admin", "contratista", "practicante"]}
            ]
        },
        { 
            name: "Traspasos", 
            to: "/traspasos", 
            roles: ["admin", "contratista", "practicante"],
            subMenu: [
                { name: "Registrar Traspaso", to: "/traspasos", roles: ["admin", "contratista", "practicante"]}, 
                { name: "Lista", to: "/traspasos/lista", roles: ["admin", "contratista", "practicante"]},
                { name: "Historial Traspasos", to: "/traspasos/historial", roles: ["admin", "contratista", "practicante"]}
            ]
        },
        { 
            name: "Historial", 
            to: "/historial", 
            roles: ["admin", "contratista", "practicante"],
            subMenu: [
                { name: "Historial Completo", to: "/historial", roles: ["admin", "contratista", "practicante"]}
            ]
        }
    ];

    const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

    return (
        <div className={`flex min-h-screen ${darkMode ? "dark" : ""}`}>
            <aside className="w-64 h-[95vh] overflow-hidden bg-background text-foreground flex flex-col border-r border-gray">

                <div className="flex items-center p-4 border-b">
                    <Avatar>
                        <img src="../../src/assets/Sena.png" />
                        <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                        <h1 className="text-lg font-bold">Admin BH</h1>
                    </div>
                </div>
                <nav className="max-w-lg flex-1 p-4 space-y-2 overflow-hidden overflow-y-scroll">
                    {filteredMenuItems.map((item) => (
                        <div key={item.name}>
                            {item.name === "Inicio" ? (
                                <Link
                                    to={item.to}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${selectedMenu === item.name ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                                    onClick={() => setSelectedMenu(item.name)}
                                >
                                    <Icon name={item.name} className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </Link>
                            ) : (
                                <div>
                                    <div
                                    className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors cursor-pointer hover:bg-muted ${
                                        openSubMenu === item.name ? "bg-primary hover:bg-primary text-primary-foreground" : ""
                                    }`}
                                    onClick={() => setOpenSubMenu(openSubMenu === item.name ? null : item.name)}
                                    >
                                    <div className="flex items-center space-x-2">
                                        <Icon name={item.name} className="w-5 h-5" />
                                        <span>{item.name}</span>
                                    </div>
                                    <ChevronDownIcon
                                        className={`w-3 h-4 transition-transform ${openSubMenu === item.name ? "rotate-180" : ""}`}
                                    />
                                    </div>
                                    {openSubMenu === item.name && (
                                        <div className="pl-6 mt-2 space-y-1">
                                            {item.subMenu.map((submenu) => (
                                                <Link
                                                    key={submenu.name}
                                                    to={submenu.to}
                                                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${selectedMenu === submenu.name ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                                                    onClick={() => {
                                                        setSelectedMenu(submenu.name);
                                                        setOpenSubMenu(null);
                                                    }}
                                                >
                                                    <Icon name={submenu.name} className="w-5 h-5" />
                                                    <span>{submenu.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>
            <Divider />
            <main className="flex-1 p-6 bg-background">
                <header className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Banco de Herramientas</h2>
                    <div className="flex items-center space-x-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback className="border border-black">AB</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <UserIcon className="w-4 h-4 mr-2" />
                                    <span>Perfil</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                    <LogoutButton>
                                    <LogOutIcon className="w-4 h-4 mr-2" />
                                    </LogoutButton>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <Divider className='p-2'/>
                {children}
            </main>
        </div>
    );
}

function Icon({ name, ...props }) {
    const icons = {
        "Inicio": <HomeIcon {...props} />,
        "Consumos": <LuArrowDownLeftFromCircle {...props} />,
        "Encargos": <CgReorder {...props} />,
        "Areas": <PiMapPinAreaFill {...props} />,
        "Clientes": <UserIcon {...props} />,
        "Grupos": <FaRegHandPointUp{...props} />,
        "Administrador": <SettingsIcon {...props} />,
        "Elementos": <MdOutlineConstruction {...props} />,
        "Formulario": <List {...props} />,
        "Lista Consumos": <List {...props}/>,
        "Historial Prestamos": <List {...props}/>,
        "Historial Moras": <List {...props} />,
        "Historial Daños": <List {...props} />,
        "Moras Activas": <List {...props} />,
        "Daños Pendientes": <List {...props} />,
        "Elementos Prestados": <List {...props} />,
        "Prestamos_Esp": <GiReturnArrow {...props} />,
        "Moras": <AiOutlineAlert {...props} />,
        "Daños": <MdManageHistory {...props} />,
        "Reintegros": <HiSortDescending  {...props} />,
        "Traspasos": <RiUserReceived2Fill  {...props} />,                          
        "Prestamos": <HandCoins {...props} />,
        "Registrar Elemento": <List {...props}/>,
        "Registrar Consumo": <List {...props}/>,
        "Registrar Cliente": <List {...props}/>,
        "Registrar Grupo": <List {...props}/>,
        "Registrar Admin": <List {...props}/>,
        "Historial": <MdHistoryToggleOff {...props}/>,
        "Historial Completo": <List {...props}/>
    };
    return icons[name] || <List {...props} />;
}
