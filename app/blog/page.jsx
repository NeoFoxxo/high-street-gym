import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import db from "../utils/database";
import CreateBlogButton from "@/components/Blog/CreateBlogButton";

const Blog = async () => {

  // get blog posts
  const [blogDataRaw] = await db.execute(
    `SELECT post_id, title, article, username as author, publish_date FROM blog_posts
    JOIN user ON blog_posts.user_id = user.user_id`);

  // format the publish date from the default MySQL date format
  const blogData = blogDataRaw.map((rawPost) => {

    const date = new Date(rawPost.publish_date);

    const formattedDate = date.toLocaleString('en-US', {  day: 'numeric', month: 'long', year: 'numeric'});

    return { ...rawPost, publish_date: formattedDate };
  })

  return (
    <>
      <Breadcrumb
        pageName="Blog"
        description="View posts from our community."
      />
      <section className="pt-[80px] pb-[80px]">
        <div className="container">
          <CreateBlogButton />
            <div className="-mx-4 flex flex-wrap justify-center">
              {blogData.map((blog) => (
                <div
                  key={blog.post_id}
                  className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                >
                  <SingleBlog blog={blog} />
                </div>
              ))}
            </div>
          <div
            className="wow fadeInUp -mx-4 flex flex-wrap"
            data-wow-delay=".15s"
          >
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;