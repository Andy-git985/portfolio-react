const Post = ({ post }) => {
  return (
    <div>
      <img src={post.image} alt={'description'} />
    </div>
  );
};

const Images = ({ posts }) => {
  return (
    <div className="images">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Images;
