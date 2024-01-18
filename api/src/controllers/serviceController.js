import createHttpError from "http-errors";
import Service from "../models/serviceModel.js";

export const createService = async (req, res, next) => {
  try {
    const data = req.body;
    const newService = new Service({
      ...data,
      companyId: req.user._id.toString(),
    });
    const service = await newService.save();

    if (!service) {
      throw createHttpError.InternalServerError("Error saving service.");
    }
    req.user.services = req.user.services.concat(service._id.toString());
    await req.user.save();
    res.status(201).json({ service, user: req.user });
  } catch (error) {
    next(error);
  }
};

export const getNearbyServices = async (req, res, next) => {
  let { long, lat, maxDistance } = req.query;
  long = Number(long);
  lat = Number(lat);
  maxDistance = Number(maxDistance);
  try {
    const services = await Service.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [long, lat],
          },
          distanceField: "distance",
          maxDistance: maxDistance,
          spherical: true,
        },
      },
    ]);
    res.status(200).send(services);
  } catch (error) {
    next(error);
  }
};

export const getService = async (req, res, next) => {
  const serviceId = req.params.serviceId;
  console.log(serviceId);
  try {
    const service = await Service.findById(serviceId).populate("companyId");
    if (!service) {
      throw createHttpError.NotFound("service not found.");
    }
    res.status(200).send(service);
  } catch (error) {
    next(error);
  }
};
