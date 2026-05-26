import type { ScheduleItem } from "@/lib/types";

export function ScheduleOutline({ items }: { items: ScheduleItem[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-navy-800/10 bg-white shadow-md">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-navy-800/10 bg-navy-900 text-white">
            <th className="px-5 py-3 font-semibold">Time</th>
            <th className="px-5 py-3 font-semibold">Activity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={`${item.time}-${item.activity}`}
              className="border-b border-navy-800/5 last:border-0"
            >
              <td className="whitespace-nowrap px-5 py-3 font-medium text-navy-900">
                {item.time}
              </td>
              <td className="px-5 py-3 text-text-muted">{item.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
