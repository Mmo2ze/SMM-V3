'use strict';

import {
    Model
} from 'sequelize';

interface OrderAttributes {
    id: number;
    name: string;
    charge: number;
    status: string;
    StartCount: number;
    remain: number;
    quantity: number;
    link: string;
    UserId: number;
    Date: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Order extends Model<OrderAttributes>
        implements OrderAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: number;
        name!: string;
        charge!: number;
        status!: string;
        StartCount!: number;
        remain!: number;
        quantity!: number;
        link!: string;
        UserId!: number;
        Date!: Date;

    };

    Order.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Services',
                key: 'name'
            }
        },
        charge: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        StartCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        remain: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        Date: {
            type: DataTypes.DATE,
            allowNull: false,
        },      

    }, {
        sequelize,
        modelName: 'Order',
        timestamps: false,
    },

    );
    return Order;
};