import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQquestions = () => {
  const [faqs, setFaqs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4001/faq/getfaqs")
      .then((response) => setFaqs(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = [];
    acc[faq.category].push(faq);
    return acc;
  }, {});

  // Filter FAQs based on search query
  const filteredFAQs = Object.keys(groupedFaqs).reduce((acc, category) => {
    const filtered = groupedFaqs[category].filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) acc[category] = filtered;
    return acc;
  }, {});

  return (
    <div className="min-h-screen p-8">
      <Container>
        {/* Header Section */}
        <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
          Do You Have Questions?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
          We have answers (well, most of the time!) Find answers to the most common questions you
          may have about the Digital Forensics Case Management System. If you still can’t find the
          answer you’re looking for, just Contact Us!
        </Typography>

        {/* Search Bar */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 4 }}
        />

        {/* Grouped FAQs by Category */}
        {Object.keys(filteredFAQs).map((category) => (
          <div key={category}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}>
              {category} FAQs
            </Typography>
            {filteredFAQs[category].map((faq) => (
              <Accordion key={faq._id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        ))}
      </Container>
    </div>
  );
};

export default FAQquestions;