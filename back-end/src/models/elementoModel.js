import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection.js';
import Area from './areaModel.js';

class Elemento extends Model {}

Elemento.init({
  idelemento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  disponibles: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ubicacion: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('prestamo', 'consumo'),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('disponible', 'agotado'),
    allowNull: false
  },
  foto: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  areas_idarea: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Area,
      key: 'idarea',
      allowNull: false
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
}
}, {
  sequelize,
  modelName: 'Elemento',
  tableName: 'elementos',
  timestamps: false
});

export default Elemento;
