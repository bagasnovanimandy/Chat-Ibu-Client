import { Link, useNavigate } from "react-router";
import { LogOut, Plus, MessageCircle, Trash2, ArrowRight } from "lucide-react";
import { useState } from "react";
import CreateRoomForm from "../../components/rooms/CreateRoomForm";

export default function RoomsPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleDeleteRoom = (e) => {
    e.stopPropagation();
  };

  const handleRoomClick = () => {
    navigate("/chat");
  };

  const handleLogout = () => {
    // Implement logout functionality here
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      className="d-flex flex-column"
      style={{ height: "100vh", backgroundColor: "#f0f2f5" }}
    >
      {/* Header - WhatsApp Style */}
      <nav
        className="flex-shrink-0"
        style={{
          backgroundColor: "#075e54",
          color: "white",
          padding: "10px 16px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link
            to="/"
            className="text-decoration-none d-flex align-items-center gap-2"
            style={{
              cursor: "pointer",
              color: "white",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            <MessageCircle className="w-5 h-5" style={{ color: "white" }} />
            <h1
              className="h5 fw-semibold mb-0"
              style={{
                color: "white",
                fontSize: "20px",
                letterSpacing: "0.3px",
              }}
            >
              Chat Ibu-Ibu
            </h1>
          </Link>
          <div className="d-flex align-items-center gap-3">
            <span className="small" style={{ color: "rgba(255,255,255,0.9)" }}>
              {user?.name}{" "}
              {user?.role === "admin" && (
                <span
                  style={{
                    fontSize: "11px",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    padding: "2px 6px",
                    borderRadius: "10px",
                  }}
                >
                  Admin
                </span>
              )}
            </span>
            {user?.role === "admin" && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn p-0 border-0"
                style={{ color: "white", padding: "8px" }}
                title="Buat Room"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={handleLogout}
              className="btn p-0 border-0"
              style={{ color: "white", padding: "8px" }}
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content - WhatsApp Style Grid Cards */}
      <div
        className="flex-grow-1 overflow-auto"
        style={{ minHeight: 0, backgroundColor: "#f0f2f5" }}
      >
        <div className="container-fluid px-4 py-4">
          <div className="mb-4">
            <h2
              className="mb-0 fw-bold"
              style={{
                fontSize: "28px",
                color: "#075e54",
                letterSpacing: "0.3px",
              }}
            >
              Pilih Room Chat
            </h2>
            <p
              className="mb-0 small mt-2"
              style={{ color: "#667781", fontSize: "15px" }}
            >
              Pilih room untuk memulai diskusi
            </p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div
                className="spinner-border"
                role="status"
                style={{ color: "#075e54" }}
              >
                <span className="visually-hidden">Memuat rooms...</span>
              </div>
              <p className="mt-3 small" style={{ color: "#667781" }}>
                Memuat rooms...
              </p>
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-5">
              <div
                className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#e9edef",
                }}
              >
                <MessageCircle
                  className="w-10 h-10"
                  style={{ color: "#667781" }}
                />
              </div>
              <p className="lead mb-2" style={{ color: "#667781" }}>
                Belum ada room chat
              </p>
              {user?.role === "admin" && (
                <p className="small" style={{ color: "#667781" }}>
                  Klik tombol + di atas untuk membuat room pertama
                </p>
              )}
            </div>
          ) : (
            <div className="row g-4">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="col-12 col-md-6 col-lg-4 col-xl-3"
                >
                  <div
                    onClick={() => handleRoomClick(room)}
                    className="position-relative"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "white",
                      borderRadius: "8px",
                      padding: "16px",
                      border: "1px solid #e9edef",
                      transition: "all 0.2s ease",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0,0,0,0.1)";
                      if (user?.role === "admin") {
                        e.currentTarget
                          .querySelector(".delete-btn")
                          ?.classList.remove("opacity-0");
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      if (user?.role === "admin") {
                        e.currentTarget
                          .querySelector(".delete-btn")
                          ?.classList.add("opacity-0");
                      }
                    }}
                  >
                    {user?.role === "admin" && (
                      <button
                        onClick={(e) => handleDeleteRoom(e, room.id)}
                        className="position-absolute top-0 end-0 m-2 btn p-1 rounded-circle delete-btn opacity-0 border-0"
                        style={{
                          transition: "opacity 0.2s",
                          color: "#667781",
                          width: "28px",
                          height: "28px",
                          zIndex: 10,
                          backgroundColor: "rgba(255,255,255,0.9)",
                        }}
                        title="Hapus Room"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <div className="mb-3">
                      <h5
                        className="mb-2 fw-normal"
                        style={{
                          fontSize: "17px",
                          color: "#111b21",
                          fontWeight: "500",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: "1.4",
                          minHeight: "2.4em",
                        }}
                      >
                        {room.name}
                      </h5>
                      {room.creator && (
                        <p
                          className="mb-2 small"
                          style={{ color: "#667781", fontSize: "12px" }}
                        >
                          Oleh {room.creator.name}
                        </p>
                      )}
                    </div>

                    {room.topic && (
                      <div
                        className="mb-3 p-2"
                        style={{
                          backgroundColor: "#f0f2f5",
                          borderRadius: "6px",
                          border: "1px solid #e9edef",
                        }}
                      >
                        <p
                          className="mb-1 small fw-semibold"
                          style={{
                            color: "#075e54",
                            fontSize: "12px",
                          }}
                        >
                          Topik:
                        </p>
                        <p
                          className="mb-0 small"
                          style={{
                            color: "#111b21",
                            fontSize: "13px",
                            lineHeight: "1.4",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {room.topic}
                        </p>
                      </div>
                    )}

                    {room.description && (
                      <div className="mb-3 flex-grow-1">
                        <p
                          className="mb-0 small"
                          style={{
                            color: "#667781",
                            fontSize: "13px",
                            lineHeight: "1.4",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {room.description}
                        </p>
                      </div>
                    )}

                    <div
                      className="mt-auto pt-3 border-top"
                      style={{ borderColor: "#e9edef" }}
                    >
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <span
                          className="small fw-medium"
                          style={{ color: "#128c7e", fontSize: "13px" }}
                        >
                          Klik untuk masuk
                        </span>
                        <ArrowRight
                          className="w-4 h-4"
                          style={{ color: "#128c7e" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Room Modal */}
      {showCreateModal && (
        <CreateRoomForm onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
