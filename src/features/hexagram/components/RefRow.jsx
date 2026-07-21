export default function RefRow({ label, value }) {
  return (
    <tr>
      <th className="w-1/3">{label}</th>
      <td>{value}</td>
    </tr>
  )
}
