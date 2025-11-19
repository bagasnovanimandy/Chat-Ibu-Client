import { Sparkles } from "lucide-react";
import { useState } from "react";

export default function CreateRoomForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    topic: "",
  });
  const [generating, setGenerating] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateWithAI = async () => {
    setGenerating(true);
    try {
      // const response = await roomApi.generateRoomContent();
      // if (response.data) {
      //   setFormData({
      //     name: response.data.name || "",
      //     description: response.data.description || "",
      //     topic: response.data.topic || "",
      //   });
      // }
    } catch (error) {
      // console.error("Failed to generate room content:", error);
      // alert(
      //   `Gagal generate dengan AI: ${
      //     error.response?.data?.message || error.message || "Unknown error"
      //   }`
      // );
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const result = await dispatch(createRoom(formData));
    //   if (createRoom.fulfilled.match(result)) {
    //     dispatch(fetchRooms({ isActive: true }));
    //     setFormData({
    //       name: "",
    //       description: "",
    //       topic: "",
    //     });
    //     onClose();
    //   } else if (createRoom.rejected.match(result)) {
    //     // Error will be handled by Redux and shown in error state
    //     console.error("Failed to create room:", result.payload);
    //     alert(`Gagal membuat room: ${result.payload || "Unknown error"}`);
    //   }
    // } catch (error) {
    //   console.error("Error creating room:", error);
    //   alert(`Error: ${error.message || "Failed to create room"}`);
    // }
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div
          className="modal-content border-0 shadow-lg"
          style={{ borderRadius: "12px", overflow: "hidden" }}
        >
          <div
            className="modal-header border-0"
            style={{
              backgroundColor: "#075e54",
              color: "white",
              padding: "16px 20px",
            }}
          >
            <h5
              className="modal-title fw-semibold mb-0"
              style={{
                fontSize: "20px",
                color: "white",
                letterSpacing: "0.3px",
              }}
            >
              Buat Room Baru
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close"
              style={{ fontSize: "14px" }}
            ></button>
          </div>

          <div
            className="modal-body"
            style={{ backgroundColor: "#f0f2f5", padding: "20px" }}
          >
            {/* Generate dengan AI Button */}
            <div className="mb-4">
              <button
                type="button"
                onClick={handleGenerateWithAI}
                disabled={generating}
                className="btn w-100 d-flex align-items-center justify-content-center gap-2 border-0"
                style={{
                  backgroundColor: "#075e54",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "500",
                  padding: "12px",
                  borderRadius: "21px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!generating) {
                    e.currentTarget.style.backgroundColor = "#128c7e";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!generating) {
                    e.currentTarget.style.backgroundColor = "#075e54";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                {generating ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate dengan AI</span>
                  </>
                )}
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="form-label mb-2"
                  style={{
                    fontSize: "15px",
                    color: "#111b21",
                    fontWeight: "500",
                  }}
                >
                  Judul <span style={{ color: "#dc3545" }}>*</span>
                </label>
                <textarea
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan judul room"
                  className="form-control"
                  rows="3"
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    fontSize: "15px",
                    padding: "12px 16px",
                    border: "1px solid #e9edef",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    resize: "vertical",
                    minHeight: "80px",
                  }}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="form-label mb-2"
                  style={{
                    fontSize: "15px",
                    color: "#111b21",
                    fontWeight: "500",
                  }}
                >
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Masukkan deskripsi room"
                  className="form-control"
                  rows="5"
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    fontSize: "15px",
                    padding: "12px 16px",
                    border: "1px solid #e9edef",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    resize: "vertical",
                    minHeight: "120px",
                  }}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="topic"
                  className="form-label mb-2"
                  style={{
                    fontSize: "15px",
                    color: "#111b21",
                    fontWeight: "500",
                  }}
                >
                  Topik
                </label>
                <textarea
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="Masukkan topik diskusi"
                  className="form-control"
                  rows="3"
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    fontSize: "15px",
                    padding: "12px 16px",
                    border: "1px solid #e9edef",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    resize: "vertical",
                    minHeight: "80px",
                  }}
                />
              </div>

              <div className="d-flex gap-3 mt-4">
                <button
                  type="button"
                  className="btn flex-fill border-0"
                  onClick={onClose}
                  style={{
                    backgroundColor: "#e9edef",
                    color: "#111b21",
                    fontSize: "15px",
                    fontWeight: "500",
                    padding: "12px",
                    borderRadius: "21px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#d1d7db";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#e9edef";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn flex-fill border-0"
                  disabled={loading}
                  style={{
                    backgroundColor: "#075e54",
                    color: "white",
                    fontSize: "15px",
                    fontWeight: "500",
                    padding: "12px",
                    borderRadius: "21px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor = "#128c7e";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor = "#075e54";
                      e.currentTarget.style.transform = "translateY(0)";
                    }
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
                    "Buat Room"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
