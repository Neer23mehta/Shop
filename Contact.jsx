import { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import "/home/tristate/Desktop/Neer/neer/src/EcommerseUI/Signup.css";

const items = "FormItems";

export const contactData = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
    const response = await fetch("http://localhost:5003/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Server Response:", result);
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedFormData = localStorage.getItem(items);
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    const phonePattern = /^[0-9]{10}$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!formData.fullName.trim()) {
      errors.fullName = "Full Name is required.";
    }

    if (!formData.email.trim() || !emailPattern.test(formData.email)) {
      errors.email = "Valid email is required.";
    }

    if (!formData.phone.trim() || !phonePattern.test(formData.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    }

    if (!formData.message.trim()) {
      errors.message = "Message cannot be empty.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5003/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        console.log("Form submitted:", result);

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
        });
        localStorage.setItem(items, JSON.stringify(formData));
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    } else {
      console.log("Form validation failed.");
    }
  };

  return (
    <div className="Main-container">
      <Form method="POST" className="Form-main" onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <span className="error">{errors.fullName}</span>}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <label>Phone Number:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}

        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          style={{ height: "100px" }}
        />
        {errors.message && <span className="error">{errors.message}</span>}

        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};
