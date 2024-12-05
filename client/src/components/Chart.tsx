import { BarChart, Bar, XAxis, YAxis,CartesianGrid, Legend, ResponsiveContainer, Tooltip } from 'recharts';


type ChartProps = {
  graphData: any
}

export const Chart = ({graphData}:ChartProps) => {
  return (
    <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
      <h4 className="text-xl font-semibold mb-4">Chart by Priority</h4>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={graphData}>
          <XAxis dataKey="name" />
          <YAxis dataKey="total" />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="total" fill="#1f2937" barSize={100} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
