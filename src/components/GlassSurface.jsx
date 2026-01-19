const GlassSurface = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassSurface;