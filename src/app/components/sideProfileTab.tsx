export default function SideProfileTab() {
  return (
    <div className="w-full h-full flex flex-col absolute">
      <div className="w-full h-[35%] bg-cyan-400"></div>
      <div className="absolute h-20 w-20 rounded-[50%] bg-gray-600 left-4 top-10"></div>
      <div className="w-full h-[65%] flex flex-col p-2 bg-amber-900 justify-end gap-2 pb-4">
        <div className="w-[80%] h-max bg-pink-500">Manish Kumar</div>
        <div className="w-full h-max bg-pink-500 text-gray-400 text-base font-light flex flex-wrap">
          Moradabad Institute of Technology ,Moradabad
        </div>
      </div>
    </div>
  );
}
