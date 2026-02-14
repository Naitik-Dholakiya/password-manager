import { useVault } from "../context/VaultContext";
import StatCard from "../components/ui/StatCard";
import { Shield, Layers, Clock } from "lucide-react";

export default function Dashboard() {
  const { vault } = useVault();

  const total = vault.length;

  const categories = vault.reduce((acc, cur) => {
    acc[cur.category] = (acc[cur.category] || 0) + 1;
    return acc;
  }, {});

  const recent = [...vault]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={<Shield />} title="Total Passwords" value={total} />
        <StatCard icon={<Layers />} title="Categories" value={Object.keys(categories).length} />
        <StatCard icon={<Clock />} title="Recently Added" value={recent.length} />
      </div>

      {/* Recent Entries */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>

        {recent.length === 0 ? (
          <p className="text-slate-400">No entries yet.</p>
        ) : (
          <ul className="space-y-3">
            {recent.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span>{item.site}</span>
                <span className="text-slate-400">{item.category}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


// import { useVault } from "../context/VaultContext";
// import StatCard from "../components/ui/StatCard";
// import { Shield, Layers, Clock } from "lucide-react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
// } from "recharts";

// const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4ADE80", "#F87171"];

// export default function Dashboard() {
//   const { vault } = useVault();

//   const total = vault.length;

//   const categories = vault.reduce((acc, cur) => {
//     acc[cur.category] = (acc[cur.category] || 0) + 1;
//     return acc;
//   }, {});

//   const recent = [...vault]
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     .slice(0, 5);

//   // Prepare data for PieChart
//   const pieData = Object.keys(categories).map((key) => ({
//     name: key,
//     value: categories[key],
//   }));

//   // Prepare data for BarChart (recent per category)
//   const barData = recent.map((item) => ({
//     site: item.site,
//     value: 1,
//     category: item.category,
//   }));

//   return (
//     <div className="space-y-8">

//       <h1 className="text-3xl font-bold">Dashboard</h1>

//       {/* Stats */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <StatCard icon={<Shield />} title="Total Passwords" value={total} />
//         <StatCard icon={<Layers />} title="Categories" value={Object.keys(categories).length} />
//         <StatCard icon={<Clock />} title="Recently Added" value={recent.length} />
//       </div>

//       {/* Charts */}
//       <div className="grid lg:grid-cols-2 gap-6">

//         {/* Category Pie Chart */}
//         <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
//           <h2 className="text-xl font-semibold mb-4">Passwords by Category</h2>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 dataKey="value"
//                 nameKey="name"
//                 outerRadius={80}
//                 fill="#8884d8"
//                 label
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Recent Bar Chart */}
//         <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
//           <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={barData}>
//               <XAxis dataKey="site" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" fill="#36A2EB" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//       </div>

//       {/* Recent Entries List */}
//       <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
//         <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
//         {recent.length === 0 ? (
//           <p className="text-slate-400">No entries yet.</p>
//         ) : (
//           <ul className="space-y-3">
//             {recent.map((item) => (
//               <li key={item.id} className="flex justify-between text-sm">
//                 <span>{item.site}</span>
//                 <span className="text-slate-400">{item.category}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//     </div>
//   );
// }

// Advanced dashboard with charts (commented out for simplicity)