import Administrador from './administradorModel.js';
import AdminSesion from './adminsesionModel.js';
import Cliente from './clienteModel.js';
import Rol from './rolModel.js';
import Area from './areaModel.js';
import Baja from './bajaModel.js'
import Elemento from './elementoModel.js';
import PrestamoCorriente from './prestamocorrienteModel.js';
import PrestamoEspecial from './prestamoespecialModel.js';
import Mora from './moraModel.js';
import Dano from './danoModel.js';
import Consumo from './consumoModel.js';
import Encargo from './encargoModel.js';
import ElementoHasPrestamoEspecial from './elementoHasPrestamoespecialModel.js';
import ElementoHasPrestamoCorriente from './elementoHasPrestamocorrienteModel.js';
import ElementoHasConsumo from './elementoHasConsumoModel.js';
import ElementoHasEncargo from './elementoHasEncargoModel.js';
import Historial from './historialModel.js';

// Definición de relaciones

// Un administrador puede tener muchas sesiones
Administrador.hasMany(AdminSesion, { 
    foreignKey: 'administradores_documento',
    as: 'sesiones' 
});

// Una sesión puede tener un administrador
AdminSesion.belongsTo(Administrador, { 
    foreignKey: 'administradores_documento',
    as: 'administrador'
});

// Un Elemento pertenece a un Area
Elemento.belongsTo(Area, {
    foreignKey: 'areas_idarea',
    as: 'area'
});

// Un Area puede tener muchos Elementos
Area.hasMany(Elemento, {
    foreignKey: 'areas_idarea',
    as: 'elementos'
});

// Un Administrador pertenece a un Area
Administrador.belongsTo(Area, {
    foreignKey: 'areas_idarea',
    as: 'area'
});

// Un Area puede tener muchos Administradores
Area.hasMany(Administrador, {
    foreignKey: 'areas_idarea',
    as: 'administradores'
});

// Un Prestamo Corriente pertenece a un Area
PrestamoCorriente.belongsTo(Area, {
    foreignKey: 'areas_idarea',
    as: 'area'
});

// Un Area puede tener muchos PrestamosCorrientes
Area.hasMany(PrestamoCorriente, {
    foreignKey: 'areas_idarea',
    as: 'prestamoscorrientes'
});

// Un Prestamo Especial pertenece a un Area
PrestamoEspecial.belongsTo(Area, {
    foreignKey: 'areas_idarea',
    as: 'area'
});

// Un Area puede tener muchos PrestamosEspeciales
Area.hasMany(PrestamoEspecial, {
    foreignKey: 'areas_idarea',
    as: 'prestamosespeciales'
});

// Un Consumo pertenece a un Area
Consumo.belongsTo(Area, {
    foreignKey: 'areas_idarea',
    as: 'area'
});

// Un Area puede tener muchos Consumos
Area.hasMany(Consumo, {
    foreignKey: 'areas_idarea',
    as: 'consumos'
});

// Un Encargo pertenece a un Area
Encargo.belongsTo(Area, {
    foreignKey: 'areas_idarea',
    as: 'area'
});

// Un Area puede tener muchos Encargos
Area.hasMany(Encargo, {
    foreignKey: 'areas_idarea',
    as: 'encargos'
});

// Un Cliente pertenece a un Rol
Cliente.belongsTo(Rol, {
    foreignKey: 'roles_idrol',
    as: 'rol'
});

// Un Rol puede tener muchos Clientes
Rol.hasMany(Cliente, {
    foreignKey: 'roles_idrol',
    as: 'clientes'
});

// Una Baja pertenece a un Elemento
Baja.belongsTo(Elemento, {
    foreignKey: 'elementos_idelemento',
    as: 'elemento'
});

// Un Elemento puede tener muchas bajas
Elemento.hasMany(Baja, {
    foreignKey: 'elementos_idelemento',
    as: 'bajas'
});

// Un Cliente puede tener muchos PrestamosCorrientes
Cliente.hasMany(PrestamoCorriente, {
    foreignKey: 'clientes_documento',
    as: 'prestamoscorrientes'
});

// Un PrestamoCorriente pertenece a un Cliente
PrestamoCorriente.belongsTo(Cliente, {
    foreignKey: 'clientes_documento',
    as: 'cliente'
});

// Un Cliente puede tener muchos PrestamosEspeciales
Cliente.hasMany(PrestamoEspecial, {
    foreignKey: 'clientes_documento',
    as: 'prestamosespeciales'
});

// Un PrestamoEspecial pertenece a un Cliente
PrestamoEspecial.belongsTo(Cliente, {
    foreignKey: 'clientes_documento',
    as: 'cliente'
});

// Un Cliente puede tener muchas Moras
Cliente.hasMany(Mora, {
    foreignKey: 'clientes_documento'
});

// Una Mora pertenece a un Cliente
Mora.belongsTo(Cliente, {
    foreignKey: 'clientes_documento'
});

