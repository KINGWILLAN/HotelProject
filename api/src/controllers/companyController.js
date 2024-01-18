import createHttpError from "http-errors";
import Company from "../models/company.model.js";

export const createCompany = async (req, res, next) => {
  try {
    var data = req.body;
    const company = new Company(data);
    const savedCompany = await company.save();
    if (savedCompany) {
      res.status(201).json({
        message: "Creation successful.",
        user: savedCompany,
      });
    }
  } catch (error) {
    if (error.name.toLowerCase().includes("mongo")) {
      if (error.message.toLowerCase().includes("dup")) {
        next(createHttpError.Unauthorized("email exist."));
      }
    }

    if (error.name.includes("ValidationError")) {
      next(createHttpError.BadRequest(error.message));
    }
    next(error);
  }
};

export const loginCompany = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const company = await Company.findByCredentials(email, password);
    if (company) {
      const token = await company.generateAuthToken();
      if (token) {
        res.status(200).json({ company, token });
      }
    }
  } catch (error) {
    next(createHttpError(error));
  }
};
