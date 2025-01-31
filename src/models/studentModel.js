const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Student = sequelize.define("Student", {
  full_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  branch: { type: DataTypes.STRING, allowNull: false },
  student_contact: { type: DataTypes.BIGINT, unique: true, allowNull: false },
  parent_contact: { type: DataTypes.BIGINT, allowNull: false },
  subjects: { type: DataTypes.ARRAY(DataTypes.STRING) },
  xii_diploma_type: { type: DataTypes.ENUM("XII", "Diploma") },
  xii_diploma_score: { type: DataTypes.DECIMAL(5, 2), validate: { min: 0 } },
  cet_jee_type: { type: DataTypes.ENUM("CET", "JEE") },
  cet_jee_score: { type: DataTypes.DECIMAL(5, 2), validate: { min: 0, max: 100 } },
  address: { type: DataTypes.TEXT },
  college_name: { type: DataTypes.STRING },
  password: { type: DataTypes.TEXT, allowNull: false },
  totalfees: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  studentfees: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  packages: { type: DataTypes.ARRAY(DataTypes.STRING) }
},
  {
    tableName: "students",
    timestamps: true,  // Sequelize will automatically manage `createdAt` and `updatedAt`
  }
);

module.exports = Student;
