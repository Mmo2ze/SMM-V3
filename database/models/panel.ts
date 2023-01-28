'use strict';

import {
    Model
} from 'sequelize';

interface PanelAttributes {
    id: number;
    name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Panel extends Model<PanelAttributes>
        implements PanelAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: number;
        name!: string;
        static associate(models: any) {
            Panel.belongsTo(models.Service, {
                foreignKey:'name',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            })
        }
    };

    Panel.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    }
        , {
            sequelize,
            modelName: 'Panel',
            timestamps: false,
        },

    );
    return Panel;
};