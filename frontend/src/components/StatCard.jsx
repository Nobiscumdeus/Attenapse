  // eslint-disable-next-line no-unused-vars
  const StatCard = ({ title, value, subtitle, icon: Icon, color = "red" }) => (
    <div
      className={`bg-gradient-to-br from-${color}-50 to-${color}-100 p-6 rounded-xl border border-${color}-200`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold text-${color}-700  mt-1`}>
            {value}
          </p>
          {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
        </div>
        <Icon className={`text-${color}-600`} size={32} />
      </div>
    </div>
  );


  export default StatCard