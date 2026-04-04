
import LikesList from "@/components/LikesList/LikesList";




export default function HomePage() {

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Welcome to <strong className="text-green-600">- Stuff My Dog Likes -</strong>
      </h1>
      <LikesList />
    </div>
  );
}