export default function LogInModal({ setIsLogInOpen }) {
  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-slate-600 bg-opacity-50"
      onClick={() => setIsLogInOpen(false)}
    >
      <div
        className="bg-slate-300 p-8 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  )
}
