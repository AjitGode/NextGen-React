import React, { useState } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  FormHelperText
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EnrollmentForm = ({ closeForm, selectedCourse }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    education: "",
    workingProfession: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };
    frame();
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[6789]\d{9}$/;

    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()){
      newErrors.phone = "Phone number is required";
   } else if(!phonePattern.test(formData.phone)){
     newErrors.phone = "Invalid Phone Number"
   }
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.education) newErrors.education = "Education is required";
    if (!formData.workingProfession) newErrors.workingProfession = "Profession is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const submissionData = {
      ...formData,
      courseName: selectedCourse
    };

    try {
      const response = await fetch(`${backendURL}/api/enrollment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) throw new Error("Failed to submit enrollment");

      await Swal.fire({
        title: "Success!",
        text: "Enrollment submitted successfully.",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        width: "400px",
        padding: "1.5rem",
        background: "#f8f9fa",
        color: "#212529",
        showClass: { 
          popup: "animate__animated animate__fadeInUp animate__faster" 
        },
        hideClass: { 
          popup: "animate__animated animate__fadeOutDown animate__faster" 
        },
        customClass: {
          title: 'text-success fw-bold mb-3',
          icon: 'border-success',
          popup: 'border'
        },
        buttonsStyling: false,
        backdrop: 'rgba(33,37,41,0.15)'
      });

      closeForm();
      triggerConfetti();

      emailjs.init("6Yx-9qp2M9sCHKw3w");
      await emailjs.send("service_gu5r29s", "template_afax5w8", {
        courseName: submissionData.courseName,
        email: submissionData.email,
        name: submissionData.name,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        education: "",
        workingProfession: ""
      });
      setErrors({});
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <section className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl relative w-full max-w-[95vw] md:max-w-2xl mx-2 p-4 md:p-6 overflow-y-auto max-h-[90vh]">
        <IconButton
          onClick={closeForm}
          aria-label="close"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "text.secondary"
          }}
        >
          <CloseIcon />
        </IconButton>

        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
          Enroll in {selectedCourse}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="space-y-4 md:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <TextField
                name="name"
                label="Full Name"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                
              />

              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                
              />

              <TextField
                name="phone"
                label="Phone"
                variant="outlined"
                type="tel"
                inputProps={{ maxLength: 10 }}
                fullWidth
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                
              />

              <TextField
                name="city"
                label="City"
                variant="outlined"
                fullWidth
                value={formData.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
                
              />

              <FormControl fullWidth error={!!errors.education} className="md:col-span-2">
                <InputLabel>Education</InputLabel>
                <Select
                  name="education"
                  value={formData.education}
                  label="Education"
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled><em>Select Education</em></MenuItem>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="Computer Application">Computer Application</MenuItem>
                  <MenuItem value="Commerce">Commerce</MenuItem>
                  <MenuItem value="Arts">Arts</MenuItem>
                  <MenuItem value="High-School">High-School</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {errors.education && <FormHelperText>{errors.education}</FormHelperText>}
              </FormControl>

              <FormControl fullWidth error={!!errors.workingProfession} className="md:col-span-2">
                <InputLabel>Profession</InputLabel>
                <Select
                  name="workingProfession"
                  value={formData.workingProfession}
                  label="Profession"
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled><em>Select Profession</em></MenuItem>
                  <MenuItem value="IT Industry">IT Industry</MenuItem>
                  <MenuItem value="Non-IT Industry">Non-IT Industry</MenuItem>
                  <MenuItem value="Fresher">Fresher</MenuItem>
                  <MenuItem value="Previously Worked">Previously Worked</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              
                {errors.workingProfession && <FormHelperText>{errors.workingProfession}</FormHelperText>}
              </FormControl>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full md:w-auto md:px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Enrollment
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EnrollmentForm;