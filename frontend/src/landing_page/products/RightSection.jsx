function RightSection({
  imageURL,
  productName,
  productDescription,
  learnMore,
}) {
  return (
    <div className="container">
      <div className="row align-items-center mb-5 pb-5">
        <div className="col-4 p-3" style={{ marginTop: "40px" }}>
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <a href={learnMore}>
            Learn More{" "}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
        <div className="col-2"></div>
        <div className="col-6">
          <img src={imageURL} className="img-fluid" />
        </div>
      </div>
    </div>
  );
}
export default RightSection;
