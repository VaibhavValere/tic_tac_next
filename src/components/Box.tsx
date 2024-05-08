"use-client";
export const Box = ({ status }: { status: null | boolean }) => {
  return (
    <div
      className={`h-20 w-20 flex justify-center
        ${
          status == null
            ? "bg-red-200"
            : status
            ? "bg-green-200"
            : "bg-blue-200"
        }`}
    >
      <p className="text-black font-bold text-xl self-center">
        {status == null ? "" : status ? "X" : "O"}
      </p>
    </div>
  );
};
