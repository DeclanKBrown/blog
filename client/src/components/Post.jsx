export default function Post({ title, timestamp }) {
  return (
    <div className="flex flex-col w-1/2 border-y-slate-50 py-10">
      <h1 className="text-xl">{title}</h1>
      <div className="flex flex-row justify-end">
        <h3>{timestamp}</h3>
      </div>
    </div>
  )
}
