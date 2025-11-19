import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerAsync } from "../../store/slices/authSlice";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setValidationError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setValidationError("Password tidak cocok");
      return;
    }

    if (formData.password.length < 6) {
      setValidationError("Password minimal 6 karakter");
      return;
    }

    const { confirmPassword, ...registerData } = formData;
    const result = await dispatch(registerAsync(registerData));

    if (registerAsync.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {(validationError || error) && (
        <div
          className="mb-3 p-3 rounded"
          role="alert"
          style={{
            backgroundColor: "#fee",
            border: "1px solid #fcc",
            color: "#c33",
            fontSize: "14px",
          }}
        >
          {validationError || error}
        </div>
      )}

      <div className="mb-3">
        <label
          htmlFor="name"
          className="form-label"
          style={{ fontSize: "14px", color: "#667781", fontWeight: "400" }}
        >
          Nama
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="masukkan nama Anda"
          style={{
            fontSize: "15px",
            padding: "10px 12px",
            border: "1px solid #e9edef",
            borderRadius: "8px",
          }}
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="email"
          className="form-label"
          style={{ fontSize: "14px", color: "#667781", fontWeight: "400" }}
        >
          Email
        </label>
        <input
          type="email"
          className={`form-control ${error ? "is-invalid" : ""}`}
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="masukkan email Anda"
          style={{
            fontSize: "15px",
            padding: "10px 12px",
            border: error ? "1px solid #dc3545" : "1px solid #e9edef",
            borderRadius: "8px",
          }}
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="password"
          className="form-label"
          style={{ fontSize: "14px", color: "#667781", fontWeight: "400" }}
        >
          Password
        </label>
        <input
          type="password"
          className={`form-control ${validationError ? "is-invalid" : ""}`}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="minimal 6 karakter"
          style={{
            fontSize: "15px",
            padding: "10px 12px",
            border: validationError ? "1px solid #dc3545" : "1px solid #e9edef",
            borderRadius: "8px",
          }}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="form-label"
          style={{ fontSize: "14px", color: "#667781", fontWeight: "400" }}
        >
          Konfirmasi Password
        </label>
        <input
          type="password"
          className={`form-control ${validationError ? "is-invalid" : ""}`}
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          placeholder="ulangi password Anda"
          style={{
            fontSize: "15px",
            padding: "10px 12px",
            border: validationError ? "1px solid #dc3545" : "1px solid #e9edef",
            borderRadius: "8px",
          }}
        />
      </div>

      <button
        type="submit"
        className="btn btn-lg w-100 mb-3 border-0"
        disabled={loading}
        style={{
          backgroundColor: "#075e54",
          color: "white",
          fontSize: "15px",
          padding: "10px",
          borderRadius: "21px",
        }}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </>
        ) : (
          "Daftar"
        )}
      </button>

      <p
        className="text-center mb-0"
        style={{ color: "#667781", fontSize: "14px" }}
      >
        Sudah punya akun?{" "}
        <Link
          to="/login"
          className="text-decoration-none fw-semibold"
          style={{ color: "#075e54" }}
        >
          Login di sini
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
