import FAQ from "../Module/FAQModule.js";

// Fetch all FAQs
export const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search FAQs
export const searchFAQs = async (req, res) => {
  try {
    const { query } = req.query;
    const faqs = await FAQ.find({
      $or: [
        { question: { $regex: query, $options: "i" } },
        { answer: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new FAQ
export const addFAQ = async (req, res) => {
  try {
    const { question, answer, category, tags } = req.body;
    const newFAQ = new FAQ({ question, answer, category, tags });
    await newFAQ.save();
    res.status(201).json(newFAQ);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};