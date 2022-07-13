export default function Loading() {
  return (
    <>
      <div className="bg-white w-100 h-100 position-absolute">
        <img
          src={require("../../assets/loading.gif")}
          className="mx-auto d-block"
          alt=""
        />
      </div>
    </>
  );
}
