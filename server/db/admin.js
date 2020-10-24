const pool = require("./dbPool");

class Admin {

  static getUnderperforming() {
    // Define shit here
    return pool.query("SELECT 1");
  }

  static getTotalNumberOfPetsTakenCare(month) {
    // Define shit here
    return pool.query("SELECT 1");
  }

  static getTotalSalaryToBePaid(month) {
      return pool.query("SELECT 1");
  }

  static getMonthWithHighestNumberOfJobs() {
    return pool.query("SELECT 1");
  }

  static setBaseDailyPrice() {
    return pool.query("SELECT 1");
  }
}

module.exports = Admin;
