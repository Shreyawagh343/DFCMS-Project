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

    // Force standard colors and ignore unsupported styles
    html2canvas(input, {
      useCORS: true, // Enable cross-origin resource sharing
      logging: true, // Enable logging for debugging
      allowTaint: true, // Allow tainted canvases
      backgroundColor: "#ffffff", // Force white background
      ignoreElements: (element) => {
        // Ignore elements with unsupported styles
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
          backgroundColor: "#1976d2", // Standard color
          color: "#ffffff", // White text
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
          backgroundColor: "#ffffff", // Force white background
          color: "#000000", // Force black text
        }}
        ref={reportRef}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#000000" }}>
          Case Details
        </Typography>

        {/* Basic Information */}
        <Typography variant="h6" gutterBottom sx={{ pt: 3, color: "#000000" }}>
          Basic Information
        </Typography>
        <Typography variant="body1" sx={{ color: "#000000" }}>
          <strong>Title:</strong> {caseData.title}
        </Typography>
        <Typography variant="body1" sx={{ color: "#000000" }}>
          <strong>Description:</strong> {caseData.description}
        </Typography>
        <Typography variant="body1" sx={{ color: "#000000" }}>
          <strong>Evidence Type:</strong> {caseData.evidenceType}
        </Typography>
        <Typography variant="body1" sx={{ color: "#000000" }}>
          <strong>Status:</strong> {caseData.status}
        </Typography>
        <Typography variant="body1" sx={{ color: "#000000" }}>
          <strong>Priority:</strong> {caseData.priority}
        </Typography>
        <Divider sx={{ my: 2, backgroundColor: "#cccccc" }} />

        {/* Dates */}
        <Typography variant="h6" gutterBottom sx={{ color: "#000000" }}>
          Dates
        </Typography>
        <Typography variant="body1" sx={{ color: "#000000" }}>
          <strong>Created At:</strong> {new Date(caseData.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" sx={{ color: "#000000" }}>
          <strong>Updated At:</strong> {new Date(caseData.updatedAt).toLocaleDateString()}
        </Typography>
        <Divider sx={{ my: 2, backgroundColor: "#cccccc" }} />

        {/* Chain of Custody */}
        <Typography variant="h6" gutterBottom sx={{ color: "#000000" }}>
          Chain of Custody
        </Typography>
        {caseData.chainOfCustody.map((custody, index) => (
          <div key={index}>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Received By:</strong> {custody.receivedBy}
            </Typography>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Date Received:</strong> {new Date(custody.dateReceived).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Location:</strong> {custody.location}
            </Typography>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Notes:</strong> {custody.notes}
            </Typography>
            <Divider sx={{ my: 2, backgroundColor: "#cccccc" }} />
          </div>
        ))}

        {/* Tools Used */}
        <Typography variant="h6" gutterBottom sx={{ color: "#000000" }}>
          Tools Used
        </Typography>
        {caseData.toolsUsed.map((tool, index) => (
          <div key={index}>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Tool Name:</strong> {tool.name}
            </Typography>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Version:</strong> {tool.version}
            </Typography>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Notes:</strong> {tool.notes}
            </Typography>
            <Divider sx={{ my: 2, backgroundColor: "#cccccc" }} />
          </div>
        ))}

        {/* Findings */}
        <Typography variant="h6" gutterBottom sx={{ color: "#000000" }}>
          Findings
        </Typography>
        {caseData.findings.map((finding, index) => (
          <div key={index}>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Summary:</strong> {finding.summary}
            </Typography>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Details:</strong> {finding.details}
            </Typography>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Created At:</strong> {new Date(finding.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Added By:</strong> {finding.addedBy}
            </Typography>
          </div>
        ))}
      </Paper>
    </Container>
  );
};

export default ShowDetails;