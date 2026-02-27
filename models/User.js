const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { iden_seq } = require('../db/connect');

const User = iden_seq.define(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: iden_seq.fn('gen_random_uuid'), 
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: 'First name must be between 3 and 100 characters',
        },
      },
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: {
          args: [0, 100],
          msg: 'Last name should not more than 100 characters',
        },
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Please provide a valid email',
        },
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [6, 255],
          msg: 'Password must be at least 6 characters',
        },
      },
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: {
          args: [0, 100],
          msg: 'Location must not be more than 100 characters',
        },
      },
    },
    role: {
      type: DataTypes.ENUM('admin','subscribe_user', 'user'),
      defaultValue: 'user',
    },
    verificationToken: DataTypes.STRING,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verified: DataTypes.DATE,
    last_login_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    passwordToken: DataTypes.STRING,
    passwordTokenExpirationDate: DataTypes.DATE,
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(process.env.BCRYPT_SALT_ROUNDS);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(process.env.BCRYPT_SALT_ROUNDS);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

User.prototype.createJWT = function () {
  return jwt.sign(
    { userId: this.id, name: this.first_name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

User.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;