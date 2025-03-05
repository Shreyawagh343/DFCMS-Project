import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Alert,
  Button,
  Box,
} from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ShowDetails = () => {
  const { caseId } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reportRef = useRef(null);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      const token = localStorage.getItem("authtoken");
      try {
        if (!caseId) {
          throw new Error("Case ID is missing.");
        }

        const response = await axios.get(`http://localhost:4001/cases/${caseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setCaseData(response.data.getCase);
        } else {
          setError("Failed to fetch case details.");
        }
      } catch (error) {
        console.error("Error fetching case details:", error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [caseId]);

  const handleDownloadPdf = () => {
    const input = reportRef.current;

    html2canvas(input, {
      useCORS: true,
      logging: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      ignoreElements: (element) => {
        return element.tagName === "STYLE" || element.tagName === "LINK";
      },
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`case-details-${caseId}.pdf`);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!caseData) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">No case data found.</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 15, mb: 4, ml: 24 }}>
      {/* Download Button */}
      <Button
        variant="contained"
        onClick={handleDownloadPdf}
        sx={{
          position: "absolute",
          top: 100,
          right: 50,
          backgroundColor: "#1976d2",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
      >
        Download PDF
      </Button>

      {/* Report Content */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          pl: 10,
          pt: 5,
          backgroundColor: "#ffffff",
          color: "#000000",
          borderRadius: 2,
        }}
        ref={reportRef}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2", mb: 4 }}>
          Case Details
        </Typography>

        {/* Basic Information */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "medium", color: "#1976d2", mb: 2 }}>
            Basic Information
          </Typography>
          <Typography variant="body1" sx={{ color: "#333333", mb: 1 }}>
            <strong>Title:</strong> {caseData.title}
          </Typography>
          <Typography variant="body1" sx={{ color: "#333333", mb: 1 }}>
            <strong>Description:</strong> {caseData.description}
          </Typography>
          <Typography variant="body1" sx={{ color: "#333333", mb: 1 }}>
            <strong>Evidence Type:</strong> {caseData.evidenceType}
          </Typography>
          <Typography variant="body1" sx={{ color: "#333333", mb: 1 }}>
            <strong>Status:</strong> {caseData.status}
          </Typography>
          <Typography variant="body1" sx={{ color: "#333333", mb: 1 }}>
            <strong>Priority:</strong> {caseData.priority}
          </Typography>
        </Box>
        <Divider sx={{ my: 4, backgroundColor: "#cccccc" }} />

        {/* Dates */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "medium", color: "#1976d2", mb: 2 }}>
            Dates
          </Typography>
          <Typography variant="body1" sx={{ color: "#333333", mb: 1 }}>
            <strong>Created At:</strong> {new Date(caseData.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" sx={{ color: "#333333", mb: 1 }}>
            <strong>Updated At:</strong> {new Date(caseData.updatedAt).toLocaleDateString()}
          </Typography>
        </Box>
        <Divider sx={{ my: 4, backgroundColor: "#cccccc" }} />

        {/* Chain of Custody */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "medium", color: "#1976d2", mb: 2 }}>
            Chain of Custody
          </Typography>
          {caseData.chainOfCustody.map((custody, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ color: "#333333", mb: 1 }}>
                <strong>Received By:</strong> {custody.receivedBy}
              </Typography>
              <Typography variant="body1" sx={{ color: "#333333", mb: 1 }}>
                <strong>Date Received:</strong> {new Date(custody.dateReceived).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ color: "#333333", mb: 1 }}>
                <strong>Location:</strong> {custody.location}
              </Typography>
              <Typography variant="body1" sx={{ color: "#333333", mb: 1 }}>
                <strong>Notes:</strong> {custody.notes}
              </Typography>
              <Divider sx={{ my: 2, backgroundColor: "#cccccc" }} />
            </Box>
          ))}
        </Box>

        {/* Tools Used */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "medium", color: "#1976d2", mb: 2 }}>
            Tools Used
          </Typography>
          {caseData.toolsUsed.map((tool, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ color: "#333333", mb: 1 }}>
                <strong>Tool Name:</strong> {tool.name}
              </Typography>
              <Typography variant="body1" sx={{ color: "#333333", mb: 1 }}>
                <strong>Version:</strong> {tool.version}
              </Typography>
              <Typography variant="body1" sx={{ color: "#333333", mb: 1 }}>
                <strong>Notes:</strong> {tool.notes}
              </Typography>
              <Divider sx={{ my: 2, backgroundColor: "#cccccc" }} />
            </Box>
          ))}
        </Box>

        {/* Findings */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "medium", color: "#1976d2", mb: 2 }}>
            Findings
          </Typography>
          {caseData.findings.map((finding, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ color: "#333333", mb: 1 }}>
                <strong>Summary:</strong> {finding.summary}
              </Typography>
              <Typography variant="body1" sx={{ color: "#333333", mb: 1 }}>
                <strong>Details:</strong> {finding.details}
              </Typography>
              <Typography variant="body1" sx={{ color: "#333333", mb: 1 }}>
                <strong>Created At:</strong> {new Date(finding.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ color: "#333333", mb: 1 }}>
                <strong>Added By:</strong> {finding.addedBy}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default ShowDetails;