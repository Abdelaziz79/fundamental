export default function ConsolePanel({ logs }: { logs: string[] | null }) {
  return (
    <>
      <div className="flex m-2 flex-col gap-2 ">
        <h1>Console Panel</h1>
        <ul className="overflow-auto max-h-[1000px]">
          {logs?.map((log, i) => {
            return (
              <li className=" py-2 border-gray-300 border-b" key={i}>
                {log}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
