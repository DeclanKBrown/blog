import { DateTime } from 'luxon'

export default function Post({ title, timestamp }) {
  const formattedTimestamp = DateTime.fromISO(timestamp).toFormat('dd-MM-yyyy')

  return (
    <div className="flex flex-col w-1/4 py-10 px-2 border-y-2 border-slate-500">
      <h1 className="text-xl mb-3">{title}</h1>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <h3>{formattedTimestamp}</h3>
        </div>
      </div>
    </div>
  )
}
