import { DateTime } from 'luxon'

export default function Post({ title, timestamp, published }) {
  const formattedTimestamp = DateTime.fromISO(timestamp).toFormat('dd-MM-yyyy')

  return (
    <div className="flex flex-col w-1/4 py-10 px-2 border-y-2 border-slate-500">
      <h1 className="text-xl mb-3">{title}</h1>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h3>{formattedTimestamp}</h3>
          <h3>{published ? 'Published: True' : 'Published: False'}</h3>
        </div>
        <div>
          {published ? (
            <button className="bg-slate-300 py-1 px-2 rounded">
              Unpublish
            </button>
          ) : (
            <button className="bg-slate-300 py-1 px-2 rounded">Publish</button>
          )}
        </div>
      </div>
    </div>
  )
}
