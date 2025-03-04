import Query from "../Module/Query.js";

export const createQuery = async (req, res) => {
    try {
        const { CaseName, officerCode, query } = req.body;
        const newQuery = new Query({ CaseName, officerCode, query });
        await newQuery.save();
        res.status(201).json(newQuery);
      } catch (error) {
        res.status(500).json({ message: "Failed to submit query.", error });
      }
    };

export const getAllQuery = async (req, res) => {
    try {
        const queries = await Query.find();
        res.status(200).json(queries);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch queries.", error });
      }
    };

    
