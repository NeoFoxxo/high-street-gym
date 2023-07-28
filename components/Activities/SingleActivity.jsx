import Image from "next/image";

const SingleActivity = ({activity}) => {
  const { name, image, description} = activity;

  return (
    <div className="w-full">
      <div
        className="wow fadeInUp rounded-md bg-white p-8 shadow-one lg:px-5 xl:px-8"
        data-wow-delay=".1s"
      >
        <div className="mb-5 flex items-center space-x-1 text-2xl font-bold">{name}</div>
          <div className="relative mr-4 mb-5 h-[200px] w-full object-contain shadow-md">
              <Image src={image} alt={name} fill />
          </div>
        <p className="mb-8 border-b border-body-color border-opacity-10 pb-8 text-base leading-relaxed font-2xl ">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SingleActivity;