import { Link } from "react-router";

const EmptyState = ({
  className = "",
  title = "",
  description = "",
  btnLink = "",
  btnText = "",
  icon,
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className} `}>
      <h2 className="text-2xl md:text-3xl text-center font-semibold">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-center font-semibold">{description}</p>
      )}
      {btnLink && btnText && (
        <Link to={btnLink}>
          <button className="btn mt-4 btn-primary">
            {icon} {btnText}
          </button>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
