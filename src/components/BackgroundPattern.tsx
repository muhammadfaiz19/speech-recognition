const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0">
      <div className="relative h-full w-full bg-black [&>div]:absolute [&>div]:inset-0 [&>div]:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] [&>div]:bg-[size:14px_24px]">
        <div></div>
      </div>
    </div>
  );
};

export default BackgroundPattern;
