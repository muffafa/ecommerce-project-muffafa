import PropTypes from "prop-types";
import "./DescriptionBox.css";

function DescriptionBox({ description }) {
  return (
    <div className="description-box">
      <div className="description-box-navigator">
        <div className="description-box-nav-box">Açıklama</div>
      </div>
      <div className="description-box-description">
        <p>{description}</p>
      </div>
    </div>
  );
}

DescriptionBox.propTypes = {
  description: PropTypes.string.isRequired,
};

export default DescriptionBox;
