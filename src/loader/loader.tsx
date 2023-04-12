const Loader = () => {
  return (
    <div>
      <div className="flex items-center justify-center py-10">
        <div
          className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current text-success border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_2s_linear_infinite] mt-[250px] p-8"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
