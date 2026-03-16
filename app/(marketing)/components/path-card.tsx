import Card from "./ui/card";

type CardProps = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

export default function PathCard({ id, title, description, tags }: CardProps) {
  return (
    <Card className="p-5 gap-5 grow">
      <span className="font-code text-muted text-xs">
        PATH {id.padStart(2, "0")}
      </span>
      <h3 className="font-poppins font-semibold text-2xl">{title}</h3>
      <p className="text-muted">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-background block border border-muted/50 w-fit h-fit px-3 rounded-md font-code text-muted text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </Card>
  );
}