// Un Cliente puede tener muchos Danos
Cliente.hasMany(Dano, {
    foreignKey: 'clientes_documento',
    as: 'danos'
});

// Un Dano pertenece a un Cliente
Dano.belongsTo(Cliente, {
    foreignKey: 'clientes_documento',
    as: 'cliente'
});

// Un Cliente puede tener muchos Consumos
Cliente.hasMany(Consumo, {
    foreignKey: 'clientes_documento',
    as: 'consumos'
});

// Un Consumo pertenece a un Cliente
Consumo.belongsTo(Cliente, {
    foreignKey: 'clientes_documento',
    as: 'cliente'
});

// Un Cliente puede tener muchos Encargos
Cliente.hasMany(Encargo, {
    foreignKey: 'clientes_documento',
    as: 'encargos'
});

// Un Encargo pertenece a un Cliente
Encargo.belongsTo(Cliente, {
    foreignKey: 'clientes_documento',
    as: 'cliente'
});

// Un PrestamoCorrriente puede tener muchos Elementos
PrestamoCorriente.belongsToMany(Elemento, {
    through: ElementoHasPrestamoCorriente,
    foreignKey: 'prestamoscorrientes_idprestamo',
    as: 'elementos'
});

// Un Elemento puede estar en muchos PrestamosCorrientes
Elemento.belongsToMany(PrestamoCorriente, {
    through: ElementoHasPrestamoCorriente,
    foreignKey: 'elementos_idelemento',
    as: 'prestamoscorrientes'
});

// Un PrestamoEspecial puede tener muchos Elementos
PrestamoEspecial.belongsToMany(Elemento, {
    through: ElementoHasPrestamoEspecial,
    foreignKey: 'prestamosespeciales_idprestamo',
    as: 'elementos'
});

// Un Elemento puede estar en muchos PrestamosEspeciales
Elemento.belongsToMany(PrestamoEspecial, {
    through: ElementoHasPrestamoEspecial,
    foreignKey: 'elementos_idelemento',
    as: 'prestamosespeciales'
});

// Un Consumo puede tener muchos Elementos
Consumo.belongsToMany(Elemento, {
    through: ElementoHasConsumo,
    foreignKey: 'consumos_idconsumo',
    as: 'elementos'
});

// Un Elemento puede estar en muchos Consumos
Elemento.belongsToMany(Consumo, {
    through: ElementoHasConsumo,
    foreignKey: 'elementos_idelemento',
    as: 'consumos'
});

// Un Encargo puede tener muchos Elementos
Encargo.belongsToMany(Elemento, {
    through: ElementoHasEncargo,
    foreignKey: 'encargos_idencargo',
    as: 'elementos'
});

// Un Elemento puede estar en muchos Encargos
Elemento.belongsToMany(Encargo, {
    through: ElementoHasEncargo,
    foreignKey: 'elementos_idelemento',
    as: 'encargos'
});

// Un Elemento puede tener muchos Danos
Elemento.hasMany(Dano, { 
    foreignKey: 'elementos_idelemento',
    as: 'danos'
});

// Un Daño pertenece a un Elemento
Dano.belongsTo(Elemento, { 
    foreignKey: 'elementos_idelemento',
    as: 'elemento'
});

// Un Elemento puede tener muchas Moras
Elemento.hasMany(Mora, { 
    foreignKey: 'elementos_idelemento'
});

// Una mora pertenece a un Elemento 
Mora.belongsTo(Elemento, { 
    foreignKey: 'elementos_idelemento'
});

ElementoHasPrestamoCorriente.belongsTo(PrestamoCorriente, {
    foreignKey: 'prestamoscorrientes_idprestamo',
});
  
ElementoHasPrestamoCorriente.belongsTo(Elemento, {
foreignKey: 'elementos_idelemento',
});

PrestamoCorriente.belongsTo(Cliente, {
foreignKey: 'clientes_documento',
});

Cliente.hasMany(PrestamoCorriente, {
foreignKey: 'clientes_documento',
});

// Relacion entre consumo y elementohasconsumo
ElementoHasConsumo.belongsTo(Consumo, {
    foreignKey: 'consumos_idconsumo',
});
  
ElementoHasConsumo.belongsTo(Elemento, {
foreignKey: 'elementos_idelemento',
});

Consumo.belongsTo(Cliente, {
    foreignKey: 'clientes_documento',
});
    
Cliente.hasMany(Consumo, {
    foreignKey: 'clientes_documento',
});
  
export {
    Area,
    Administrador,
    AdminSesion,
    Cliente,
    Rol,
    Elemento,
    PrestamoCorriente,
    PrestamoEspecial,
    Mora,
    Dano,
    Consumo,
    Encargo,
    ElementoHasPrestamoEspecial,
    ElementoHasPrestamoCorriente,
    ElementoHasConsumo,
    ElementoHasEncargo,
    Historial
};
