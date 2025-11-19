import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-primary mb-4">404</h1>
        <p className="lead text-muted mb-4">Halaman tidak ditemukan</p>
        <Link to="/" className="btn btn-primary btn-lg">
          Kembali ke Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
