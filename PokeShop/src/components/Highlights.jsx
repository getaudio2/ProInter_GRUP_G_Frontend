const Highlights = () => {
    return (
      <section className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white shadow-md p-4">
            <div className="h-32 bg-gray-200 mb-2"></div>
            <p>Texto descriptivo</p>
          </div>
        ))}
      </section>
    );
  };
  
  export default Highlights;
  