import Link from "next/link";

const SingleBlog = ({blog}) => {
  const { title, article, author, publish_date, post_id } = blog;

  // if the article is over 80 characters slice it
  const articleSnippet = article.slice(0, 80)

  return (
    <>
      <div
        className="wow fadeInUp relative overflow-hidden rounded-md bg-white shadow-one"
        data-wow-delay=".1s"
      >
        <div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8 bg-base-200 mb-5">
          <h3>
            <Link
              href={`/blog-details/${post_id}`}
              className="mb-4 block text-xl font-bold text-black hover:text-primary sm:text-2xl"
            >
              {title}
            </Link>
          </h3>
          <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color">
          {articleSnippet}{articleSnippet.length > 79 ? "...." : null}
          </p>
          <div className="flex items-center">
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark">
                  By {author}
                </h4>
              </div>
            </div>
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark">
                Date
              </h4>
              <p className="text-xs text-body-color">{publish_date}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
