import { H2 } from "@/components/Headers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center gap-3 mt-[20vh]">
      <H2 className="font-extrabold">This Store Management Site</H2>
      <p className="sm:w-1/2 mx-auto text-paragraph text-center">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here',
      </p>
      <div className="flex gap-2 mt-2">
        <Link href="/sign-in">
          <Button className="hover:bg-primary-700">Login</Button>
        </Link>
        <Link href="/register">
          <Button className="hover:bg-primary-700">Register</Button>
        </Link>
        <Link href="#">
          <Button className="hover:bg-primary-700">Dashboard</Button>
        </Link>
      </div>
    </main>
  );
}
