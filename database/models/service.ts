'use strict';

import {
    Model
} from 'sequelize';

interface ServiceAttributes {
    id: number;
    name: string;
    serviceId:number;
    sellPrice : number;
    resellPrice : number;
    description :string;
    speed: string;
    min: number;
    max:number;
    quality:string;
    panel:string;
    refill:boolean;
    droprate:string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Service extends Model<ServiceAttributes>
        implements ServiceAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: number;
        name!: string;
        serviceId!: number;
        sellPrice!: number;
        resellPrice!: number;
        description!: string;
        speed!: string;
        min!: number;
        max!: number;
        quality!: string;
        panel!: string;
        refill!: boolean;
        droprate!: string;
        static associate(models: any) {
            Service.hasOne(models.Panel, {
                foreignKey: 'name',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            })
        }
    };
    Service.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            // primaryKey: true,
            unique: true
        },
        serviceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sellPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        resellPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        speed: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        min: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        max: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quality: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        panel: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'panels',
                key: 'name'
            }
        },
        refill: {
            type: DataTypes.BOOLEAN,
            allowNull: false,

        },
        droprate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Service',
        timestamps: false,
    },

    );
    return Service;
};