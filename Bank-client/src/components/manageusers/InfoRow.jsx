export const InfoRow = ({ label, value }) => {
  return (
    <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row justify-between border-b border-gray-700 p-3 gap-2">
      <span className="text-gray-400">{label}</span>

      <span className="text-text">{value}</span>
    </div>
  );
};
