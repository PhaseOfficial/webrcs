const GlassSurface = ({ 
  children, 
  className = '', 
  width, 
  height, 
  borderRadius, 
  opacity, 
  brightness, 
  blur, 
  ...props 
}) => {
  const style = {
    width,
    height,
    borderRadius: borderRadius ? `${borderRadius}px` : undefined,
    '--opacity': opacity,
    '--brightness': brightness,
    '--blur': blur ? `${blur}px` : undefined,
  };

  return (
    <div 
      className={`bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassSurface;