export default function Todo({ todo }) {
  return (
    <>
    <div className=" w-96 flex flex-row ">
      <p className="text-2xl font-bold">{todo}</p>
      <div className="my-auto ml-10">
        <button>Complete</button>
        <button className="ml-2">Edit</button>
      </div>
    </div>
    </>
  );
}
