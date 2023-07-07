const SectionHeading = ({ heading, subheading }) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold uppercase">{heading}</h1>
      <p className="text-xl">{subheading}</p>
    </div>
  );
};

export default SectionHeading;
