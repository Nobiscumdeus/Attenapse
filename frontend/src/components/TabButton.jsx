   // eslint-disable-next-line no-unused-vars
  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
        isActive
          ? "bg-blue-600 text-white shadow-lg"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
      }`}
    >
      <Icon size={20} />
      <span className="font-medium"> {label} </span>
    </button>
  );


  export default TabButton