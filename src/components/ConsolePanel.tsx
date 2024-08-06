export default function ConsolePanel({
  logs,
}: {
  logs: { type: string; message: string }[] | null;
}) {
  const getLogStyle = (type: string) => {
    switch (type) {
      case "log":
        return "text-[#6a9955] italic";
      case "error":
        return "text-red-500";
      case "warn":
        return "text-yellow-500";
      case "info":
        return "text-blue-500";
      case "debug":
        return "text-gray-500";
      default:
        return "text-[#d4d4d4]";
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm">
      <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-[#3c3c3c]">
        <h1 className="font-semibold">Console</h1>
      </div>
      <div className="flex-grow overflow-auto">
        {logs && logs.length > 0 ? (
          <ul className="p-2">
            {logs.map((log, i) => (
              <li
                key={i}
                className={`py-1 border-b border-[#3c3c3c] last:border-b-0 ${getLogStyle(
                  log.type
                )}`}
              >
                <pre className="whitespace-pre-wrap break-words">
                  <code>{log.message}</code>
                </pre>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-4 text-[#6a9955] italic">No logs to display</p>
        )}
      </div>
    </div>
  );
}
