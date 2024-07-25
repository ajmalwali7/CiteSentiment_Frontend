export function Missing() {
  document.title = "Page Not Found";
  return (
    <>
      <div>
        <h1 className="text-6xl text-teal-600 font-bold">
          404! Page Not Found
        </h1>
        <p className="text-4xl text-teal-600">
          You can go to Homepage by clicking
          <a
            className="underline text-green-500 active:text-green-600 hover:cursor-pointer hover:text-green-400"
            href="/"
          >
            here!
          </a>
        </p>
      </div>
    </>
  );
}
