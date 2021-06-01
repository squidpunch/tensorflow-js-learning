type CardProps = {
  url: string;
  title: string;
  description: string;
};
const Card = ({ url, title, description }: CardProps) => {
  return (
    <a
      href={url}
      className="hover:text-blue-500 hover:border-blue-500 m-4 p-6 text-left no-underline border border-gray-200 rounded-xl w-2/5"
    >
      <h2 className="mb-4 text-2xl">{title} &rarr;</h2>
      <p className="m-0 text-lg">{description}</p>
    </a>
  );
};

export default Card;
